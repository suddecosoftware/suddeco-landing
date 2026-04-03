/**
 * Pricing: 4-tier subscription pricing with monthly/yearly toggle + credit system
 * Correct pricing from Revenue Model — 30 March 2026
 * Starter £79 | Professional £169 | Business £329 | Enterprise £599
 * Annual: 20% off
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Info, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For solo contractors & small firms",
    monthlyPrice: "£79",
    yearlyPrice: "£63",
    priceNote: "per month, billed monthly",
    credits: "500 credits/month",
    creditsNote: "~7 projects + 50 chats + 5 scopes",
    target: "Solo contractor, 1-2 person firm",
    features: [
      "Create projects and estimates",
      "Upload PDF and Excel files",
      "AI-powered drawing analysis",
      "Full scope of works generation",
      "Cost estimation engine",
      "Export to PDF",
      "100m² free allowance on sign up",
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "slate",
  },
  {
    name: "Professional",
    description: "For growing construction businesses",
    monthlyPrice: "£169",
    yearlyPrice: "£135",
    priceNote: "per month, billed monthly",
    credits: "1,500 credits/month",
    creditsNote: "~20 projects + 150 chats + 15 scopes",
    target: "Small firm, 3-10 people",
    features: [
      "All Starter features",
      "1,500 AI credits per month",
      "Automated valuations & invoicing",
      "Materials ordering integration",
      "Full CRM pipeline management",
      "Project tracking & collaboration",
      "Client portal access",
      "Priority email support",
    ],
    cta: "Start Professional",
    popular: true,
    color: "amber",
  },
  {
    name: "Business",
    description: "For growing companies & teams",
    monthlyPrice: "£329",
    yearlyPrice: "£263",
    priceNote: "per month, billed monthly",
    credits: "3,500 credits/month",
    creditsNote: "~50 projects + 350 chats + 35 scopes",
    target: "Growing company, 10-50 people",
    features: [
      "All Professional features",
      "3,500 AI credits per month",
      "Team collaboration tools",
      "Advanced analytics dashboard",
      "Sage / QuickBooks / Xero integration",
      "WhatsApp Business API",
      "Custom templates",
      "Dedicated account manager",
    ],
    cta: "Start Business",
    popular: false,
    color: "slate",
  },
  {
    name: "Enterprise",
    description: "For established firms & large teams",
    monthlyPrice: "£599",
    yearlyPrice: "£479",
    priceNote: "per month, billed monthly",
    credits: "8,000 credits/month",
    creditsNote: "~115 projects + 800 chats + 80 scopes",
    target: "Large contractor, 50+ people",
    features: [
      "All Business features",
      "8,000 AI credits per month",
      "Unlimited valuations & invoicing",
      "Unlimited materials orders",
      "White-label options",
      "Custom integrations",
      "SLA guarantee",
      "Priority 24/7 support",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "slate",
  },
];

const creditUsage = [
  { action: "Upload & extract 1 PDF page", cost: "7 credits" },
  { action: "Chat message (simple)", cost: "1 credit" },
  { action: "Chat message (complex AI)", cost: "5 credits" },
  { action: "Generate scope of works", cost: "20 credits" },
  { action: "AI cost summary", cost: "5 credits" },
];

const creditTopUps = [
  { amount: "50 credits", price: "£6" },
  { amount: "500 credits", price: "£45" },
  { amount: "2,000 credits", price: "£150" },
  { amount: "10,000 credits", price: "£550" },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32 relative bg-slate-800/20">
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
            Pricing
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Simple, Transparent <span className="text-amber-400">Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            All plans include our AI-powered estimation engine. Credits power every AI feature — buy more any time, credits never expire.
          </p>

          {/* Monthly/Yearly toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-slate-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? "bg-amber-500" : "bg-slate-600"}`}
              aria-label="Toggle yearly pricing"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${yearly ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-slate-400"}`}>
              Yearly{" "}
              <span className="text-amber-400 text-xs font-semibold">(20% off)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards — 4 tiers in 2x2 grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-7 rounded-2xl border transition-all duration-500 flex flex-col ${
                plan.popular
                  ? "bg-slate-800/60 border-amber-500/50 shadow-xl shadow-amber-500/10 xl:-mt-4 xl:mb-4"
                  : "bg-slate-800/30 border-slate-700/40 hover:border-slate-600/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/30">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3
                className={`text-xl font-bold mb-1 ${plan.popular ? "text-amber-400" : "text-white"}`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {plan.name}
              </h3>
              <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

              {/* Price */}
              <div className="mb-1">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-500 text-xs mb-4">
                {yearly ? "billed annually (20% off)" : plan.priceNote}
              </p>

              {/* Credits badge */}
              <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg mb-6 ${
                plan.popular
                  ? "bg-amber-500/10 border border-amber-500/20"
                  : "bg-slate-700/30 border border-slate-700/30"
              }`}>
                <Zap className={`w-4 h-4 shrink-0 ${plan.popular ? "text-amber-400" : "text-slate-400"}`} />
                <div>
                  <span className={`text-sm font-semibold ${plan.popular ? "text-amber-400" : "text-slate-300"}`}>
                    {plan.credits}
                  </span>
                  <p className="text-slate-500 text-xs">{plan.creditsNote}</p>
                </div>
              </div>

              {/* CTA */}
              <a href="https://my.suddeco.com/register" className="block mb-7">
                <Button
                  className={`w-full font-semibold py-5 transition-all ${
                    plan.popular
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </a>

              {/* Features */}
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-amber-400" : "text-slate-500"}`} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Pay As You Go note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-400 text-sm">
            Just starting out?{" "}
            <a href="https://my.suddeco.com/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Sign up free
            </a>{" "}
            — no subscription needed. Buy credit packs as you go.
          </p>
        </motion.div>

        {/* Credits section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Credit Usage */}
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-semibold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Credit Usage Per Action
                </h4>
              </div>
              <div className="space-y-3">
                {creditUsage.map((item) => (
                  <div key={item.action} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{item.action}</span>
                    <span className="text-amber-400 text-sm font-semibold whitespace-nowrap ml-4">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Top-ups */}
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-semibold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Buy Credit Top-Ups
                </h4>
              </div>
              <p className="text-slate-500 text-sm mb-4">Available for all plans. Credits never expire. Buy when you need more.</p>
              <div className="grid grid-cols-2 gap-3">
                {creditTopUps.map((pack) => (
                  <a
                    key={pack.amount}
                    href="https://my.suddeco.com"
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-700/30 hover:border-amber-500/30 transition-colors group"
                  >
                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{pack.amount}</span>
                    <span className="text-amber-400 text-sm font-bold">{pack.price}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Annual savings highlight */}
          <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
            <Shield className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-amber-400 font-semibold text-sm mb-1">Annual plans save up to 20%</p>
            <p className="text-slate-400 text-xs">Starter annual: £756/yr (save £192) · Professional: £1,620/yr (save £408) · Business: £3,156/yr (save £792) · Enterprise: £5,748/yr (save £1,440)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
