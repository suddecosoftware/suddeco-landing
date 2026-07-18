/**
 * CookieConsent: Fixed bottom banner for UK cookie compliance
 * Persists user choice in localStorage
 * Links to Privacy Policy cookie section
 */
import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "suddeco_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash on page load
    const timer = setTimeout(() => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[9999] p-2 sm:p-4"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-xl border border-slate-700/60 bg-slate-900 p-3 shadow-2xl shadow-black/40 sm:p-6">
              <div className="flex items-start gap-2.5 sm:gap-4">
                {/* Cookie icon */}
                <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 items-center justify-center mt-0.5">
                  <Cookie className="w-5 h-5 text-amber-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="mb-1 text-sm font-bold text-white sm:mb-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    We value your privacy
                  </h3>
                  <p className="mb-3 text-xs leading-snug text-slate-400 sm:mb-4 sm:text-sm sm:leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    We use cookies to enhance your browsing experience, provide essential functionality, and analyse site usage. You can choose to accept all cookies or only essential ones.{" "}
                    <a
                      href="/privacy#cookies"
                      className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                    >
                      Read our Cookie Policy
                    </a>
                  </p>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                    <button
                      onClick={acceptAll}
                      className="min-h-11 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 sm:px-5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Accept All
                    </button>
                    <button
                      onClick={acceptEssential}
                      className="min-h-11 rounded-lg border border-slate-600 bg-transparent px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-500 hover:text-white sm:px-5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Essential Only
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={acceptEssential}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-800 hover:text-slate-300"
                  aria-label="Close cookie banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
