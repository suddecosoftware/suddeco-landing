/**
 * Navbar: Main navigation with logo, links, and CTA buttons
 * Design: Forge & Build — glass morphism on scroll, bold amber CTAs
 * Improved: active section tracking, smooth mobile menu, better transitions
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Home, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Local HD vector logo (white wordmark + orange icon, for the dark nav). Replaces the
// sunset Manus CDN URL that was 404ing → broken logo. Crisp at any size/zoom.
const LOGO_URL = "/suddeco-logo-white.svg";

const PRIMARY_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const SECONDARY_LINKS = [
  { label: "Why Suddeco", href: "#why-suddeco", section: true },
  { label: "FAQ", href: "#faq", section: true },
  { label: "About", href: "/about", section: false },
  { label: "Blog", href: "/blog", section: false },
  { label: "Download", href: "/download", section: false },
];

const MOBILE_SECTION_LINKS = [
  ...PRIMARY_LINKS,
  { label: "Why Suddeco", href: "#why-suddeco" },
  { label: "FAQ", href: "#faq" },
];

const MOBILE_PAGE_LINKS = SECONDARY_LINKS.filter((link) => !link.section);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [location] = useLocation();
  // When the user is on a non-home page (e.g. /demo/pro, /about), section anchors
  // need to navigate to home first. Prefix section hrefs with "/" so the browser
  // resolves them as a full URL change instead of just appending a fragment to the
  // current path (which is what was leaving people stranded on /demo/pro).
  const isHome = location === "/" || location === "";
  const sectionHref = (frag: string) => (isHome ? frag : `/${frag}`);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section
      const sections = MOBILE_SECTION_LINKS.map((link) =>
        document.querySelector(link.href)
      ).filter(Boolean) as HTMLElement[];

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          current = `#${section.id}`;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-5 py-3.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Suddeco"
            className="h-9 md:h-10"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {PRIMARY_LINKS.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                activeSection === link.href
                  ? "text-amber-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <details className="group relative">
            <summary className="flex min-h-11 list-none items-center gap-1 rounded-md px-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 [&::-webkit-details-marker]:hidden">
              More
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 rounded-xl border border-slate-700/70 bg-slate-900/98 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {SECONDARY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.section ? sectionHref(link.href) : link.href}
                  onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden xl:flex items-center gap-2.5">
          <Button
            asChild
            className="bg-amber-500 px-5 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 hover:bg-amber-400"
          >
            <a href="https://my.suddeco.com/sign-up?utm_source=site_nav&utm_campaign=always_on&type=pro">
              Sign Up
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-transparent px-5 font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300"
          >
            <a href="/demo/pro?utm_source=site_nav&utm_campaign=always_on">
              Book a demo
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 min-h-11 min-w-11 rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-slate-800/50 bg-slate-900/98 backdrop-blur-xl xl:hidden"
          >
            <div className="container flex flex-col gap-2 py-5">
              <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Explore Suddeco
              </p>
              {MOBILE_SECTION_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex min-h-11 items-center border-b border-slate-800/50 py-2 text-base font-medium transition-colors ${
                    activeSection === link.href
                      ? "text-amber-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Page links */}
              {MOBILE_PAGE_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (MOBILE_SECTION_LINKS.length + index) * 0.05 }}
                  className="flex min-h-11 items-center border-b border-slate-800/50 py-2 text-base font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="grid gap-2 border-t border-slate-800/70 pt-4 sm:grid-cols-3">
                <a
                  href="https://suddecohomes.com/?utm_source=site_nav_mobile&utm_campaign=nav_homeowner"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700/70 px-3 text-sm font-medium text-slate-300 transition-colors hover:border-amber-400/60 hover:text-amber-300"
                >
                  <Home className="h-4 w-4" aria-hidden="true" />
                  For homeowners
                </a>
                <a
                  href="/download"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700/70 px-3 text-sm font-medium text-slate-300 transition-colors hover:border-amber-400/60 hover:text-amber-300"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Get the app
                </a>
                <a
                  href="https://my.suddeco.com/sign-in"
                  className="flex min-h-11 items-center justify-center rounded-lg border border-slate-700/70 px-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Sign in
                </a>
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  asChild
                  className="min-h-11 w-full bg-amber-500 font-semibold text-slate-900 hover:bg-amber-400 sm:min-w-40"
                >
                  <a href="https://my.suddeco.com/sign-up?utm_source=site_nav&utm_campaign=always_on&type=pro">
                    Sign Up
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="min-h-11 w-full border-slate-600 bg-transparent font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 sm:min-w-40"
                >
                  <a href="/demo/pro?utm_source=site_nav&utm_campaign=always_on">
                    Book a demo
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
