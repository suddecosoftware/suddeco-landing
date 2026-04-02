/**
 * Features: 6-card grid showcasing platform capabilities
 * Design: Forge & Build — glass cards with amber icon accents, staggered entrance
 * Improved: better hover effects, subtle gradient borders
 */
import { motion } from "framer-motion";
import {
  ScanLine,
  FileSpreadsheet,
  MessageSquareText,
  Users,
  UserCog,
  Download,
} from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "AI Drawing Analysis",
    description:
      "Upload architectural, structural, and services PDFs. AI extracts rooms, dimensions, structural members, electrical circuits, drainage layouts, and more with precision.",
  },
  {
    icon: FileSpreadsheet,
    title: "Costed Scope of Works",
    description:
      "Automatically generate phase-based task lists with UK NRM1/BCIS pricing. Export to premium Excel with 7 sheets or branded PDF reports with your company logo.",
  },
  {
    icon: MessageSquareText,
    title: "Project Chat Assistant",
    description:
      "Ask questions about your drawings in natural language. Plan mode for summaries and insights, Act mode to generate tasks and trigger workflows automatically.",
  },
  {
    icon: Users,
    title: "CRM & Pipeline",
    description:
      "Full deal pipeline with Kanban board, contact management, email templates, automation rules, and activity tracking — from lead to completion.",
  },
  {
    icon: UserCog,
    title: "Team Management",
    description:
      "Invite team members, assign roles (Owner/Admin/Manager/Member/Viewer), and set granular permissions per feature. Keep everyone aligned with shared project views.",
  },
  {
    icon: Download,
    title: "Export & Reports",
    description:
      "Premium Excel exports with clickable drawing references, branded PDF reports with your company logo, and cost visualisation charts for professional client presentations.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
            Platform Features
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Everything You Need to{" "}
            <span className="text-amber-400">Build Smarter</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From AI-powered drawing analysis to full project management, Suddeco
            gives construction professionals the tools to estimate, manage, and
            deliver projects with confidence.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-8 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-800/60"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-amber-500/10">
                  <feature.icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-white mb-3 group-hover:text-amber-50 transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
