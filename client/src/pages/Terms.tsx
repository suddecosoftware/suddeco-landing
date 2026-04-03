/**
 * Terms of Service — Suddeco Ltd
 * Updated: 3 April 2026
 * Comprehensive B2B SaaS terms for UK construction management platform
 * Covers: service description, credit system, GDPR, AI disclaimer, anti-scraping, subscriptions, IP
 * Governed by English law, UK GDPR compliant
 */
import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="Terms of Service | Suddeco AI - Construction Management Platform"
        description="Read the Terms of Service for Suddeco AI, the AI-powered construction management platform. Covers intellectual property, subscriptions, credits, GDPR, AI disclaimers, and UK law governance."
        canonicalPath="/terms"
      />
      <TopBar />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Legal
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Terms of Service
            </h1>
            <p className="text-slate-400 text-lg">
              Last updated: 3 April 2026
            </p>
            <div className="mt-6 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-amber-400">Important:</strong> These Terms of Service constitute a legally binding agreement between you and Suddeco Ltd. By accessing or using the Suddeco platform, you acknowledge that you have read, understood, and agree to be bound by these terms in their entirety. If you do not agree, you must not use the platform.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none space-y-8" style={{ fontFamily: "'Outfit', sans-serif" }}>

            {/* 1. Definitions */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                1. Definitions and Interpretation
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                In these Terms of Service, the following definitions shall apply unless the context otherwise requires:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Term</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Definition</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Agreement"</td><td className="py-3 px-4">These Terms of Service together with the Privacy Policy and any applicable Order Form or subscription confirmation.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Company", "we", "us", "our"</td><td className="py-3 px-4">Suddeco Ltd, a company registered in England and Wales, with its registered office at 662 High Road, London N12 0NL, United Kingdom.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Customer", "you", "your"</td><td className="py-3 px-4">Any individual, company, partnership, or other legal entity that accesses or uses the Platform.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Platform"</td><td className="py-3 px-4">The Suddeco AI construction management software application accessible at my.suddeco.com, including all associated APIs, tools, features, and documentation.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Services"</td><td className="py-3 px-4">All services provided through the Platform, including AI drawing analysis, scope of works generation, TakeOff estimation, project management, CRM, team collaboration, and export functionality.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Customer Data"</td><td className="py-3 px-4">All data, drawings, documents, project information, and other materials uploaded to or created within the Platform by or on behalf of the Customer.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"AI Output"</td><td className="py-3 px-4">Any analysis, extraction, scope of works, cost estimates, TakeOff reports, or other content generated by the Platform's artificial intelligence systems.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Credits"</td><td className="py-3 px-4">The unit of consumption used to measure and bill for AI-powered processing within the Platform. Credits are consumed when using features such as drawing extraction, scope generation, AI chat, and cost estimation.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Subscription"</td><td className="py-3 px-4">The paid plan selected by the Customer, which determines the level of access, features, and Credit allocation.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Free Trial"</td><td className="py-3 px-4">The fourteen (14) calendar day period during which a new Customer may access the Platform without charge, subject to the terms set out in Section 5.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Personal Data"</td><td className="py-3 px-4">Any information relating to an identified or identifiable natural person, as defined in the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Intellectual Property Rights"</td><td className="py-3 px-4">All patents, copyrights, design rights, trade marks, service marks, trade secrets, database rights, rights in know-how, and all other intellectual property rights of any kind, whether registered or unregistered, and including all applications and rights to apply for the same, anywhere in the world.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2. Service Description
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                2.1. Suddeco AI is a business-to-business (B2B) software-as-a-service (SaaS) platform designed for UK construction professionals. The Platform provides AI-powered tools for construction project estimation, management, and collaboration.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                2.2. Core features of the Platform include:
              </p>
              <ul className="text-slate-300 space-y-2 ml-6 mb-4">
                <li className="flex gap-2"><span className="text-amber-400">a)</span> <strong className="text-white">AI Drawing Analysis:</strong> Automated extraction of rooms, dimensions, structural members, electrical circuits, drainage layouts, and other building elements from uploaded PDF drawings (architectural plans, structural calculations, reflected ceiling plans, drainage layouts, and services drawings).</li>
                <li className="flex gap-2"><span className="text-amber-400">b)</span> <strong className="text-white">TakeOff Estimation:</strong> AI-assisted quantity takeoff and measurement extraction from construction drawings, producing structured measurement data for estimating purposes.</li>
                <li className="flex gap-2"><span className="text-amber-400">c)</span> <strong className="text-white">Scope of Works Generation:</strong> Automated generation of phase-based task lists with UK NRM1/BCIS pricing, exportable to premium Excel (with 7 sheets and clickable drawing references) or branded PDF reports.</li>
                <li className="flex gap-2"><span className="text-amber-400">d)</span> <strong className="text-white">Project Chat Assistant:</strong> Natural language interface for querying project data, with Plan mode (summaries and insights) and Act mode (task generation and workflow triggers).</li>
                <li className="flex gap-2"><span className="text-amber-400">e)</span> <strong className="text-white">CRM and Pipeline Management:</strong> Deal pipeline with Kanban board, contact management, email templates, automation rules, and activity tracking.</li>
                <li className="flex gap-2"><span className="text-amber-400">f)</span> <strong className="text-white">Team Collaboration:</strong> Role-based access control (Owner, Admin, Manager, Member, Viewer), shared project views, and granular permissions.</li>
                <li className="flex gap-2"><span className="text-amber-400">g)</span> <strong className="text-white">Cost Visualisation:</strong> Charts and dashboards for project cost analysis and client presentations.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                2.3. The Platform is designed for use by construction professionals including contractors, developers, architects, quantity surveyors, project managers, and property owners operating within the United Kingdom.
              </p>
            </section>

            {/* 3. Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                3. Acceptance of Terms
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.1. By creating an account, accessing, or using the Platform in any manner, you confirm that you have the legal capacity and authority to enter into this Agreement and to bind yourself (and, where applicable, the organisation you represent) to these terms.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.2. If you are entering into this Agreement on behalf of a company, partnership, or other legal entity, you represent and warrant that you have the authority to bind that entity. In such cases, "you" and "your" shall refer to that entity.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.3. We reserve the right to modify these Terms at any time. Material changes will be notified to you via email or through the Platform at least thirty (30) days before they take effect. Your continued use of the Platform after such changes constitutes acceptance of the revised Terms.
              </p>
              <p className="text-slate-300 leading-relaxed">
                3.4. These Terms, together with our Privacy Policy, constitute the entire agreement between you and Suddeco Ltd in relation to your use of the Platform and supersede all prior agreements, representations, and understandings.
              </p>
            </section>

            {/* 4. Account Registration */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                4. Account Registration and Security
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.1. To access the Platform, you must create an account by providing accurate, complete, and current information. You agree to update your account information promptly to keep it accurate and complete at all times.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.2. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> if you become aware of any unauthorised use of your account or any other breach of security.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.3. We reserve the right to suspend or terminate any account that we reasonably believe has been compromised, is being used in violation of these Terms, or poses a security risk to the Platform or other users.
              </p>
              <p className="text-slate-300 leading-relaxed">
                4.4. You may not create multiple accounts for the purpose of circumventing usage limits, Credit allocations, or any other restrictions imposed by your Subscription plan.
              </p>
            </section>

            {/* 5. Subscriptions, Credits, and Free Trial */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                5. Subscriptions, Credits, Free Trial, and Payment
              </h2>

              <h3 className="text-lg font-semibold text-white mb-3">5A. Free Trial</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.1. New Customers are entitled to a free trial period of fourteen (14) calendar days from the date of account creation ("Free Trial"). During the Free Trial, you may access the Platform's features subject to a limited Credit allocation as specified at the time of registration.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.2. At the end of the Free Trial, your account will automatically convert to a paid Subscription at the plan tier you selected during registration, unless you cancel before the Free Trial expires. You will be charged the applicable Subscription fee on the day following the end of the Free Trial.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.3. If you cancel during the Free Trial, you will not be charged. Any Customer Data uploaded during the Free Trial will be retained for thirty (30) days after cancellation, after which it may be permanently deleted.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                5.4. The Free Trial is available once per Customer. We reserve the right to modify, suspend, or discontinue the Free Trial at any time without prior notice.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">5B. Subscriptions and Auto-Renewal</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.5. Access to the Platform requires a paid Subscription. The features, Credit allocations, and pricing for each Subscription tier (Starter, Professional, Business, Enterprise) are set out on our pricing page and may be updated from time to time with at least thirty (30) days' notice.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.6. Subscriptions are billed in advance on a monthly or annual basis (as selected by you). <strong className="text-white">All Subscriptions automatically renew</strong> at the end of each billing period at the then-current rate unless cancelled before the renewal date.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.7. You authorise us to charge the applicable Subscription fee to your designated payment method on each renewal date. It is your responsibility to ensure your payment method is valid and has sufficient funds.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.8. All prices are stated in British Pounds Sterling (GBP) and are exclusive of VAT unless otherwise stated. VAT will be charged at the applicable rate where required by law.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                5.9. If payment fails, we will notify you and provide a grace period of seven (7) days to update your payment information. If payment is not received within the grace period, we may suspend your access to paid features until the outstanding balance is settled.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">5C. Credit System</h3>
              <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-amber-400">Credit Policy:</strong> Credits are the currency that powers all AI features on the Platform. Understanding how Credits work is essential to managing your usage effectively.
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.10. Credits are consumed when you use AI-powered features of the Platform. Credit consumption rates vary by feature and complexity:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Action</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Upload and extract 1 PDF page</td><td className="py-3 px-4">7 credits</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Chat message (simple)</td><td className="py-3 px-4">1 credit</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Chat message (complex AI)</td><td className="py-3 px-4">5 credits</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Generate scope of works</td><td className="py-3 px-4">20 credits</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">AI cost summary</td><td className="py-3 px-4">5 credits</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.11. <strong className="text-white">Monthly Subscription Credits:</strong> Credits included in your monthly Subscription allocation do not roll over to subsequent billing periods. Unused monthly Credits expire at the end of each billing cycle and are forfeited without refund or compensation.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.12. <strong className="text-white">Purchased Credit Top-Up Packs:</strong> Additional Credit packs purchased separately ("Top-Up Credits") do not expire and remain valid until consumed or until your account is terminated. Top-Up Credits are consumed only after your monthly Subscription Credits have been exhausted.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.13. Credits are non-transferable between accounts and may not be sold, traded, or exchanged. Credits have no cash value and cannot be redeemed for currency.
              </p>
              <p className="text-slate-300 leading-relaxed">
                5.14. We reserve the right to adjust Credit consumption rates with at least thirty (30) days' written notice. Changes will not affect Credits already consumed.
              </p>
            </section>

            {/* 6. Cancellation and Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                6. Cancellation, Termination, and Refunds
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.1. You may cancel your Subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period, and you will retain access to paid features until that date. No pro-rata refunds are provided for partial billing periods.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.2. <strong className="text-white">Refund Policy:</strong> Subscription fees are generally non-refundable. However, if you believe you are entitled to a refund due to a material service failure or billing error, please contact us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> within fourteen (14) days of the charge in question. Refund requests are assessed on a case-by-case basis at our sole discretion.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.3. <strong className="text-white">Credit Refunds:</strong> Consumed Credits are non-refundable under any circumstances. Unused Top-Up Credits are non-refundable. Upon account termination, any remaining Credits (both Subscription and Top-Up) are forfeited.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.4. We may terminate or suspend your account immediately, without prior notice, if we determine in our reasonable judgement that you have breached these Terms, engaged in fraudulent activity, or used the Platform in a manner that is harmful to us, other users, or third parties.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.5. Upon termination of your account (whether by you or by us), your right to access the Platform ceases immediately. We will retain your Customer Data for a period of thirty (30) days following termination, during which time you may request an export of your data by contacting <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>. After this period, we may permanently delete your Customer Data.
              </p>
              <p className="text-slate-300 leading-relaxed">
                6.6. Sections of these Terms that by their nature should survive termination (including, without limitation, Intellectual Property, Limitation of Liability, Indemnification, Data Protection, and Governing Law) shall survive any termination or expiration of this Agreement.
              </p>
            </section>

            {/* 7. AI-Generated Content Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                7. AI-Generated Content Disclaimer
              </h2>
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5 mb-6">
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong className="text-red-400">IMPORTANT DISCLAIMER:</strong> All AI-generated outputs from the Suddeco Platform — including but not limited to cost estimates, scope of works, TakeOff measurements, drawing analyses, and task lists — are provided as professional aids only. They do not constitute professional advice and must not be relied upon as a substitute for the judgement of qualified construction professionals, chartered surveyors, structural engineers, or other appropriately qualified persons.
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.1. <strong className="text-white">AI Output is assistive, not authoritative.</strong> The Platform uses artificial intelligence to analyse construction drawings and generate estimates, measurements, and task lists. While we employ industry-standard methodologies (including NRM1, BCIS data, and RICS guidelines where applicable), AI Output may contain errors, omissions, or inaccuracies.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.2. <strong className="text-white">Professional verification required.</strong> All AI Output must be independently reviewed, verified, and validated by appropriately qualified persons before being relied upon for any purpose, including but not limited to tendering, procurement, contract formation, regulatory compliance, or construction work.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.3. <strong className="text-white">No professional relationship.</strong> Use of the Platform does not create a professional relationship between you and Suddeco Ltd. We are a technology provider, not a construction consultancy, quantity surveying practice, or architectural firm. We do not hold professional indemnity insurance in respect of AI Output.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.4. Construction projects involve inherent variables — site conditions, material availability, labour rates, regulatory requirements, and design changes — that may not be fully captured by automated analysis. You acknowledge and agree that you bear sole responsibility for any decisions made, actions taken, or contracts entered into based on AI Output.
              </p>
              <p className="text-slate-300 leading-relaxed">
                7.5. Suddeco Ltd shall not be liable for any loss, damage, cost overrun, delay, or claim arising from reliance on AI Output without independent professional verification.
              </p>
            </section>

            {/* 8. Data Protection and UK GDPR */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                8. Data Protection and UK GDPR Compliance
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.1. We are committed to protecting your Personal Data in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and all applicable data protection legislation. Our processing of Personal Data is described in detail in our <a href="/privacy" className="text-amber-400 hover:text-amber-300 underline">Privacy Policy</a>.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.2. <strong className="text-white">Data Controller.</strong> Suddeco Ltd is the data controller in respect of Personal Data collected through the Platform for the purposes of account management, billing, and Platform operation. Where you upload Customer Data containing Personal Data of third parties (for example, names or contact details within construction drawings), you are the data controller and we act as a data processor on your behalf.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.3. <strong className="text-white">Lawful Basis.</strong> We process Personal Data on the following lawful bases: (a) performance of our contract with you (Article 6(1)(b) UK GDPR); (b) our legitimate interests in operating and improving the Platform (Article 6(1)(f) UK GDPR); and (c) your consent, where specifically obtained (Article 6(1)(a) UK GDPR).
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.4. <strong className="text-white">Your Rights.</strong> Under UK GDPR, you have the right to: (a) access your Personal Data; (b) rectify inaccurate data; (c) erase your data ("right to be forgotten"); (d) restrict processing; (e) data portability; (f) object to processing; and (g) not be subject to automated decision-making. To exercise any of these rights, contact us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>. We will respond within thirty (30) days.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.5. <strong className="text-white">Data Security.</strong> We implement appropriate technical and organisational measures to protect Personal Data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption in transit and at rest, access controls, regular security assessments, and incident response procedures.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.6. <strong className="text-white">International Transfers.</strong> Where we transfer Personal Data outside the United Kingdom, we ensure that appropriate safeguards are in place in accordance with UK GDPR, including Standard Contractual Clauses (SCCs) or transfers to countries with an adequacy decision from the UK Secretary of State.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.7. <strong className="text-white">Data Retention.</strong> We retain Personal Data only for as long as necessary to fulfil the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Account data is retained for the duration of your Subscription and for thirty (30) days thereafter, unless a longer retention period is required by law.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.8. <strong className="text-white">Data Breach Notification.</strong> In the event of a Personal Data breach that is likely to result in a risk to your rights and freedoms, we will notify you without undue delay and in any event within seventy-two (72) hours of becoming aware of the breach, in accordance with Article 33 of UK GDPR. We will also notify the Information Commissioner's Office (ICO) where required.
              </p>
              <p className="text-slate-300 leading-relaxed">
                8.9. <strong className="text-white">Complaints.</strong> If you are dissatisfied with our handling of your Personal Data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" className="text-amber-400 hover:text-amber-300 underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or by telephone at 0303 123 1113.
              </p>
            </section>

            {/* 9. Anti-Scraping and Automated Access */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                9. Anti-Scraping, Automated Access, and AI Training Data
              </h2>
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5 mb-6">
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong className="text-red-400">STRICTLY PROHIBITED:</strong> Any automated access to, scraping of, or data extraction from the Suddeco Platform is expressly forbidden without our prior written consent. This prohibition extends to the use of any data obtained from the Platform for the purpose of training artificial intelligence or machine learning models.
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.1. You shall not use any automated means — including but not limited to web scrapers, crawlers, spiders, bots, data miners, screen scrapers, automated scripts, or similar data gathering or extraction tools — to access, collect, copy, or extract any data, content, or information from the Platform.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.2. You shall not use any data, content, AI Output, pricing information, or other material obtained from the Platform (whether through automated or manual means) for the purpose of: (a) training, developing, or improving any artificial intelligence system, machine learning model, or large language model; (b) building or enhancing any competing product or service; (c) creating any dataset, database, or corpus for commercial or research purposes; or (d) any purpose not expressly authorised by this Agreement.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.3. You shall not circumvent, disable, or interfere with any security, rate-limiting, access control, or anti-scraping measures implemented on the Platform.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.4. We actively monitor for automated access patterns and reserve the right to block, throttle, or terminate access from any source that we reasonably believe is engaging in automated data collection.
              </p>
              <p className="text-slate-300 leading-relaxed">
                9.5. Any violation of this Section shall constitute a material breach of this Agreement and may result in immediate account termination, legal action for damages (including aggravated and exemplary damages), and injunctive relief. We reserve the right to pursue all available remedies under the Computer Misuse Act 1990, the Copyright, Designs and Patents Act 1988, and any other applicable legislation.
              </p>
            </section>

            {/* 10. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                10. Intellectual Property Rights
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.1. <strong className="text-white">Ownership of the Platform.</strong> All Intellectual Property Rights in and to the Platform, including but not limited to the software source code, object code, algorithms, artificial intelligence models and training data, machine learning systems, user interface designs, visual elements, graphics, logos, trade marks, service marks, trade names, domain names, database structures, API designs, documentation, and all improvements, modifications, and derivative works thereof, are and shall remain the exclusive property of Suddeco Ltd.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.2. <strong className="text-white">Customer Data Ownership.</strong> You retain all Intellectual Property Rights in your Customer Data. By uploading Customer Data to the Platform, you grant us a limited, non-exclusive, worldwide licence to process, store, and analyse your Customer Data solely for the purpose of providing the Services to you. This licence terminates upon deletion of your Customer Data or termination of your account (subject to our data retention obligations).
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.3. <strong className="text-white">AI Output Licence.</strong> Subject to your compliance with this Agreement and your active Subscription, you are granted a non-exclusive, non-transferable licence to use AI Output generated from your Customer Data for your internal business purposes. The underlying AI models, algorithms, and methodologies used to generate AI Output remain our exclusive property.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.4. <strong className="text-white">No Training on Customer Data.</strong> We do not use your Customer Data to train our general-purpose AI models. Your project data remains private and is used solely to provide the Services to you.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.5. <strong className="text-white">Feedback.</strong> If you provide us with any feedback, suggestions, ideas, or recommendations regarding the Platform ("Feedback"), you hereby assign to us all rights, title, and interest in such Feedback and agree that we are free to use such Feedback without restriction, attribution, or compensation.
              </p>
              <p className="text-slate-300 leading-relaxed">
                10.6. <strong className="text-white">Enforcement.</strong> We reserve the right to pursue all available legal remedies, including injunctive relief, damages, and recovery of legal costs, against any person or entity that infringes our Intellectual Property Rights, in any court of competent jurisdiction worldwide.
              </p>
            </section>

            {/* 11. Acceptable Use */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                11. Acceptable Use Policy
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                11.1. You agree to use the Platform only for lawful purposes and in accordance with these Terms. You shall not use the Platform in any way that:
              </p>
              <ul className="text-slate-300 space-y-2 ml-6 mb-4">
                <li className="flex gap-2"><span className="text-amber-400">a)</span> Violates any applicable local, national, or international law or regulation;</li>
                <li className="flex gap-2"><span className="text-amber-400">b)</span> Infringes the Intellectual Property Rights or other rights of any third party;</li>
                <li className="flex gap-2"><span className="text-amber-400">c)</span> Transmits any material that is defamatory, obscene, offensive, threatening, or otherwise objectionable;</li>
                <li className="flex gap-2"><span className="text-amber-400">d)</span> Introduces viruses, malware, or other harmful code to the Platform;</li>
                <li className="flex gap-2"><span className="text-amber-400">e)</span> Attempts to gain unauthorised access to the Platform, other user accounts, or our systems;</li>
                <li className="flex gap-2"><span className="text-amber-400">f)</span> Interferes with or disrupts the integrity or performance of the Platform;</li>
                <li className="flex gap-2"><span className="text-amber-400">g)</span> Uploads false, misleading, or fraudulent information.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                11.2. We reserve the right to investigate and take appropriate action against any violation of this Acceptable Use Policy, including removing content, suspending or terminating accounts, and reporting violations to law enforcement authorities.
              </p>
            </section>

            {/* 12. Confidentiality */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                12. Confidentiality
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                12.1. Each party agrees to keep confidential all information received from the other party that is designated as confidential or that reasonably should be understood to be confidential ("Confidential Information"). Confidential Information includes, without limitation, business plans, technical data, product designs, pricing, customer lists, and financial information.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                12.2. The receiving party shall not disclose Confidential Information to any third party without the prior written consent of the disclosing party, except to employees, contractors, or advisors who have a legitimate need to know and are bound by obligations of confidentiality no less restrictive than those contained herein.
              </p>
              <p className="text-slate-300 leading-relaxed">
                12.3. The obligations of confidentiality shall not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed by the receiving party; or (d) is required to be disclosed by law, regulation, or court order, provided that the receiving party gives prompt notice to the disclosing party.
              </p>
            </section>

            {/* 13. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                13. Limitation of Liability
              </h2>
              <div className="p-4 rounded-lg border border-slate-600/30 bg-slate-800/30 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">PLEASE READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY TO YOU.</strong>
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.1. To the maximum extent permitted by applicable law, the Platform is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, or completeness.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.2. In no event shall Suddeco Ltd, its directors, officers, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including but not limited to damages for loss of profits, revenue, goodwill, data, business opportunities, or anticipated savings, however caused and under any theory of liability.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.3. Our total aggregate liability to you for all claims arising out of or in connection with this Agreement shall not exceed the greater of: (a) the total fees paid by you to us in the twelve (12) months immediately preceding the event giving rise to the claim; or (b) one hundred pounds sterling (£100).
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.4. Nothing in this Agreement shall exclude or limit our liability for: (a) death or personal injury caused by our negligence; (b) fraud or fraudulent misrepresentation; or (c) any other liability that cannot be excluded or limited by applicable law.
              </p>
              <p className="text-slate-300 leading-relaxed">
                13.5. You acknowledge that the fees charged for the Platform reflect the allocation of risk set out in this Agreement and that we would not enter into this Agreement without these limitations on our liability.
              </p>
            </section>

            {/* 14. Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                14. Indemnification
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                14.1. You agree to indemnify, defend, and hold harmless Suddeco Ltd, its directors, officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Platform; (b) your breach of this Agreement; (c) your violation of any applicable law or regulation; (d) your Customer Data; or (e) any claim by a third party arising from your use of AI Output.
              </p>
              <p className="text-slate-300 leading-relaxed">
                14.2. We shall promptly notify you of any claim subject to indemnification and provide you with reasonable cooperation in the defence of such claim at your expense.
              </p>
            </section>

            {/* 15. Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                15. Service Availability and Support
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.1. We will use commercially reasonable efforts to maintain the availability of the Platform. However, we do not guarantee uninterrupted or error-free operation. The Platform may be temporarily unavailable due to scheduled maintenance, system upgrades, or circumstances beyond our reasonable control.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.2. We will endeavour to provide advance notice of scheduled maintenance where practicable. Emergency maintenance may be performed without prior notice when necessary to protect the security or integrity of the Platform.
              </p>
              <p className="text-slate-300 leading-relaxed">
                15.3. Support is provided in accordance with your Subscription tier. Details of support levels, response times, and channels are set out on our pricing page and within the Platform.
              </p>
            </section>

            {/* 16. Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                16. Third-Party Services and Integrations
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                16.1. The Platform may integrate with or provide links to third-party services, websites, or applications (including but not limited to Sage, QuickBooks, Xero, and WhatsApp Business). Such third-party services are governed by their own terms and privacy policies, and we are not responsible for their content, functionality, accuracy, or availability.
              </p>
              <p className="text-slate-300 leading-relaxed">
                16.2. Your use of any third-party service accessed through the Platform is at your own risk. We make no representations or warranties regarding third-party services and shall not be liable for any loss or damage arising from your use of such services.
              </p>
            </section>

            {/* 17. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                17. Governing Law and Dispute Resolution
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                17.1. This Agreement and any dispute or claim arising out of or in connection with it (including non-contractual disputes or claims) shall be governed by and construed in accordance with the <strong className="text-white">laws of England and Wales</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                17.2. The parties agree that the <strong className="text-white">courts of England and Wales</strong> shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement, provided that we retain the right to seek injunctive or other equitable relief in any court of competent jurisdiction worldwide to protect our Intellectual Property Rights.
              </p>
              <p className="text-slate-300 leading-relaxed">
                17.3. Before initiating formal legal proceedings, the parties agree to attempt in good faith to resolve any dispute through negotiation. If the dispute cannot be resolved within thirty (30) days of written notice, either party may proceed with formal legal action.
              </p>
            </section>

            {/* 18. General Provisions */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                18. General Provisions
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.1. <strong className="text-white">Entire Agreement.</strong> This Agreement, together with the Privacy Policy and any applicable Order Form, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, and agreements.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.2. <strong className="text-white">Severability.</strong> If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.3. <strong className="text-white">Waiver.</strong> No failure or delay by either party in exercising any right under this Agreement shall constitute a waiver of that right.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.4. <strong className="text-white">Assignment.</strong> You may not assign or transfer this Agreement or any rights hereunder without our prior written consent. We may assign this Agreement to any affiliate or in connection with a merger, acquisition, or sale of all or substantially all of our assets.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.5. <strong className="text-white">Force Majeure.</strong> Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, pandemic, government actions, power failures, internet disruptions, or third-party service outages.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                18.6. <strong className="text-white">Notices.</strong> All notices under this Agreement shall be in writing and sent to the email address associated with your account (for notices to you) or to <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> (for notices to us).
              </p>
              <p className="text-slate-300 leading-relaxed">
                18.7. <strong className="text-white">No Third-Party Rights.</strong> This Agreement does not confer any rights on any person or party other than the parties to this Agreement and their respective successors and permitted assigns.
              </p>
            </section>

            {/* 19. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                19. Contact Information
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                For any questions, concerns, or requests regarding these Terms of Service, please contact us:
              </p>
              <div className="p-6 rounded-lg border border-slate-700/50 bg-slate-800/20">
                <p className="text-white font-semibold mb-2">Suddeco Ltd</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  662 High Road<br />
                  London N12 0NL<br />
                  United Kingdom<br /><br />
                  Email: <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300">sales@suddeco.com</a><br />
                  Phone: <a href="tel:+442036338086" className="text-amber-400 hover:text-amber-300">+44 20 3633 8086</a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
