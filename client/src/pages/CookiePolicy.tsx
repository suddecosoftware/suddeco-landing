import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const storageRows = [
  {
    name: "suddeco_cookie_consent",
    type: "Local storage",
    purpose: "Remembers whether you accepted all cookies or essential cookies only, so the banner does not reappear on every visit.",
    duration: "Until you clear site data in your browser.",
  },
  {
    name: "theme",
    type: "Local storage",
    purpose: "Remembers your light or dark theme preference.",
    duration: "Until you clear site data or change the setting.",
  },
  {
    name: "suddeco_visitor",
    type: "Cookie",
    purpose: "With Accept All selected, created when you submit a demo form to link the request to the same browser. Without optional consent, the form uses a temporary request identifier without creating this cookie.",
    duration: "Up to 180 days.",
  },
  {
    name: "Optional advertising measurement",
    type: "Cookies and page-view events",
    purpose: "Enabled only after Accept All to measure visits and advertising performance.",
    duration: "Cookie expiry varies; inspect or remove these cookies in your browser settings.",
  },
  {
    name: "suddeco_demo_registrations",
    type: "Local storage",
    purpose: "Keeps a local copy of demo registration details after you submit the demo form, helping the page show a confirmation even if the network is interrupted.",
    duration: "Until you clear site data in your browser.",
  },
  {
    name: "suddeco_demo_count_pro / suddeco_demo_count_homeowner",
    type: "Local storage",
    purpose: "Remembers the visible demo queue position for the Pro or Homeowner demo page.",
    duration: "Until you clear site data in your browser.",
  },
];

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <SEOHead
        title="Cookie Policy | Suddeco"
        description="Read how Suddeco uses cookies and browser storage on suddeco.com, including purposes, duration, and how to withdraw consent."
        canonicalPath="/cookie-policy"
      />
      <TopBar />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-slate-400 text-lg">Last updated: 8 October 2026</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                What This Site Uses
              </h2>
              <p className="text-slate-300 leading-relaxed">
                This policy covers cookies and browser storage used on suddeco.com. Essential storage remembers your choices and supports submitted demo requests. Optional analytics and advertising measurement start only after you choose Accept All. Choosing Essential Only or closing the banner leaves optional tracking off.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Cookies and Storage
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-slate-900/80">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-amber-300">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-amber-300">Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-amber-300">Purpose</th>
                      <th className="px-4 py-3 text-left font-semibold text-amber-300">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {storageRows.map((row) => (
                      <tr key={row.name}>
                        <td className="px-4 py-4 font-mono text-xs text-white">{row.name}</td>
                        <td className="px-4 py-4">{row.type}</td>
                        <td className="px-4 py-4">{row.purpose}</td>
                        <td className="px-4 py-4">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Analytics and Tracking
              </h2>
              <p className="text-slate-300 leading-relaxed">
                If you choose Accept All, we measure page visits and advertising performance. Our own visit event includes the page path and campaign source, medium and campaign name from the link; it does not include the full query string or demo form fields. An optional advertising script also receives a page-view event and may use cookies. We do not capture email addresses as you type. The demo form sends the details you explicitly submit whether or not you accept optional tracking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                How to Withdraw Consent
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                You can withdraw or change your choice by clearing cookies and site data for suddeco.com in your browser settings. When you next visit, the cookie banner will appear again.
              </p>
              <p className="text-slate-300 leading-relaxed">
                You can also block or delete cookies through your browser. Some choices, such as theme preference or demo confirmation details, may be forgotten if you clear site data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3 mb-4">
                Contact
              </h2>
              <p className="text-slate-300 leading-relaxed">
                For questions about this policy, email <a href="mailto:sales@suddeco.com" className="text-amber-400 hover:text-amber-300 underline">sales@suddeco.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
