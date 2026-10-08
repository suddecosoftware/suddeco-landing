import http from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const RECIPIENT = 'sales@suddeco.com';
const RETRY_WINDOW = 23 * 60 * 60 * 1000; // Provider deduplication expires after 24h.
const BODY_LIMIT = 32 * 1024;

class ContactError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}

function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !UUID.test(input.requestId)) {
    throw new ContactError(400, 'invalid_enquiry');
  }
  const fields = {};
  for (const [key, min, max] of [['fullName', 2, 120], ['email', 3, 254], ['phone', 3, 50], ['company', 0, 160], ['message', 10, 8000]]) {
    if (typeof input[key] !== 'string') throw new ContactError(400, 'invalid_enquiry');
    fields[key] = input[key].trim();
    if (fields[key].length < min || fields[key].length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(fields[key])) {
      throw new ContactError(400, 'invalid_enquiry');
    }
    if (key !== 'message' && /[\r\n]/.test(fields[key])) throw new ContactError(400, 'invalid_enquiry');
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) || input.website) {
    throw new ContactError(400, 'invalid_enquiry');
  }
  return { requestId: input.requestId, fields, fingerprint: createHash('sha256').update(JSON.stringify(fields)).digest('hex') };
}

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function writeJson(path, value) {
  // Atomic update: keep the previous record intact if writing or syncing fails.
  const temporary = `${path}.${randomUUID()}.pending`;
  const file = await open(temporary, 'wx', 0o600);
  try { await file.writeFile(JSON.stringify(value)); await file.sync(); }
  finally { await file.close(); }
  await rename(temporary, path);
  const directory = await open(dirname(path), 'r');
  try { await directory.sync(); }
  finally { await directory.close(); }
}

export function createMailSender({ apiKey, from, fetchImpl = fetch }) {
  return async (record) => {
    const { fields, requestId } = record;
    const response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(12000),
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `landing-contact/${requestId}` },
      body: JSON.stringify({
        from, to: [RECIPIENT], reply_to: fields.email,
        subject: `Website enquiry — ${requestId}`,
        text: [`Reference: ${requestId}`, 'Source: https://suddeco.com/#contact', `Name: ${fields.fullName}`, `Email: ${fields.email}`, `Phone: ${fields.phone}`, `Company: ${fields.company || '(not provided)'}`, '', fields.message].join('\n'),
      }),
    });
    if (!response.ok) throw new ContactError(503, 'mail_unavailable');
    const data = await response.json();
    if (typeof data.id !== 'string' || !data.id) throw new ContactError(503, 'mail_unavailable');
    return data.id;
  };
}

export async function createContactServer({ stateDir, sendMail, origin = 'https://suddeco.com', now = Date.now, dailyLimit = 25, logger = console }) {
  if (!stateDir || typeof sendMail !== 'function') throw new Error('Contact service configuration missing');
  await mkdir(stateDir, { recursive: true, mode: 0o700 });
  const enquiries = join(stateDir, 'enquiries');
  await mkdir(enquiries, { recursive: true, mode: 0o700 });
  const rates = new Map();
  let queue = Promise.resolve();
  let queued = 0;

  async function submit(input) {
    const path = join(enquiries, `${input.requestId}.json`);
    let record = await readJson(path);
    if (record && record.fingerprint !== input.fingerprint) throw new ContactError(409, 'enquiry_changed');
    if (record?.status === 'accepted') return record;
    // An ambiguous old send needs operator review, never an automatic duplicate.
    if (record?.firstAttemptAt && now() - record.firstAttemptAt >= RETRY_WINDOW) {
      throw new ContactError(503, 'enquiry_needs_review');
    }
    const day = new Date(now()).toISOString().slice(0, 10);
    const budgetPath = join(stateDir, `budget-${day}.json`);
    const budget = await readJson(budgetPath) || { references: [] };
    if (!budget.references.includes(input.requestId)) {
      if (budget.references.length >= dailyLimit) throw new ContactError(503, 'enquiry_limit');
      budget.references.push(input.requestId);
      await writeJson(budgetPath, budget);
    }
    record ||= { ...input, receivedAt: new Date(now()).toISOString(), status: 'pending', attempts: 0 };
    record.firstAttemptAt ||= now();
    record.attempts += 1;
    await writeJson(path, record); // Never send without a durable private copy.
    const mailId = await sendMail(record);
    record = { ...record, status: 'accepted', mailId, acceptedAt: new Date(now()).toISOString() };
    await writeJson(path, record);
    return record;
  }

  const server = http.createServer(async (req, res) => {
    const respond = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(data));
    };
    try {
      if (req.url === '/health' && req.method === 'GET') return respond(200, { ready: true });
      if (req.url !== '/api/contact') return respond(404, { ok: false });
      if (req.method !== 'POST') return respond(405, { ok: false });
      if (req.headers.origin !== origin) throw new ContactError(403, 'origin_rejected');
      if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) throw new ContactError(415, 'json_required');
      const timestamp = now();
      for (const [key, rate] of rates) if (rate.expires <= timestamp) rates.delete(key);
      const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
      const rate = rates.get(ip) || { count: 0, expires: timestamp + 3600000 };
      if (rate.count >= 6 || (!rates.has(ip) && rates.size >= 1000)) throw new ContactError(429, 'try_later');
      rate.count += 1;
      rates.set(ip, rate);
      if (queued >= 2) throw new ContactError(503, 'try_later');
      let length = 0;
      const chunks = [];
      for await (const chunk of req) {
        length += chunk.length;
        if (length > BODY_LIMIT) throw new ContactError(413, 'enquiry_too_large');
        chunks.push(chunk);
      }
      let raw;
      try { raw = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { throw new ContactError(400, 'invalid_enquiry'); }
      const input = validate(raw);
      // Recheck after reading: concurrent slow bodies must not bypass the bound.
      if (queued >= 2) throw new ContactError(503, 'try_later');
      queued += 1;
      const pending = queue.then(() => submit(input));
      queue = pending.catch(() => {});
      let record;
      try { record = await pending; }
      finally { queued -= 1; }
      return respond(200, { ok: true, reference: record.requestId, message: 'Thank you. Your enquiry has been accepted.' });
    } catch (error) {
      // No contact fields, provider responses, credentials or IPs in logs.
      if (!(error instanceof ContactError)) logger.error('contact_request_failed');
      return respond(error.status || 503, { ok: false, code: error.code || 'enquiry_unavailable' });
    }
  });
  server.requestTimeout = 20000;
  server.headersTimeout = 10000;
  server.timeout = 30000;
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { RESEND_API_KEY: apiKey, RESEND_FROM: from, CONTACT_STATE_DIR: stateDir } = process.env;
  if (!apiKey || !from || !stateDir || /[\r\n]/.test(from)) throw new Error('Contact service configuration missing');
  const server = await createContactServer({ stateDir, sendMail: createMailSender({ apiKey, from }) });
  server.listen(3187, '127.0.0.1', () => console.log('contact_service_ready'));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
}
