import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Component Capture",
    subtitle: "Precision Imaging",
    desc: "The IC is placed in the inspection rig. High-resolution cameras capture multiple angles under controlled LED lighting, producing crisp images of every marking, logo, and surface texture.",
    details: ["Multi-angle capture", "LED lighting control", "4K resolution", "Auto-focus calibration"],
    accent: "#06B6D4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "AI Analysis",
    subtitle: "OCR + GAN Scoring",
    desc: "A fine-tuned OCR model extracts text from the IC surface — part numbers, date codes, logos. Simultaneously, a GAN-based authenticity model scores the visual pattern against OEM-trained baselines.",
    details: ["Fine-tuned OCR", "GAN pattern scoring", "Anomaly detection", "Confidence metrics"],
    accent: "#8B5CF6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Datasheet Matching",
    subtitle: "Rules Engine",
    desc: "Extracted data is cross-referenced against OEM datasheets and known-good samples. A multi-rule validation engine checks part numbers, manufacturer logos, date code ranges, and spatial layouts.",
    details: ["OEM datasheet DB", "Part number validation", "Logo verification", "Layout analysis"],
    accent: "#EC4899",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Cryptographic Passport",
    subtitle: "Immutable Certification",
    desc: "Verified components receive a cryptographic digital passport — a hash-linked, tamper-evident record stored in an immutable audit ledger. Any party can verify authenticity at any point in the supply chain.",
    details: ["SHA-256 hash chain", "Immutable ledger", "Verification API", "Full audit history"],
    accent: "#10B981",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section
      id="howitworks"
      ref={ref}
      style={{
        position: "relative", zIndex: 10,
        padding: "7rem 2rem",
        scrollMarginTop: 64,
      }}
    >
      <div style={{
        position: "absolute", top: "30%", right: "-5%",
        width: 400, height: 400,
        background: "radial-gradient(ellipse, rgba(139,92,246,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999, marginBottom: "1.2rem",
            background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B5CF6" }}>
              The Process
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            letterSpacing: "-0.05em", lineHeight: 1.05,
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>How It Would Work</span>
          </h2>
        </motion.div>

        {/* Steps + Detail panel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
          className="hiw-grid"
        >
          {/* Step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {steps.map((s, i) => {
              const isAct = active === i;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", gap: "1.1rem",
                    padding: "1.2rem 1.4rem",
                    borderRadius: 14, cursor: "pointer",
                    border: `1px solid ${isAct ? s.accent + "45" : "rgba(255,255,255,0.06)"}`,
                    background: isAct ? `${s.accent}0A` : "rgba(255,255,255,0.01)",
                    boxShadow: isAct ? `0 0 30px ${s.accent}18` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{
                    minWidth: 44, height: 44, borderRadius: 10,
                    background: isAct ? s.accent : "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isAct ? "#fff" : "#6B7A99",
                    fontFamily: "var(--font)", fontWeight: 800, fontSize: "0.82rem",
                    transition: "all 0.3s ease", flexShrink: 0,
                  }}>{s.n}</div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{
                      fontFamily: "var(--font)", fontWeight: 700, fontSize: "0.92rem",
                      color: isAct ? "#F0F6FF" : "#B0BDD6",
                      transition: "color 0.3s ease", marginBottom: 2,
                    }}>{s.title}</div>
                    <div style={{
                      fontFamily: "var(--font)", fontSize: "0.72rem",
                      color: isAct ? s.accent : "#6B7A99",
                      transition: "color 0.3s ease",
                    }}>{s.subtitle}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass"
                style={{
                  padding: "2.8rem 2.4rem",
                  borderColor: `${steps[active].accent}25`,
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 340,
                }}
              >
                {/* Glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 200, height: 200,
                  background: `radial-gradient(circle at top right, ${steps[active].accent}20, transparent 70%)`,
                  pointerEvents: "none",
                }} />
                {/* Watermark number */}
                <div style={{
                  position: "absolute", top: "-1.5rem", right: "1.5rem",
                  fontFamily: "var(--font)", fontWeight: 900, fontSize: "8rem",
                  color: "rgba(255,255,255,0.025)", lineHeight: 1,
                  userSelect: "none", pointerEvents: "none", letterSpacing: "-0.06em",
                }}>{steps[active].n}</div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Icon */}
                  <div style={{
                    width: 54, height: 54, borderRadius: 14,
                    background: `${steps[active].accent}15`,
                    border: `1px solid ${steps[active].accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: steps[active].accent,
                    marginBottom: "1.4rem",
                  }}>{steps[active].icon}</div>

                  {/* Badge */}
                  <div style={{
                    display: "inline-block",
                    padding: "3px 12px", borderRadius: 999, marginBottom: "0.9rem",
                    background: `${steps[active].accent}15`,
                    border: `1px solid ${steps[active].accent}35`,
                    fontFamily: "var(--font)", fontSize: "0.65rem",
                    fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: steps[active].accent,
                  }}>{steps[active].subtitle}</div>

                  <h3 style={{
                    fontFamily: "var(--font)", fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    letterSpacing: "-0.04em",
                    background: `linear-gradient(135deg, ${steps[active].accent}, #F0F6FF)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    marginBottom: "1rem",
                  }}>{steps[active].title}</h3>

                  <p style={{
                    fontFamily: "var(--font)", fontSize: "0.9rem",
                    lineHeight: 1.75, color: "#6B7A99", marginBottom: "1.8rem",
                  }}>{steps[active].desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {steps[active].details.map(d => (
                      <motion.span
                        key={d}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          padding: "5px 13px", borderRadius: 999,
                          background: `${steps[active].accent}12`,
                          border: `1px solid ${steps[active].accent}28`,
                          fontFamily: "var(--font)", fontSize: "0.75rem",
                          fontWeight: 600, color: steps[active].accent,
                        }}
                      >{d}</motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", justifyContent: "center" }}>
              {steps.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: active === i ? 24 : 7, height: 7, borderRadius: 999,
                  background: active === i ? s.accent : "rgba(255,255,255,0.15)",
                  border: "none", cursor: "pointer",
                  boxShadow: active === i ? `0 0 10px ${s.accent}80` : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
        pointerEvents: "none",
      }} />

      <style>{`
        @media (max-width: 860px) {
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}