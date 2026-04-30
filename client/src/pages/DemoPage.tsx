import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Home, Mail, Users } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getVisitorId, linkVisitorEmail, trackPageView } from "@/lib/visitorTracking";

type Track = "pro" | "homeowner";

const BOOKING_URL = "https://calendly.com/suddeco-sales/30min";
const WEBINAR_REGISTER_URL = "https://hvpsxeytbvbytyjudtyb.supabase.co/functions/v1/webinar-register";

const trackConfig = {
  pro: {
    eyebrow: "Live Suddeco Pro demo",
    title: "See how UK contractors price, manage and win work weeks faster.",
    description:
      "A 30-minute live walkthrough for contractors, developers, architects and QSs. Bring a real project, drawing, quote or pricing problem.",
    stat: "61,725 scope tasks priced",
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
      "A homeowner-friendly session showing how to compare quotes, understand real costs and find verified professionals with better questions.",
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
    title: "Live project proof",
    value: "£233k",
    body: "A real refurbishment scope with 837 priced tasks and 22 stages.",
  },
  {
    title: "TakeOff speed",
    value: "20 rooms",
    body: "Architectural drawings converted into structured project data.",
  },
  {
    title: "Decision clarity",
    value: "41%",
    body: "Market comparison turns guesswork into a client-ready conversation.",
  },
];

const quotes = [
  "It turns a messy drawing pack into something I can actually price.",
  "The value is not just speed. It is seeing the whole project in one place.",
  "I stopped arguing with spreadsheets and started showing the client the evidence.",
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
  const [position, setPosition] = useState(7);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    audienceType: "",
    painPoint: "",
  });

  const title = track === "pro"
    ? "Suddeco Pro Demo — Live Construction AI Walkthrough"
    : "Suddeco Homes Demo — Compare Builders and Project Costs";
  const description = track === "pro"
    ? "Reserve a seat for the live Suddeco Pro demo. See real drawings, priced scopes, UK construction data and project intelligence."
    : "Reserve a homeowner demo seat and learn how Suddeco helps compare quotes, scope projects and find verified professionals.";

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
    const seen = Number(localStorage.getItem(`suddeco_demo_count_${track}`) || "7");
    setPosition(Math.max(1, Math.min(10, seen)));
  }, [track]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    linkVisitorEmail(form.email);
    const visitorUuid = getVisitorId();
    const payload = {
      ...form,
      visitorUuid,
      track,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    const saved = JSON.parse(localStorage.getItem("suddeco_demo_registrations") || "[]");
    localStorage.setItem("suddeco_demo_registrations", JSON.stringify([...saved, payload]));
    fetch(WEBINAR_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("registration capture failed");
        return response.json();
      })
      .then((result) => {
        if (typeof result.position === "number") {
          setPosition(Math.max(1, Math.min(10, result.position)));
          localStorage.setItem(`suddeco_demo_count_${track}`, String(Math.max(1, Math.min(10, result.position))));
        }
      })
      .catch(() => {
        localStorage.setItem(`suddeco_demo_count_${track}`, String(Math.min(10, position + 1)));
        setPosition((p) => Math.min(10, p + 1));
      });
    setSubmitted(true);
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
                <a href={bookingHref}>
                  <Button variant="outline" className="h-12 rounded-xl border-slate-500 px-7 text-base text-white hover:bg-white/10">
                    Open booking calendar
                  </Button>
                </a>
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
              <video
                className="aspect-video w-full rounded-2xl border border-slate-800 object-cover"
                src="https://rachel-api.suddeco.com/share/90f45633a29e6999f0e56c6f82a590464ca748e6/suddeco-demo.mp4"
                controls
                playsInline
                poster="https://suddecohomes.com/assets/projects/kitchen1.jpg"
              />
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
              Register then batch
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              You're #{position} of 10 for the next {track === "pro" ? "Pro" : "Homeowner"} demo.
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              We send the live link as soon as the track reaches 10 registrations. That keeps the session useful, focused and worth Saimir's live time.
            </p>
            <div className="mt-8 space-y-4">
              {quotes.map((quote) => (
                <blockquote key={quote} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-slate-300">
                  "{quote}"
                </blockquote>
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
                <a href={bookingHref} className="mt-6 inline-flex">
                  <Button className="rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300">
                    Open booking calendar
                  </Button>
                </a>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                  <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                </div>
                <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                <Input required placeholder={config.audiencePlaceholder} value={form.audienceType} onChange={(e) => setForm({ ...form, audienceType: e.target.value })} className="h-12 border-slate-700 bg-slate-900 text-white" />
                <Textarea required placeholder="What do you want the demo to solve?" value={form.painPoint} onChange={(e) => setForm({ ...form, painPoint: e.target.value })} className="min-h-28 border-slate-700 bg-slate-900 text-white" />
                <Button type="submit" className="h-12 w-full rounded-xl bg-amber-400 text-base font-black text-slate-950 hover:bg-amber-300">
                  {config.cta}
                </Button>
                <p className="text-center text-xs text-slate-500">
                  Prefer email? Write to sales@suddeco.com.
                </p>
              </div>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
