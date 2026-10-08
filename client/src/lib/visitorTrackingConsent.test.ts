import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisitorId } from "./visitorTracking";

function withBrowser(choice: string | null, cookie: string, run: (state: { reads: number; writes: string[] }) => void, blocked = false) {
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const state = { reads: 0, writes: [] as string[] };
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { getItem: () => choice } } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: {
    get cookie() { state.reads++; if (blocked) throw new Error("restricted"); return cookie; },
    set cookie(value: string) { if (blocked) throw new Error("restricted"); state.writes.push(value); },
  } });
  try { run(state); } finally {
    // Restore the test environment without changing production cookies or storage.
    Object.defineProperty(globalThis, "window", oldWindow ?? { configurable: true, value: undefined });
    Object.defineProperty(globalThis, "document", oldDocument ?? { configurable: true, value: undefined });
  }
}

for (const choice of [null, "essential", "unexpected"]) {
  test(`demo identifier remains temporary without optional consent: ${choice}`, () => {
    withBrowser(choice, "suddeco_visitor=prior-persistent-id", (state) => {
      const first = getVisitorId();
      const second = getVisitorId();
      assert.ok(first);
      assert.notEqual(first, second);
      assert.notEqual(first, "prior-persistent-id");
      assert.equal(state.reads, 0);
      assert.deepEqual(state.writes, []);
    });
  });
}

test("accepted consent reuses the existing visitor cookie", () => {
  withBrowser("accepted", "suddeco_visitor=existing-id", (state) => {
    assert.equal(getVisitorId(), "existing-id");
    assert.equal(state.reads, 1);
    assert.deepEqual(state.writes, []);
  });
});

test("accepted consent creates the existing secure 180-day cookie", () => {
  withBrowser("accepted", "", (state) => {
    const id = getVisitorId();
    assert.deepEqual(state.writes, [`suddeco_visitor=${encodeURIComponent(id)}; max-age=15552000; path=/; SameSite=Lax; Secure`]);
  });
});

test("restricted cookies still return an identifier for the demo request", () => {
  withBrowser("accepted", "", () => {
    assert.ok(getVisitorId());
  }, true);
});

test("server-side use returns an identifier without browser access", () => {
  assert.ok(getVisitorId());
});
