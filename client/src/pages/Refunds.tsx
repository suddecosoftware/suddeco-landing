import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// DRAFT: have a solicitor review before relying on this
export default function Refunds() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="Refunds and Cancellations | Suddeco"
        description="Read Suddeco's refund and cancellation policy for subscription plans and credit packs."
        canonicalPath="/refunds"
      />
      <TopBar />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Refunds and Cancellations
            </h1>
            <p className="text-slate-400 text-lg">Last updated: 4 October 2026</p>
          </div>

          {/* DRAFT: have a solicitor review before relying on this */}
          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Summary
              </h2>
              <p className="leading-relaxed">
                This policy explains how cancellations and refund requests work for Suddeco subscription plans and credit packs. It should be read with our Terms of Service. Nothing in this policy limits any statutory rights that apply to you under UK law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Subscription Plans
              </h2>
              <p className="leading-relaxed mb-3">
                Paid plans renew monthly or annually depending on the option selected at checkout. You can cancel a subscription before the next renewal date. After cancellation, access normally continues until the end of the paid billing period.
              </p>
              <p className="leading-relaxed">
                We do not usually provide pro-rata refunds for unused time in a billing period unless required by law, agreed by us in writing, or connected to a confirmed billing error or material service failure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Credit Packs
              </h2>
              <p className="leading-relaxed mb-3">
                Credit packs are prepaid digital credits used for platform actions. Credits that have already been consumed are not refundable.
              </p>
              <p className="leading-relaxed">
                Unused credit pack refund requests are reviewed case by case. We may decline a refund where the purchase was made by a business customer, where credits have been used, or where refunding would conflict with the terms accepted at purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Consumer Cooling-Off Rights
              </h2>
              <p className="leading-relaxed mb-3">
                If you are buying as a UK consumer, you may have a 14-day cooling-off right for online purchases. Digital services can be different if you ask us to start providing the service during that period and acknowledge that this may affect cancellation rights.
              </p>
              <p className="leading-relaxed">
                Most Suddeco purchases are for business use. Business customers do not usually have the same consumer cooling-off rights, but we will still review genuine billing errors and service-failure cases fairly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                How to Request a Refund
              </h2>
              <p className="leading-relaxed mb-3">
                Email <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a> within 14 days of the charge you want us to review. Include the account email, invoice or receipt details, the reason for the request, and whether you bought as a consumer or for business use.
              </p>
              <p className="leading-relaxed">
                Approved refunds are returned to the original payment method where possible. Payment processing times depend on your bank or card provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Account Closure
              </h2>
              <p className="leading-relaxed">
                Cancelling a paid plan does not automatically delete your account or project data. If you want account closure or data deletion, contact us at <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
