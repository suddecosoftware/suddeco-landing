import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      fullName: "John Smith",
      email: "john@example.com",
      phone: "+44 20 1234 5678",
      company: "Smith Construction Ltd",
      message: "I'd like to learn more about Suddeco for my construction projects.",
    });

    expect(result).toEqual({
      success: true,
      message: "Thank you for your message. We'll be in touch shortly.",
    });
  });

  it("accepts submission without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      fullName: "Jane Doe",
      email: "jane@example.com",
      message: "I want to try Suddeco for my next project.",
    });

    expect(result).toEqual({
      success: true,
      message: "Thank you for your message. We'll be in touch shortly.",
    });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        fullName: "Test User",
        email: "not-an-email",
        message: "This should fail validation.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with too short name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        fullName: "A",
        email: "test@example.com",
        message: "This should fail validation.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with too short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        fullName: "Test User",
        email: "test@example.com",
        message: "Short",
      })
    ).rejects.toThrow();
  });
});
