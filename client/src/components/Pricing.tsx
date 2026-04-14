/**
 * Pricing: 4-tier subscription pricing with monthly/yearly toggle + credit system
 * Pricing overhaul 14 Apr 2026
 * Starter £49 | Professional £99 | Business £179 | Enterprise £349
 * Annual: 2 months free (10 months billed upfront)
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Info, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For solo contractors & small firms",
    monthlyPrice: "£49",
    yearlyPrice: "£490/yr",
    priceNote: "per month, billed monthly",
    credits: "1,000 credits/month",
    creditsNote: "~14 projects + 100 chats + 10 scopes",
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
    cta: "Start today",
    popular: false,
    color: "slate",
  },
  {
    name: "Professional",
    description: "For growing construction businesses",
    monthlyPrice: "£99",
    yearlyPrice: "£990/yr",
    priceNote: "per month, billed monthly",
    credits: "2,500 credits/month",
    creditsNote: "~35 projects + 250 chats + 25 scopes",
    target: "Small firm, 3-10 people",
    features: [
      "All Starter features",
      "2,500 AI credits per month",
      "Automated valuations & invoicing",
      "Materials ordering integration",
      "Full CRM pipeline management",
      "Project tracking & collaboration",
      "Client portal access",
      "Priority email support",
    ],
    cta: "Start today",
    popular: true,
    color: "amber",
  },
  {
    name: "Business",
    description: "For growing companies & teams",
    monthlyPrice: "£179",
    yearlyPrice: "£1,790/yr",
    priceNote: "per month, billed monthly",
    credits: "5,000 credits/month",
    creditsNote: "~70 projects + 500 chats + 50 scopes",
    target: "Growing company, 10-50 people",
    features: [
      "All Professional features",
      "5,000 AI credits per month",
      "Team collaboration tools",
      "Advanced analytics dashboard",
      "Sage / QuickBooks / Xero integration",
      "WhatsApp Business API",
      "Custom templates",
      "Dedicated account manager",
    ],
    cta: "Start today",
    popular: false,
    color: "slate",
  },
  {
    name: "Enterprise",
    description: "For established firms & large teams",
    monthlyPrice: "£349",
    yearlyPrice: "£3,490/yr",
    priceNote: "per month, billed monthly",
    credits: "12,000 credits/month",
    creditsNote: "~170 projects + 1,200 chats + 120 scopes",
    target: "Large contractor, 50+ people",
    features: [
      "All Business features",
      "12,000 AI credits per month",
      "Unlimited valuations & invoicing",
      "Unlimited materials orders",
      "White-label options",
      "Custom integrations",
      "SLA guarantee",
      "Priority 24/7 support",
    ],
    cta: "Start today",
    popular: false,
    color: "slate",
  },
];

const creditUsage = [
  { action: "Upload & extract 1 PDF page", cost: "8 credits" },
  { action: "Chat message (simple)", cost: "1 credit" },
  { action: "Chat message (complex AI)", cost: "5 credits" },
  { action: "Generate scope of works", cost: "20 credits" },
  { action: "Voice AI (text-to-speech)", cost: "3 credits" },
  { action: "Product scraping", cost: "3 credits" },
  { action: "PDF/Excel export", cost: "5 credits" },
];

const intelligencePricing = [
  { action: "Market data (sold prices, rents, £/sqft)", cost: "15 credits" },
  { action: "Planning applications", cost: "15 credits" },
  { action: "Flood risk assessment", cost: "15 credits" },
  { action: "Crime & safety data", cost: "15 credits" },
  { action: "Solar potential analysis", cost: "15 credits" },
  { action: "EPC energy rating", cost: "2 credits" },
  { action: "Address validation (OS Places)", cost: "2 credits" },
  { action: "Full AI site analysis report", cost: "10 credits" },
  { action: "Intelligence follow-up chat", cost: "5 credits" },
];

const creditTopUps = [
  { amount: "100 credits", price: "£12" },
  { amount: "500 credits", price: "£38" },
  { amount: "1,500 credits", price: "£85" },
  { amount: "5,000 credits", price: "£195" },
  { amount: "10,000 credits", price: "£350" },
  { amount: "25,000 credits", price: "£750" },
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
            Simple pricing. No contracts. <span className="text-amber-400">Cancel anytime.</span>
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
              Pay yearly{" "}
              <span className="text-emerald-400 text-xs font-semibold">— 2 months free</span>
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
                  {plan.monthlyPrice}
                </span>
                <span className="text-slate-400 text-sm">/mo</span>
              </div>
              <p className="text-slate-500 text-xs mb-1">
                {yearly ? `Billed upfront · ${plan.yearlyPrice}` : plan.priceNote}
              </p>
              {yearly && (
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 mb-3">
                  2 months free
                </span>
              )}
              {!yearly && <div className="mb-3" />}
              <p className="text-slate-500 text-xs mb-1">Cancel anytime</p>

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

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-400 text-sm">
            Join 24+ UK contractors · Cancel anytime · No questions asked
          </p>
          <p className="text-slate-500 text-xs mt-2">
            All prices exclude VAT.
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

            {/* Property Intelligence Pricing */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-amber-400" />
                <h5 className="text-white font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Property Intelligence
                </h5>
              </div>
              <p className="text-slate-500 text-xs mb-3">
                Each lookup runs independently — you choose which data to fetch. A full property analysis uses approximately 89 credits.
              </p>
              <div className="space-y-1.5">
                {intelligencePricing.map((item) => (
                  <div key={item.action} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{item.action}</span>
                    <span className="text-amber-400 text-sm font-semibold whitespace-nowrap ml-4">{item.cost}</span>
                  </div>
                ))}
              </div>
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

          {/* Annual savings banner */}
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <p className="text-emerald-400 font-bold text-lg">Pay yearly — get 2 months free</p>
            </div>
            <p className="text-slate-300 text-sm mb-2">
              Annual plans are billed upfront at 10 months price for 12 months access. Cancel anytime.
            </p>
            <div className="text-slate-400 text-xs mt-2">
              Starter: <span className="text-white font-semibold">£490/yr</span> (save £98) ·
              Professional: <span className="text-white font-semibold">£990/yr</span> (save £198) ·
              Business: <span className="text-white font-semibold">£1,790/yr</span> (save £358) ·
              Enterprise: <span className="text-white font-semibold">£3,490/yr</span> (save £698)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
