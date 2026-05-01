import { chromium, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type Track = "pro" | "homeowner";
type Status = "PASS" | "FAIL" | "WARN";

type CheckResult = {
  name: string;
  status: Status;
  details: string;
  data?: unknown;
};

const SUPABASE_URL = "https://hvpsxeytbvbytyjudtyb.supabase.co";
const REGISTER_URL = `${SUPABASE_URL}/functions/v1/webinar-register`;
const OUTPUT_DIR = process.env.DEMO_E2E_OUTPUT_DIR ?? "/tmp/demo-funnel-e2e";
const REPORT_PATH =
  process.env.DEMO_E2E_REPORT_PATH ??
  "/Users/saimir/Documents/brain/30_ACTIVE/qa/2026-04-30-demo-funnel-e2e.md";
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || readKeychainSecret("saimir", "supabase-service-role-key");

const runId = Date.now();
const testEmails = {
  pro: `qa+demopro-${runId}@suddeco.test`,
  homeowner: `qa+demohomeowner-${runId}@suddeco.test`,
};
const directEmails = {
  invalid: `qa+invalid-${runId}@suddeco.test`,
  duplicate: `qa+duplicate-${runId}@suddeco.test`,
  longName: `qa+longname-${runId}@suddeco.test`,
  special: `qa+special-${runId}@suddeco.test`,
  rateBase: `qa+rate-${runId}`,
};

const checks: CheckResult[] = [];
const cleanupEmails = new Set<string>(Object.values(testEmails));

async function main() {
  if (!SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY and Keychain secret saimir/supabase-service-role-key");
  }
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(path.dirname(REPORT_PATH), { recursive: true });

  try {
    await cleanupQaRows();

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      ignoreHTTPSErrors: true,
      userAgent: "Mozilla/5.0 (compatible; SuddecoDemoE2E/1.0; production-safe)",
    });
    page.setDefaultTimeout(12_000);
    page.setDefaultNavigationTimeout(20_000);

    await submitViaPage(page, "pro", testEmails.pro);
    await assertRegistrationAndOutbox("pro", testEmails.pro);
    await submitViaPage(page, "homeowner", testEmails.homeowner);
    await assertRegistrationAndOutbox("homeowner", testEmails.homeowner);

    await browser.close();

    await testEdgeCases();
  } finally {
    await cleanupQaRows();
    await writeReport();
  }

  const failures = checks.filter((check) => check.status === "FAIL");
  console.log(`Demo funnel E2E complete: ${checks.length} checks, ${failures.length} failures`);
  console.log(`Report: ${REPORT_PATH}`);
  if (failures.length > 0) process.exitCode = 1;
}

async function submitViaPage(page: Page, track: Track, email: string) {
  const url = `https://suddeco.com/demo/${track}`;
  const responses: Array<{ url: string; status: number; body: string }> = [];
  const consoleErrors: string[] = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) consoleErrors.push(`[${message.type()}] ${message.text()}`);
  });
  page.on("response", async (response) => {
    if (response.url().includes("/functions/v1/webinar-register")) {
      responses.push({
        url: response.url(),
        status: response.status(),
        body: await response.text().catch(() => ""),
      });
    }
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator('input[placeholder="Name"]').fill(track === "pro" ? "QA Demo Pro" : "QA Demo Homeowner");
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[placeholder="Company"]').fill("Suddeco QA");
  await page
    .locator('input[placeholder="Contractor, developer, architect, QS..."], input[placeholder="Kitchen, bathroom, loft, extension..."]')
    .fill(track === "pro" ? "Contractor" : "Kitchen extension");
  await page.locator("textarea").fill("Production E2E test for the webinar funnel.");

  await Promise.all([
    page.locator('form button[type="submit"]').click(),
    page.waitForTimeout(3000),
  ]);

  const screenshotPath = path.join(OUTPUT_DIR, `${track}-submitted.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  const bodyText = await page.locator("body").innerText();
  const registrationResponse = responses.at(-1);
  const bodySaysSubmitted = /you're on the list/i.test(bodyText);

  checks.push({
    name: `Page submit ${track}`,
    status: registrationResponse?.status === 200 && bodySaysSubmitted ? "PASS" : "FAIL",
    details:
      registrationResponse?.status === 200
        ? `Form submitted and page showed confirmation. Screenshot: ${screenshotPath}`
        : `Expected a 200 webinar-register response and confirmation UI. Last response: ${registrationResponse?.status ?? "none"}. Screenshot: ${screenshotPath}`,
    data: { registrationResponse, consoleErrors: consoleErrors.slice(-10) },
  });
}

async function assertRegistrationAndOutbox(track: Track, email: string) {
  const encodedEmail = encodeURIComponent(email);
  const registrations = await restGet<any[]>(
    `/rest/v1/webinar_registrations?email=eq.${encodedEmail}&select=*`,
  );
  const outboxRows = await restGet<any[]>(
    `/rest/v1/emails_outbox?recipient_email=eq.${encodedEmail}&select=*`,
  );

  const registration = registrations[0];
  checks.push({
    name: `Registration row ${track}`,
    status: registration?.track === track && registration?.email === email ? "PASS" : "FAIL",
    details: registration
      ? `webinar_registrations row exists with status=${registration.status}, batch_id=${registration.batch_id ?? "null"}`
      : "No webinar_registrations row found.",
    data: redactRow(registration),
  });

  const outbox = outboxRows.find((row) => row.template_code === "webinar_confirmation");
  const rendered = `${outbox?.rendered_subject ?? ""}\n${outbox?.rendered_html ?? ""}`;
  const firstNameOk = rendered.includes(track === "pro" ? "QA" : "QA");
  const trackOk = rendered.toLowerCase().includes(track);
  const expectedStatus = outbox?.status === "stubbed";

  checks.push({
    name: `Confirmation outbox ${track}`,
    status: outbox && expectedStatus && firstNameOk && trackOk ? "PASS" : "FAIL",
    details: outbox
      ? `emails_outbox row exists with status=${outbox.status}, template_code=${outbox.template_code}; rendered variables ${firstNameOk && trackOk ? "look substituted" : "need review"}.`
      : "No webinar_confirmation outbox row found.",
    data: redactOutbox(outbox),
  });
}

async function testEdgeCases() {
  await expectDirectFailure("Empty email", { track: "pro", name: "QA Empty", email: "" });
  await expectDirectFailure("Invalid email format", {
    track: "pro",
    name: "QA Invalid",
    email: "not-an-email",
  });

  const duplicateEmail = directEmails.duplicate;
  cleanupEmails.add(duplicateEmail);
  const firstDuplicate = await directRegister({
    track: "pro",
    name: "QA Duplicate",
    email: duplicateEmail,
    company: "Suddeco QA",
    audience_type: "Contractor",
    pain_point: "Duplicate test",
  });
  const secondDuplicate = await directRegister({
    track: "pro",
    name: "QA Duplicate",
    email: duplicateEmail,
    company: "Suddeco QA",
    audience_type: "Contractor",
    pain_point: "Duplicate test",
  });
  checks.push({
    name: "Duplicate email",
    status: firstDuplicate.success && secondDuplicate.already_registered ? "PASS" : "FAIL",
    details: `Expected first registration success and second response already_registered=true.`,
    data: { firstDuplicate, secondDuplicate },
  });

  const longName = `${"QA Long ".repeat(80)}End`;
  const longEmail = directEmails.longName;
  cleanupEmails.add(longEmail);
  const longResult = await directRegister({
    track: "homeowner",
    name: longName,
    email: longEmail,
    company: "Suddeco QA",
    audience_type: "Loft conversion",
    pain_point: "Long-name validation test",
  });
  checks.push({
    name: "Very long firstName",
    status: longResult.success ? "PASS" : "FAIL",
    details: "Expected long name not to crash the registration endpoint.",
    data: longResult,
  });

  const specialEmail = directEmails.special;
  cleanupEmails.add(specialEmail);
  const specialResult = await directRegister({
    track: "pro",
    name: "QA O'Connor & Sons <Test>",
    email: specialEmail,
    company: "Suddeco QA",
    audience_type: "QS & Contractor",
    pain_point: "Special chars: <>&\"'",
  });
  const specialOutbox = await restGet<any[]>(
    `/rest/v1/emails_outbox?recipient_email=eq.${encodeURIComponent(specialEmail)}&select=*`,
  );
  checks.push({
    name: "Special characters in firstName",
    status: specialResult.success && !String(specialOutbox[0]?.rendered_html ?? "").includes("<Test>") ? "PASS" : "WARN",
    details:
      "Expected special characters not to break registration or render unsanitized HTML. WARN means registration worked but rendered HTML needs manual inspection.",
    data: { specialResult, outbox: redactOutbox(specialOutbox[0]) },
  });

  const rateResults = [];
  for (let index = 0; index < 10; index += 1) {
    const email = `${directEmails.rateBase}-${index}@suddeco.test`;
    cleanupEmails.add(email);
    rateResults.push(
      await directRegister({
        track: index % 2 === 0 ? "pro" : "homeowner",
        name: `QA Rate ${index}`,
        email,
        company: "Suddeco QA",
        audience_type: index % 2 === 0 ? "Contractor" : "Extension",
        pain_point: "Rate-limit test",
      }),
    );
  }
  const failures = rateResults.filter((result) => !result.success);
  checks.push({
    name: "10 registrations in 1 minute",
    status: failures.length === 0 ? "PASS" : "WARN",
    details:
      failures.length === 0
        ? "All 10 direct registrations succeeded. If stricter rate limiting is desired, backend should define the expected threshold."
        : `${failures.length} of 10 registrations failed; inspect response data.`,
    data: rateResults,
  });
}

async function expectDirectFailure(name: string, payload: Record<string, unknown>) {
  const result = await directRegister(payload, false);
  checks.push({
    name,
    status: result.success ? "FAIL" : "PASS",
    details: result.success ? "Expected request to fail validation, but it succeeded." : `Rejected as expected: ${result.error ?? result.status}`,
    data: result,
  });
}

async function directRegister(payload: Record<string, unknown>, expectJson = true) {
  if (typeof payload.email === "string" && payload.email.includes("@")) cleanupEmails.add(payload.email);
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { body: text };
  }
  return {
    ok: response.ok,
    status: response.status,
    ...(expectJson ? parsed : parsed),
  };
}

async function restGet<T>(pathAndQuery: string): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}${pathAndQuery}`, {
    headers: serviceHeaders(),
  });
  if (!response.ok) {
    throw new Error(`REST GET ${pathAndQuery} failed: ${response.status} ${await response.text()}`);
  }
  return response.json() as Promise<T>;
}

async function cleanupQaRows() {
  for (const email of cleanupEmails) {
    const encodedEmail = encodeURIComponent(email);
    await restDelete(`/rest/v1/emails_outbox?recipient_email=eq.${encodedEmail}`);
    await restDelete(`/rest/v1/webinar_registrations?email=eq.${encodedEmail}`);
  }
  await restDelete(`/rest/v1/emails_outbox?recipient_email=like.qa%2B*@suddeco.test`);
  await restDelete(`/rest/v1/webinar_registrations?email=like.qa%2B*@suddeco.test`);
}

async function restDelete(pathAndQuery: string) {
  const response = await fetch(`${SUPABASE_URL}${pathAndQuery}`, {
    method: "DELETE",
    headers: { ...serviceHeaders(), Prefer: "return=minimal" },
  });
  if (!response.ok) {
    checks.push({
      name: `Cleanup ${pathAndQuery}`,
      status: "WARN",
      details: `Cleanup request returned ${response.status}: ${await response.text()}`,
    });
  }
}

function serviceHeaders() {
  return {
    apikey: SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function writeReport() {
  const sections = (["FAIL", "WARN", "PASS"] as Status[])
    .map((status) => {
      const matching = checks.filter((check) => check.status === status);
      if (matching.length === 0) return `## ${status}\n\n_No checks._`;
      return `## ${status}\n\n${matching
        .map(
          (check) => `### ${check.name}

- Details: ${check.details}
${check.data ? `- Data:\n\n\`\`\`json\n${JSON.stringify(check.data, null, 2).slice(0, 4000)}\n\`\`\`` : ""}`,
        )
        .join("\n\n")}`;
    })
    .join("\n\n");

  const recommendations = [
    "HIGH: Fix any FAIL checks before merging demo traffic campaigns.",
    "HIGH: Keep `EMAIL_STUB_MODE` visible in the operational runbook so Saimir knows whether live sends are enabled.",
    "HIGH: Define the intended registration rate limit threshold; current test treats 10/min as acceptable unless backend says otherwise.",
    "MED: Add this E2E script to a scheduled safe smoke once the funnel stabilises.",
    "MED: Add a QA dashboard card showing pending demo registrations and stubbed emails from the outbox.",
  ];

  const report = `---
created: 2026-04-30
tags: [qa, demo-funnel, e2e, marketing]
---

# Demo Funnel E2E — /demo/pro + /demo/homeowner

## Summary

Production E2E for the live demo registration funnel:

- Browser submits through \`https://suddeco.com/demo/pro\`
- Browser submits through \`https://suddeco.com/demo/homeowner\`
- Database row check for \`webinar_registrations\`
- Outbox row check for \`emails_outbox\`
- Validation edge cases
- Duplicate handling
- Special character rendering check
- 10 registrations in one minute
- Cleanup of \`qa+...@suddeco.test\` rows

## Result Counts

- PASS: ${checks.filter((check) => check.status === "PASS").length}
- WARN: ${checks.filter((check) => check.status === "WARN").length}
- FAIL: ${checks.filter((check) => check.status === "FAIL").length}
- Screenshots: ${OUTPUT_DIR}

${sections}

## 5 Recommendations

${recommendations.map((item, index) => `${index + 1}. ${item}`).join("\n")}
`;
  await writeFile(REPORT_PATH, report);
  await writeFile(path.join(OUTPUT_DIR, "demo-funnel-e2e.json"), JSON.stringify({ checks }, null, 2));
}

function redactRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    track: row.track,
    email: row.email,
    name: row.name,
    status: row.status,
    batch_id: row.batch_id,
    created_at: row.created_at,
  };
}

function redactOutbox(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    template_code: row.template_code,
    recipient_email: row.recipient_email,
    recipient_name: row.recipient_name,
    variables: row.variables,
    rendered_subject: row.rendered_subject,
    rendered_html_preview: String(row.rendered_html ?? "").slice(0, 800),
    status: row.status,
    provider: row.provider,
    created_at: row.created_at,
  };
}

function readKeychainSecret(account: string, service: string) {
  try {
    return execFileSync("security", ["find-generic-password", "-a", account, "-s", service, "-w"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

main().catch(async (error) => {
  checks.push({
    name: "Script runtime",
    status: "FAIL",
    details: error instanceof Error ? error.message : String(error),
  });
  await writeReport();
  console.error(error);
  process.exit(1);
});
