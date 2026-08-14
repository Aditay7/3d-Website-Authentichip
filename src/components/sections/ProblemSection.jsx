import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    number: "$75B",
    label: "Annual counterfeit electronics market globally",
    icon: "💸",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    number: "15%",
    label: "Of all ICs in global supply chains are estimated to be counterfeit",
    icon: "⚠️",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.2)",
  },
  {
    number: "1 in 3",
    label: "Electronics companies have unknowingly installed counterfeit parts",
    icon: "🔴",
    color: "#F43F5E",
    glow: "rgba(244,63,94,0.2)",
  },
  {
    number: "0",
    label: "Reliable, affordable, real-time authentication solutions available today",
    icon: "🚫",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.2)",
  },
];

const incidents = [
  {
    domain: "🛡️ Defense",
    text: "Counterfeit microchips in military equipment pose critical failure risks during operations.",
  },
  {
    domain: "🚗 Automotive",
    text: "Fake ICs in braking and airbag systems have been linked to fatal vehicle failures.",
  },
  {
    domain: "✈️ Aerospace",
    text: "Aviation electronics with counterfeit parts have caused navigation system malfunctions.",
  },
  {
    domain: "🏥 Medical",
    text: "Counterfeit semiconductors in medical devices risk patient safety and regulatory compliance.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      ref={ref}
      style={{
        position: "relative", zIndex: 10,
        padding: "7rem 2rem",
        scrollMarginTop: 64,
      }}
    >
      {/* Red/amber tint background */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(239,68,68,0.04) 40%, rgba(245,158,11,0.03) 70%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "5%",
        width: 480, height: 480,
        background: "radial-gradient(ellipse, rgba(239,68,68,0.08), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999, marginBottom: "1.2rem",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F43F5E" }}>
              The Problem
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
              display: "block",
            }}>The Counterfeit</span>
            <span style={{
              background: "linear-gradient(135deg, #EF4444, #F59E0B)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "block",
            }}>IC Crisis.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font)", fontSize: "1rem", lineHeight: 1.75, color: "#6B7A99", maxWidth: 560,
          }}>
            Counterfeit integrated circuits are a silent epidemic infiltrating every layer of the global electronics supply chain — from consumer gadgets to life-critical systems.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "4rem",
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, boxShadow: `0 20px 60px ${s.glow}` }}
              className="glass"
              style={{
                padding: "2rem 1.75rem",
                borderColor: `${s.color}25`,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 100, height: 100,
                background: `radial-gradient(circle at top right, ${s.glow}, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "1.6rem", marginBottom: "0.9rem" }}>{s.icon}</div>
              <div style={{
                fontFamily: "var(--font)", fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                letterSpacing: "-0.05em",
                color: s.color,
                textShadow: `0 0 30px ${s.color}60`,
                marginBottom: "0.6rem",
              }}>{s.number}</div>
              <p style={{
                fontFamily: "var(--font)", fontSize: "0.82rem",
                lineHeight: 1.6, color: "#6B7A99",
              }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Incident bento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <div style={{
            fontFamily: "var(--font)", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#6B7A99", marginBottom: "1.2rem",
          }}>
            Affected Sectors
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}>
            {incidents.map((inc, i) => (
              <motion.div
                key={inc.domain}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.08 }}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", flexDirection: "column", gap: "0.5rem",
                }}
              >
                <div style={{
                  fontFamily: "var(--font)", fontWeight: 700,
                  fontSize: "0.85rem", color: "#F0F6FF",
                }}>{inc.domain}</div>
                <p style={{
                  fontFamily: "var(--font)", fontSize: "0.78rem",
                  lineHeight: 1.65, color: "#6B7A99",
                }}>{inc.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
