import assert from "node:assert/strict";
import { test } from "node:test";
import { COOKIE_CONSENT_KEY, getCookieConsent, initializeConsentedAnalytics, saveCookieConsent } from "./consentedAnalytics";

function fixture(initial: string | null = null, blockedRead = false, blockedWrite = false) {
  let stored = initial;
  const target = new EventTarget();
  const scripts: { src: string; async: boolean }[] = [];
  const beacons: { url: string; body: Blob }[] = [];
  const browser = Object.assign(target, {
    localStorage: {
      getItem(key: string) { assert.equal(key, COOKIE_CONSENT_KEY); if (blockedRead) throw new Error("blocked"); return stored; },
      setItem(key: string, value: string) { assert.equal(key, COOKIE_CONSENT_KEY); if (blockedWrite) throw new Error("blocked"); stored = value; },
    },
    location: { search: "?utm_source=fmb&utm_medium=email&utm_campaign=pilot&email=private%40example.com", pathname: "/blog/test" },
    document: { createElement: () => ({ src: "", async: false }), head: { appendChild(script: { src: string; async: boolean }) { scripts.push(script); } } },
    navigator: { sendBeacon(url: string, body: Blob) { beacons.push({ url, body }); return true; } },
  }) as unknown as Window;
  return { browser, scripts, beacons };
}

for (const choice of [null, "essential", "unexpected"]) {
  test(`no optional analytics for ${choice}`, () => {
    const f = fixture(choice);
    initializeConsentedAnalytics(f.browser);
    assert.equal(f.scripts.length, 0);
    assert.equal(f.beacons.length, 0);
  });
}

test("stored explicit opt-in sends one bounded landing event and loads the optional script", async () => {
  const f = fixture("accepted");
  initializeConsentedAnalytics(f.browser);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.beacons.length, 1);
  assert.equal(f.beacons[0].url, "https://my.suddeco.com/api/public/funnel");
  assert.equal(f.beacons[0].body.type, "text/plain");
  assert.deepEqual(JSON.parse(await f.beacons[0].body.text()), { step: "landing", utm_source: "fmb", utm_medium: "email", utm_campaign: "pilot", path: "/blog/test" });
});

test("accepting essential cookies or closing the banner never starts analytics", () => {
  const f = fixture();
  initializeConsentedAnalytics(f.browser);
  assert.equal(saveCookieConsent("essential", f.browser), true);
  assert.equal(getCookieConsent(f.browser), "essential");
  assert.equal(f.scripts.length + f.beacons.length, 0);
});

test("fresh opt-in starts immediately and repeated notifications do not duplicate events", () => {
  const f = fixture();
  const dispose = initializeConsentedAnalytics(f.browser);
  assert.equal(saveCookieConsent("accepted", f.browser), true);
  assert.equal(saveCookieConsent("accepted", f.browser), true);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.beacons.length, 1);
  dispose();
});

test("unreadable storage fails closed even with a previously accepted value", () => {
  const f = fixture("accepted", true);
  initializeConsentedAnalytics(f.browser);
  assert.equal(getCookieConsent(f.browser), null);
  assert.doesNotThrow(() => saveCookieConsent("accepted", f.browser));
  assert.equal(f.scripts.length + f.beacons.length, 0);
});

test("unwritable storage fails closed without throwing", () => {
  const f = fixture(null, false, true);
  initializeConsentedAnalytics(f.browser);
  assert.equal(saveCookieConsent("accepted", f.browser), false);
  assert.equal(f.scripts.length + f.beacons.length, 0);
});

test("optional script failure leaves the first-party event independent", () => {
  const f = fixture("accepted");
  f.browser.document.createElement = (() => { throw new Error("blocked"); }) as typeof f.browser.document.createElement;
  assert.doesNotThrow(() => initializeConsentedAnalytics(f.browser));
  assert.equal(f.beacons.length, 1);
});


test("duplicate initializers share one event for a stored opt-in", () => {
  const f = fixture("accepted");
  initializeConsentedAnalytics(f.browser);
  initializeConsentedAnalytics(f.browser);
  saveCookieConsent("accepted", f.browser);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.beacons.length, 1);
});

test("duplicate initializers before fresh opt-in still send once", () => {
  const f = fixture();
  initializeConsentedAnalytics(f.browser);
  initializeConsentedAnalytics(f.browser);
  saveCookieConsent("accepted", f.browser);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.beacons.length, 1);
});
