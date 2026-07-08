/**
 * SplitHero — "Option 3: Split-audience" hero.
 * Renders ABOVE the existing <Hero />. Purely additive — does not replace anything.
 *
 * Layout:
 *   - A centred band on top with the moat H1, a PRIMARY "Try for free" CTA,
 *     a GHOST "Book a demo" CTA, and "No card needed" microcopy.
 *   - A 50/50 split below (stacks on mobile):
 *       LEFT  = HOMEOWNER (warm amber wash), whole panel + button clickable.
 *       RIGHT = BUILDER / PRO (cool steel/navy wash), whole panel + button clickable.
 *
 * Brand sourced from the live repo: navy #0F172A / #0B1120, amber #F59E0B / #FBBF24,
 * Plus Jakarta Sans headings, Outfit body, Sora mono — all already loaded in index.html.
 * No external font/script/CDN introduced.
 */
import { ArrowRight, Play, CheckCircle2, Check } from "lucide-react";

const HOMEOWNER_URL =
  "https://my.suddeco.com/register?type=homeowner&utm_source=splithero&utm_campaign=try_free";
const PRO_URL =
  "https://my.suddeco.com/register?type=pro&utm_source=splithero&utm_campaign=try_free";
const PRIMARY_URL =
  "https://my.suddeco.com/register?utm_source=splithero&utm_campaign=try_free";
const DEMO_URL = "/demo/pro";

const HEAD_FONT = "'Plus Jakarta Sans', sans-serif";
const MONO_FONT = "'Sora', ui-monospace, 'SFMono-Regular', monospace";

/** Shared "Start free →" pill. Rendered as a styled span (not a nested <a>/<button>)
 * so the enclosing panel <a> stays valid, accessible interactive markup. */
function SideCTA({ tone }: { tone: "home" | "pro" }) {
  const color = tone === "home" ? "#FCD34D" : "#93C5FD";
  const border =
    tone === "home" ? "rgba(245, 158, 11, 0.45)" : "rgba(147, 197, 253, 0.4)";
  const bg =
    tone === "home" ? "rgba(245, 158, 11, 0.14)" : "rgba(96, 165, 250, 0.12)";
  return (
    <span
      className="split-hero-cta"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.7rem 1.4rem",
        borderRadius: "0.6rem",
        fontFamily: HEAD_FONT,
        fontWeight: 700,
        fontSize: "1rem",
        color,
        background: bg,
        border: `1px solid ${border}`,
        transition: "all 0.2s",
      }}
    >
      Start free
      <ArrowRight
        aria-hidden="true"
        className="split-hero-arrow"
        style={{ width: "1.1rem", height: "1.1rem", transition: "transform 0.2s" }}
      />
    </span>
  );
}

function ValueItem({ tone, children }: { tone: "home" | "pro"; children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.95rem", color: "#E2E8F0" }}>
      <Check
        aria-hidden="true"
        style={{
          width: "1.1rem",
          height: "1.1rem",
          flex: "none",
          marginTop: "0.15rem",
          color: tone === "home" ? "#FBBF24" : "#60A5FA",
        }}
      />
      <span>{children}</span>
    </li>
  );
}

export default function SplitHero() {
  return (
    <section
      aria-label="Choose your path — homeowner or builder"
      style={{ position: "relative", background: "#0F172A" }}
    >
      {/* Scoped hover/focus styles — panels + CTAs. Additive, prefixed to avoid clashes. */}
      <style>{`
        .split-hero-panel { transition: background 0.3s, filter 0.3s; outline: none; }
        .split-hero-panel:hover .split-hero-cta,
        .split-hero-panel:focus-visible .split-hero-cta { filter: brightness(1.12); }
        .split-hero-panel:hover .split-hero-arrow,
        .split-hero-panel:focus-visible .split-hero-arrow { transform: translateX(4px); }
        .split-hero-panel:focus-visible { box-shadow: inset 0 0 0 2px rgba(251,191,36,0.7); }
        .split-hero-home:hover {
          background:
            radial-gradient(600px 320px at 30% 0%, rgba(245,158,11,0.20), transparent 65%),
            linear-gradient(180deg,#182338,#101c34);
        }
        .split-hero-pro:hover { filter: brightness(1.06); }
        .split-hero-btn { transition: all 0.2s; }
      `}</style>

      {/* ---------- CENTRED BAND ---------- */}
      <div style={{ position: "relative", zIndex: 20, textAlign: "center", padding: "4rem 0 2.5rem" }}>
        <div className="container">
          <div style={{ marginBottom: "1.25rem" }}>
            <span
              className="inline-flex items-center gap-2 rounded-full"
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#FCD34D",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontFamily: MONO_FONT,
              }}
            >
              <span
                className="animate-pulse"
                style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#FBBF24", display: "inline-block" }}
              />
              AI FOR CONSTRUCTION
            </span>
          </div>

          <h1
            style={{
              fontFamily: HEAD_FONT,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "0 auto 1.125rem",
              maxWidth: "20ch",
            }}
          >
            One AI. It prices the build and{" "}
            <span style={{ color: "#FBBF24" }}>designs it to match.</span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "#CBD5E1",
              maxWidth: "40rem",
              margin: "0 auto 1.75rem",
            }}
          >
            From an architect&rsquo;s drawing to a priced scope and a finished design &mdash;
            every design is anchored to a real price.
          </p>

          <div className="flex flex-col sm:flex-row" style={{ alignItems: "center", justifyContent: "center", gap: "0.875rem", marginBottom: "0.75rem" }}>
            <a href={PRIMARY_URL} className="w-full sm:w-auto">
              <button
                type="button"
                className="split-hero-btn w-full sm:w-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem 2.125rem",
                  background: "#F59E0B",
                  color: "#0F172A",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 26px rgba(245, 158, 11, 0.3)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FBBF24";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 14px 32px rgba(245, 158, 11, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F59E0B";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 26px rgba(245, 158, 11, 0.3)";
                }}
              >
                Try for free
                <ArrowRight aria-hidden="true" style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
            </a>
            <a href={DEMO_URL} className="w-full sm:w-auto">
              <button
                type="button"
                className="split-hero-btn w-full sm:w-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem 2.125rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <Play aria-hidden="true" style={{ width: "1.125rem", height: "1.125rem" }} />
                Book a demo
              </button>
            </a>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#94A3B8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4375rem",
            }}
          >
            <CheckCircle2 aria-hidden="true" style={{ width: "1rem", height: "1rem", color: "#FBBF24" }} />
            No card needed
          </p>
        </div>
      </div>

      {/* ---------- THE SPLIT ---------- */}
      <div
        className="split-hero-split"
        style={{
          display: "grid",
          position: "relative",
          borderTop: "1px solid rgba(71, 85, 105, 0.35)",
        }}
      >
        <style>{`
          .split-hero-split { grid-template-columns: 1fr 1fr; }
          .split-hero-split::before {
            content: ""; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px;
            background: linear-gradient(180deg, transparent, rgba(148,163,184,0.35), transparent);
            z-index: 3; pointer-events: none;
          }
          @media (max-width: 820px) {
            .split-hero-split { grid-template-columns: 1fr; }
            .split-hero-split::before { display: none; }
            .split-hero-panel + .split-hero-panel { border-top: 1px solid rgba(71,85,105,0.35); }
          }
        `}</style>

        {/* LEFT — HOMEOWNER */}
        <a
          href={HOMEOWNER_URL}
          className="split-hero-panel split-hero-home"
          aria-label="I'm a homeowner — design your project and get a priced quote. Start free."
          style={{
            position: "relative",
            padding: "3.25rem 0 3.625rem",
            overflow: "hidden",
            textDecoration: "none",
            color: "inherit",
            display: "block",
            background:
              "radial-gradient(600px 300px at 30% 0%, rgba(245,158,11,0.14), transparent 65%), linear-gradient(180deg,#15213c,#0f1a30)",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 1.875rem", position: "relative", zIndex: 2 }}>
            <div
              style={{
                fontFamily: MONO_FONT,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#94A3B8",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "2.375rem",
                  height: "2.375rem",
                  borderRadius: "0.6875rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1875rem",
                  background: "rgba(245, 158, 11, 0.16)",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                }}
              >
                &#127968;
              </span>
              I&rsquo;m a homeowner
            </div>
            <h2
              style={{
                fontFamily: HEAD_FONT,
                fontSize: "1.7rem",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Design your project and get a priced quote.
            </h2>
            <p style={{ fontSize: "1rem", color: "#CBD5E1", marginBottom: "1.25rem", maxWidth: "30rem" }}>
              Upload your plans or start from scratch. See your rooms come to life, then get a
              real, itemised quote you can trust.
            </p>
            <ul style={{ listStyle: "none", margin: "0 0 1.625rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <ValueItem tone="home">AI design renders of your rooms</ValueItem>
              <ValueItem tone="home">An honest, itemised price</ValueItem>
              <ValueItem tone="home">Matched with trusted local builders</ValueItem>
            </ul>
            <SideCTA tone="home" />
          </div>
        </a>

        {/* RIGHT — BUILDER / PRO */}
        <a
          href={PRO_URL}
          className="split-hero-panel split-hero-pro"
          aria-label="I'm a builder or pro — price takeoffs, design, and win more jobs. Start free."
          style={{
            position: "relative",
            padding: "3.25rem 0 3.625rem",
            overflow: "hidden",
            textDecoration: "none",
            color: "inherit",
            display: "block",
            background:
              "radial-gradient(600px 300px at 70% 0%, rgba(59,130,246,0.10), transparent 65%), linear-gradient(180deg,#0d1830,#0a1226)",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 1.875rem", position: "relative", zIndex: 2 }}>
            <div
              style={{
                fontFamily: MONO_FONT,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#94A3B8",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "2.375rem",
                  height: "2.375rem",
                  borderRadius: "0.6875rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1875rem",
                  background: "rgba(96, 165, 250, 0.14)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                }}
              >
                &#128736;
              </span>
              I&rsquo;m a builder / pro
            </div>
            <h2
              style={{
                fontFamily: HEAD_FONT,
                fontSize: "1.7rem",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Price takeoffs, design, and win more jobs.
            </h2>
            <p style={{ fontSize: "1rem", color: "#CBD5E1", marginBottom: "1.25rem", maxWidth: "30rem" }}>
              Drop in a drawing and get a full priced scope of works in minutes &mdash; then send a
              designed, professional quote that closes.
            </p>
            <ul style={{ listStyle: "none", margin: "0 0 1.625rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <ValueItem tone="pro">Automated priced takeoffs from drawings</ValueItem>
              <ValueItem tone="pro">AI design studio to wow clients</ValueItem>
              <ValueItem tone="pro">Win rate up on every bid you send</ValueItem>
            </ul>
            <SideCTA tone="pro" />
          </div>
        </a>
      </div>
    </section>
  );
}
