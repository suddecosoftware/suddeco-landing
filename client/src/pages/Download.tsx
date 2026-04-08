import { motion } from "framer-motion";
import { Monitor, Apple, Smartphone } from "lucide-react";

const DOWNLOAD_URL = "/downloads/SudDeco_1.0.0_x64.dmg";

export default function Download() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F59E0B", marginBottom: "1rem" }}>
            DESKTOP APP
          </p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem" }}>
            Download SudDeco for Mac
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#94A3B8", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            Get the full power of AI construction management on your desktop. Works with your my.suddeco.com account.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", padding: "3rem", maxWidth: "28rem", margin: "0 auto 3rem" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "1rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Monitor size={40} color="#FFF" />
          </div>
          <h2 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>SudDeco for macOS</h2>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginBottom: "0.25rem" }}>Version 1.0.0 &bull; 8.6 MB</p>
          <p style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "2rem" }}>Requires macOS 10.15 or later</p>
          <a href={DOWNLOAD_URL} download
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#0F172A", fontWeight: 700, fontSize: "1.1rem", borderRadius: "0.75rem", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 15px rgba(245,158,11,0.3)" }}
            onMouseOver={(e) => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 25px rgba(245,158,11,0.4)"; }}
            onMouseOut={(e) => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 4px 15px rgba(245,158,11,0.3)"; }}>
            <Apple size={20} /> Download .dmg
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center", opacity: 0.6, minWidth: "180px" }}>
            <Smartphone size={28} color="#94A3B8" style={{ margin: "0 auto 0.75rem" }} />
            <p style={{ color: "#94A3B8", fontWeight: 600, fontSize: "0.95rem" }}>iOS App</p>
            <p style={{ color: "#64748B", fontSize: "0.8rem" }}>Coming soon — pending Apple review</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center", opacity: 0.6, minWidth: "180px" }}>
            <Monitor size={28} color="#94A3B8" style={{ margin: "0 auto 0.75rem" }} />
            <p style={{ color: "#94A3B8", fontWeight: 600, fontSize: "0.95rem" }}>Windows</p>
            <p style={{ color: "#64748B", fontSize: "0.8rem" }}>Coming soon</p>
          </div>
        </motion.div>

        <div style={{ maxWidth: "36rem", margin: "0 auto", textAlign: "left" }}>
          <h3 style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>What’s included</h3>
          <ul style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: "2", listStyle: "none", padding: 0 }}>
            <li>✅ Upload and analyse construction drawings with AI</li>
            <li>✅ Auto-detect rooms, measurements, and building elements</li>
            <li>✅ Generate costed scopes of work with UK pricing</li>
            <li>✅ Export to Excel and branded PDF reports</li>
            <li>✅ AI Assistant for project queries and cost breakdowns</li>
            <li>✅ Works with your existing my.suddeco.com account</li>
          </ul>
        </div>

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(245,158,11,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(245,158,11,0.2)" }}>
          <p style={{ color: "#F59E0B", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>First time installing?</p>
          <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
            After downloading, open the .dmg file and drag SudDeco to your Applications folder.
            If macOS shows a security warning, go to System Settings &gt; Privacy &amp; Security and click &ldquo;Open Anyway&rdquo;.
          </p>
        </div>
      </div>
    </div>
  );
}