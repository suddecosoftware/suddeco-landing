/**
 * Terms of Service — Suddeco Ltd
 * Comprehensive SaaS terms with strong IP protection
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
        description="Read the Terms of Service for Suddeco AI, the AI-powered construction management platform. Covers intellectual property, subscriptions, liability, and UK law governance."
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
              Last updated: 9 March 2026
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
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Services"</td><td className="py-3 px-4">All services provided through the Platform, including AI drawing analysis, scope of works generation, project management, CRM, team collaboration, and export functionality.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Customer Data"</td><td className="py-3 px-4">All data, drawings, documents, project information, and other materials uploaded to or created within the Platform by or on behalf of the Customer.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"AI Output"</td><td className="py-3 px-4">Any analysis, extraction, scope of works, cost estimates, reports, or other content generated by the Platform's artificial intelligence systems.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Tokens"</td><td className="py-3 px-4">The unit of consumption used to measure and bill for AI-powered processing within the Platform.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Subscription"</td><td className="py-3 px-4">The paid plan selected by the Customer, which determines the level of access, features, and Token allocation.</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">"Intellectual Property Rights"</td><td className="py-3 px-4">All patents, copyrights, design rights, trade marks, service marks, trade secrets, database rights, rights in know-how, and all other intellectual property rights of any kind, whether registered or unregistered, and including all applications and rights to apply for the same, anywhere in the world.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2. Acceptance of Terms
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                2.1. By creating an account, accessing, or using the Platform in any manner, you confirm that you have the legal capacity and authority to enter into this Agreement and to bind yourself (and, where applicable, the organisation you represent) to these terms.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                2.2. If you are entering into this Agreement on behalf of a company, partnership, or other legal entity, you represent and warrant that you have the authority to bind that entity. In such cases, "you" and "your" shall refer to that entity.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                2.3. We reserve the right to modify these Terms at any time. Material changes will be notified to you via email or through the Platform at least thirty (30) days before they take effect. Your continued use of the Platform after such changes constitutes acceptance of the revised Terms.
              </p>
              <p className="text-slate-300 leading-relaxed">
                2.4. These Terms, together with our Privacy Policy, constitute the entire agreement between you and Suddeco Ltd in relation to your use of the Platform and supersede all prior agreements, representations, and understandings.
              </p>
            </section>

            {/* 3. Account Registration */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                3. Account Registration and Security
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.1. To access the Platform, you must create an account by providing accurate, complete, and current information. You agree to update your account information promptly to keep it accurate and complete at all times.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.2. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> if you become aware of any unauthorised use of your account or any other breach of security.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                3.3. We reserve the right to suspend or terminate any account that we reasonably believe has been compromised, is being used in violation of these Terms, or poses a security risk to the Platform or other users.
              </p>
              <p className="text-slate-300 leading-relaxed">
                3.4. You may not create multiple accounts for the purpose of circumventing usage limits, Token allocations, or any other restrictions imposed by your Subscription plan.
              </p>
            </section>

            {/* 4. Services and AI Output */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                4. Services, AI Output, and Professional Responsibility
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.1. The Platform provides AI-powered construction management tools including, but not limited to, automated drawing analysis, scope of works generation, cost estimation, project management, CRM, team collaboration, and reporting functionality.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.2. <strong className="text-white">AI Output is provided as a professional aid and not as a substitute for qualified professional judgement.</strong> All AI-generated analyses, cost estimates, scope documents, and other outputs are intended to assist construction professionals in their work and must be independently reviewed, verified, and validated by appropriately qualified persons before being relied upon for any purpose.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.3. While we employ industry-standard methodologies (including NRM1, BCIS data, and RICS guidelines where applicable) in our AI systems, we do not warrant that AI Output will be error-free, complete, or suitable for any particular purpose. Construction projects involve inherent variables that may not be fully captured by automated analysis.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.4. You acknowledge and agree that you bear sole responsibility for any decisions made, actions taken, or contracts entered into based on AI Output. Suddeco Ltd shall not be liable for any loss, damage, or claim arising from reliance on AI Output without independent professional verification.
              </p>
              <p className="text-slate-300 leading-relaxed">
                4.5. We continuously improve our AI models and algorithms. The Platform's features, capabilities, and AI Output quality may change over time as we refine our systems. We will endeavour to notify you of material changes to the Services.
              </p>
            </section>

            {/* 5. Subscriptions and Tokens */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                5. Subscriptions, Tokens, and Payment
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.1. Access to certain features of the Platform requires a paid Subscription. The features, Token allocations, and pricing for each Subscription tier are set out on our pricing page and may be updated from time to time.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.2. Tokens are consumed when you use AI-powered features of the Platform. Token consumption rates vary by feature and complexity of the task. Current Token consumption rates are published within the Platform and are subject to change with reasonable notice.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.3. Unused Tokens included in your monthly Subscription allocation do not roll over to subsequent billing periods unless expressly stated in your plan terms. Additional Token packs purchased separately remain valid until consumed or until your account is terminated.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.4. All prices are stated in British Pounds Sterling (GBP) and are exclusive of VAT unless otherwise stated. VAT will be charged at the applicable rate where required by law.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.5. Subscription fees are billed in advance on a monthly or annual basis (as selected by you). Payment is processed automatically via the payment method registered to your account. You authorise us to charge the applicable fees to your designated payment method.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.6. If payment fails, we will notify you and provide a grace period of seven (7) days to update your payment information. If payment is not received within the grace period, we may suspend your access to paid features until the outstanding balance is settled.
              </p>
              <p className="text-slate-300 leading-relaxed">
                5.7. We reserve the right to adjust pricing with at least thirty (30) days' written notice. Price changes will take effect at the start of your next billing cycle following the notice period.
              </p>
            </section>

            {/* 6. Cancellation and Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                6. Cancellation, Termination, and Refunds
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.1. You may cancel your Subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period, and you will retain access to paid features until that date.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.2. Refunds for Subscription fees are provided at our sole discretion. If you believe you are entitled to a refund, please contact us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> within fourteen (14) days of the charge in question.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.3. We may terminate or suspend your account immediately, without prior notice, if we determine in our reasonable judgement that you have breached these Terms, engaged in fraudulent activity, or used the Platform in a manner that is harmful to us, other users, or third parties.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.4. Upon termination of your account (whether by you or by us), your right to access the Platform ceases immediately. We will retain your Customer Data for a period of thirty (30) days following termination, during which time you may request an export of your data. After this period, we may permanently delete your Customer Data.
              </p>
              <p className="text-slate-300 leading-relaxed">
                6.5. Sections of these Terms that by their nature should survive termination (including, without limitation, Intellectual Property, Limitation of Liability, Indemnification, and Governing Law) shall survive any termination or expiration of this Agreement.
              </p>
            </section>

            {/* 7. Intellectual Property — THE KEY SECTION */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                7. Intellectual Property Rights
              </h2>
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5 mb-6">
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong className="text-red-400">NOTICE:</strong> The Suddeco Platform, including all software, algorithms, AI models, user interfaces, designs, documentation, and associated materials, is protected by copyright, patent, trade secret, and other intellectual property laws of the United Kingdom and international treaties including the Berne Convention for the Protection of Literary and Artistic Works, the WIPO Copyright Treaty, and the Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS). Unauthorised reproduction, distribution, or use is strictly prohibited and may result in severe civil and criminal penalties.
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.1. <strong className="text-white">Ownership of the Platform.</strong> All Intellectual Property Rights in and to the Platform, including but not limited to the software source code, object code, algorithms, artificial intelligence models and training data, machine learning systems, user interface designs, visual elements, graphics, logos, trade marks, service marks, trade names, domain names, database structures, API designs, documentation, and all improvements, modifications, and derivative works thereof, are and shall remain the exclusive property of Suddeco Ltd. Nothing in this Agreement transfers or assigns any Intellectual Property Rights in the Platform to you.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.2. <strong className="text-white">Worldwide Protection.</strong> The Platform is protected by intellectual property laws in the United Kingdom and in every jurisdiction worldwide where such protection is available, including but not limited to all member states of the Berne Convention, the European Union, the United States of America, and all signatories to the TRIPS Agreement. We actively enforce our Intellectual Property Rights in all jurisdictions.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.3. <strong className="text-white">Prohibited Activities.</strong> You shall not, and shall not permit any third party to:
              </p>
              <ul className="text-slate-300 space-y-2 ml-6 mb-4">
                <li className="flex gap-2"><span className="text-amber-400">a)</span> Copy, reproduce, duplicate, download, store, distribute, publish, or transmit any part of the Platform or its content, except as expressly permitted by this Agreement;</li>
                <li className="flex gap-2"><span className="text-amber-400">b)</span> Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, algorithms, data structures, or underlying ideas of the Platform or any component thereof;</li>
                <li className="flex gap-2"><span className="text-amber-400">c)</span> Modify, adapt, translate, or create derivative works based on the Platform or any part thereof;</li>
                <li className="flex gap-2"><span className="text-amber-400">d)</span> Remove, alter, obscure, or tamper with any copyright notices, trade mark notices, digital watermarks, or other proprietary rights notices contained in or on the Platform;</li>
                <li className="flex gap-2"><span className="text-amber-400">e)</span> Use any automated means, including web scraping, crawling, data mining, robots, or similar data gathering tools, to access, collect, or extract data from the Platform;</li>
                <li className="flex gap-2"><span className="text-amber-400">f)</span> Sublicense, sell, resell, lease, rent, loan, transfer, assign, or otherwise commercially exploit or make available the Platform or any part thereof to any third party;</li>
                <li className="flex gap-2"><span className="text-amber-400">g)</span> Use the Platform to develop, train, or improve any competing product, service, or artificial intelligence system;</li>
                <li className="flex gap-2"><span className="text-amber-400">h)</span> Benchmark, test, or evaluate the Platform for the purpose of publishing comparative analyses or reviews without our prior written consent;</li>
                <li className="flex gap-2"><span className="text-amber-400">i)</span> Frame, mirror, or display the Platform or any portion thereof on any other website or application without our prior written consent.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.4. <strong className="text-white">Customer Data.</strong> You retain all Intellectual Property Rights in your Customer Data. By uploading Customer Data to the Platform, you grant us a limited, non-exclusive, worldwide licence to process, store, and analyse your Customer Data solely for the purpose of providing the Services to you. This licence terminates upon deletion of your Customer Data or termination of your account (subject to our data retention obligations).
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.5. <strong className="text-white">AI Output.</strong> Subject to your compliance with this Agreement and your active Subscription, you are granted a non-exclusive, non-transferable licence to use AI Output generated from your Customer Data for your internal business purposes. The underlying AI models, algorithms, and methodologies used to generate AI Output remain our exclusive property. You may not claim ownership of the AI models or methods, nor use AI Output to reverse-engineer our proprietary systems.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.6. <strong className="text-white">Feedback.</strong> If you provide us with any feedback, suggestions, ideas, or recommendations regarding the Platform ("Feedback"), you hereby assign to us all rights, title, and interest in such Feedback and agree that we are free to use, disclose, reproduce, and exploit such Feedback without restriction, attribution, or compensation to you.
              </p>
              <p className="text-slate-300 leading-relaxed">
                7.7. <strong className="text-white">Enforcement.</strong> We reserve the right to pursue all available legal remedies, including injunctive relief, damages, and recovery of legal costs, against any person or entity that infringes our Intellectual Property Rights, in any court of competent jurisdiction worldwide.
              </p>
            </section>

            {/* 8. Acceptable Use */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                8. Acceptable Use Policy
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                8.1. You agree to use the Platform only for lawful purposes and in accordance with these Terms. You shall not use the Platform in any way that:
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
                8.2. We reserve the right to investigate and take appropriate action against any violation of this Acceptable Use Policy, including removing content, suspending or terminating accounts, and reporting violations to law enforcement authorities.
              </p>
            </section>

            {/* 9. Confidentiality */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                9. Confidentiality
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.1. Each party agrees to keep confidential all information received from the other party that is designated as confidential or that reasonably should be understood to be confidential ("Confidential Information"). Confidential Information includes, without limitation, business plans, technical data, product designs, pricing, customer lists, and financial information.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.2. The receiving party shall not disclose Confidential Information to any third party without the prior written consent of the disclosing party, except to employees, contractors, or advisors who have a legitimate need to know and are bound by obligations of confidentiality no less restrictive than those contained herein.
              </p>
              <p className="text-slate-300 leading-relaxed">
                9.3. The obligations of confidentiality shall not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed by the receiving party; or (d) is required to be disclosed by law, regulation, or court order, provided that the receiving party gives prompt notice to the disclosing party.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                10. Limitation of Liability
              </h2>
              <div className="p-4 rounded-lg border border-slate-600/30 bg-slate-800/30 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">PLEASE READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY TO YOU.</strong>
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.1. To the maximum extent permitted by applicable law, the Platform is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, or completeness.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.2. In no event shall Suddeco Ltd, its directors, officers, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including but not limited to damages for loss of profits, revenue, goodwill, data, business opportunities, or anticipated savings, however caused and under any theory of liability, whether in contract, tort (including negligence), strict liability, or otherwise, even if we have been advised of the possibility of such damages.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.3. Our total aggregate liability to you for all claims arising out of or in connection with this Agreement shall not exceed the greater of: (a) the total fees paid by you to us in the twelve (12) months immediately preceding the event giving rise to the claim; or (b) one hundred pounds sterling (£100).
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.4. Nothing in this Agreement shall exclude or limit our liability for: (a) death or personal injury caused by our negligence; (b) fraud or fraudulent misrepresentation; or (c) any other liability that cannot be excluded or limited by applicable law.
              </p>
              <p className="text-slate-300 leading-relaxed">
                10.5. You acknowledge that the fees charged for the Platform reflect the allocation of risk set out in this Agreement and that we would not enter into this Agreement without these limitations on our liability.
              </p>
            </section>

            {/* 11. Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                11. Indemnification
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                11.1. You agree to indemnify, defend, and hold harmless Suddeco Ltd, its directors, officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Platform; (b) your breach of this Agreement; (c) your violation of any applicable law or regulation; (d) your Customer Data; or (e) any claim by a third party arising from your use of AI Output.
              </p>
              <p className="text-slate-300 leading-relaxed">
                11.2. We shall promptly notify you of any claim subject to indemnification and provide you with reasonable cooperation in the defence of such claim at your expense.
              </p>
            </section>

            {/* 12. Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                12. Service Availability and Support
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                12.1. We will use commercially reasonable efforts to maintain the availability of the Platform. However, we do not guarantee uninterrupted or error-free operation. The Platform may be temporarily unavailable due to scheduled maintenance, system upgrades, or circumstances beyond our reasonable control.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                12.2. We will endeavour to provide advance notice of scheduled maintenance where practicable. Emergency maintenance may be performed without prior notice when necessary to protect the security or integrity of the Platform.
              </p>
              <p className="text-slate-300 leading-relaxed">
                12.3. Support is provided in accordance with your Subscription tier. Details of support levels, response times, and channels are set out on our pricing page and within the Platform.
              </p>
            </section>

            {/* 13. Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                13. Third-Party Services and Integrations
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.1. The Platform may integrate with or provide links to third-party services, websites, or applications. Such third-party services are governed by their own terms and privacy policies, and we are not responsible for their content, functionality, accuracy, or availability.
              </p>
              <p className="text-slate-300 leading-relaxed">
                13.2. Your use of any third-party service accessed through the Platform is at your own risk. We make no representations or warranties regarding third-party services and shall not be liable for any loss or damage arising from your use of such services.
              </p>
            </section>

            {/* 14. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                14. Governing Law and Dispute Resolution
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                14.1. This Agreement and any dispute or claim arising out of or in connection with it (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of England and Wales.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                14.2. The parties agree that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Agreement, provided that we retain the right to seek injunctive or other equitable relief in any court of competent jurisdiction worldwide to protect our Intellectual Property Rights.
              </p>
              <p className="text-slate-300 leading-relaxed">
                14.3. Before initiating formal legal proceedings, the parties agree to attempt in good faith to resolve any dispute through negotiation. If the dispute cannot be resolved within thirty (30) days of written notice, either party may proceed with formal legal action.
              </p>
            </section>

            {/* 15. General Provisions */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                15. General Provisions
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.1. <strong className="text-white">Entire Agreement.</strong> This Agreement, together with the Privacy Policy and any applicable Order Form, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, warranties, and agreements.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.2. <strong className="text-white">Severability.</strong> If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced by a valid provision that most closely achieves the original intent.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.3. <strong className="text-white">Waiver.</strong> No failure or delay by either party in exercising any right under this Agreement shall constitute a waiver of that right. A waiver of any breach shall not constitute a waiver of any subsequent breach.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.4. <strong className="text-white">Assignment.</strong> You may not assign or transfer this Agreement or any rights hereunder without our prior written consent. We may assign this Agreement to any affiliate or in connection with a merger, acquisition, or sale of all or substantially all of our assets.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.5. <strong className="text-white">Force Majeure.</strong> Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, pandemic, government actions, power failures, internet disruptions, or third-party service outages.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                15.6. <strong className="text-white">Notices.</strong> All notices under this Agreement shall be in writing and sent to the email address associated with your account (for notices to you) or to <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> (for notices to us). Notices shall be deemed received when sent by email, provided no delivery failure notification is received.
              </p>
              <p className="text-slate-300 leading-relaxed">
                15.7. <strong className="text-white">No Third-Party Rights.</strong> This Agreement does not confer any rights on any person or party other than the parties to this Agreement and their respective successors and permitted assigns.
              </p>
            </section>

            {/* 16. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                16. Contact Information
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
