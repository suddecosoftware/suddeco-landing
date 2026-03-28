import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

/**
 * Tests for new features: Cookie Consent, SEO Head, and About Us page
 */

describe("Cookie Consent Banner", () => {
  it("CookieConsent component should exist and export a default component", async () => {
    const mod = await import("../client/src/components/CookieConsent");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("CookieConsent should use localStorage for persistence", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/CookieConsent.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("localStorage");
    expect(content).toContain("suddeco_cookie_consent");
  });

  it("CookieConsent should link to privacy policy cookie section", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/CookieConsent.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("/privacy#cookies");
    expect(content).toContain("Cookie Policy");
  });

  it("CookieConsent should offer Accept All and Essential Only options", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/CookieConsent.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Accept All");
    expect(content).toContain("Essential Only");
    expect(content).toContain("acceptAll");
    expect(content).toContain("acceptEssential");
  });

  it("CookieConsent should be included in App.tsx", () => {
    const appPath = path.resolve(__dirname, "../client/src/App.tsx");
    const appContent = fs.readFileSync(appPath, "utf-8");
    expect(appContent).toContain("CookieConsent");
    expect(appContent).toContain("import CookieConsent");
  });
});

describe("SEO Head Component", () => {
  it("SEOHead component should exist and export a default component", async () => {
    const mod = await import("../client/src/components/SEOHead");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("SEOHead should support title, description, and canonicalPath props", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/SEOHead.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("title: string");
    expect(content).toContain("description: string");
    expect(content).toContain("canonicalPath");
  });

  it("SEOHead should set Open Graph meta tags", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/SEOHead.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("og:title");
    expect(content).toContain("og:description");
    expect(content).toContain("og:type");
    expect(content).toContain("og:url");
  });

  it("Terms page should use SEOHead with proper meta", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/Terms.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("import SEOHead");
    expect(content).toContain("<SEOHead");
    expect(content).toContain("Terms of Service | Suddeco AI");
    expect(content).toContain('canonicalPath="/terms"');
  });

  it("Privacy page should use SEOHead with proper meta", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/Privacy.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("import SEOHead");
    expect(content).toContain("<SEOHead");
    expect(content).toContain("Privacy Policy | Suddeco AI");
    expect(content).toContain('canonicalPath="/privacy"');
  });

  it("SEOHead should use www.suddeco.com as base URL", () => {
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/SEOHead.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("https://www.suddeco.com");
  });
});

describe("About Us Page", () => {
  it("About page should exist and export a default component", async () => {
    const mod = await import("../client/src/pages/About");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("About page should contain company mission section", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Our Mission");
    expect(content).toContain("empower construction professionals");
  });

  it("About page should contain company vision section", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Our Vision");
    expect(content).toContain("industry standard");
  });

  it("About page should contain core values", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Core Values");
    expect(content).toContain("Innovation First");
    expect(content).toContain("Accuracy & Trust");
    expect(content).toContain("Customer Partnership");
    expect(content).toContain("Accessibility");
    expect(content).toContain("Integrity");
    expect(content).toContain("Speed & Efficiency");
  });

  it("About page should contain company history/timeline", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Our Story");
    expect(content).toContain("Company Founded");
    expect(content).toContain("Platform Launch");
  });

  it("About page should use SEOHead", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("import SEOHead");
    expect(content).toContain("<SEOHead");
    expect(content).toContain("About Us | Suddeco AI");
    expect(content).toContain('canonicalPath="/about"');
  });

  it("About page route should be registered in App.tsx", () => {
    const appPath = path.resolve(__dirname, "../client/src/App.tsx");
    const appContent = fs.readFileSync(appPath, "utf-8");
    expect(appContent).toContain('"/about"');
    expect(appContent).toContain("import About");
  });

  it("Footer should link to About page", () => {
    const footerPath = path.resolve(
      __dirname,
      "../client/src/components/Footer.tsx"
    );
    const footerContent = fs.readFileSync(footerPath, "utf-8");
    expect(footerContent).toContain("/about");
    expect(footerContent).toContain("About Us");
  });

  it("About page should reference NRM1, BCIS, and RICS standards", () => {
    const filePath = path.resolve(__dirname, "../client/src/pages/About.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("NRM1");
    expect(content).toContain("BCIS");
    expect(content).toContain("RICS");
  });
});
