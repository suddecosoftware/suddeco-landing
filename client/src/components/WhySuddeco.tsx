/**
 * WhySuddeco: Stats/trust section with animated counters and value propositions
 * Design: Forge & Build — construction site background, glowing stat counters
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const CONSTRUCTION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/construction-site-67NHfm5WpDYcAdZTcha4wJ.webp";

const stats = [
  { value: 85, suffix: "%", label: "Faster Estimates", icon: Zap },
  { value: 500, suffix: "+", label: "Projects Managed", icon: TrendingUp },
  { value: 99, suffix: "%", label: "AI Accuracy Rate", icon: Shield },
  { value: 3, suffix: "hrs", label: "Avg. Time Saved", icon: Clock },
];

const reasons = [
  {
    title: "UK NRM1/BCIS Standards",
    description:
      "All pricing and task structures follow UK NRM1/BCIS standards and RIBA Plan of Work stages. Built specifically for the UK construction market.",
  },
  {
    title: "Trusted by Contractors & Architects",
    description:
      "Contractors, developers, architects, and property owners across the UK rely on Suddeco to deliver accurate estimates and streamline project delivery.",
  },
  {
    title: "Secure & Encrypted",
    description:
      "All drawings and project data are encrypted and stored securely. We never share your data with third parties. Industry-standard security practices throughout.",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(1)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const displayValue =
    value % 1 === 0 ? Math.round(count).toString() : count.toFixed(1);

  return (
    <span
      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-400"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {displayValue}
      {suffix}
    </span>
  );
}

export default function WhySuddeco() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="why-suddeco"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={CONSTRUCTION_IMG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A]" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
            Why Suddeco
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Built for UK Construction{" "}
            <span className="text-amber-400">Professionals</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 lg:p-8 rounded-xl bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm hover:border-amber-500/20 transition-all duration-500"
            >
              <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isInView={isInView}
              />
              <div className="text-slate-400 text-sm font-medium mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {reason.title}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed pl-9">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
