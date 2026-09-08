import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Apple, Smartphone } from "lucide-react";

// DMGs are hosted in /public/downloads/ because the suddeco-review repo is private
// (so /releases/latest/download/ returns 404 for unauthenticated users).
// To update for a new release: copy new signed Suddeco-*.dmg into client/public/downloads/.
// Long-term: move to public CDN (Cloudflare R2 or public release repo) so we don't
// commit 10MB of binary every version bump.
const DOWNLOAD_AARCH64 = "/downloads/Suddeco-aarch64.dmg";
const DOWNLOAD_X86_64 = "/downloads/Suddeco-x86_64.dmg";
// Windows, 2026-09-08. This tile said "Coming soon" while Windows users sat on
// the 8 June build carrying the defect that made every drawing read "Drawing
// not found" — GitHub Actions used to build the Windows installer and has not
// had a successful run in 200 attempts. It is now compiled with cargo-xwin and
// packaged with a Linux NSIS in Docker, both on a Mac.
const DOWNLOAD_WINDOWS = "/downloads/Suddeco-x86_64-setup.exe";

type Arch = "aarch64" | "x86_64" | "unknown";
type OS = "mac" | "windows" | "other";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  return "other";
}

function detectMacArch(): Arch {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  // Modern Macs since 2020 are almost all Apple Silicon. Default to aarch64;
  // user can pick Intel via the secondary link below.
  if (ua.includes("mac")) return "aarch64";
  return "unknown";
}

export default function Download() {
  const [arch, setArch] = useState<Arch>("unknown");
  const [os, setOs] = useState<OS>("other");
  useEffect(() => { setArch(detectMacArch()); setOs(detectOS()); }, []);

  const primaryUrl = arch === "x86_64" ? DOWNLOAD_X86_64 : DOWNLOAD_AARCH64;
  const otherUrl = arch === "x86_64" ? DOWNLOAD_AARCH64 : DOWNLOAD_X86_64;
  const otherLabel = arch === "x86_64" ? "Apple Silicon (M1+)" : "Intel Mac";
  const onWindows = os === "windows";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F59E0B", marginBottom: "1rem" }}>
            DESKTOP APP
          </p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem" }}>
            Download Suddeco for Mac
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#94A3B8", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            Get the full power of AI construction management on your desktop. Works with your my.suddeco.com account.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", padding: "3rem", maxWidth: "32rem", margin: "0 auto 3rem" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "1rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Monitor size={40} color="#FFF" />
          </div>
          <h2 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Suddeco for macOS</h2>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Apple-notarised &bull; signed for distribution</p>
          <p style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "2rem" }}>Requires macOS 10.15 or later</p>
          <a href={primaryUrl} download
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#0F172A", fontWeight: 700, fontSize: "1.1rem", borderRadius: "0.75rem", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 15px rgba(245,158,11,0.3)" }}
            onMouseOver={(e) => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 25px rgba(245,158,11,0.4)"; }}
            onMouseOut={(e) => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 4px 15px rgba(245,158,11,0.3)"; }}>
            <Apple size={20} /> Download .dmg
          </a>
          <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "1.25rem" }}>
            Got an {otherLabel}?{" "}
            <a href={otherUrl} download style={{ color: "#F59E0B", textDecoration: "underline" }}>
              Download the other version
            </a>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center", opacity: 0.6, minWidth: "180px" }}>
            <Smartphone size={28} color="#94A3B8" style={{ margin: "0 auto 0.75rem" }} />
            <p style={{ color: "#94A3B8", fontWeight: 600, fontSize: "0.95rem" }}>iOS App</p>
            <p style={{ color: "#64748B", fontSize: "0.8rem" }}>Coming soon — pending Apple review</p>
          </div>
          <a href={DOWNLOAD_WINDOWS} download style={{ background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center", minWidth: "180px", textDecoration: "none", display: "block" }}>
            <Monitor size={28} color="#F59E0B" style={{ margin: "0 auto 0.75rem" }} />
            <p style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem" }}>Windows</p>
            <p style={{ color: "#F59E0B", fontSize: "0.8rem" }}>Download the installer</p>
            <p style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "0.25rem" }}>Windows 10 or later, 64-bit</p>
          </a>
        </motion.div>

        <div style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "left" }}>
          <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>What&rsquo;s included</h3>
          <ul style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: "2", listStyle: "none", padding: 0 }}>
            <li>&#9989; Upload and analyse construction drawings with AI</li>
            <li>&#9989; Auto-detect rooms, measurements, and building elements</li>
            <li>&#9989; Generate costed scopes of work with UK pricing</li>
            <li>&#9989; Export to Excel and branded PDF reports</li>
            <li>&#9989; AI Assistant for project queries and cost breakdowns</li>
            <li>&#9989; Works with your existing my.suddeco.com account</li>
          </ul>
        </div>

        {onWindows && (
          <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(245,158,11,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(245,158,11,0.2)" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>Installing on Windows</p>
            {/*
              * Said plainly rather than left for the user to hit: the Windows
              * installer is not code-signed yet, so SmartScreen shows a
              * "Windows protected your PC" notice on first run. It does not
              * block installation. A Windows code-signing certificate removes
              * it; that is a purchase, not a build setting.
              */}
            <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
              Run the installer and follow the prompts. Windows may show a
              &ldquo;Windows protected your PC&rdquo; notice the first time
              &mdash; choose <strong style={{ color: "#CBD5E1" }}>More info</strong> then{" "}
              <strong style={{ color: "#CBD5E1" }}>Run anyway</strong>. Our Windows
              build is not code-signed yet, so Windows has not seen it enough
              times to recognise it.
            </p>
          </div>
        )}

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(245,158,11,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(245,158,11,0.2)" }}>
          <p style={{ color: "#F59E0B", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>First time installing?</p>
          <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
            After downloading, open the .dmg file and drag Suddeco to your Applications folder.
            The app is Apple-notarised and should open without any security warnings.
          </p>
        </div>
      </div>
    </div>
  );
}
