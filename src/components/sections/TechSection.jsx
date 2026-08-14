import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techs = [
  {
    icon: "🔬",
    name: "Computer Vision",
    desc: "Fine-tuned models extract IC markings, logos, and surface defects from high-res imagery with OEM-trained precision.",
    accent: "#06B6D4",
    wide: false,
  },
  {
    icon: "🧠",
    name: "GAN Neural Networks",
    desc: "Generative adversarial networks trained on authentic vs. counterfeit IC surface patterns, producing probabilistic authenticity scores.",
    accent: "#8B5CF6",
    wide: false,
  },
  {
    icon: "⚡",
    name: "Edge AI Runtime",
    desc: "TorchScript models optimised for Raspberry Pi and ESP32 deployment. Full inference in under 100ms without any cloud calls.",
    accent: "#EC4899",
    wide: true,
  },
  {
    icon: "📜",
    name: "Immutable Audit Ledger",
    desc: "MongoDB-based tamper-evident logging with hash-chained records for full chain-of-custody traceability and dispute resolution.",
    accent: "#10B981",
    wide: false,
  },
  {
    icon: "🔐",
    name: "Cryptographic Passports",
    desc: "SHA-256 hash-linked digital certificates for each verified component, readable via public verification API.",
    accent: "#F59E0B",
    wide: false,
  },
  {
    icon: "📡",
    name: "OCR Engine",
    desc: "Optical character recognition fine-tuned for IC marking fonts, reading part numbers, date codes, and manufacturer symbols.",
    accent: "#818CF8",
    wide: true,
  },
  {
    icon: "⚙️",
    name: "FastAPI Backend",
    desc: "High-performance Python microservices handling model inference requests, database logging, and certificate issuance.",
    accent: "#06B6D4",
    wide: false,
  },
  {
    icon: "🎨",
    name: "React + Three.js UI",
    desc: "Modern frontend with 3D visualisations, real-time scan feedback, and role-based views for Admin, Worker, and Customer users.",
    accent: "#8B5CF6",
    wide: false,
  },
];

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tech"
      ref={ref}
      style={{
        position: "relative", zIndex: 10,
        padding: "7rem 2rem",
        scrollMarginTop: 64,
      }}
    >
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 400,
        background: "radial-gradient(ellipse, rgba(6,182,212,0.05), rgba(139,92,246,0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999, marginBottom: "1.2rem",
            background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818CF8" }}>
              Technology Stack
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            letterSpacing: "-0.05em", lineHeight: 1.05, marginBottom: "1.2rem",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Powered by</span>
            {" "}
            <span style={{
              background: "linear-gradient(135deg, #818CF8, #06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Precision Tech.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font)", fontSize: "1rem", lineHeight: 1.75,
            color: "#6B7A99", maxWidth: 520, margin: "0 auto",
          }}>
            Every layer of Authentichip is engineered with best-in-class tools — from edge hardware to cloud-grade AI and immutable data storage.
          </p>
        </motion.div>

        {/* Tech bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          gridAutoRows: "auto",
        }}
          className="tech-bento"
        >
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: `${t.accent}40`, boxShadow: `0 20px 50px ${t.accent}15` }}
              className="glass"
              style={{
                padding: "1.6rem",
                gridColumn: t.wide ? "span 2" : "span 1",
                cursor: "default",
                borderColor: "rgba(255,255,255,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "70%", height: 1,
                background: `linear-gradient(90deg, transparent, ${t.accent}60, transparent)`,
                pointerEvents: "none",
              }} />

              <div style={{ fontSize: "1.75rem", marginBottom: "0.9rem" }}>{t.icon}</div>
              <h3 style={{
                fontFamily: "var(--font)", fontWeight: 700,
                fontSize: "0.95rem", letterSpacing: "-0.02em",
                color: "#F0F6FF", marginBottom: "0.5rem",
              }}>{t.name}</h3>
              <p style={{
                fontFamily: "var(--font)", fontSize: "0.78rem",
                lineHeight: 1.65, color: "#6B7A99",
              }}>{t.desc}</p>

              {/* Accent dot bottom-right */}
              <div style={{
                position: "absolute", bottom: 12, right: 12,
                width: 6, height: 6, borderRadius: "50%",
                background: t.accent,
                boxShadow: `0 0 8px ${t.accent}`,
                opacity: 0.6,
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)",
        pointerEvents: "none",
      }} />

      <style>{`
        @media (max-width: 1024px) {
          .tech-bento { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .tech-bento { grid-template-columns: 1fr !important; }
          .tech-bento > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
