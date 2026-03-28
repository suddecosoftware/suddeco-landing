import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const clientDir = path.resolve(__dirname, "..", "client", "src");
const publicDir = path.resolve(__dirname, "..", "client", "public");

describe("SEO Infrastructure", () => {
  describe("Sitemap", () => {
    it("sitemap.xml should exist in public directory", () => {
      const filePath = path.join(publicDir, "sitemap.xml");
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("sitemap should contain all core pages", () => {
      const filePath = path.join(publicDir, "sitemap.xml");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("https://www.suddeco.com/");
      expect(content).toContain("https://www.suddeco.com/about");
      expect(content).toContain("https://www.suddeco.com/blog");
      expect(content).toContain("https://www.suddeco.com/terms");
      expect(content).toContain("https://www.suddeco.com/privacy");
    });

    it("sitemap should contain all blog article URLs", () => {
      const filePath = path.join(publicDir, "sitemap.xml");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("ai-transforming-construction-estimation");
      expect(content).toContain("understanding-nrm1-guide-for-contractors");
      expect(content).toContain("digital-transformation-uk-construction-2026");
      expect(content).toContain(
        "reducing-construction-costs-with-accurate-estimation"
      );
      expect(content).toContain(
        "construction-project-management-best-practices"
      );
      expect(content).toContain(
        "growing-your-construction-business-with-technology"
      );
    });

    it("sitemap should have valid XML structure", () => {
      const filePath = path.join(publicDir, "sitemap.xml");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      );
      expect(content).toContain("</urlset>");
      expect(content).toContain("<loc>");
      expect(content).toContain("<changefreq>");
      expect(content).toContain("<priority>");
    });

    it("blog articles should have lastmod dates", () => {
      const filePath = path.join(publicDir, "sitemap.xml");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("<lastmod>2026-03-01</lastmod>");
      expect(content).toContain("<lastmod>2026-02-20</lastmod>");
    });
  });

  describe("Robots.txt", () => {
    it("robots.txt should exist in public directory", () => {
      const filePath = path.join(publicDir, "robots.txt");
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("robots.txt should reference the sitemap", () => {
      const filePath = path.join(publicDir, "robots.txt");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain(
        "Sitemap: https://www.suddeco.com/sitemap.xml"
      );
    });

    it("robots.txt should allow crawling but block API routes", () => {
      const filePath = path.join(publicDir, "robots.txt");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Allow: /");
      expect(content).toContain("Disallow: /api/");
    });
  });

  describe("Structured Data Component", () => {
    it("StructuredData.tsx should exist", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("should support article, organization, and website types", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"article"');
      expect(content).toContain('"organization"');
      expect(content).toContain('"website"');
    });

    it("article schema should include schema.org Article type", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"@context": "https://schema.org"');
      expect(content).toContain('"@type": "Article"');
      expect(content).toContain("headline");
      expect(content).toContain("datePublished");
      expect(content).toContain("publisher");
    });

    it("organization schema should include Suddeco details", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"@type": "Organization"');
      expect(content).toContain("Suddeco Ltd");
      expect(content).toContain("662 High Road");
      expect(content).toContain("N12 0NL");
    });

    it("website schema should include site name and URL", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"@type": "WebSite"');
      expect(content).toContain("https://www.suddeco.com");
    });

    it("should inject script tags with application/ld+json type", () => {
      const filePath = path.join(clientDir, "components", "StructuredData.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("application/ld+json");
      expect(content).toContain("JSON.stringify");
    });
  });

  describe("Structured Data Integration", () => {
    it("BlogArticle.tsx should use StructuredData component", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("import StructuredData");
      expect(content).toContain('type="article"');
    });

    it("Home.tsx should use Organization and WebSite structured data", () => {
      const filePath = path.join(clientDir, "pages", "Home.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("import StructuredData");
      expect(content).toContain('type="organization"');
      expect(content).toContain('type="website"');
    });
  });
});
