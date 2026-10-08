import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtemp, readFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createContactServer, createMailSender } from './contact-service.mjs';

const origin = 'https://suddeco.com';
const enquiry = () => ({ requestId: randomUUID(), fullName: 'Internal QA', email: 'qa@example.invalid', phone: '+44 0000 000000', company: 'QA & review', message: 'Synthetic test only.\nKeep & + # ? £ intact.' });

async function fixture(t, options = {}) {
  const stateDir = options.stateDir || await mkdtemp(join(tmpdir(), 'suddeco-contact-test-'));
  const sends = [];
  const server = await createContactServer({ stateDir, sendMail: async (record) => { sends.push(record); return 'mock-mail-id'; }, logger: { error() {} }, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (body, headers = {}) => fetch(`${url}/api/contact`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  return { stateDir, sends, url, post };
}

test('durable copy precedes send; repeat and concurrent requests notify once; changed UUID content rejected', async t => {
  const f = await fixture(t);
  const input = enquiry();
  const responses = await Promise.all([f.post(input), f.post(input)]);
  assert.deepEqual(responses.map(r => r.status), [200, 200]);
  assert.equal(f.sends.length, 1);
  const saved = JSON.parse(await readFile(join(f.stateDir, 'enquiries', `${input.requestId}.json`), 'utf8'));
  assert.equal(saved.status, 'accepted');
  assert.equal(saved.mailId, 'mock-mail-id');
  assert.equal(saved.fields.message, input.message);
  assert.equal((await f.post({ ...input, message: `${input.message} Changed` })).status, 409);
  assert.equal(f.sends.length, 1);
  const restarted = await fixture(t, { stateDir: f.stateDir });
  assert.equal((await restarted.post(input)).status, 200);
  assert.equal(restarted.sends.length, 0);
});

test('mail failure preserves pending copy; retry keeps reference; expired ambiguity never resends', async t => {
  let time = Date.parse('2026-10-08T01:00:00Z');
  let calls = 0;
  const f = await fixture(t, { now: () => time, sendMail: async record => {
    const saved = JSON.parse(await readFile(join(f.stateDir, 'enquiries', `${record.requestId}.json`), 'utf8'));
    assert.equal(saved.status, 'pending');
    calls++;
    throw new Error('simulated timeout');
  } });
  const input = enquiry();
  assert.equal((await f.post(input)).status, 503);
  assert.equal((await f.post(input)).status, 503);
  assert.equal(calls, 2);
  time += 23 * 3600000;
  assert.equal((await f.post(input)).status, 503);
  assert.equal(calls, 2);
  const success = await fixture(t, { stateDir: f.stateDir, now: () => Date.parse('2026-10-08T01:10:00Z') });
  assert.equal((await success.post(input)).status, 200);
  assert.equal(success.sends.length, 1);
});

test('origins, headers, path, validation, oversized requests and injection rejected without mail', async t => {
  const f = await fixture(t);
  assert.equal((await fetch(`${f.url}/health`)).status, 200);
  assert.equal((await fetch(`${f.url}/api/contact`)).status, 405);
  assert.equal((await fetch(`${f.url}/enquiries/x.json`)).status, 404);
  assert.equal((await f.post(enquiry(), { origin: 'https://unrelated.example' })).status, 403);
  assert.equal((await f.post(enquiry(), { 'Content-Type': 'text/plain' })).status, 415);
  for (const body of [
    { ...enquiry(), requestId: '../../escape' },
    { ...enquiry(), email: 'qa@example.invalid\r\nBcc: other@example.invalid' },
    { ...enquiry(), message: 'short' },
    { ...enquiry(), fullName: 'x'.repeat(121) },
  ]) assert.equal((await f.post(body)).status, 400);
  assert.equal((await f.post('x'.repeat(33000))).status, 413);
  assert.equal(f.sends.length, 0);
});

test('daily cap survives restart and rejects new mail while accepted retry succeeds', async t => {
  const f = await fixture(t, { dailyLimit: 1 });
  const first = enquiry();
  assert.equal((await f.post(first)).status, 200);
  assert.equal((await f.post(enquiry())).status, 503);
  const restarted = await fixture(t, { stateDir: f.stateDir, dailyLimit: 1 });
  assert.equal((await restarted.post(enquiry())).status, 503);
  assert.equal((await restarted.post(first)).status, 200);
  assert.equal(restarted.sends.length, 0);
});

test('persistence failure prevents sending, and per-IP rate cap bounds requests', async t => {
  const f = await fixture(t);
  const input = enquiry();
  await mkdir(join(f.stateDir, 'enquiries', `${input.requestId}.json`));
  assert.equal((await f.post(input)).status, 503);
  assert.equal(f.sends.length, 0);
  for (let i = 0; i < 5; i++) await f.post({ ...enquiry(), message: '' });
  assert.equal((await f.post(enquiry())).status, 429);
  assert.equal(f.sends.length, 0);
});

test('mail transport has a fixed recipient, plain text, validated reply-to and stable provider key', async () => {
  const requests = [];
  const input = enquiry();
  const sender = createMailSender({ apiKey: 'mock-secret', from: 'Suddeco <hello@example.invalid>', fetchImpl: async (url, options) => {
    requests.push({ url, ...options });
    return new Response(JSON.stringify({ id: 'accepted-id' }), { status: 200 });
  } });
  assert.equal(await sender({ requestId: input.requestId, fields: input }), 'accepted-id');
  const sent = requests[0];
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.equal(sent.headers['Idempotency-Key'], `landing-contact/${input.requestId}`);
  const body = JSON.parse(sent.body);
  assert.deepEqual(body.to, ['sales@suddeco.com']);
  assert.equal(body.reply_to, input.email);
  assert.equal(body.html, undefined);
  assert.ok(body.text.includes(input.message));
  assert.ok(body.subject.includes(input.requestId));
  const failing = createMailSender({ apiKey: 'mock', from: 'mock', fetchImpl: async () => new Response('{}', { status: 429 }) });
  await assert.rejects(failing({ requestId: input.requestId, fields: input }));
});

test('a slow sender cannot grow the submission queue beyond two requests', async t => {
  let release;
  let started;
  const active = new Promise(resolve => { started = resolve; });
  const gate = new Promise(resolve => { release = resolve; });
  let calls = 0;
  const f = await fixture(t, { sendMail: async () => { calls++; started(); await gate; return 'mock-id'; } });
  const first = f.post(enquiry());
  await active;
  const second = f.post(enquiry());
  // The second request reserves the sole waiting slot; a third must get fallback.
  await new Promise(resolve => setTimeout(resolve, 30));
  const third = await f.post(enquiry());
  assert.equal(third.status, 503);
  release();
  assert.deepEqual((await Promise.all([first, second])).map(r => r.status), [200, 200]);
  assert.equal(calls, 2);
});
