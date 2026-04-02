/**
 * Pricing: 3-tier pricing cards with monthly/yearly toggle + token system
 * Design: Forge & Build — glass cards, amber-highlighted popular plan
 * Updated: PAYG (Free), Professional (£99/mo, 500 tokens), Enterprise (£149/mo, 1500 tokens)
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Info } from "lucide-react";

const plans = [
  {
    name: "Pay As You Go",
    description: "Perfect for occasional projects",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    priceNote: "Buy token packs as needed",
    tokens: "0 tokens included",
    tokensNote: "Purchase token packs anytime",
    features: [
      "Create projects and estimates",
      "Upload PDF and Excel files",
      "AI-powered drawing analysis",
      "Basic cost estimation",
      "100m² free allowance on sign up",
    ],
    cta: "Sign Up Free",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing construction businesses",
    monthlyPrice: "£99",
    yearlyPrice: "£79",
    priceNote: "1,000m² allowance + extra at £0.45/m²",
    tokens: "500 tokens/month",
    tokensNote: "~7 projects + 50 chats + 5 scopes",
    features: [
      "All Pay As You Go features",
      "500 AI tokens per month",
      "Automated valuations & invoicing",
      "Materials ordering integration",
      "Full CRM pipeline management",
      "Project tracking & collaboration",
      "Cancel anytime",
    ],
    cta: "Start Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For established firms & teams",
    monthlyPrice: "£149",
    yearlyPrice: "£119",
    priceNote: "2,000m² allowance + extra at £0.45/m²",
    tokens: "1,500 tokens/month",
    tokensNote: "~20 projects + 200 chats + 20 scopes",
    features: [
      "All Professional features",
      "1,500 AI tokens per month",
      "Unlimited valuations & invoicing",
      "Unlimited materials orders",
      "Custom templates",
      "Team collaboration tools",
      "Priority support",
    ],
    cta: "Start Enterprise",
    popular: false,
  },
];

const tokenUsage = [
  { action: "Upload & extract 1 PDF page", cost: "7 tokens" },
  { action: "Chat message (simple)", cost: "1 token" },
  { action: "Chat message (complex)", cost: "5 tokens" },
  { action: "Generate scope of works", cost: "20 tokens" },
  { action: "AI summary", cost: "5 tokens" },
];

const tokenPacks = [
  { amount: "100 tokens", price: "£5" },
  { amount: "500 tokens", price: "£20" },
  { amount: "1,500 tokens", price: "£50" },
  { amount: "5,000 tokens", price: "£125" },
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
            Choose Your <span className="text-amber-400">Plan</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Select the perfect plan for your construction business. All plans
            include our AI-powered estimation engine and token-based AI services.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium transition-colors ${
                !yearly ? "text-white" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                yearly ? "bg-amber-500" : "bg-slate-600"
              }`}
              aria-label="Toggle yearly pricing"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  yearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                yearly ? "text-white" : "text-slate-400"
              }`}
            >
              Yearly{" "}
              <span className="text-amber-400 text-xs font-semibold">
                (20% off)
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                plan.popular
                  ? "bg-slate-800/60 border-amber-500/40 amber-glow md:-mt-4 md:mb-4"
                  : "bg-slate-800/30 border-slate-700/40 hover:border-slate-600/60"
              }`}
            >
              {/* Popular badge */}
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
                className={`text-xl font-bold mb-1 ${
                  plan.popular ? "text-amber-400" : "text-white"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {plan.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-2">
                <span
                  className="text-4xl font-bold text-white"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice !== "Free" && (
                  <span className="text-slate-400 text-sm">/month</span>
                )}
              </div>
              <p className="text-slate-500 text-xs mb-4">{plan.priceNote}</p>

              {/* Token info */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-6 ${
                plan.popular
                  ? "bg-amber-500/10 border border-amber-500/20"
                  : "bg-slate-700/30 border border-slate-700/30"
              }`}>
                <Zap className={`w-4 h-4 shrink-0 ${plan.popular ? "text-amber-400" : "text-slate-400"}`} />
                <div>
                  <span className={`text-sm font-semibold ${plan.popular ? "text-amber-400" : "text-slate-300"}`}>
                    {plan.tokens}
                  </span>
                  <p className="text-slate-500 text-xs">{plan.tokensNote}</p>
                </div>
              </div>

              {/* CTA */}
              <a href="https://my.suddeco.com" className="block mb-8">
                <Button
                  className={`w-full font-semibold py-5 transition-all ${
                    plan.popular
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </a>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.popular ? "text-amber-400" : "text-slate-500"
                      }`}
                    />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Token Usage & Packs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Token Consumption */}
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-semibold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Token Usage Per Action
                </h4>
              </div>
              <div className="space-y-3">
                {tokenUsage.map((item) => (
                  <div key={item.action} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{item.action}</span>
                    <span className="text-amber-400 text-sm font-semibold whitespace-nowrap ml-4">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Token Packs */}
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-semibold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Buy Token Packs
                </h4>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                Available for all tiers. Purchased tokens never expire.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {tokenPacks.map((pack) => (
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
        </motion.div>
      </div>
    </section>
  );
}
