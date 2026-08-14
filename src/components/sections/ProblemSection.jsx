import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sectors = [
  { id: "defense", title: "Defense & Aerospace", val: "Critical", desc: "Counterfeit parts in avionics and weapon systems risk national security and lives.", color: "#06B6D4" },
  { id: "auto", title: "Automotive", val: "Safety", desc: "Fake ICs in braking and steering control units lead to catastrophic failures.", color: "#F59E0B" },
  { id: "medical", title: "Medical Devices", val: "Fatal", desc: "Unverified components in pacemakers and life-support machines.", color: "#F43F5E" },
  { id: "consumer", title: "Consumer Tech", val: "Scale", desc: "Mass-market electronics suffer from battery explosions and data breaches.", color: "#8B5CF6" },
];

export default function ProblemSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="problem" ref={containerRef} className="section-pad" style={{ position: "relative", zIndex: 10 }}>
      
      {/* Background Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
        width: "80vw", height: "80vw", maxWidth: 1000, maxHeight: 1000,
        background: "radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: -1
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        
        {/* Header Asymmetric */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", marginBottom: "6rem" }}>
          <motion.div style={{ y: y1, maxWidth: 700 }}>
            <div className="section-badge" style={{ marginBottom: "2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rose)", boxShadow: "0 0 10px var(--rose)" }} />
              The Problem
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.04em", color: "#fff"
            }}>
              The <span className="grad-warm">Counterfeit</span><br/>Crisis.
            </h2>
          </motion.div>
          <motion.p style={{ y: y2, fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--muted)", maxWidth: 400, lineHeight: 1.6 }}>
            Fake integrated circuits are a silent epidemic infiltrating every layer of the global electronics supply chain — causing billions in damages and putting lives at risk.
          </motion.p>
        </div>

        {/* Big Stats Bento */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          
          <motion.div className="glass-xl" style={{ padding: "3rem", position: "relative", overflow: "hidden" }} whileHover={{ y: -5 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(245,158,11,0.1), transparent)", pointerEvents: "none" }} />
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>💸</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "4.5rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1, marginBottom: "1rem" }}>$75B</div>
            <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.6 }}>Annual global losses attributed to counterfeit electronics and IP theft.</div>
          </motion.div>

          <motion.div className="glass-xl" style={{ padding: "3rem", position: "relative", overflow: "hidden" }} whileHover={{ y: -5 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(244,63,94,0.1), transparent)", pointerEvents: "none" }} />
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>⚠️</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "4.5rem", fontWeight: 800, color: "var(--rose)", lineHeight: 1, marginBottom: "1rem" }}>15%</div>
            <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.6 }}>Of all replacement parts purchased by the Pentagon were estimated to be counterfeit.</div>
          </motion.div>

          <motion.div className="glass-xl" style={{ padding: "3rem", position: "relative", overflow: "hidden" }} whileHover={{ y: -5 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(6,182,212,0.1), transparent)", pointerEvents: "none" }} />
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>📉</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "4.5rem", fontWeight: 800, color: "var(--text)", lineHeight: 1, marginBottom: "1rem" }}>1 in 3</div>
            <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.6 }}>Electronics companies have unknowingly installed counterfeit parts in their products.</div>
          </motion.div>

        </div>

        {/* Sectors Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {sectors.map((s, i) => (
            <motion.div 
              key={s.id} 
              className="glass" 
              style={{ padding: "2rem", borderTop: `2px solid ${s.color}40` }}
              whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>{s.title}</h4>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 999, background: `${s.color}15` }}>{s.val}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
