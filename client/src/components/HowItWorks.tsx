/**
 * HowItWorks: Interactive 4-step process with step images that change on selection
 * Design: Forge & Build — amber numbered circles, interactive step visualization
 * Each step shows a corresponding product screenshot when selected
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Cpu, FileText, Settings } from "lucide-react";

const stepImages = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/how-it-works-upload-mYjVnnrScZKrQdwxpsgTkn.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/how-it-works-ai-kH3Y5tuRskmdqopMTsiLQS.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/how-it-works-scope-LRykjPSMhz5XRUTScCmvRz.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663376220736/fyZTmfuczokgJFgJqZSFsM/how-it-works-export-kzdwxaMSnTB7y9AUKDEYrK.webp",
];

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Drawings",
    description:
      "Drag and drop your PDF drawings — architectural plans, structural calculations, RCPs, drainage layouts, and services drawings of any complexity.",
    imageAlt: "Suddeco upload interface for construction PDF drawings",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Extraction",
    description:
      "Our AI analyses every page, identifying rooms, measurements, structural elements, electrical circuits, and services with algorithmic precision.",
    imageAlt: "AI analysis visualization of construction floor plan",
  },
  {
    number: "03",
    icon: FileText,
    title: "Generate Scope",
    description:
      "Get a fully costed scope of works with materials, labour rates, and phase-based task lists following UK NRM1/BCIS standards. Adjust margins and produce client-ready quotes.",
    imageAlt: "Scope of works table with phases, tasks, and pricing",
  },
  {
    number: "04",
    icon: Settings,
    title: "Manage & Export",
    description:
      "Track projects, manage your pipeline, collaborate with your team, and export professional reports — premium Excel with 7 sheets or branded PDF with your logo.",
    imageAlt: "Export and reporting interface with Excel and PDF outputs",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 relative bg-slate-800/30"
    >
      {/* Angled top edge */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-full">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64L1440 0V64H0Z"
            fill="currentColor"
            className="text-slate-800/30"
          />
        </svg>
      </div>

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
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            From Drawings to{" "}
            <span className="text-amber-400">Delivery</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps to transform your construction workflow. Upload
            once, manage everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Steps - Left side */}
          <div className="space-y-2">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex gap-5 p-5 rounded-xl cursor-pointer transition-all duration-300 group ${
                    isActive
                      ? "bg-amber-500/10 border border-amber-500/30"
                      : "hover:bg-slate-800/40 border border-transparent"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Number circle */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-amber-500 shadow-lg shadow-amber-500/30"
                          : "bg-amber-500/10 border-2 border-amber-500/30 group-hover:bg-amber-500/20 group-hover:border-amber-500/50"
                      }`}
                    >
                      <span
                        className={`font-bold text-lg ${
                          isActive ? "text-slate-900" : "text-amber-400"
                        }`}
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {step.number}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-px h-8 mt-2 transition-colors duration-300 ${
                          isActive
                            ? "bg-gradient-to-b from-amber-500/50 to-amber-500/10"
                            : "bg-gradient-to-b from-amber-500/20 to-transparent"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <StepIcon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-amber-400" : "text-amber-500/60"
                        }`}
                      />
                      <h3
                        className={`text-xl font-bold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-slate-400 leading-relaxed overflow-hidden"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Image - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
              {/* Step indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-20">
                <motion.div
                  className="h-full bg-amber-500"
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Image with crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={stepImages[activeStep]}
                    alt={steps[activeStep].imageAlt}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <span
                      className="text-slate-900 font-bold text-xs"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {steps[activeStep].number}
                    </span>
                  </div>
                  <span className="text-white font-bold text-lg">
                    {steps[activeStep].title}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl -z-10" />

            {/* Step dots */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeStep
                      ? "w-8 bg-amber-500"
                      : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
