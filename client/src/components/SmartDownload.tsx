/**
 * SmartDownload — one device-aware "Download the app" call to action.
 *  - iPhone/iPad → App Store (when live) else opens the mobile web app.
 *  - Android     → Google Play (when live) else opens the mobile web app.
 *  - Desktop/Mac → a modal with a QR code to continue on your phone + the
 *                  desktop (Mac) app + the web app. No dead ends.
 * Fill STORE.ios / STORE.android the moment the native apps are public and the
 * mobile buttons deep-link straight to the store.
 */
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Smartphone, Apple, Monitor, X, ArrowRight } from "lucide-react";

// Public store URLs — empty until the native apps are live. Until then the CTA
// opens the mobile web app so it always does something useful.
const STORE = {
  ios: "", // e.g. https://apps.apple.com/gb/app/suddeco/idXXXXXXXXX
  android: "", // e.g. https://play.google.com/store/apps/details?id=com.suddeco.app
  webApp: "https://my.suddeco.com",
  desktop: "/download",
};

type Platform = "ios" | "android" | "mac" | "desktop";

function detect(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  const touchMac =
    /Macintosh/i.test(ua) &&
    typeof document !== "undefined" &&
    "ontouchend" in document;
  if (/iPhone|iPad|iPod/i.test(ua) || touchMac) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  return "desktop";
}

export default function SmartDownload({
  className = "",
  label = "Download the app",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState("");
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => setPlatform(detect()), []);
  useEffect(() => {
    QRCode.toDataURL(STORE.webApp, {
      margin: 1,
      width: 240,
      color: { dark: "#0F172A", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  function handleClick() {
    if (platform === "ios") {
      window.location.href = STORE.ios || STORE.webApp;
      return;
    }
    if (platform === "android") {
      window.location.href = STORE.android || STORE.webApp;
      return;
    }
    setOpen(true); // desktop / mac → QR + desktop app
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        <Smartphone className="h-4 w-4" aria-hidden="true" />
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Download Suddeco"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="ml-auto block text-slate-400 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">
                Get Suddeco on your phone
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Point your phone camera at the code to open Suddeco — or grab the
                desktop app below.
              </p>
              {qr ? (
                <img
                  src={qr}
                  alt="Scan to open Suddeco on your phone"
                  className="mx-auto my-5 h-44 w-44 rounded-xl bg-white p-2"
                  width={176}
                  height={176}
                />
              ) : (
                <div className="mx-auto my-5 h-44 w-44 animate-pulse rounded-xl bg-slate-800" />
              )}
              <div className="grid gap-2">
                <a
                  href={STORE.desktop}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                >
                  <Apple className="h-4 w-4" aria-hidden="true" /> Download for Mac
                </a>
                <a
                  href={STORE.webApp}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  <Monitor className="h-4 w-4" aria-hidden="true" /> Open the web app
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                iOS &amp; Android apps landing soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
