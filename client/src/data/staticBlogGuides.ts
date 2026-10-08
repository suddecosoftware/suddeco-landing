import type { BlogArticle } from "./blogArticles";

export type BlogListingEntry = Pick<
  BlogArticle,
  "slug" | "title" | "excerpt" | "category" | "coverGradient"
> & {
  publishDate?: string;
  readTime?: string;
  staticPage?: true;
};

// Existing static guides are served as HTML. Listing them separately preserves
// their full-page navigation and avoids creating empty SPA article routes.
// Dates and reading times are omitted when they have not been established.
export const staticBlogGuides: BlogListingEntry[] = [
  {
    "slug": "ai-construction-estimating-software-uk",
    "title": "AI Construction Estimating Software UK: 2026 Guide",
    "excerpt": "What AI construction estimating software does in the UK, how drawing analysis produces priced quantities, and what to check before you rely on it.",
    "category": "AI & Technology",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "bill-of-quantities-explained",
    "title": "Bill of Quantities Explained: A Practical UK Guide",
    "excerpt": "What a bill of quantities is, how it is structured, who prepares it and how contractors price one. A practical UK guide for builders and surveyors.",
    "category": "Industry Standards",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "building-quote-template",
    "title": "Building Quote Template: How to Quote a Job (UK)",
    "excerpt": "What a building quote template must contain, how to price labour and materials without guessing, and how to present a quote that wins UK work.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "construction-estimating-software-buyers-guide",
    "title": "Construction Estimating Software: A UK Buyer's Guide",
    "excerpt": "What construction estimating software does, how it prices work from drawings, and how to compare UK options before you buy. A practical buyer's guide.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "construction-estimating-software-for-small-business",
    "title": "Construction Estimating Software for Small Business",
    "excerpt": "Construction estimating software for small business: what a one-to-ten person UK firm actually needs, what to pay, and what to ignore.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "construction-takeoff-software-guide",
    "title": "Construction Takeoff Software: How Takeoffs Work",
    "excerpt": "How construction takeoff software measures quantities from drawings, what to check in a takeoff, and where errors creep in. A practical UK guide.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "electrical-contractor-software",
    "title": "Electrical Contractor Software: A UK Buyer's Guide",
    "excerpt": "What electrical contractor software should do for a UK firm — pricing, variations, testing records and handover — and how to choose without overbuying.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "estimating-software-for-construction",
    "title": "Estimating Software for Construction: How to Choose",
    "excerpt": "A practical way to choose estimating software for construction: the four tool types, how to match them to your work, and what to test in a demo.",
    "category": "Estimation",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  },
  {
    "slug": "scope-of-works-template",
    "title": "Scope of Works Template: What to Include (UK)",
    "excerpt": "What a scope of works template should contain, section by section, with the inclusions and exclusions that prevent disputes. A UK guide.",
    "category": "Project Management",
    "coverGradient": "from-amber-600/20 to-orange-600/20",
    "staticPage": true
  }
];
