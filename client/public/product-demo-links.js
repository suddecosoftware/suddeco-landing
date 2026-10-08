// These static product pages retain a legacy bundle that renders after the HTML.
// Keep the existing signup/homeowner actions and expose the current Pro demo.
(() => {
  const product = window.location.pathname.replace(/\/$/, "").slice(1);
  if (!["construction-estimating-software", "takeoff-software"].includes(product)) return;

  const placements = [
    ["client/src/components/seo/ProSoftwarePage.tsx:118", "hero"],
    ["client/src/components/seo/ProSoftwarePage.tsx:275", "bottom"],
  ];
  const ensureDemoLinks = () => {
    for (const [location, placement] of placements) {
      const signup = document.querySelector(`main a[data-loc="${location}"]`);
      const group = signup?.parentElement;
      if (!group || group.querySelector(`[data-product-demo="${placement}"]`)) continue;
      const styleReference = group.querySelector('a[href="https://suddecohomes.com"]');
      if (!styleReference) continue;
      const link = document.createElement("a");
      link.className = styleReference.className;
      link.style.cssText = styleReference.style.cssText;
      link.dataset.productDemo = placement;
      const params = new URLSearchParams({
        utm_source: product,
        utm_medium: "website",
        utm_campaign: "always_on",
        utm_content: placement,
      });
      link.href = `/demo/pro?${params}`;
      link.textContent = "Book a Pro demo";
      group.append(link);
    }
  };
  const observer = new MutationObserver(ensureDemoLinks);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureDemoLinks();
})();
