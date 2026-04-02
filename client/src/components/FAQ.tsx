/**
 * FAQ: Accordion section with common questions
 * Design: Forge & Build — clean accordion with amber accents
 * Updated with detailed answers including token system
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
      "Architectural floor plans, structural beam schedules, electrical reflected ceiling plans (RCPs), drainage layouts, and services drawings in PDF format. Our AI is trained to handle a wide variety of construction drawing types and complexities.",
  },
  {
    question: "How accurate is the AI extraction?",
    answer:
      "Our AI achieves high accuracy for room identification, dimensions, and structural elements. All extractions can be reviewed and edited before generating the scope. You can also manually measure and override any AI-detected values to ensure 100% accuracy.",
  },
  {
    question: "Can I customise the scope of works?",
    answer:
      "Yes. You can edit tasks, adjust quantities, modify pricing, add or remove items, and reorganise phases before exporting. The scope follows UK NRM1/BCIS standards and RIBA Plan of Work stages, and every field is fully editable.",
  },
  {
    question: "Does it work with UK construction standards?",
    answer:
      "Yes. All pricing and task structures follow UK NRM1/BCIS standards and RIBA Plan of Work stages. Our pricing database is specifically built for the UK construction market, ensuring accurate and relevant cost estimates.",
  },
  {
    question: "How does the token system work?",
    answer:
      "Tokens are consumed when you use AI features like drawing extraction (7 tokens per page), chat messages (1-5 tokens), and scope generation (20 tokens). Subscription plans include monthly tokens, and you can buy additional token packs anytime. Purchased tokens never expire.",
  },
  {
    question: "Can my team collaborate on projects?",
    answer:
      "Yes. Invite team members with role-based access — Owner, Admin, Manager, Member, or Viewer. Set granular permissions per feature so managers can oversee all projects while members see only assigned work. Share project views and documents in real-time.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All drawings and project data are encrypted and stored securely. We never share your data with third parties. Our platform uses industry-standard encryption and security practices to protect your sensitive construction documents and business information.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No long-term contracts required. All paid plans are billed monthly (or yearly at a 20% discount) and you can cancel anytime. The Pay As You Go plan has no monthly fee at all — you only pay for the token packs you purchase.",
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
            <Accordion type="single" collapsible className="space-y-4">
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
