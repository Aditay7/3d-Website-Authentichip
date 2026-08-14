import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef(null);
  
  // Parallax for text and elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yStats = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Magnetic button effect
  const btnRef = useRef(null);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleMouseLeave = () => {
    btnRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "110vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 4vw",
        paddingTop: "10vh",
        zIndex: 10,
        pointerEvents: "none", // Let clicks pass through to 3D canvas where needed
      }}
    >
      {/* Deep Mesh Gradient Background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: -1,
        background: "radial-gradient(circle at 20% 40%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(139,92,246,0.1) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />

      <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10, pointerEvents: "auto" }}>
        
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "2rem" }}
        >
          <div className="section-badge">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
            AI-Powered Authentication
          </div>
        </motion.div>

        {/* Massive Typography */}
        <motion.div style={{ y: yText, opacity: opacityText, position: "relative", zIndex: 20 }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 11vw, 12rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "#ffffff",
              mixBlendMode: "overlay", // Makes text interact with 3D model underneath
              textShadow: "0 20px 40px rgba(0,0,0,0.5)",
              maxWidth: "80%",
            }}
          >
            Trust Every
            <br />
            <span style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingRight: "0.1em"
            }}>
              IC You Touch.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 580,
              marginTop: "2.5rem",
              fontWeight: 400,
            }}
          >
            A cinematic leap in semiconductor authentication. Driven by edge AI, spatial OCR, and immutable ledgers. Counterfeits are officially obsolete.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: "3.5rem", display: "flex", gap: "1.5rem" }}
          >
            <a
              ref={btnRef}
              href="#problem"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass"
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                padding: "16px 36px",
                borderRadius: 999,
                fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem",
                color: "#fff", textDecoration: "none",
                background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 40px rgba(6,182,212,0.3)",
                transition: "transform 0.1s ease-out, background 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(6,182,212,0.4), rgba(139,92,246,0.4))";
                e.currentTarget.style.boxShadow = "0 0 60px rgba(6,182,212,0.5)";
              }}
            >
              Enter the Vision
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats / Accents at bottom left */}
        <motion.div 
          style={{ y: yStats, position: "absolute", bottom: "-15vh", left: 0, display: "flex", gap: "4rem", opacity: opacityText }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--cyan)", lineHeight: 1 }}>99.9%</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>Accuracy Rate</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--violet)", lineHeight: 1 }}>{"<"}100ms</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.5rem" }}>Edge Inference</div>
          </div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute", bottom: "5vh", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          pointerEvents: "auto"
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
