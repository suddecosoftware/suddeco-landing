import { describe, it, expect } from "vitest";

/**
 * Tests for Terms of Service and Privacy Policy pages
 * Validates that the legal page components exist and contain required content
 */

describe("Legal Pages", () => {
  it("Terms page file should exist and export a default component", async () => {
    const termsModule = await import("../client/src/pages/Terms");
    expect(termsModule.default).toBeDefined();
    expect(typeof termsModule.default).toBe("function");
  });

  it("Privacy page file should exist and export a default component", async () => {
    const privacyModule = await import("../client/src/pages/Privacy");
    expect(privacyModule.default).toBeDefined();
    expect(typeof privacyModule.default).toBe("function");
  });

  it("App routes should include /terms and /privacy paths", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const appPath = path.resolve(__dirname, "../client/src/App.tsx");
    const appContent = fs.readFileSync(appPath, "utf-8");

    expect(appContent).toContain('"/terms"');
    expect(appContent).toContain('"/privacy"');
    expect(appContent).toContain("import Terms");
    expect(appContent).toContain("import Privacy");
  });

  it("Footer should link to /terms and /privacy", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const footerPath = path.resolve(
      __dirname,
      "../client/src/components/Footer.tsx"
    );
    const footerContent = fs.readFileSync(footerPath, "utf-8");

    expect(footerContent).toContain("/privacy");
    expect(footerContent).toContain("/terms");
    expect(footerContent).toContain("Privacy Policy");
    expect(footerContent).toContain("Terms of Service");
  });

  it("Footer should display correct company address", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const footerPath = path.resolve(
      __dirname,
      "../client/src/components/Footer.tsx"
    );
    const footerContent = fs.readFileSync(footerPath, "utf-8");

    expect(footerContent).toContain("662 High Road");
    expect(footerContent).toContain("London N12 0NL");
    expect(footerContent).not.toContain("60 Eynham Road");
    expect(footerContent).not.toContain("W12 0HA");
  });

  it("TrustedBy should not contain FMB", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const trustedByPath = path.resolve(
      __dirname,
      "../client/src/components/TrustedBy.tsx"
    );
    const trustedByContent = fs.readFileSync(trustedByPath, "utf-8");

    expect(trustedByContent).not.toContain('"FMB"');
    expect(trustedByContent).toContain('"RICS"');
    expect(trustedByContent).toContain('"CIOB"');
    expect(trustedByContent).toContain('"RIBA"');
    expect(trustedByContent).toContain('"ICE"');
    expect(trustedByContent).toContain('"CIAT"');
  });

  it("Terms page should contain key legal sections", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const termsPath = path.resolve(
      __dirname,
      "../client/src/pages/Terms.tsx"
    );
    const termsContent = fs.readFileSync(termsPath, "utf-8");

    // Key sections that must exist
    expect(termsContent).toContain("Definitions and Interpretation");
    expect(termsContent).toContain("Intellectual Property Rights");
    expect(termsContent).toContain("Limitation of Liability");
    expect(termsContent).toContain("Governing Law");
    expect(termsContent).toContain("662 High Road");
    expect(termsContent).toContain("Berne Convention");
    expect(termsContent).toContain("WIPO Copyright Treaty");
    expect(termsContent).toContain("TRIPS");
  });

  it("Privacy page should contain UK GDPR compliance sections", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const privacyPath = path.resolve(
      __dirname,
      "../client/src/pages/Privacy.tsx"
    );
    const privacyContent = fs.readFileSync(privacyPath, "utf-8");

    // Key GDPR compliance sections
    expect(privacyContent).toContain("Data Controller");
    expect(privacyContent).toContain("UK GDPR");
    expect(privacyContent).toContain("Data Protection Act 2018");
    expect(privacyContent).toContain("Lawful Basis for Processing");
    expect(privacyContent).toContain("Article 6(1)");
    expect(privacyContent).toContain("Data Retention");
    expect(privacyContent).toContain("Your Data Protection Rights");
    expect(privacyContent).toContain("Cookie Policy");
    expect(privacyContent).toContain("Information Commissioner");
    expect(privacyContent).toContain("ico.org.uk");
    expect(privacyContent).toContain("662 High Road");
  });
});
