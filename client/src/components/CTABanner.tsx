/**
 * CTABanner: Full-width call-to-action section before footer
 * Design: Forge & Build — amber gradient background, bold CTA with dark text
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TEAM_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/team-collaboration-m2WkjEo94mgWMf2RWcxaBx.webp";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={TEAM_IMG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/92 via-amber-500/88 to-amber-600/92" />
      </div>

      <div className="container relative z-10 py-20 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to Revolutionise Your Projects?
          </h2>
          <p className="text-slate-800 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Join hundreds of construction professionals who are already saving
            time, reducing errors, and growing their businesses with Suddeco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://my.suddeco.com">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-base px-8 py-6 shadow-xl group w-full sm:w-auto"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-900/40 text-slate-900 hover:bg-slate-900/10 font-semibold text-base px-8 py-6 w-full sm:w-auto"
              >
                Talk to Sales
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
