import { beforeEach, describe, expect, it } from "vitest";
import {
  clearAudience,
  COOKIE_DOMAIN,
  COOKIE_MAX_AGE_SECONDS,
  COOKIE_NAME,
  getAudience,
  setAudience,
} from "./audience-cookie";

let cookieStore = "";
let cookieWrites: string[] = [];

function setCookiePair(pair: string) {
  const [name, value] = pair.split("=");
  const existing = new Map(
    cookieStore
      .split("; ")
      .filter(Boolean)
      .map((cookie) => {
        const [cookieName, cookieValue] = cookie.split("=");
        return [cookieName, cookieValue];
      }),
  );
  existing.set(name, value);
  cookieStore = Array.from(existing.entries())
    .map(([cookieName, cookieValue]) => `${cookieName}=${cookieValue}`)
    .join("; ");
}

beforeEach(() => {
  cookieStore = "";
  cookieWrites = [];
  Object.defineProperty(document, "cookie", {
    configurable: true,
    get: () => cookieStore,
    set: (value: string) => {
      cookieWrites.push(value);
      const [pair] = value.split(";");
      if (value.includes("max-age=0")) {
        const [name] = pair.split("=");
        cookieStore = cookieStore
          .split("; ")
          .filter((cookie) => cookie && !cookie.startsWith(`${name}=`))
          .join("; ");
        return;
      }
      setCookiePair(pair);
    },
  });
});

describe("audience cookie helpers", () => {
  it("sets homeowner audience with the shared Suddeco cookie scope", () => {
    setAudience("homeowner");

    expect(getAudience()).toBe("homeowner");
    expect(cookieWrites.at(-1)).toContain(`${COOKIE_NAME}=homeowner`);
    expect(cookieWrites.at(-1)).toContain(`domain=${COOKIE_DOMAIN}`);
    expect(cookieWrites.at(-1)).toContain(`max-age=${COOKIE_MAX_AGE_SECONDS}`);
    expect(cookieWrites.at(-1)).toContain("SameSite=Lax");
    expect(cookieWrites.at(-1)).toContain("Secure");
    expect(COOKIE_DOMAIN.startsWith(".")).toBe(true);
  });

  it("sets contractor audience with the shared Suddeco cookie scope", () => {
    setAudience("contractor");

    expect(getAudience()).toBe("contractor");
    expect(cookieWrites.at(-1)).toContain(`${COOKIE_NAME}=contractor`);
    expect(cookieWrites.at(-1)).toContain("domain=.suddeco.com");
  });

  it("returns null when no audience cookie exists", () => {
    expect(getAudience()).toBeNull();
  });

  it("returns null when the audience value is invalid", () => {
    cookieStore = `${COOKIE_NAME}=supplier`;

    expect(getAudience()).toBeNull();
  });

  it("clears the audience cookie with the same shared cookie scope", () => {
    setAudience("homeowner");
    clearAudience();

    expect(getAudience()).toBeNull();
    expect(cookieWrites.at(-1)).toContain(`${COOKIE_NAME}=`);
    expect(cookieWrites.at(-1)).toContain("max-age=0");
    expect(cookieWrites.at(-1)).toContain("domain=.suddeco.com");
    expect(cookieWrites.at(-1)).toContain("SameSite=Lax");
    expect(cookieWrites.at(-1)).toContain("Secure");
  });
});
