/**
 * Privacy Policy — Suddeco Ltd
 * Comprehensive UK GDPR compliant privacy policy
 * Includes cookie policy, data subject rights, international transfers
 */
import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="Privacy Policy | Suddeco AI - Construction Management Platform"
        description="Learn how Suddeco AI collects, uses, and protects your personal data. UK GDPR compliant privacy policy covering data rights, cookies, retention, and international transfers."
        canonicalPath="/privacy"
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
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-lg">
              Last updated: 9 March 2026
            </p>
            <div className="mt-6 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-amber-400">Your Privacy Matters:</strong> Suddeco Ltd ("we", "us", "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website (www.suddeco.com) and our AI construction management platform (my.suddeco.com). We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none space-y-8" style={{ fontFamily: "'Outfit', sans-serif" }}>

            {/* 1. Data Controller */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                1. Data Controller
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                The data controller responsible for your personal data is Suddeco Ltd, a company registered in England and Wales, with its registered office at 662 High Road, London N12 0NL, United Kingdom.
              </p>
              <p className="text-slate-300 leading-relaxed">
                For any questions about this Privacy Policy or our data practices, please contact our Data Protection team at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> or by post at the address above.
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                2. Personal Data We Collect
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We collect and process the following categories of personal data, depending on how you interact with our services:
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">2.1. Information You Provide Directly</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Data Elements</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">When Collected</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Identity Data</td><td className="py-3 px-4">First name, last name, job title, company name</td><td className="py-3 px-4">Account registration, contact form</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Contact Data</td><td className="py-3 px-4">Email address, phone number, postal address</td><td className="py-3 px-4">Account registration, contact form, billing</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Account Data</td><td className="py-3 px-4">Username, password (encrypted), account preferences, role</td><td className="py-3 px-4">Account creation and management</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Financial Data</td><td className="py-3 px-4">Payment card details (processed by our payment provider), billing address, transaction history</td><td className="py-3 px-4">Subscription purchase, token purchase</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Project Data</td><td className="py-3 px-4">Construction drawings, project documents, scope of works, cost estimates, project notes</td><td className="py-3 px-4">Platform usage</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Communication Data</td><td className="py-3 px-4">Messages sent through contact forms, support tickets, chat messages within the platform</td><td className="py-3 px-4">Customer support, platform chat features</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">2.2. Information Collected Automatically</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Data Elements</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Technical Data</td><td className="py-3 px-4">IP address, browser type and version, operating system, device type, screen resolution</td><td className="py-3 px-4">Security, compatibility, analytics</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Usage Data</td><td className="py-3 px-4">Pages visited, features used, time spent, click patterns, search queries within the platform</td><td className="py-3 px-4">Service improvement, personalisation</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Token Usage Data</td><td className="py-3 px-4">Token consumption records, AI feature usage frequency, processing timestamps</td><td className="py-3 px-4">Billing, service optimisation</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Lawful Basis */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                3. Lawful Basis for Processing
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Under the UK GDPR, we must have a lawful basis for processing your personal data. We rely on the following bases depending on the processing activity:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Processing Activity</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Lawful Basis</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Providing the Platform and Services</td><td className="py-3 px-4">Performance of a contract (Article 6(1)(b))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Processing payments and billing</td><td className="py-3 px-4">Performance of a contract (Article 6(1)(b))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Responding to contact form enquiries</td><td className="py-3 px-4">Legitimate interests (Article 6(1)(f))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Sending service-related communications</td><td className="py-3 px-4">Performance of a contract (Article 6(1)(b))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Sending marketing communications</td><td className="py-3 px-4">Consent (Article 6(1)(a))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Analytics and service improvement</td><td className="py-3 px-4">Legitimate interests (Article 6(1)(f))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Security and fraud prevention</td><td className="py-3 px-4">Legitimate interests (Article 6(1)(f))</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Compliance with legal obligations</td><td className="py-3 px-4">Legal obligation (Article 6(1)(c))</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. How We Use Your Data */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                4. How We Use Your Personal Data
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.1. <strong className="text-white">Service Delivery.</strong> We use your personal data to create and manage your account, provide access to the Platform, process your construction drawings through our AI systems, generate scope of works and cost estimates, facilitate team collaboration, and deliver the features included in your Subscription.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.2. <strong className="text-white">AI Processing.</strong> When you upload construction drawings and documents, our AI systems process this data to extract information, generate analyses, and produce outputs. This processing is essential to the Services we provide. We do not use your Customer Data to train our AI models for other customers' benefit without your explicit consent.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.3. <strong className="text-white">Communication.</strong> We use your contact information to send you service-related notifications (such as account confirmations, billing receipts, security alerts, and feature updates). With your consent, we may also send marketing communications about new features, promotions, or industry insights. You can opt out of marketing communications at any time.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                4.4. <strong className="text-white">Analytics and Improvement.</strong> We analyse aggregated and anonymised usage data to understand how our Platform is used, identify areas for improvement, and develop new features. This analysis does not identify individual users.
              </p>
              <p className="text-slate-300 leading-relaxed">
                4.5. <strong className="text-white">Legal and Security.</strong> We may process your data to comply with legal obligations, enforce our Terms of Service, protect against fraud and security threats, and defend our legal rights.
              </p>
            </section>

            {/* 5. Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                5. Data Sharing and Third Parties
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.1. We do not sell your personal data to third parties. We share your data only in the following circumstances:
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.2. <strong className="text-white">Service Providers.</strong> We engage trusted third-party service providers who process data on our behalf to support our operations. These providers are bound by data processing agreements that require them to protect your data to the same standard we apply. Our key service providers include cloud hosting providers, payment processors, email delivery services, and analytics platforms.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.3. <strong className="text-white">Legal Requirements.</strong> We may disclose your personal data if required to do so by law, regulation, legal process, or governmental request, or where we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                5.4. <strong className="text-white">Business Transfers.</strong> In the event of a merger, acquisition, reorganisation, or sale of assets, your personal data may be transferred to the acquiring entity. We will notify you of any such transfer and any choices you may have regarding your data.
              </p>
              <p className="text-slate-300 leading-relaxed">
                5.5. <strong className="text-white">With Your Consent.</strong> We may share your data with third parties where you have given us explicit consent to do so.
              </p>
            </section>

            {/* 6. International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                6. International Data Transfers
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.1. Your personal data may be transferred to, stored, and processed in countries outside the United Kingdom. Where we transfer data internationally, we ensure that appropriate safeguards are in place to protect your data in accordance with UK GDPR requirements.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                6.2. These safeguards may include: transfers to countries that have been deemed to provide an adequate level of data protection by the UK Secretary of State; the use of International Data Transfer Agreements (IDTAs) or UK Addenda to EU Standard Contractual Clauses; or other legally recognised transfer mechanisms.
              </p>
              <p className="text-slate-300 leading-relaxed">
                6.3. You may request further details about the safeguards we use for international transfers by contacting us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>.
              </p>
            </section>

            {/* 7. Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                7. Data Retention
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                7.1. We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                7.2. Our standard retention periods are as follows:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Data Category</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Account data</td><td className="py-3 px-4">Duration of account plus 30 days after deletion request</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Project data and Customer Data</td><td className="py-3 px-4">Duration of account plus 30 days after account termination</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Financial and billing records</td><td className="py-3 px-4">7 years (as required by UK tax and accounting law)</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Contact form submissions</td><td className="py-3 px-4">2 years from submission date</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Analytics data</td><td className="py-3 px-4">26 months (anonymised and aggregated)</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4">Security logs</td><td className="py-3 px-4">12 months</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-300 leading-relaxed">
                7.3. When personal data is no longer required, we will securely delete or anonymise it. Anonymised data (from which you can no longer be identified) may be retained indefinitely for statistical and analytical purposes.
              </p>
            </section>

            {/* 8. Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                8. Your Data Protection Rights
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Under the UK GDPR, you have the following rights in relation to your personal data. You may exercise these rights at any time by contacting us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>.
              </p>
              <div className="space-y-4">
                {[
                  { right: "Right of Access", desc: "You have the right to request a copy of the personal data we hold about you. We will respond to your request within one month and provide the data in a commonly used electronic format." },
                  { right: "Right to Rectification", desc: "You have the right to request that we correct any inaccurate or incomplete personal data we hold about you. You can also update most of your information directly through your account settings." },
                  { right: "Right to Erasure", desc: "You have the right to request that we delete your personal data where there is no compelling reason for its continued processing. This right is not absolute and may be subject to legal retention requirements." },
                  { right: "Right to Restrict Processing", desc: "You have the right to request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or object to our processing." },
                  { right: "Right to Data Portability", desc: "You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller without hindrance." },
                  { right: "Right to Object", desc: "You have the right to object to the processing of your personal data where we are relying on legitimate interests as our lawful basis, including for direct marketing purposes." },
                  { right: "Rights Related to Automated Decision-Making", desc: "You have the right not to be subject to a decision based solely on automated processing (including profiling) that produces legal effects or similarly significantly affects you. Our AI processing is designed to assist, not replace, human decision-making." },
                  { right: "Right to Withdraw Consent", desc: "Where we rely on consent as the lawful basis for processing, you have the right to withdraw your consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal." },
                ].map((item) => (
                  <div key={item.right} className="p-4 rounded-lg border border-slate-700/30 bg-slate-800/20">
                    <h4 className="text-white font-semibold mb-2">{item.right}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mt-4">
                We will respond to all legitimate requests within one month. In exceptional circumstances, we may extend this period by a further two months, in which case we will inform you of the extension and the reasons for it. We do not charge a fee for exercising your rights unless the request is manifestly unfounded or excessive.
              </p>
            </section>

            {/* 9. Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                9. Data Security
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.1. We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls, regular security assessments, and employee training on data protection.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                9.2. While we take all reasonable steps to protect your data, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security but will notify you and the relevant supervisory authority of any data breach in accordance with our legal obligations.
              </p>
              <p className="text-slate-300 leading-relaxed">
                9.3. You are responsible for maintaining the security of your account credentials and for any activity that occurs under your account. Please use a strong, unique password and do not share your login details with others.
              </p>
            </section>

            {/* 10. Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                10. Cookie Policy
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                10.1. Our website and Platform use cookies and similar tracking technologies to enhance your experience, analyse usage, and support our operations. A cookie is a small text file placed on your device when you visit a website.
              </p>
              <h3 className="text-lg font-semibold text-white mb-3">Types of Cookies We Use</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Cookie Type</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Purpose</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Strictly Necessary</td><td className="py-3 px-4">Essential for the Platform to function, including authentication, security, and session management</td><td className="py-3 px-4">Session / up to 30 days</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Functional</td><td className="py-3 px-4">Remember your preferences, language settings, and customisations</td><td className="py-3 px-4">Up to 12 months</td></tr>
                    <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Analytics</td><td className="py-3 px-4">Help us understand how visitors interact with our website and Platform to improve our services</td><td className="py-3 px-4">Up to 26 months</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                10.2. <strong className="text-white">Managing Cookies.</strong> You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling certain cookies may affect the functionality of the Platform.
              </p>
              <p className="text-slate-300 leading-relaxed">
                10.3. We do not use third-party advertising cookies or tracking pixels for targeted advertising purposes.
              </p>
            </section>

            {/* 11. Children */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                11. Children's Privacy
              </h2>
              <p className="text-slate-300 leading-relaxed">
                The Platform is designed for use by construction professionals and businesses and is not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child, we will take steps to delete that information promptly.
              </p>
            </section>

            {/* 12. Changes */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                12.1. We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by email or through a prominent notice on our website or Platform at least thirty (30) days before the changes take effect.
              </p>
              <p className="text-slate-300 leading-relaxed">
                12.2. We encourage you to review this Privacy Policy periodically. The "Last updated" date at the top of this page indicates when the policy was last revised.
              </p>
            </section>

            {/* 13. Complaints */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                13. Complaints
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                13.1. If you are not satisfied with how we handle your personal data or wish to raise a concern, please contact us first at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>. We will investigate your concern and respond within a reasonable timeframe.
              </p>
              <p className="text-slate-300 leading-relaxed">
                13.2. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's supervisory authority for data protection. You can contact the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">ico.org.uk</a> or by telephone on 0303 123 1113.
              </p>
            </section>

            {/* 14. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                14. Contact Information
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                For any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="p-6 rounded-lg border border-slate-700/50 bg-slate-800/20">
                <p className="text-white font-semibold mb-2">Suddeco Ltd — Data Protection</p>
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
