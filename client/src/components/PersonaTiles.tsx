import { Building2, HardHat, Home, ArrowRight } from "lucide-react";
import { setAudience, type Audience } from "@/lib/audience-cookie";
import { trackPersonaChosen } from "@/lib/persona-analytics";

const DESTINATIONS: Record<Audience, string> = {
  homeowner: "https://suddecohomes.com/?source=landing&audience=homeowner",
  contractor: "https://my.suddeco.com/register?audience=contractor&source=landing",
};

type PersonaTilesProps = {
  navigate?: (url: string) => void;
};

type Tile = {
  audience: Audience;
  label: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: string;
  Icon: typeof Home;
  AccentIcon: typeof Building2;
};

const tiles: Tile[] = [
  {
    audience: "homeowner",
    label: "Choose homeowner or property developer path",
    eyebrow: "Homeowner / Property Developer",
    headline: "I'm planning a home project",
    subhead: "Find verified professionals, get AI-priced scopes of work, and manage your project end-to-end.",
    cta: "Browse Marketplace",
    Icon: Home,
    AccentIcon: Building2,
  },
  {
    audience: "contractor",
    label: "Choose contractor or professional path",
    eyebrow: "Contractor / Professional",
    headline: "I'm a professional",
    subhead: "Win work, generate AI scopes in 60 seconds, manage projects with deep UK construction intelligence.",
    cta: "Sign Up Free",
    Icon: HardHat,
    AccentIcon: HardHat,
  },
];

export default function PersonaTiles({ navigate = (url) => { window.location.href = url; } }: PersonaTilesProps) {
  const chooseAudience = (audience: Audience) => {
    setAudience(audience);
    trackPersonaChosen(audience);
    navigate(DESTINATIONS[audience]);
  };

  return (
    <section
      aria-labelledby="audience-choice-title"
      className="relative overflow-hidden bg-slate-950"
      style={{ marginTop: "-72px", paddingTop: "72px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_34%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex max-w-full rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-amber-200 sm:text-sm sm:tracking-[0.14em]">
            Choose your Suddeco path
          </p>
          <h1
            id="audience-choice-title"
            className="mx-auto max-w-[19rem] whitespace-normal text-3xl font-extrabold leading-tight text-white sm:max-w-full sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="block sm:inline">What are you here</span>{" "}
            <span className="block sm:inline">to build?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            We will take you to the right Suddeco experience and remember it for next time.
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[calc(100vw-2rem)] grid-cols-1 gap-5 lg:max-w-none lg:grid-cols-2 lg:gap-6">
          {tiles.map(({ audience, label, eyebrow, headline, subhead, cta, Icon, AccentIcon }) => (
            <button
              key={audience}
              type="button"
              role="button"
              aria-label={label}
              onClick={() => chooseAudience(audience)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  chooseAudience(audience);
                }
              }}
              className="group min-h-[17rem] w-full max-w-full overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/80 p-6 text-left shadow-2xl shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/70 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 sm:p-8"
            >
              <div className="flex min-h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <AccentIcon className="h-8 w-8 text-slate-700 transition-colors group-hover:text-amber-300" aria-hidden="true" />
                </div>

                <p className="mt-6 break-words text-sm font-semibold uppercase tracking-[0.08em] text-amber-300 sm:tracking-[0.12em]">{eyebrow}</p>
                <h2 className="mt-3 break-words text-xl font-bold leading-tight text-white sm:text-3xl">{headline}</h2>
                <p className="mt-4 max-w-xl break-words text-base leading-7 text-slate-300">{subhead}</p>

                <span className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-base font-bold text-slate-950 transition-colors group-hover:bg-amber-300 sm:w-fit">
                  {cta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
