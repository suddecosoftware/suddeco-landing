// Static articles retain their existing bundle. Keep its section links usable
// after rendering on an article or product page rather than the homepage.
(() => {
  const homepageSections = new Set([
    "#features", "#how-it-works", "#why-suddeco", "#pricing", "#faq", "#contact",
  ]);

  const repairSectionLinks = () => {
    if (window.location.pathname === "/") return;
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const fragment = link.getAttribute("href");
      if (homepageSections.has(fragment) && !document.getElementById(fragment.slice(1))) {
        link.setAttribute("href", `/${fragment}`);
      }
    });
  };

  // The preserved bundle can render after the HTML has loaded.
  const observer = new MutationObserver(repairSectionLinks);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"],
  });
  repairSectionLinks();
})();
