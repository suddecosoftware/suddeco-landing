/**
 * Hero: Cinematic hero with side-by-side layout
 * Design: Forge & Build — massive headline, amber accents, dramatic depth
 * Layout: Text left, product dashboard right (stacks on mobile)
 * Requested by Gary — ATF product demo beside H1/H2
 */
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/hero-bg-AnykWVa2EiH2NNgPBsDyqc.webp";

const DEMO_DASHBOARD =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/demo-dashboard-cqe2vDta2ETnHGvTQpwc9S.webp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ marginTop: "-72px", paddingTop: "72px" }}>
      {/* Background image with very heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.15 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(15, 23, 42, 0.92)" }} />
      </div>

      {/* Subtle amber glow accent */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl z-[1]" style={{ background: "rgba(245, 158, 11, 0.06)" }} />

      {/* Hero content — two-column layout */}
      <div className="container relative z-10" style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left column — text content */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div style={{ marginBottom: "2rem" }}>
              <span
                className="inline-flex items-center gap-2 rounded-full"
                style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  color: "#FCD34D",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                <span
                  className="animate-pulse"
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    background: "#FBBF24",
                    display: "inline-block",
                  }}
                />
                AI-Powered Construction Management
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "1.75rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Streamline Your{" "}
              <span style={{ color: "#FBBF24" }}>
                Construction Projects
              </span>{" "}
              with Intelligence
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: "#E2E8F0",
                marginBottom: "2.5rem",
                maxWidth: "36rem",
                textShadow: "0 1px 10px rgba(0,0,0,0.3)",
              }}
            >
              Upload your construction drawings and let our AI extract detailed
              measurements, generate costed scopes of work, and manage your
              entire project pipeline — all from one powerful platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://my.suddeco.com" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    background: "#F59E0B",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
                    transition: "all 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#FBBF24";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F59E0B";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Start Free Trial
                  <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              </a>
              <a href="#demo" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <Play style={{ width: "1.25rem", height: "1.25rem" }} />
                  See How It Works
                </button>
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
              style={{ marginTop: "2.5rem", fontSize: "0.875rem", color: "#CBD5E1" }}
            >
              {["No credit card required", "100m\u00B2 free allowance", "Cancel anytime"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <svg style={{ width: "1.25rem", height: "1.25rem", color: "#FBBF24", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — product dashboard mockup */}
          <motion.div
            className="flex-1 min-w-0 w-full lg:w-auto"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Browser chrome frame */}
            <div
              className="flex items-center gap-2"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderBottom: "none",
                padding: "0.75rem",
              }}
            >
              <div className="flex gap-1.5">
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(239, 68, 68, 0.7)" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(234, 179, 8, 0.7)" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(34, 197, 94, 0.7)" }} />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-2 justify-center"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    borderRadius: "0.375rem",
                    padding: "0.25rem 1rem",
                    fontSize: "0.75rem",
                    color: "#64748B",
                    maxWidth: "16rem",
                    width: "100%",
                  }}
                >
                  <svg style={{ width: "0.75rem", height: "0.75rem", color: "#22C55E" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  my.suddeco.com
                </div>
              </div>
            </div>

            {/* Dashboard image */}
            <div
              className="relative overflow-hidden"
              style={{
                borderBottomLeftRadius: "0.75rem",
                borderBottomRightRadius: "0.75rem",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderTop: "none",
              }}
            >
              <img
                src={DEMO_DASHBOARD}
                alt="Suddeco AI Dashboard - AI-powered construction drawing analysis with scope of works"
                className="w-full"
                style={{ display: "block" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: "4rem", background: "linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)" }}
              />
            </div>

            {/* Ambient glow */}
            <div
              className="absolute rounded-3xl blur-3xl -z-10"
              style={{ inset: "-2rem", background: "rgba(245, 158, 11, 0.04)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
