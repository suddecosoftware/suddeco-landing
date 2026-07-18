/**
 * Learn Suddeco — YouTube channel video section (@suddeco).
 * A featured 16:9 player + a clickable grid of "how it works" videos + a
 * channel CTA. Real product screens so users understand + learn the software.
 * Reusable: drop <LearnSuddeco /> on any marketing page. Add videos to the
 * VIDEOS array (id = the youtube watch?v= id). Channel: youtube.com/@suddeco.
 */
import { useState } from "react";

const CHANNEL_URL = "https://www.youtube.com/@suddeco";
// Channel uploads playlist (UC… → UU…) so the featured player auto-continues
// into the rest of the channel — "watch one, it shows the others".
const UPLOADS_PLAYLIST = "UUs9Yr-GKBejhY9O70UAll_g";

type Vid = { id: string; title: string; blurb: string };

const VIDEOS: Vid[] = [
  {
    id: "RRfzXv5DeIc",
    title: "Create a project in 23 seconds",
    blurb: "Start to project in under half a minute.",
  },
  {
    id: "77ohuqBap9Y",
    title: "Automatic takeoff",
    blurb: "Suddeco measures your drawings for you.",
  },
  {
    id: "E6RYdflWWfk",
    title: "Drawings → priced scope of works",
    blurb: "From a PDF pack to a costed scope, automatically.",
  },
  {
    id: "fPbb2Ldsaxk",
    title: "Loft conversion priced live",
    blurb: "A full loft measured, scoped and priced on screen.",
  },
  {
    id: "Y2kpGahxF9k",
    title: "£500k refurbishment priced live",
    blurb: "A whole-house refurb priced end to end.",
  },
];

export default function LearnSuddeco() {
  const [active, setActive] = useState<Vid>(VIDEOS[0]);

  return (
    <section className="w-full bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
          Learn Suddeco
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          See it work — real screens, no slideware
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-slate-300 sm:text-base">
          Short, real walkthroughs of the software — how to create a project,
          auto-measure drawings, and turn a drawing pack into a priced scope.
        </p>

        {/* Featured player — plays the selected video, then continues through
            the channel's uploads playlist. */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              key={active.id}
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0&modestbranding=1&list=${UPLOADS_PLAYLIST}`}
              title={active.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video grid — click a card to load it above; thumbnails come straight
            from YouTube so there's no asset to host. */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {VIDEOS.map((v) => {
            const isActive = v.id === active.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(v)}
                className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-colors ${
                  isActive
                    ? "border-amber-400 bg-slate-900"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-600"
                }`}
                aria-pressed={isActive}
              >
                <span className="relative block w-full" style={{ paddingTop: "56.25%" }}>
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {isActive && (
                    <span className="absolute inset-0 ring-2 ring-amber-400" />
                  )}
                </span>
                <span className="flex flex-1 flex-col gap-0.5 p-2.5">
                  <span className="text-xs font-semibold leading-tight text-white">
                    {v.title}
                  </span>
                  <span className="hidden text-[11px] leading-snug text-slate-400 sm:block">
                    {v.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch more on YouTube
          </a>
          <span className="text-sm text-slate-400">@suddeco · new walkthroughs weekly</span>
        </div>
      </div>
    </section>
  );
}
