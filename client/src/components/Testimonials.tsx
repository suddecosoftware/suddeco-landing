/**
 * Testimonials: Client quotes from construction professionals
 * Design: Forge & Build — glass cards with amber quote marks and star ratings
 */
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "SUDDECO has transformed the way we manage our projects. The efficiency and clarity it provides are unmatched. We can now track every aspect of our projects in real-time, ensuring that we stay on schedule and within budget.",
    name: "John D.",
    role: "Project Manager",
    company: "BuildRight Construction",
    rating: 5,
  },
  {
    quote:
      "The AI drawing analysis saves us hours on every project. What used to take a full day of manual measurement now happens in minutes. The accuracy is remarkable and our clients love the professional quotes we produce.",
    name: "Sarah M.",
    role: "Senior Estimator",
    company: "Apex Developments",
    rating: 5,
  },
  {
    quote:
      "As a property developer, having the CRM and project management tools integrated with the estimating engine is a game-changer. We've reduced our project turnaround time significantly since switching to Suddeco.",
    name: "David K.",
    role: "Managing Director",
    company: "Kensington Refurb Ltd",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 relative bg-slate-800/20">
      <div className="absolute inset-0 dot-pattern opacity-10" />
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
            Testimonials
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Trusted by{" "}
            <span className="text-amber-400">Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-amber-500/20 transition-all duration-500 group flex flex-col"
            >
              {/* Large quote mark */}
              <div className="absolute top-6 right-6 text-amber-500/10 text-7xl font-serif leading-none select-none">
                &ldquo;
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-300 leading-relaxed mb-8 text-[15px] flex-1 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-700/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
                  <span
                    className="text-slate-900 font-bold text-lg"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
