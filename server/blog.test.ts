import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const clientDir = path.resolve(__dirname, "..", "client", "src");

describe("Blog Section", () => {
  describe("Blog Data", () => {
    it("blogArticles.ts should exist and export articles", async () => {
      const filePath = path.join(clientDir, "data", "blogArticles.ts");
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("export const blogArticles");
      expect(content).toContain("export const BLOG_CATEGORIES");
      expect(content).toContain("export interface BlogArticle");
    });

    it("should have at least 5 blog articles", () => {
      const filePath = path.join(clientDir, "data", "blogArticles.ts");
      const content = fs.readFileSync(filePath, "utf-8");
      const slugMatches = content.match(/slug:\s*"/g);
      expect(slugMatches).toBeTruthy();
      expect(slugMatches!.length).toBeGreaterThanOrEqual(5);
    });

    it("each article should have required fields", () => {
      const filePath = path.join(clientDir, "data", "blogArticles.ts");
      const content = fs.readFileSync(filePath, "utf-8");
      const requiredFields = [
        "slug",
        "title",
        "excerpt",
        "category",
        "author",
        "publishDate",
        "readTime",
        "content",
        "tags",
        "metaDescription",
      ];
      for (const field of requiredFields) {
        expect(content).toContain(`${field}:`);
      }
    });

    it("articles should cover diverse construction topics", () => {
      const filePath = path.join(clientDir, "data", "blogArticles.ts");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("AI & Technology");
      expect(content).toContain("Estimation");
      expect(content).toContain("Project Management");
      expect(content).toContain("Industry Standards");
      expect(content).toContain("Business Growth");
    });

    it("articles should reference UK construction standards", () => {
      const filePath = path.join(clientDir, "data", "blogArticles.ts");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("NRM1");
      expect(content).toContain("BCIS");
      expect(content).toContain("RICS");
    });
  });

  describe("Blog Listing Page", () => {
    it("Blog.tsx should exist and export a default component", () => {
      const filePath = path.join(clientDir, "pages", "Blog.tsx");
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("export default function Blog");
    });

    it("should include category filtering", () => {
      const filePath = path.join(clientDir, "pages", "Blog.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("BLOG_CATEGORIES");
      expect(content).toContain("activeCategory");
    });

    it("should use SEOHead component", () => {
      const filePath = path.join(clientDir, "pages", "Blog.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("SEOHead");
      expect(content).toContain("canonicalPath");
    });

    it("should link to individual articles", () => {
      const filePath = path.join(clientDir, "pages", "Blog.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("/blog/${article.slug}");
    });
  });

  describe("Blog Article Page", () => {
    it("BlogArticle.tsx should exist and export a default component", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("export default function BlogArticle");
    });

    it("should handle article not found", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Article Not Found");
      expect(content).toContain("Back to Blog");
    });

    it("should use SEOHead with article-specific metadata", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("SEOHead");
      expect(content).toContain("article.metaDescription");
    });

    it("should show related articles", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Related Articles");
    });

    it("should display article tags", () => {
      const filePath = path.join(clientDir, "pages", "BlogArticle.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("article.tags");
    });
  });

  describe("Routes and Navigation", () => {
    it("App.tsx should include /blog and /blog/:slug routes", () => {
      const filePath = path.join(clientDir, "App.tsx");
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"/blog"');
      expect(content).toContain('"/blog/:slug"');
      expect(content).toContain("import Blog");
      expect(content).toContain("import BlogArticle");
    });

    it("Navbar should include About and Blog page links", () => {
      const filePath = path.join(
        clientDir,
        "components",
        "Navbar.tsx"
      );
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("PAGE_LINKS");
      expect(content).toContain('"/about"');
      expect(content).toContain('"/blog"');
    });

    it("Footer should include Blog link", () => {
      const filePath = path.join(
        clientDir,
        "components",
        "Footer.tsx"
      );
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain('"/blog"');
      expect(content).toContain('"Blog"');
    });
  });
});
