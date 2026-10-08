// Standalone guides retain their earlier rendering bundle. Keep their existing
// project action and expose the current professional demo after it renders.
(() => {
  const guide = window.location.pathname.replace(/\/$/, "").split("/").pop();
  const guides = new Set([
    "ai-construction-estimating-software-uk",
    "bill-of-quantities-explained",
    "building-quote-template",
    "construction-estimating-software-buyers-guide",
    "construction-estimating-software-for-small-business",
    "construction-takeoff-software-guide",
    "electrical-contractor-software",
    "estimating-software-for-construction",
    "scope-of-works-template",
  ]);
  if (!window.location.pathname.startsWith("/blog/") || !guides.has(guide)) return;

  const description = "See how Suddeco turns drawing quantities into a costed scope of works. Start a project or book a Pro demo to discuss your estimating workflow.";
  const ensureGuideActions = () => {
    const section = document.querySelector('section[data-loc="client/src/pages/BlogArticle.tsx:228"]');
    const paragraph = section?.querySelector("p");
    if (paragraph && paragraph.textContent !== description) paragraph.textContent = description;
    const signup = section?.querySelector('a[href="https://my.suddeco.com"]');
    if (signup) {
      if (signup.style.display !== "inline-flex") signup.style.display = "inline-flex";
      if (signup.style.margin !== "0.5rem") signup.style.margin = "0.5rem";
      if (signup.style.verticalAlign !== "middle") signup.style.verticalAlign = "middle";
      if (!section.querySelector("a[data-guide-demo]")) {
        const link = document.createElement("a");
        link.dataset.guideDemo = "bottom";
        link.className = "inline-flex items-center justify-center rounded-md border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-white font-semibold px-8 py-3 text-base transition-all";
        link.style.cssText = "margin:0.5rem;vertical-align:middle";
        link.href = `/demo/pro?${new URLSearchParams({ utm_source: guide, utm_medium: "website", utm_campaign: "always_on" })}`;
        link.textContent = "Book a Pro demo";
        signup.after(link);
      }
    }

    // Two guides linked to this legacy Article Not Found destination.
    const estimatingDestination = guide === "construction-estimating-software-buyers-guide"
      ? "/blog/ai-construction-estimating-software-uk"
      : "/construction-estimating-software";
    document.querySelectorAll('main a[href="/blog/construction-estimating-software-uk"]').forEach((link) => {
      link.setAttribute("href", estimatingDestination);
    });
  };
  const observer = new MutationObserver(ensureGuideActions);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureGuideActions();
})();
