/**
 * About Us — Suddeco Ltd
 * Company mission, values, history, and team culture
 * Design: Dark professional theme with amber/gold accents
 */
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Shield,
  Users,
  Zap,
  Award,
  Building2,
  Brain,
  Globe,
  TrendingUp,
  Heart,
  CheckCircle2,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="About Us | Suddeco AI - Construction Management Platform"
        description="Learn about Suddeco AI's mission to transform construction management through artificial intelligence. Our story, values, and commitment to UK construction professionals."
        canonicalPath="/about"
      />
      <TopBar />
      <Navbar />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="pb-20 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="container max-w-6xl mx-auto px-4 relative">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                About Suddeco
              </p>
              <h1
                className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Building the Future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Construction Intelligence
                </span>
              </h1>
              <p
                className="text-slate-400 text-lg lg:text-xl leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Suddeco AI was founded with a clear purpose: to bring the power of artificial intelligence
                to the construction industry, making estimation faster, more accurate, and accessible to
                professionals of every size.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeInUp}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { value: "2024", label: "Founded", icon: Building2 },
                { value: "500+", label: "Projects Analysed", icon: TrendingUp },
                { value: "98%", label: "Client Satisfaction", icon: Award },
                { value: "10x", label: "Faster Estimation", icon: Zap },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-xl border border-slate-700/40 bg-slate-800/20 hover:border-amber-500/30 transition-all"
                >
                  <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                  <div
                    className="text-3xl font-extrabold text-white mb-1"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-[#0B1120] border-y border-slate-800/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeInUp}>
                <p
                  className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Our Story
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-extrabold text-white mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  From Industry Frustration to Innovation
                </h2>
                <div className="space-y-4 text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <p>
                    Suddeco was born from first-hand experience of the inefficiencies that plague the UK
                    construction industry. Our founders, having spent years working in construction
                    management and quantity surveying, witnessed how professionals spent countless hours
                    manually analysing drawings, producing scope of works, and estimating costs — often
                    using outdated tools and fragmented workflows.
                  </p>
                  <p>
                    We asked a simple question: <em className="text-slate-300">what if artificial intelligence could do in minutes
                    what takes professionals days?</em> That question became Suddeco AI — a platform
                    purpose-built for the construction industry, combining advanced AI with deep domain
                    expertise in UK construction standards.
                  </p>
                  <p>
                    Today, Suddeco AI helps construction professionals across the United Kingdom
                    streamline their estimation workflows, produce accurate costed scopes of work, and
                    manage projects with unprecedented efficiency. We are proud to align our methodologies
                    with NRM1, BCIS, and RICS standards, ensuring our outputs meet the rigorous
                    expectations of the industry.
                  </p>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="relative"
              >
                {/* Visual timeline */}
                <div className="space-y-6">
                  {[
                    {
                      year: "2024",
                      title: "Company Founded",
                      desc: "Suddeco Ltd established in London with a mission to transform construction estimation through AI.",
                    },
                    {
                      year: "2024",
                      title: "Platform Launch",
                      desc: "Released the Suddeco AI platform with AI drawing analysis, scope generation, and project management.",
                    },
                    {
                      year: "2025",
                      title: "Industry Recognition",
                      desc: "Adopted by construction professionals across the UK, processing over 2 million square metres of drawings.",
                    },
                    {
                      year: "2026",
                      title: "Continued Growth",
                      desc: "Expanding features with CRM, team collaboration, branded exports, and advanced AI capabilities.",
                    },
                  ].map((milestone, i) => (
                    <motion.div
                      key={milestone.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                        </div>
                        {i < 3 && <div className="w-px flex-1 bg-gradient-to-b from-amber-500/30 to-transparent mt-2" />}
                      </div>
                      <div className="pb-6">
                        <span
                          className="text-amber-400 text-xs font-bold tracking-wider"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          {milestone.year}
                        </span>
                        <h3
                          className="text-white font-bold text-lg mt-1 mb-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {milestone.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{milestone.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
              <p
                className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                What Drives Us
              </p>
              <h2
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Our Mission &amp; Vision
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                {...fadeInUp}
                className="p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:border-amber-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-amber-400" />
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Our Mission
                </h3>
                <p className="text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  To empower construction professionals with intelligent tools that eliminate manual
                  inefficiencies, reduce estimation errors, and accelerate project delivery. We believe
                  every construction professional — from independent surveyors to large firms — deserves
                  access to AI-powered tools that were previously available only to the largest enterprises.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:border-amber-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-amber-400" />
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Our Vision
                </h3>
                <p className="text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  To become the industry standard for AI-powered construction management in the United
                  Kingdom and beyond. We envision a future where every construction project benefits from
                  intelligent analysis, where estimates are produced in minutes rather than days, and where
                  professionals can focus on what they do best — building.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-[#0B1120] border-y border-slate-800/50">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
              <p
                className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Our Principles
              </p>
              <h2
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Core Values
              </h2>
              <p className="text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                These values guide every decision we make, from product development to customer support.
              </p>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Brain,
                  title: "Innovation First",
                  desc: "We push the boundaries of what AI can achieve in construction, continuously improving our algorithms and exploring new applications.",
                },
                {
                  icon: Shield,
                  title: "Accuracy & Trust",
                  desc: "Our outputs are built on UK industry standards (NRM1, BCIS, RICS). We earn trust through precision, transparency, and reliability.",
                },
                {
                  icon: Users,
                  title: "Customer Partnership",
                  desc: "We build with our users, not just for them. Customer feedback directly shapes our product roadmap and feature priorities.",
                },
                {
                  icon: Globe,
                  title: "Accessibility",
                  desc: "Enterprise-grade AI tools should be available to every construction professional, regardless of company size or budget.",
                },
                {
                  icon: Heart,
                  title: "Integrity",
                  desc: "We operate with honesty and transparency in everything we do — from our pricing to our data practices and AI limitations.",
                },
                {
                  icon: Zap,
                  title: "Speed & Efficiency",
                  desc: "Time is money in construction. We obsess over making our platform faster, smoother, and more efficient for every workflow.",
                },
              ].map((value) => (
                <motion.div
                  key={value.title}
                  {...staggerItem}
                  className="p-6 rounded-xl border border-slate-700/40 bg-slate-800/20 hover:border-amber-500/30 hover:bg-slate-800/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <value.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
              <p
                className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Our Platform
              </p>
              <h2
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                What We Do
              </h2>
              <p className="text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Suddeco AI is a comprehensive construction management platform that combines artificial
                intelligence with industry expertise.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="space-y-4 max-w-3xl mx-auto">
              {[
                "AI-powered drawing analysis that extracts dimensions, materials, and specifications automatically",
                "Automated scope of works generation aligned with NRM1 and BCIS standards",
                "Accurate cost estimation using up-to-date UK pricing data",
                "Complete project management with timelines, milestones, and task tracking",
                "Built-in CRM for managing clients, contacts, and project relationships",
                "Team collaboration tools with role-based access and real-time updates",
                "Professional branded exports for client-ready documentation",
                "Secure cloud platform accessible from any device, anywhere",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-700/30 bg-slate-800/10 hover:border-amber-500/20 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#0F172A] to-[#0B1120] border-t border-slate-800/50">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <motion.div {...fadeInUp}>
              <h2
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ready to Transform Your Workflow?
              </h2>
              <p
                className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Join hundreds of construction professionals who are already saving time and improving
                accuracy with Suddeco AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://my.suddeco.com"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-all hover:shadow-lg hover:shadow-amber-500/20"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Start Free Trial
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
