/**
 * FAQ: Accordion section with common questions
 * Design: Forge & Build — clean accordion with amber accents
 * Updated 14 Apr 2026 — credits, new prices, cancel anytime
 */
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of drawings can I upload?",
    answer:
      "Architectural floor plans, structural beam schedules, " +
      "electrical reflected ceiling plans (RCPs), drainage layouts, " +
      "and services drawings in PDF format. Our AI handles a wide " +
      "variety of construction drawing types. Upload up to 35 pages " +
      "per project and our AI extracts every room, dimension, and " +
      "structural element automatically.",
  },
  {
    question: "How accurate is the AI extraction?",
    answer:
      "Our AI achieves high accuracy for room identification, " +
      "dimensions, and structural elements. All extractions can be " +
      "reviewed and edited before generating the scope. You can " +
      "manually measure and override any AI-detected values to " +
      "ensure 100% accuracy. Most projects are ready to price " +
      "within minutes of uploading.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "Credits are used when you run AI features: drawing " +
      "extraction (8 credits per page), scope generation (20 " +
      "credits), AI chat messages (1\u20135 credits), and property " +
      "intelligence lookups (15 credits). Every subscription plan " +
      "includes a monthly credit allowance \u2014 Starter gets 1,000 " +
      "credits, Professional gets 2,500, Business gets 5,000, and " +
      "Enterprise gets 12,000. You can top up with credit packs " +
      "anytime. Purchased credits never expire.",
  },
  {
    question: "What are the subscription prices?",
    answer:
      "Starter is \u00A349/month, Professional is \u00A399/month, Business " +
      "is \u00A3179/month, and Enterprise is \u00A3349/month. Pay yearly and " +
      "get 2 months free \u2014 \u00A3490, \u00A3990, \u00A31,790, or \u00A33,490 per year " +
      "billed upfront. All plans include a monthly credit allowance. " +
      "Cancel anytime \u2014 no contracts, no questions asked. " +
      "All prices exclude VAT.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "There is no free trial \u2014 but you can cancel anytime with " +
      "no questions asked. If you cancel, you keep access until " +
      "the end of your current billing period and you won\u2019t be " +
      "charged again. We\u2019re confident in the product: most users " +
      "see ROI on their first project.",
  },
  {
    question: "What quality tiers are available?",
    answer:
      "When creating a project you choose a quality tier: " +
      "Standard, Mid-Range, Premium, or Luxury. The AI adjusts " +
      "material specifications, labour rates, and scope detail " +
      "accordingly. A luxury apartment refurb gets Porcelanosa " +
      "tiles and bespoke joinery in the scope \u2014 a standard " +
      "renovation gets trade-grade materials. You also select " +
      "the property type: Residential, Apartment Block, or Hotel, " +
      "which further calibrates the estimates.",
  },
  {
    question: "What is the Intelligence page?",
    answer:
      "Every project includes a Site Intelligence page powered by " +
      "UK property data. It shows sold prices, rental values, " +
      "planning history, flood risk, EPC ratings, solar potential, " +
      "and crime data for the project address. This gives you and " +
      "your clients full context on the property before committing " +
      "to a scope and budget.",
  },
  {
    question: "Can my team collaborate on projects?",
    answer:
      "Yes. Invite team members with role-based access \u2014 Owner, " +
      "Admin, Manager, Member, or Viewer. Set permissions per " +
      "feature so managers oversee all projects while members see " +
      "only assigned work. You can also transfer projects to " +
      "clients or colleagues directly from the platform.",
  },
  {
    question: "Does it follow UK construction standards?",
    answer:
      "Yes. All pricing and task structures follow UK NRM1/BCIS " +
      "standards and RIBA Plan of Work stages. Our pricing " +
      "database is built specifically for the UK construction " +
      "market with regional labour rates and current material " +
      "costs. Scope of works exports include stage breakdowns " +
      "your QS and main contractor will recognise.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All drawings and project data are encrypted at rest and " +
      "in transit. We run on Microsoft Azure UK South \u2014 your data " +
      "never leaves the UK. We never share your data with third " +
      "parties. Each project\u2019s drawings and scope are private to " +
      "your account unless you explicitly share them.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes \u2014 cancel anytime, no questions asked, no cancellation " +
      "fees. When you cancel, your subscription stays active until " +
      "the end of your current billing period. You won\u2019t be " +
      "charged for the following month. You can reactivate at any " +
      "time. Annual subscribers who cancel keep access for the " +
      "remainder of their paid year.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 relative">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
              FAQ
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Frequently Asked{" "}
              <span className="text-amber-400">Questions</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Everything you need to know about Suddeco and how it can
              transform your construction workflow.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="multiple" className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-700/40 rounded-xl px-6 bg-slate-800/30 data-[state=open]:border-amber-500/30 data-[state=open]:bg-slate-800/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-white font-semibold hover:text-amber-400 transition-colors py-5 text-[15px] [&[data-state=open]]:text-amber-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 leading-relaxed pb-5 text-[15px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
