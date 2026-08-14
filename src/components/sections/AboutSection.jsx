import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Modular Architecture",
    description: "Camera-enabled capture, edge inference, backend ML, and immutable audit trails",
    icon: "⚡",
    details: ["Edge Computing Layer", "Backend ML Services", "Cryptographic Passport", "Audit Database"],
    accent: "#06B6D4",
  },
  {
    title: "Role-Based Access",
    description: "Admin, Worker, and User roles with tailored interfaces and permissions",
    icon: "👥",
    details: ["Admin Dashboard", "Worker Interface", "Customer Portal", "Device Manager"],
    accent: "#8B5CF6",
  },
  {
    title: "AI-Powered Detection",
    description: "Advanced OCR, anomaly detection, and GAN-based authenticity scoring",
    icon: "🤖",
    details: ["OCR Processing", "Anomaly Detection", "GAN Scoring", "Confidence Analysis"],
    accent: "#EC4899",
  },
  {
    title: "Immutable Provenance",
    description: "Cryptographic component passports with blockchain-verified authenticity",
    icon: "🔐",
    details: ["Hash Generation", "Ledger Storage", "Verification API", "Audit Trails"],
    accent: "#10B981",
  },
];

const stats = [
  { value: "99.9%", label: "Accuracy Rate",    color: "#06B6D4" },
  { value: "<100ms", label: "Edge Processing", color: "#8B5CF6" },
  { value: "24/7",   label: "Monitoring",      color: "#EC4899" },
  { value: "∞",      label: "Audit Trail",     color: "#10B981" },
];

const techStack = [
  "React + Vite", "Three.js", "TorchScript", "MongoDB",
  "Raspberry Pi", "FastAPI", "GAN Models", "Edge AI",
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad"
      style={{ position: "relative", zIndex: 10, scrollMarginTop: "64px" }}
    >
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "20%", right: "5%",
        width: "400px", height: "400px",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            marginBottom: "1.2rem",
          }}>
            <span style={{
              fontFamily: "var(--font)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#10B981",
            }}>
              Our Technology
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "-0.04em", lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              About
            </span>{" "}
            <span className="grad-cyan">Authentichip</span>
          </h2>
          <p style={{
            fontFamily: "var(--font)", fontSize: "1rem",
            lineHeight: 1.75, color: "#6B7A99", maxWidth: "520px", margin: "0 auto",
          }}>
            Protecting electronics supply chain integrity through cutting-edge AI authentication technology. Built by engineers, for engineers.
          </p>
        </motion.div>

        {/* ── Mission / Vision ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}>
          {[
            {
              emoji: "🎯",
              title: "Our Mission",
              text: "To eliminate counterfeit components from electronics supply chains through advanced AI-powered authentication.",
              gradient: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.02))",
              border: "rgba(6,182,212,0.2)",
            },
            {
              emoji: "🚀",
              title: "Our Vision",
              text: "Creating a world where every electronic component has verifiable authenticity and complete supply chain transparency.",
              gradient: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(139,92,246,0.02))",
              border: "rgba(139,92,246,0.2)",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "1.8rem",
                borderRadius: 16,
                background: card.gradient,
                border: `1px solid ${card.border}`,
              }}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: "0.8rem" }}>{card.emoji}</div>
              <h3 style={{
                fontFamily: "var(--font)", fontWeight: 700,
                fontSize: "1.05rem", letterSpacing: "-0.02em",
                color: "#F0F6FF", marginBottom: "0.6rem",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "var(--font)", fontSize: "0.85rem",
                lineHeight: 1.7, color: "#6B7A99",
              }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Feature cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}>
          {features.map((feature, i) => {
            const isActive = activeFeature === i;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveFeature(i)}
                style={{
                  padding: "1.5rem",
                  borderRadius: 14,
                  background: isActive
                    ? `rgba(${feature.accent === "#06B6D4" ? "6,182,212" : feature.accent === "#8B5CF6" ? "139,92,246" : feature.accent === "#EC4899" ? "236,72,153" : "16,185,129"},0.07)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? feature.accent + "40" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 30px ${feature.accent}20` : "none",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                }}
              >
                <div style={{
                  fontSize: "1.5rem", marginBottom: "0.8rem",
                  filter: isActive ? "none" : "saturate(0.5)",
                  transition: "filter 0.3s ease",
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font)", fontWeight: 700,
                  fontSize: "0.95rem", letterSpacing: "-0.02em",
                  color: isActive ? "#F0F6FF" : "#B0BDD6",
                  marginBottom: "0.4rem",
                  transition: "color 0.3s ease",
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font)", fontSize: "0.8rem",
                  lineHeight: 1.6, color: "#6B7A99",
                  marginBottom: "1rem",
                }}>
                  {feature.description}
                </p>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        display: "flex", flexWrap: "wrap", gap: "0.4rem",
                        paddingTop: "0.4rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}>
                        {feature.details.map((d) => (
                          <span key={d} style={{
                            padding: "3px 10px", borderRadius: 999,
                            background: `${feature.accent}15`,
                            border: `1px solid ${feature.accent}30`,
                            fontFamily: "var(--font)", fontSize: "0.7rem",
                            fontWeight: 500, color: feature.accent,
                          }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: "center", padding: "1.5rem 1rem",
              borderRadius: 14,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                fontFamily: "var(--font)", fontWeight: 900,
                fontSize: "1.8rem", letterSpacing: "-0.04em",
                color: s.color, marginBottom: "0.4rem",
                textShadow: `0 0 20px ${s.color}60`,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "var(--font)", fontSize: "0.72rem",
                fontWeight: 500, color: "#6B7A99", letterSpacing: "0.05em",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Tech stack chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div style={{
            fontFamily: "var(--font)", fontSize: "0.7rem",
            fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#6B7A99",
            textAlign: "center", marginBottom: "1.2rem",
          }}>
            Built With
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: "0.5rem",
          }}>
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                style={{
                  padding: "5px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "var(--font)", fontSize: "0.78rem",
                  fontWeight: 500, color: "#B0BDD6",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="animated-border"
          style={{
            marginTop: "4rem",
            padding: "3rem 2rem",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(139,92,246,0.06))",
            textAlign: "center",
          }}
        >
          <h3 style={{
            fontFamily: "var(--font)", fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            letterSpacing: "-0.03em", color: "#F0F6FF",
            marginBottom: "0.8rem",
          }}>
            Ready to Authenticate?
          </h3>
          <p style={{
            fontFamily: "var(--font)", fontSize: "0.95rem",
            color: "#6B7A99", marginBottom: "2rem",
          }}>
            Start your free demo and verify your first IC component in under 30 seconds.
          </p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(6,182,212,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer"
            style={{
              display: "inline-block",
              padding: "13px 36px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              color: "#fff",
              fontFamily: "var(--font)",
              fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(6,182,212,0.3)",
            }}
          >
            Get Started — It's Free
          </motion.a>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
