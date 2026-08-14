import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" ref={ref} style={{ position: "relative", zIndex: 10, padding: "8rem 4vw", paddingBottom: "12rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1 }} className="glass-xl" style={{ padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
          
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
          
          <div className="section-badge" style={{ marginBottom: "2rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", boxShadow: "0 0 10px var(--violet)" }} />
            The Future
          </div>
          
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "2rem" }}>
            Securing the world's<br/>hardware foundation.
          </h2>
          
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--muted)", maxWidth: 600, margin: "0 auto 3rem auto" }}>
            Authentichip isn't just a scanner; it's a new standard of trust. By integrating AI and cryptography at the point of inspection, we are ensuring that the future of technology is built on authentic foundations.
          </p>

          <a href="#hero" className="btn-shimmer" style={{
            display: "inline-flex", padding: "16px 36px", borderRadius: 999,
            background: "var(--text)", color: "var(--bg)", textDecoration: "none",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem",
            boxShadow: "0 0 40px rgba(255,255,255,0.2)",
            transition: "transform 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Join the Movement
          </a>
        </motion.div>

      </div>
    </section>
  );
}
