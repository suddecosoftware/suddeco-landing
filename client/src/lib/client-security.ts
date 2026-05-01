/**
 * Client-side helpers for the marketing site.
 *
 * Real defences (rate limits, CAPTCHA, bot detection) are server-side.
 * Browser-side anti-inspection traps were removed: the viewport-delta
 * heuristic produced false positives on iPhone Safari (WhatsApp / Instagram
 * in-app browsers), where outerWidth/innerWidth diverge from the soft
 * keyboard or address bar resize. Real visitors were being kicked to a
 * "Suspicious activity" page and their localStorage/indexedDB wiped.
 *
 * What stays:
 *   - a console banner warning users about self-XSS scams.
 */

export function initClientSecurity() {
  if (!import.meta.env.PROD || typeof window === "undefined") {
    return () => {};
  }

  console.log(
    "%cSTOP!",
    "color:#ef4444;font-size:48px;font-weight:900;text-shadow:0 2px 0 #111;",
  );
  console.log(
    "%cThis is a browser feature for developers. If someone told you to copy/paste here, it's a scam.",
    "color:#f59e0b;font-size:16px;font-weight:700;",
  );

  return () => {};
}
