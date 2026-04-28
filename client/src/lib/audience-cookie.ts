export const COOKIE_NAME = "suddeco_audience";
export const COOKIE_DOMAIN = ".suddeco.com";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type Audience = "homeowner" | "contractor";

const cookieAttributes = `max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax; Secure`;

export function setAudience(value: Audience): void {
  document.cookie = `${COOKIE_NAME}=${value}; ${cookieAttributes}`;
}

export function getAudience(): Audience | null {
  const match = document.cookie.match(new RegExp(`(^|; )${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[2]);
  return value === "homeowner" || value === "contractor" ? value : null;
}

export function clearAudience(): void {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax; Secure`;
}
