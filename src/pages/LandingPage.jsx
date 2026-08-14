import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "../components/layout/Navbar";
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  TechSection,
  VisionSection,
  FooterSection,
} from "../components/sections";

export default function LandingPage() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Fixed dot grid background */}
      <div className="dot-grid" />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TechSection />
      <VisionSection />
      <FooterSection />
    </div>
  );
}
