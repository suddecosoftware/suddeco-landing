/** Optional analytics is inactive until a persisted, explicit opt-in. */
export const COOKIE_CONSENT_KEY = "suddeco_cookie_consent";
const CONSENT_CHANGED_EVENT = "suddeco:cookie-consent-changed";
type CookieConsent = "accepted" | "essential";
type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: Pixel;
  loaded: boolean;
  version: string;
};
const ANALYTICS_STATE = Symbol.for("suddeco.optionalAnalytics");
type AnalyticsWindow = Window & { fbq?: Pixel; _fbq?: Pixel; [ANALYTICS_STATE]?: { started: boolean } };

export function getCookieConsent(browser: Window = window): CookieConsent | null {
  try {
    const value = browser.localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: CookieConsent, browser: Window = window): boolean {
  try {
    browser.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    browser.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    return true;
  } catch {
    // Restricted storage must not break the banner or enable analytics.
    return false;
  }
}

export function initializeConsentedAnalytics(browser: Window): () => void {
  const analyticsWindow = browser as AnalyticsWindow;
  // Share state across duplicate entry points and repeated module initialization.
  const state = analyticsWindow[ANALYTICS_STATE] ??= { started: false };
  const startIfAccepted = () => {
    if (state.started || getCookieConsent(browser) !== "accepted") return;
    state.started = true;
    try {
      if (!analyticsWindow.fbq) {
        const pixel = ((...args: unknown[]) => {
          if (pixel.callMethod) pixel.callMethod(...args);
          else pixel.queue.push(args);
        }) as Pixel;
        pixel.queue = [];
        pixel.push = pixel;
        pixel.loaded = true;
        pixel.version = "2.0";
        analyticsWindow.fbq = pixel;
        analyticsWindow._fbq ??= pixel;
        const script = browser.document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        browser.document.head.appendChild(script);
      }
      analyticsWindow.fbq("init", "966453266001638");
      analyticsWindow.fbq("track", "PageView");
    } catch {
      // A blocked optional script must not prevent the site from loading.
    }
    try {
      const query = new URLSearchParams(browser.location.search);
      const body = JSON.stringify({
        step: "landing",
        utm_source: query.get("utm_source") || undefined,
        utm_medium: query.get("utm_medium") || undefined,
        utm_campaign: query.get("utm_campaign") || undefined,
        path: browser.location.pathname,
      });
      browser.navigator.sendBeacon?.(
        "https://my.suddeco.com/api/public/funnel",
        new Blob([body], { type: "text/plain" })
      );
    } catch {
      // Best-effort analytics must never interrupt navigation.
    }
  };
  browser.addEventListener(CONSENT_CHANGED_EVENT, startIfAccepted);
  startIfAccepted();
  return () => browser.removeEventListener(CONSENT_CHANGED_EVENT, startIfAccepted);
}

if (typeof window !== "undefined") initializeConsentedAnalytics(window);
