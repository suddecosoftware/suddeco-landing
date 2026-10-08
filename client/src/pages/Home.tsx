/**
 * Home page — Suddeco AI Construction Management Platform
 * Design: Forge & Build — Bold Construction Authority
 * Dark professional theme with amber/gold accents
 */
import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import AppDownloadBar from "@/components/AppDownloadBar";
import SplitHero from "@/components/SplitHero";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import LearnSuddeco from "@/components/LearnSuddeco";
import WhySuddeco from "@/components/WhySuddeco";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  useEffect(() => {
    // Cross-page fragment navigation can arrive before React renders the section.
    const scrollToSection = () => {
      const sectionId = window.location.hash.slice(1);
      if (!["features", "how-it-works", "why-suddeco", "pricing", "faq", "contact"].includes(sectionId)) return;
      const section = document.getElementById(sectionId);
      if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 96, behavior: "instant" });
    };
    const frame = window.requestAnimationFrame(scrollToSection);
    window.addEventListener("hashchange", scrollToSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <TopBar />
      <Navbar />
      <AppDownloadBar />
      <main>
        <SplitHero />
        <TrustedBy />
        <ProductShowcase />
        <LearnSuddeco />
        <Hero />
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
