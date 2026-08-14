import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techs = [
  { icon: "📷", name: "Spatial Optics", desc: "Telecentric lenses and programmable LED rings eliminate shadows and distortion for perfect IC geometry capture." },
  { icon: "🧠", name: "TorchScript AI", desc: "Optimized, quantized models running directly on-edge for real-time inference without network latency." },
  { icon: "⛓️", name: "Immutable Ledger", desc: "Hash-linked blockchain technology ensuring every certificate is tamper-evident and permanently verifiable." },
  { icon: "⚛️", name: "React + WebGL", desc: "Hardware-accelerated dashboards providing 3D visualizations and real-time telemetry." },
];

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" ref={ref} style={{ position: "relative", zIndex: 10, padding: "10rem 4vw", paddingBottom: "12rem" }}>
      
      {/* Background Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "100vw", height: "50vh",
        background: "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: -1
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        
        {/* Header Centered */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: "6rem" }}>
          <div className="section-badge" style={{ marginBottom: "2rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
            The Stack
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Engineered for <span className="grad-cyan">Precision.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: 1.6, color: "var(--muted)", maxWidth: 600, margin: "1.5rem auto 0 auto" }}>
            We've built a proprietary stack that bridges physical optics with cutting-edge software to achieve unprecedented reliability.
          </p>
        </motion.div>

        {/* Bento Tech Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="glass"
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
              style={{ padding: "3rem 2.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}>{t.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>{t.name}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
