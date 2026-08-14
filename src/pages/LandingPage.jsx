import { useEffect, useRef, useState } from "react";
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
import HardwareModel3D from "../components/3d/HardwareModel3D";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function LandingPage() {
  const lenisRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / docHeight, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Fixed dot grid background */}
      <div className="dot-grid" />

      {/* Fixed 3D model layer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", paddingTop: 64
      }}>
        <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
          <ErrorBoundary>
            <HardwareModel3D scrollProgress={scrollProgress} />
          </ErrorBoundary>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <ErrorBoundary>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <TechSection />
        <VisionSection />
        <FooterSection />
      </ErrorBoundary>
    </div>
  );
}
