/**
 * AppDownloadBar: high-visibility, device-smart "Download the app" bar directly
 * under the nav — the first thing a visitor sees. On a phone it opens the app
 * (store when live, web app until then); on desktop it shows a QR to scan +
 * the desktop app. Logic lives in <SmartDownload/>.
 */
import { Smartphone } from "lucide-react";
import SmartDownload from "@/components/SmartDownload";

export default function AppDownloadBar() {
  return (
    <aside
      className="border-y border-amber-400/20 bg-amber-500/10"
      aria-label="Download Suddeco"
    >
      <div className="container flex flex-col items-center justify-center gap-3 py-2.5 text-center sm:flex-row sm:gap-4 sm:text-left">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <strong className="font-semibold text-white">Get the Suddeco app.</strong>{" "}
            Your projects in your pocket — download in one tap.
          </span>
        </div>
        <SmartDownload
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-amber-500 px-4 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          label="Download the app"
        />
      </div>
    </aside>
  );
}
