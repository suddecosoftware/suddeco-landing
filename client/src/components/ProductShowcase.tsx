/**
 * ProductShowcase: Auto-cycling animated product demo
 * Design: Forge & Build — browser chrome frame with crossfade transitions
 * Cycles through platform screens to simulate a video walkthrough
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

const SCREENS = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/how-it-works-ai-kH3Y5tuRskmdqopMTsiLQS.webp",
    label: "Intelligent Extraction",
    description: "AI identifies rooms, dimensions, and structural elements",
  },
  {
    src: "/images/suddeco-takeoff-hero.webp",
    label: "AI Drawing Analysis",
    description: "Upload construction drawings and AI detects rooms, shells, and measurements",
  },
  {
    src: "/images/suddeco-scope-hero.webp",
    label: "Costed Scope of Works",
    description: "AI generates 800+ tasks with UK labour and materials pricing per room",
  },
  {
    src: "/images/suddeco-dashboard-hero.webp",
    label: "Project Dashboard",
    description: "Track contract value, floor breakdown, and project progress at a glance",
  },
  {
    src: "/images/suddeco-ai-assistant.webp",
    label: "AI Assistant & Analytics",
    description: "Chat with your project data, get cost breakdowns, and spot missing items",
  },
  {
    src: "/images/suddeco-areas.webp",
    label: "Areas & Rooms",
    description: "View all detected rooms with floor areas, wall areas, and shell boundaries",
  },
  {
    src: "/images/suddeco-integrations.webp",
    label: "Integrations Hub",
    description: "Connect Xero, QuickBooks, Google Drive, Slack, Zoom and 15+ tools",
  },
];

export default function ProductShowcase() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const INTERVAL = 4000; // 4 seconds per screen

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SCREENS.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + (100 / (INTERVAL / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPlaying, next]);

  return (
    <section
      id="demo"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        background: "linear-gradient(180deg, #0F172A 0%, #0C1220 50%, #0F172A 100%)",
      }}
    >
      <div className="container" style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: "0.75rem",
            }}
          >
            PRODUCT DEMO
          </p>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            See Suddeco AI in Action
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#94A3B8", maxWidth: "36rem", margin: "0 auto" }}>
            Watch how our platform transforms construction drawings into detailed,
            costed scopes of work in minutes.
          </p>
        </div>

        {/* Browser frame with animated screens */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative" }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2"
            style={{
              background: "rgba(30, 41, 59, 0.9)",
              backdropFilter: "blur(12px)",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              border: "1px solid rgba(71, 85, 105, 0.5)",
              borderBottom: "none",
              padding: "0.75rem 1rem",
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
            {/* Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#F59E0B",
                cursor: "pointer",
              }}
            >
              {isPlaying ? (
                <Pause style={{ width: "0.75rem", height: "0.75rem" }} />
              ) : (
                <Play style={{ width: "0.75rem", height: "0.75rem" }} />
              )}
            </button>
          </div>

          {/* Screen area */}
          <div
            className="relative overflow-hidden"
            style={{
              borderBottomLeftRadius: "0.75rem",
              borderBottomRightRadius: "0.75rem",
              border: "1px solid rgba(71, 85, 105, 0.5)",
              borderTop: "none",
              aspectRatio: "16/9",
              background: "#0B1121",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={SCREENS[current].src}
                alt={SCREENS[current].label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Current screen label overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
              style={{
                padding: "2rem 1.5rem 1.25rem",
                background: "linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)",
              }}
            >
              <div>
                <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  {SCREENS[current].label}
                </p>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>
                  {SCREENS[current].description}
                </p>
              </div>
              <span style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                {current + 1} / {SCREENS.length}
              </span>
            </div>
          </div>

          {/* Progress dots + bar */}
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "1.25rem" }}>
            {SCREENS.map((screen, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setProgress(0);
                }}
                className="flex items-center gap-2"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 0",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: i === current ? "3rem" : "0.5rem",
                    height: "0.25rem",
                    borderRadius: "9999px",
                    background: i === current ? "rgba(245, 158, 11, 0.2)" : "rgba(100, 116, 139, 0.3)",
                    overflow: "hidden",
                    transition: "width 0.3s ease",
                  }}
                >
                  {i === current && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: `${progress}%`,
                        background: "#F59E0B",
                        borderRadius: "9999px",
                        transition: "width 0.05s linear",
                      }}
                    />
                  )}
                  {i !== current && i < current && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(245, 158, 11, 0.5)",
                        borderRadius: "9999px",
                      }}
                    />
                  )}
                </div>
                {i === current && (
                  <span style={{ fontSize: "0.7rem", color: "#F59E0B", fontWeight: 600 }}>
                    {screen.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Ambient glow */}
          <div
            className="absolute rounded-3xl blur-3xl -z-10"
            style={{ inset: "-3rem", background: "rgba(245, 158, 11, 0.03)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
