import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import ChipScene from "../3d/ChipScene";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Dedicated Inspection Rig",
    desc: "A purpose-built hardware platform with high-resolution optics, precision lighting, and controlled capture environment for reliable IC imaging.",
    accent: "#06B6D4",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Edge AI Inference",
    desc: "TorchScript models run directly on-device (Raspberry Pi / ESP32), delivering sub-100ms authenticity scores without cloud dependency.",
    accent: "#8B5CF6",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "OCR + GAN Analysis",
    desc: "Fine-tuned optical character recognition extracts IC markings, while generative adversarial networks score surface authenticity patterns.",
    accent: "#EC4899",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Cryptographic Certificates",
    desc: "Every verified component receives a tamper-evident digital passport stored in an immutable audit ledger with full chain-of-custody history.",
    accent: "#10B981",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="solution"
      ref={ref}
      style={{
        position: "relative", zIndex: 10,
        padding: "7rem 2rem",
        scrollMarginTop: 64,
      }}
    >
      {/* Cyan tint glow */}
      <div style={{
        position: "absolute", top: "10%", left: "-8%",
        width: 500, height: 500,
        background: "radial-gradient(ellipse, rgba(6,182,212,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999, marginBottom: "1.2rem",
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#06B6D4" }}>
              The Solution
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            letterSpacing: "-0.05em", lineHeight: 1.05,
            marginBottom: "1.2rem",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Meet </span>
            <span style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Authentichip.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font)", fontSize: "1rem", lineHeight: 1.75,
            color: "#6B7A99", maxWidth: 580, margin: "0 auto",
          }}>
            An end-to-end IC authentication ecosystem combining precision hardware, edge AI, and immutable record-keeping to give every engineer certainty about every component.
          </p>
        </motion.div>

        {/* Two-col: features left, 3D right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
          className="soln-grid"
        >
          {/* Feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="feat-grid">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: `${f.accent}35` }}
                className="glass"
                style={{
                  padding: "1.6rem 1.4rem",
                  cursor: "default",
                  borderColor: "rgba(255,255,255,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: `${f.accent}18`,
                  border: `1px solid ${f.accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: f.accent, marginBottom: "1rem",
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font)", fontWeight: 700,
                  fontSize: "0.88rem", letterSpacing: "-0.02em",
                  color: "#F0F6FF", marginBottom: "0.5rem",
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: "var(--font)", fontSize: "0.76rem",
                  lineHeight: 1.65, color: "#6B7A99",
                }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* 3D chip on right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 460, position: "relative" }}
          >
            {/* Glow backdrop */}
            <div style={{
              position: "absolute", inset: "10%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(6,182,212,0.12), rgba(139,92,246,0.08), transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }} />
            <Suspense fallback={null}>
              <ChipScene style={{ width: "100%", height: "100%", pointerEvents: "none" }} />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
        pointerEvents: "none",
      }} />

      <style>{`
        @media (max-width: 860px) {
          .soln-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr 1fr; }
          .soln-grid > div:last-child { height: 300px !important; }
        }
        @media (max-width: 480px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
