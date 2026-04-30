const VISITOR_COOKIE = "suddeco_visitor";
const MAX_AGE = 60 * 60 * 24 * 180;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${MAX_AGE}; path=/; SameSite=Lax; Secure`;
}

function createVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getVisitorId(): string {
  const existing = readCookie(VISITOR_COOKIE);
  if (existing) return existing;
  const next = createVisitorId();
  writeCookie(VISITOR_COOKIE, next);
  return next;
}

export function trackPageView(extra: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const payload = {
    visitorUuid: getVisitorId(),
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer || null,
    ts: new Date().toISOString(),
    ...extra,
  };
  try {
    navigator.sendBeacon?.("/api/track", JSON.stringify(payload));
  } catch {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }
}

export function linkVisitorEmail(email: string): void {
  if (!email || typeof window === "undefined") return;
  const payload = {
    visitorUuid: getVisitorId(),
    email,
    path: window.location.pathname,
    ts: new Date().toISOString(),
  };
  fetch("/api/track/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => undefined);
}
