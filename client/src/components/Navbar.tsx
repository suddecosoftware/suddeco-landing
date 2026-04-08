/**
 * Navbar: Main navigation with logo, links, and CTA buttons
 * Design: Forge & Build — glass morphism on scroll, bold amber CTAs
 * Improved: active section tracking, smooth mobile menu, better transitions
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663376220736/gssmxFFgmcNomrDZ.png";

const SECTION_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Suddeco", href: "#why-suddeco" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const PAGE_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Download", href: "/download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section
      const sections = SECTION_LINKS.map((link) =>
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
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Suddeco"
            className="h-9 md:h-10"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
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
          {/* Page links */}
          {PAGE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium tracking-wide transition-colors duration-200 text-slate-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://my.suddeco.com">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 bg-transparent"
            >
              Sign In
            </Button>
          </a>
          <a href="https://my.suddeco.com">
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/20">
              Get Started Free
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2 relative z-50"
          aria-label="Toggle menu"
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
            className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800/50 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {SECTION_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-base font-medium py-2 border-b border-slate-800/50 transition-colors ${
                    activeSection === link.href
                      ? "text-amber-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Page links */}
              {PAGE_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (SECTION_LINKS.length + index) * 0.05 }}
                  className="text-base font-medium py-2 border-b border-slate-800/50 transition-colors text-slate-300 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <a href="https://my.suddeco.com">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 bg-transparent"
                  >
                    Sign In
                  </Button>
                </a>
                <a href="https://my.suddeco.com">
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
                    Get Started Free
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
