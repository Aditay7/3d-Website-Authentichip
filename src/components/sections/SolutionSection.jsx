import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    title: "Dedicated Inspection Rig",
    desc: "A purpose-built hardware platform with high-resolution optics, precision lighting, and controlled capture environment for reliable IC imaging.",
    accent: "#06B6D4",
  },
  {
    title: "Edge AI Inference",
    desc: "TorchScript models run directly on-device (Raspberry Pi / ESP32), delivering sub-100ms authenticity scores without cloud dependency.",
    accent: "#8B5CF6",
  },
  {
    title: "OCR + GAN Analysis",
    desc: "Fine-tuned optical character recognition extracts IC markings, while generative adversarial networks score surface authenticity patterns.",
    accent: "#EC4899",
  },
  {
    title: "Cryptographic Certificates",
    desc: "Every verified component receives a tamper-evident digital passport stored in an immutable audit ledger with full chain-of-custody history.",
    accent: "#10B981",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solution" ref={ref} style={{ position: "relative", zIndex: 10, padding: "10rem 4vw" }}>
      
      {/* Ambient background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "-10%",
        width: "60vw", height: "60vw", maxWidth: 800, maxHeight: 800,
        background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: -1
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "5rem" }}>
          <div className="section-badge" style={{ marginBottom: "2rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
            The Solution
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Meet <span className="grad-cyan">Authentichip.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: 1.6, color: "var(--muted)", maxWidth: 600, marginTop: "1.5rem" }}>
            An end-to-end IC authentication ecosystem combining precision hardware, edge AI, and immutable record-keeping to give every engineer certainty about every component.
          </p>
        </motion.div>

        {/* Asymmetric Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "stretch" }} className="soln-grid">
          
          {/* Features Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="feat-grid">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, borderColor: `${f.accent}50`, backgroundColor: "rgba(255,255,255,0.04)" }}
                className="glass"
                style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${f.accent}20, transparent)`, pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "#fff", marginBottom: "0.8rem" }}>{f.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>{f.desc}</p>
                <div style={{ position: "absolute", bottom: 20, right: 20, width: 8, height: 8, borderRadius: "50%", background: f.accent, boxShadow: `0 0 12px ${f.accent}` }} />
              </motion.div>
            ))}
          </div>

          {/* Scanning HUD Overlay to frame the 3D model */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ position: "relative", minHeight: 500, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2rem" }}
          >
            {/* Corner Brackets */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 30, height: 30, borderTop: "1px solid var(--cyan)", borderLeft: "1px solid var(--cyan)", opacity: 0.6 }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 30, height: 30, borderTop: "1px solid var(--cyan)", borderRight: "1px solid var(--cyan)", opacity: 0.6 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 30, borderBottom: "1px solid var(--cyan)", borderLeft: "1px solid var(--cyan)", opacity: 0.6 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderBottom: "1px solid var(--cyan)", borderRight: "1px solid var(--cyan)", opacity: 0.6 }} />

            {/* Scanning Line Animation */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)", opacity: 0.5, zIndex: 0 }} 
            />

            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8 }}>
              <span>OPTICS // ACTIVE</span>
              <span>SYS // ON</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <div style={{ width: 3, height: 3, background: "var(--cyan)", borderRadius: "50%", boxShadow: "0 0 8px var(--cyan)" }} />
                <div style={{ width: 3, height: 3, background: "rgba(6,182,212,0.3)", borderRadius: "50%" }} />
                <div style={{ width: 3, height: 3, background: "rgba(6,182,212,0.3)", borderRadius: "50%" }} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>TRACKING</span>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .soln-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
