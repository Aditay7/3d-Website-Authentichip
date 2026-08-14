import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  { n: "01", title: "Component Capture", subtitle: "Precision Imaging", desc: "The IC is placed in the inspection rig. High-resolution cameras capture multiple angles under controlled LED lighting, producing crisp images of every marking, logo, and surface texture.", details: ["Multi-angle capture", "LED lighting control", "4K resolution"], accent: "#06B6D4" },
  { n: "02", title: "AI Analysis", subtitle: "OCR + GAN Scoring", desc: "A fine-tuned OCR model extracts text from the IC surface. Simultaneously, a GAN-based authenticity model scores the visual pattern against OEM-trained baselines.", details: ["Fine-tuned OCR", "GAN pattern scoring", "Anomaly detection"], accent: "#8B5CF6" },
  { n: "03", title: "Datasheet Matching", subtitle: "Rules Engine", desc: "Extracted data is cross-referenced against OEM datasheets and known-good samples. A multi-rule validation engine checks part numbers, manufacturer logos, and date code ranges.", details: ["OEM datasheet DB", "Part number validation", "Logo verification"], accent: "#EC4899" },
  { n: "04", title: "Cryptographic Passport", subtitle: "Immutable Certification", desc: "Verified components receive a cryptographic digital passport — a hash-linked, tamper-evident record stored in an immutable audit ledger.", details: ["SHA-256 hash chain", "Immutable ledger", "Full audit history"], accent: "#10B981" },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section id="howitworks" ref={ref} style={{ position: "relative", zIndex: 10, padding: "10rem 4vw" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "5rem" }}>
          <div className="section-badge" style={{ marginBottom: "2rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", boxShadow: "0 0 10px var(--violet)" }} />
            The Process
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            How It <span className="grad-violet">Operates.</span>
          </h2>
        </motion.div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }} className="hiw-grid">
          
          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {steps.map((s, i) => {
              const isAct = active === i;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  onClick={() => setActive(i)}
                  className={isAct ? "glass" : ""}
                  style={{
                    padding: "1.5rem", borderRadius: "var(--radius)", cursor: "pointer",
                    border: isAct ? `1px solid ${s.accent}50` : "1px solid transparent",
                    background: isAct ? `${s.accent}15` : "transparent",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  whileHover={!isAct ? { x: 10, backgroundColor: "rgba(255,255,255,0.03)" } : {}}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: isAct ? s.accent : "var(--muted)", transition: "color 0.4s" }}>{s.n}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: isAct ? "#fff" : "rgba(255,255,255,0.6)", marginBottom: 4, transition: "color 0.4s" }}>{s.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: isAct ? `${s.accent}90` : "var(--muted)", transition: "color 0.4s" }}>{s.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Details Panel */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.8 }} style={{ height: "100%" }}>
            <div className="glass-xl" style={{ padding: "4vw", position: "relative", overflow: "hidden", minHeight: 480, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: `radial-gradient(circle at top right, ${steps[active].accent}30, transparent 70%)`, pointerEvents: "none" }} />
                  
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: steps[active].accent, marginBottom: "1rem" }}>
                    Phase {steps[active].n}
                  </div>
                  
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                    {steps[active].title}
                  </h3>
                  
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 500, marginBottom: "3rem" }}>
                    {steps[active].desc}
                  </p>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {steps[active].details.map((d, i) => (
                      <motion.div key={d} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#fff" }}>
                        {d}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}