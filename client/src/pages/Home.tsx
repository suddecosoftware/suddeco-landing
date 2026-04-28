/**
 * Home page — Suddeco AI Construction Management Platform
 * Design: Forge & Build — Bold Construction Authority
 * Dark professional theme with amber/gold accents
 */
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PersonaTiles from "@/components/PersonaTiles";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WhySuddeco from "@/components/WhySuddeco";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getAudience } from "@/lib/audience-cookie";

const AUDIENCE_DESTINATIONS = {
  homeowner: "https://suddecohomes.com/?source=landing&audience=homeowner",
  contractor: "https://my.suddeco.com/register?audience=contractor&source=landing",
} as const;

export default function Home() {
  const [audienceChecked, setAudienceChecked] = useState(false);

  useEffect(() => {
    const audience = getAudience();
    if (audience) {
      window.location.href = AUDIENCE_DESTINATIONS[audience];
      return;
    }
    setAudienceChecked(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <TopBar />
      <Navbar />
      <main>
        {audienceChecked ? <PersonaTiles /> : null}
        <Hero />
        <ProductShowcase />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <WhySuddeco />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
