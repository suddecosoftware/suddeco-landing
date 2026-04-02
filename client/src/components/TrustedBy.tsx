/**
 * TrustedBy: Scrolling logo strip showing industry partners and standards
 * Design: Forge & Build — subtle, professional trust indicators
 * Uses SVG-rendered construction industry logos/badges
 */
import { motion } from "framer-motion";

const partners = [
  { name: "RICS", subtitle: "Chartered Surveyors" },
  { name: "CIOB", subtitle: "Chartered Institute" },
  { name: "RIBA", subtitle: "Architecture" },
  { name: "NRM1", subtitle: "UK Standard" },
  { name: "BCIS", subtitle: "Cost Data" },
  { name: "ICE", subtitle: "Civil Engineers" },
  { name: "CIAT", subtitle: "Architectural Tech" },
];

function LogoBadge({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-lg border border-slate-700/40 bg-slate-800/30 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all duration-300 shrink-0">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
        <span
          className="text-amber-400 font-extrabold text-xs"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {name.slice(0, 3)}
        </span>
      </div>
      <div>
        <div
          className="text-white font-bold text-sm tracking-wide"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </div>
        <div className="text-slate-500 text-xs">{subtitle}</div>
      </div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="py-12 lg:py-16 border-y border-slate-800/50 bg-[#0B1120]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">
            Built to UK Industry Standards &amp; Trusted by Professionals
          </p>
        </motion.div>

        {/* Scrolling logo strip */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B1120] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B1120] to-transparent z-10" />

          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <LogoBadge key={`${partner.name}-${i}`} name={partner.name} subtitle={partner.subtitle} />
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {[
            { value: "500+", label: "Projects Analysed" },
            { value: "2M+", label: "Square Metres Processed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "10x", label: "Faster Than Manual" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl lg:text-3xl font-extrabold text-amber-400"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
