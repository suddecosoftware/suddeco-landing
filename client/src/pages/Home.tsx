/**
 * Home page — Suddeco AI Construction Management Platform
 * Design: Forge & Build — Bold Construction Authority
 * Dark professional theme with amber/gold accents
 */
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <TopBar />
      <Navbar />
      <main>
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
