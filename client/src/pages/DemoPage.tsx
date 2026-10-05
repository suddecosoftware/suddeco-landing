import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Home, Mail, Users } from "lucide-react";
import Footer from "@/components/Footer";
import LearnSuddeco from "@/components/LearnSuddeco";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getVisitorId, linkVisitorEmail, trackPageView } from "@/lib/visitorTracking";

type Track = "pro" | "homeowner";

const BOOKING_URL = "https://calendly.com/suddeco-sales/30min";
const WEBINAR_REGISTER_URL = "https://my.suddeco.com/api/public/webinar-register";
// DEMO_BOOKING_PIPELINE_V1 — the app's booking intake (persists the lead,
// emails the team, creates the calendar event when connected).
const DEMO_BOOKING_URL = "https://my.suddeco.com/api/public/demo-booking";

const trackConfig = {
  pro: {
    eyebrow: "Live Suddeco Pro demo",
    title: "See how Suddeco helps organise scopes, quotes and project work.",
    description:
      "A 30-minute live walkthrough for contractors, developers, architects and QSs. Bring a real project, drawing, quote or pricing problem.",
    stat: "Bring your project questions",
    audienceLabel: "Audience type",
    audiencePlaceholder: "Contractor, developer, architect, QS...",
    cta: "Reserve a Pro demo seat",
    icon: Users,
    canonical: "/demo/pro",
  },
  homeowner: {
    eyebrow: "Live Suddeco Homes demo",
    title: "Understand your project before you choose a builder.",
    description:
      "A homeowner-friendly session showing how to compare quotes, clarify the scope and prepare better questions for professionals.",
    stat: "Clear scopes before work starts",
    audienceLabel: "Project type",
    audiencePlaceholder: "Kitchen, bathroom, loft, extension...",
    cta: "Reserve a Homeowner demo seat",
    icon: Home,
    canonical: "/demo/homeowner",
  },
} satisfies Record<Track, {
  eyebrow: string;
  title: string;
  description: string;
  stat: string;
  audienceLabel: string;
  audiencePlaceholder: string;
  cta: string;
  icon: typeof Users;
  canonical: string;
}>;

const proofTiles = [
  {
    title: "Project scope",
    value: "Bring a brief",
    body: "Identify the rooms, work and decisions you want to discuss.",
  },
  {
    title: "Drawing review",
    value: "Bring drawings",
    body: "Use your plans to ask what is included and what still needs clarification.",
  },
  {
    title: "Quote comparison",
    value: "Bring questions",
    body: "Discuss allowances, exclusions and how to compare the same scope of work.",
  },
];

const preparationTips = [
  "Have a drawing, quote or short description of your project ready.",
  "List the decisions you need to make before appointing a professional.",
  "Tell us which parts of the scope or quote need clarification.",
];

function getTrack(): Track {
  if (typeof window === "undefined") return "pro";
  return window.location.pathname.includes("homeowner") ? "homeowner" : "pro";
}

export default function DemoPage() {
  const track = getTrack();
  const config = trackConfig[track];
  const Icon = config.icon;
  const [submitted, setSubmitted] = useState(false);
  const [submissionWarning, setSubmissionWarning] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    company: "",
    audienceType: "",
    painPoint: "",
  });

  const title = track === "pro"
    ? "Suddeco Pro Demo — Live Project Walkthrough"
    : "Suddeco Homes Demo — Compare Builders and Project Costs";
  const description = track === "pro"
    ? "Reserve a seat for the live Suddeco Pro demo. See real drawings, priced scopes, UK construction data and project intelligence."
    : "Reserve a homeowner demo seat and learn how Suddeco helps compare quotes, scope projects and prepare questions for professionals.";

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams({
      utm_source: "demo-page",
      utm_campaign: "round3-webinar",
      utm_content: track,
    });
    return `${BOOKING_URL}?${params.toString()}`;
  }, [track]);

  useEffect(() => {
    trackPageView({ event: "demo_view", track });
  }, [track]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmissionWarning(null);
    linkVisitorEmail(form.email);
    const visitorUuid = getVisitorId();
    const payload = {
      ...form,
      visitorUuid,
      track,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    // Keep the existing local draft as a best-effort fallback. Browser storage
    // may be unavailable or full; it must never block the online request.
    try {
      const saved = JSON.parse(localStorage.getItem("suddeco_demo_registrations") || "[]");
      localStorage.setItem("suddeco_demo_registrations", JSON.stringify([
        ...(Array.isArray(saved) ? saved : []),
        payload,
      ]));
    } catch {
      // The form retains the entered details for retry.
    }
    // Preserve both intake calls, but only a persisted booking receipt confirms
    // the enquiry. A legacy webinar response alone cannot prove delivery.
    const appBooking = fetch(DEMO_BOOKING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        audience: form.audienceType || undefined,
        preferredTime:
          [form.preferredDate, form.preferredTime].filter(Boolean).join(" ") ||
          undefined,
        painPoint: form.painPoint || undefined,
        address: form.address || undefined,
        visitorUuid,
        track,
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("booking intake failed");
        const result = await response.json();
        if (result.success !== true || !Number.isInteger(result.submissionId) || result.submissionId <= 0) {
          throw new Error("booking persistence not confirmed");
        }
        return result;
      });
    void fetch(WEBINAR_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => undefined);
    try {
      await appBooking;
      setSubmitted(true);
    } catch {
      setSubmissionWarning("We could not confirm your request online. Your details are still in this form. Please try again or email sales@suddeco.com; if you already received a confirmation, include it in your email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead title={title} description={description} canonicalPath={config.canonical} />
      <TopBar />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-slate-800/70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,183,26,0.18),transparent_36%),linear-gradient(135deg,#0F172A_0%,#111827_56%,#050816_100%)]" />
          <div className="container relative grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200">
                <Icon className="h-4 w-4" />
                {config.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {config.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {config.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#reserve">
                  <Button className="h-12 rounded-xl bg-amber-400 px-7 text-base font-bold text-slate-950 hover:bg-amber-300">
                    {config.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-slate-500 px-7 text-base text-white hover:bg-white/10"
                  onClick={() => window.open(bookingHref, "_blank", "noopener,noreferrer")}
                >
                  Open booking calendar
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {proofTiles.map((tile) => (
                  <div key={tile.title} className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">{tile.title}</p>
                    <p className="mt-1 text-2xl font-black text-amber-300">{tile.value}</p>
                    <p className="mt-2 text-sm leading-5 text-slate-300">{tile.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-4 shadow-2xl shadow-black/30">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/E6RYdflWWfk?rel=0&modestbranding=1"
                  title="Suddeco — drawings to a priced scope of works"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-900 p-4">
                  <BarChart3 className="mb-3 h-5 w-5 text-amber-300" />
                  <p className="text-sm text-slate-300">{config.stat}</p>
                </div>
                <div className="rounded-2xl bg-slate-900 p-4">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" />
                  <p className="text-sm text-slate-300">Real screens, no slideware.</p>
                </div>
                <div className="rounded-2xl bg-slate-900 p-4">
                  <Mail className="mb-3 h-5 w-5 text-sky-300" />
                  <p className="text-sm text-slate-300">Questions welcome: sales@suddeco.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reserve" className="container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Prepare for your demo
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Request your {track === "pro" ? "Pro" : "Homeowner"} demo.
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Share your project questions and preferred time. We will follow up to confirm the session details.
            </p>
            <div className="mt-8 space-y-4">
              {preparationTips.map((tip) => (
                <p key={tip} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-slate-300">
                  {tip}
                </p>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-xl">
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" />
                <h3 className="mt-5 text-2xl font-black text-white">You're on the list.</h3>
                <p className="mt-3 text-slate-300">
                  We logged your interest for the {track === "pro" ? "Pro" : "Homeowner"} demo track. Use the calendar link if you want to pick a slot now.
                </p>
                <Button
                  className="mt-6 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300"
                  onClick={() => window.open(bookingHref, "_blank", "noopener,noreferrer")}
                >
                  Open booking calendar
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {submissionWarning && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-left text-sm text-amber-100"
                  >
                    {submissionWarning}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm font-medium text-slate-300">
                    Name
                    <Input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                  </label>
                  <label className="space-y-1.5 text-sm font-medium text-slate-300">
                    Email
                    <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                  </label>
                </div>
                <label className="block space-y-1.5 text-sm font-medium text-slate-300">
                  Phone number
                  <Input required type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                </label>
                <label className="block space-y-1.5 text-sm font-medium text-slate-300">
                  Address <span className="text-slate-500">(optional)</span>
                  <Input type="text" autoComplete="street-address" placeholder="Address (optional)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                </label>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-400">
                    Tell us your preferred day and time. We will confirm availability, or follow up to arrange a time if you leave these blank.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1.5 text-sm font-medium text-slate-300">
                      Preferred date
                      <Input
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="h-12 border-slate-700 bg-slate-900 text-white [color-scheme:dark]"
                      />
                    </label>
                    <label className="space-y-1.5 text-sm font-medium text-slate-300">
                      Preferred time
                      <select
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="h-12 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-white"
                      >
                        <option value="">Preferred time (UK)</option>
                        {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <label className="block space-y-1.5 text-sm font-medium text-slate-300">
                  Company <span className="text-slate-500">(optional)</span>
                  <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                </label>
                <label className="block space-y-1.5 text-sm font-medium text-slate-300">
                  {config.audienceLabel}
                  <Input required placeholder={config.audiencePlaceholder} value={form.audienceType} onChange={(e) => setForm({ ...form, audienceType: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                </label>
                <label className="block space-y-1.5 text-sm font-medium text-slate-300">
                  What do you want the demo to solve?
                  <Textarea required placeholder="What do you want the demo to solve?" value={form.painPoint} onChange={(e) => setForm({ ...form, painPoint: e.target.value })} className="min-h-28 border-slate-700 bg-slate-900 text-white" />
                </label>
                <Button type="submit" disabled={submitting} aria-busy={submitting} className="h-12 w-full rounded-xl bg-amber-400 text-base font-black text-slate-950 hover:bg-amber-300">
                  {submitting ? "Sending your request…" : config.cta}
                </Button>
                <p className="text-center text-xs text-slate-500">
                  Prefer email? Write to sales@suddeco.com.
                </p>
              </div>
            )}
          </form>
        </section>
        <LearnSuddeco />
      </main>
      <Footer />
    </div>
  );
}
