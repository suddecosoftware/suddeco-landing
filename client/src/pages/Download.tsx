import { motion } from "framer-motion";
import { Apple, Monitor, Smartphone, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/**
 * /download — picks the right installer for the visitor's platform.
 *
 * - Detects platform from `navigator.userAgent` (macOS / Windows / Linux /
 *   iOS / Android), with macOS as the default since that's where most early
 *   users land today.
 * - Pulls the latest release from the public `suddecosoftware/suddeco-review`
 *   GitHub Releases API and matches assets by file extension. Falls back to
 *   a sensible static URL when the API is unreachable so the page never
 *   shows a broken button.
 * - Mobile fallback is intentionally a "Coming soon" card — App Store /
 *   Play Store distribution is gated on signed builds (see suddeco-review
 *   PR #N5 follow-ups).
 *
 * Copy stays user-facing only ("faster, offline, native"). Internal cost
 * benefits are not surfaced here by design.
 */

type DesktopPlatform = "mac" | "windows" | "linux";
type MobilePlatform = "ios" | "android";
type DetectedPlatform = DesktopPlatform | MobilePlatform | "unknown";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface LatestRelease {
  tag_name: string;
  name: string | null;
  assets: ReleaseAsset[];
}

const REPO_RELEASES_API =
  "https://api.github.com/repos/suddecosoftware/suddeco-review/releases/latest";

const FALLBACK_URLS: Record<DesktopPlatform, string> = {
  mac: "/downloads/SudDeco_1.0.2_x64.dmg",
  windows: "/downloads/SudDeco_1.0.2_x64-setup.exe",
  linux: "/downloads/SudDeco_1.0.2_amd64.AppImage",
};

const PLATFORM_LABELS: Record<DesktopPlatform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
};

function detectPlatform(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  // Order matters — iOS Safari includes "Mac" in its UA, so check mobile first.
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Mac/i.test(ua)) return "mac";
  if (/Windows/i.test(ua)) return "windows";
  if (/Linux/i.test(ua)) return "linux";
  return "unknown";
}

function pickAsset(assets: ReleaseAsset[], platform: DesktopPlatform): ReleaseAsset | null {
  const ext: Record<DesktopPlatform, RegExp> = {
    mac: /\.dmg$/i,
    windows: /\.(msi|exe)$/i,
    linux: /\.(AppImage|deb)$/i,
  };
  return assets.find((a) => ext[platform].test(a.name)) || null;
}

export default function Download() {
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const platform = useMemo(detectPlatform, []);

  useEffect(() => {
    let cancelled = false;
    fetch(REPO_RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setRelease(data);
      })
      .catch(() => {
        /* offline or rate limited — fall back to static URLs below */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isMobile = platform === "ios" || platform === "android";
  const desktopPlatform: DesktopPlatform = isMobile || platform === "unknown" ? "mac" : platform;

  const asset = release ? pickAsset(release.assets, desktopPlatform) : null;
  const downloadUrl = asset?.browser_download_url ?? FALLBACK_URLS[desktopPlatform];
  const versionLabel = release?.tag_name ? release.tag_name.replace(/^desktop-v/i, "v") : "v1.0.2";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F59E0B", marginBottom: "1rem" }}>
            DESKTOP APP
          </p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem" }}>
            Run SudDeco on your machine
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#94A3B8", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            Faster, works offline, native performance. Signs in with your existing my.suddeco.com account.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", padding: "3rem", maxWidth: "30rem", margin: "0 auto 2rem" }}
        >
          <div style={{ width: "80px", height: "80px", borderRadius: "1rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            {desktopPlatform === "mac" ? <Apple size={40} color="#FFF" /> : <Monitor size={40} color="#FFF" />}
          </div>
          <h2 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            SudDeco for {PLATFORM_LABELS[desktopPlatform]}
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginBottom: "0.25rem" }}>{versionLabel}</p>
          {desktopPlatform === "mac" && (
            <p style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "2rem" }}>Requires macOS 10.15 or later</p>
          )}
          {desktopPlatform === "windows" && (
            <p style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "2rem" }}>Windows 10 / 11, 64-bit</p>
          )}
          {desktopPlatform === "linux" && (
            <p style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "2rem" }}>AppImage — runs on most modern distros</p>
          )}

          {isMobile ? (
            <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginBottom: "0" }}>
              Mobile apps are coming soon. The desktop app works on macOS, Windows, and Linux.
            </p>
          ) : loading ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", color: "#94A3B8" }}>
              <Loader2 size={18} className="animate-spin" /> Looking up the latest release…
            </span>
          ) : (
            <a
              href={downloadUrl}
              download
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#0F172A", fontWeight: 700, fontSize: "1.1rem", borderRadius: "0.75rem", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 15px rgba(245,158,11,0.3)" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(245,158,11,0.4)"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 15px rgba(245,158,11,0.3)"; }}
            >
              {desktopPlatform === "mac" ? <Apple size={20} /> : <Monitor size={20} />}
              Download for {PLATFORM_LABELS[desktopPlatform]}
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}
        >
          {(["mac", "windows", "linux"] as DesktopPlatform[])
            .filter((p) => p !== desktopPlatform)
            .map((p) => {
              const altAsset = release ? pickAsset(release.assets, p) : null;
              const altUrl = altAsset?.browser_download_url ?? FALLBACK_URLS[p];
              return (
                <a
                  key={p}
                  href={altUrl}
                  download
                  style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.06)", padding: "0.75rem 1.25rem", textDecoration: "none", color: "#94A3B8", fontSize: "0.9rem" }}
                >
                  Also for {PLATFORM_LABELS[p]}
                </a>
              );
            })}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.06)", padding: "0.75rem 1.25rem", color: "#64748B", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <Smartphone size={16} /> iOS / Android — coming soon
          </div>
        </motion.div>

        <div style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "left" }}>
          <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>What you get</h3>
          <ul style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: "2", listStyle: "none", padding: 0 }}>
            <li>✅ Upload and analyse construction drawings with AI</li>
            <li>✅ Auto-detect rooms, measurements, and building elements</li>
            <li>✅ Generate costed scopes of work with UK pricing</li>
            <li>✅ Export to Excel and branded PDF reports</li>
            <li>✅ AI Assistant for project queries and cost breakdowns</li>
            <li>✅ Signs in with your existing my.suddeco.com account</li>
          </ul>
        </div>

        {desktopPlatform === "mac" && (
          <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(245,158,11,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(245,158,11,0.2)" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>First time installing?</p>
            <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
              After downloading, open the .dmg file and drag SudDeco to your Applications folder.
              If macOS shows a security warning, go to System Settings &gt; Privacy &amp; Security and click &ldquo;Open Anyway&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
