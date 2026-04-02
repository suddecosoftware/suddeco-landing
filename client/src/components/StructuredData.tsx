/**
 * StructuredData: Injects JSON-LD schema.org structured data into the page head
 * Supports Article, Organization, and WebSite schemas
 * Uses useEffect to manage script tags in document head
 */
import { useEffect } from "react";

interface ArticleStructuredDataProps {
  type: "article";
  title: string;
  description: string;
  author: string;
  publishDate: string;
  slug: string;
  tags: string[];
  category: string;
}

interface OrganizationStructuredDataProps {
  type: "organization";
}

interface WebSiteStructuredDataProps {
  type: "website";
}

type StructuredDataProps =
  | ArticleStructuredDataProps
  | OrganizationStructuredDataProps
  | WebSiteStructuredDataProps;

const SCRIPT_ID_PREFIX = "structured-data-";

function getArticleSchema(props: ArticleStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.title,
    description: props.description,
    author: {
      "@type": "Organization",
      name: "Suddeco Ltd",
      url: "https://www.suddeco.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Suddeco Ltd",
      url: "https://www.suddeco.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.suddeco.com/suddeco-logo.png",
      },
    },
    datePublished: props.publishDate,
    dateModified: props.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.suddeco.com/blog/${props.slug}`,
    },
    articleSection: props.category,
    keywords: props.tags.join(", "),
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  };
}

function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Suddeco Ltd",
    url: "https://www.suddeco.com",
    logo: "https://www.suddeco.com/suddeco-logo.png",
    description:
      "AI-powered construction management platform. Streamlining estimation, project management, and collaboration for UK construction professionals.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "662 High Road",
      addressLocality: "London",
      postalCode: "N12 0NL",
      addressCountry: "GB",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-20-3633-8086",
        contactType: "sales",
        email: "sales@suddeco.com",
        availableLanguage: "English",
      },
    ],
    sameAs: [],
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    knowsAbout: [
      "Construction Estimation",
      "AI in Construction",
      "NRM1",
      "Quantity Surveying",
      "Project Management",
      "Building Information Modelling",
    ],
  };
}

function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Suddeco AI",
    alternateName: "Suddeco",
    url: "https://www.suddeco.com",
    description:
      "AI-powered construction management platform for estimation, project management, and collaboration.",
    publisher: {
      "@type": "Organization",
      name: "Suddeco Ltd",
    },
    inLanguage: "en-GB",
  };
}

export default function StructuredData(props: StructuredDataProps) {
  useEffect(() => {
    const scriptId = `${SCRIPT_ID_PREFIX}${props.type}`;

    // Remove existing script if present
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    let schema: object;
    switch (props.type) {
      case "article":
        schema = getArticleSchema(props);
        break;
      case "organization":
        schema = getOrganizationSchema();
        break;
      case "website":
        schema = getWebSiteSchema();
        break;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [props]);

  return null;
}
