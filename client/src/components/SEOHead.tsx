/**
 * SEOHead: Sets page-specific <title> and <meta> tags
 * Uses useEffect to update document head on mount
 * Restores defaults on unmount
 */
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

const DEFAULT_TITLE = "Suddeco AI - Construction Management Platform";
const DEFAULT_DESCRIPTION =
  "Streamline your construction projects with AI-powered drawing analysis, costed scopes of work, and intelligent project management. Cancel anytime. No contracts.";
const BASE_URL = "https://www.suddeco.com";

export default function SEOHead({ title, description, canonicalPath }: SEOHeadProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // Set or update canonical link
    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonical) {
        canonical.href = `${BASE_URL}${canonicalPath}`;
      } else {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        canonical.href = `${BASE_URL}${canonicalPath}`;
        document.head.appendChild(canonical);
      }
    }

    // Set Open Graph tags
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:type", "website");
    if (canonicalPath) {
      setMetaProperty("og:url", `${BASE_URL}${canonicalPath}`);
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
      const metaDescEl = document.querySelector('meta[name="description"]');
      if (metaDescEl) {
        metaDescEl.setAttribute("content", DEFAULT_DESCRIPTION);
      }
      // Remove canonical on unmount
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.remove();
      }
      // Remove OG tags
      removeMetaProperty("og:title");
      removeMetaProperty("og:description");
      removeMetaProperty("og:type");
      removeMetaProperty("og:url");
    };
  }, [title, description, canonicalPath]);

  return null;
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (el) {
    el.setAttribute("content", content);
  } else {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  }
}

function removeMetaProperty(property: string) {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) el.remove();
}
