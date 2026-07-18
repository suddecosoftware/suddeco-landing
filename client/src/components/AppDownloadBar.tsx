/**
 * AppDownloadBar: High-visibility route into the existing app download page.
 * Kept deliberately slim so the homepage hero remains the primary conversion surface.
 */
import { ArrowRight, Smartphone } from "lucide-react";

export default function AppDownloadBar() {
  return (
    <aside className="border-y border-amber-400/20 bg-amber-500/10" aria-label="Download Suddeco">
      <div className="container flex flex-col items-center justify-center gap-2 py-2.5 text-center sm:flex-row sm:gap-4 sm:text-left">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <strong className="font-semibold text-white">Suddeco on the go.</strong>{" "}
            Keep your project close wherever you work.
          </span>
        </div>
        <a
          href="/download"
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-400/10 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          Download the app
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
