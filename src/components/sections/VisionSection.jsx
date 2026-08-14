import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const impacts = [
  {
    icon: "🛡️",
    title: "Zero Counterfeits in Defense",
    desc: "Mission-critical military electronics verified at every stage — from procurement to deployment. No more silent chip failures in life-critical systems.",
    accent: "#06B6D4",
  },
  {
    icon: "🚗",
    title: "Safe Automotive Supply Chains",
    desc: "Every automotive IC — braking systems, airbags, control units — cryptographically verified before assembly. Saving lives through authentication.",
    accent: "#10B981",
  },
  {
    icon: "✈️",
    title: "Aerospace-Grade Certainty",
    desc: "Aviation and space systems demand absolute reliability. Authentichip brings lab-grade authentication to every supplier in the chain.",
    accent: "#8B5CF6",
  },
  {
    icon: "🏭",
    title: "Transparent Manufacturing",
    desc: "Complete, immutable provenance records from wafer fab to end-customer. Instant dispute resolution backed by cryptographic proof.",
    accent: "#F59E0B",
  },
  {
    icon: "🌐",
    title: "Global Supply Chain Trust",
    desc: "A shared verification layer across manufacturers, distributors, and OEMs — bringing trust to every node of the global electronics network.",
    accent: "#EC4899",
  },
  {
    icon: "💡",
    title: "Open Verification API",
    desc: "Any company can query the Authentichip ledger to verify any certified component in real-time — making authentication universally accessible.",
    accent: "#818CF8",
  },
];

const visionStats = [
  { n: "$75B",  l: "market saved from counterfeits per year", color: "#06B6D4" },
  { n: "10x",   l: "faster than traditional lab testing",      color: "#8B5CF6" },
  { n: "100%",  l: "traceable components in the supply chain", color: "#10B981" },
  { n: "0",     l: "tolerance for counterfeit parts",          color: "#EC4899" },
];

export default function VisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { once: true, margin: "-60px" });

  return (
    <section
      id="vision"
      ref={ref}
      style={{
        position: "relative", zIndex: 10,
        padding: "7rem 2rem 0",
        scrollMarginTop: 64,
      }}
    >
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 500,
        background: "radial-gradient(ellipse, rgba(6,182,212,0.06), rgba(139,92,246,0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Vision header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 14px", borderRadius: 999, marginBottom: "1.2rem",
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#10B981" }}>
              The Vision
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.05em", lineHeight: 1.02,
            marginBottom: "1.5rem",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "block",
            }}>
              What Authentichip
            </span>
            <span style={{
              background: "linear-gradient(135deg, #10B981, #06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "block",
            }}>
              Can Achieve.
            </span>
          </h2>

          <p style={{
            fontFamily: "var(--font)", fontSize: "1.05rem", lineHeight: 1.75,
            color: "#6B7A99", maxWidth: 620, margin: "0 auto",
          }}>
            Imagine a world where counterfeit electronics are detectable in seconds, where every IC comes with cryptographic proof of its origin — and where supply chain fraud becomes economically unviable.
          </p>
        </motion.div>

        {/* Impact cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          marginBottom: "5rem",
        }}>
          {impacts.map((im, i) => (
            <motion.div
              key={im.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: `${im.accent}38` }}
              className="glass"
              style={{
                padding: "2rem",
                borderColor: "rgba(255,255,255,0.06)",
                cursor: "default",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 80, height: 80,
                background: `radial-gradient(circle at top right, ${im.accent}18, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{im.icon}</div>
              <h3 style={{
                fontFamily: "var(--font)", fontWeight: 700,
                fontSize: "1rem", letterSpacing: "-0.02em",
                color: "#F0F6FF", marginBottom: "0.6rem",
              }}>{im.title}</h3>
              <p style={{
                fontFamily: "var(--font)", fontSize: "0.82rem",
                lineHeight: 1.7, color: "#6B7A99",
              }}>{im.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Big quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            textAlign: "center", padding: "3rem 2rem",
            marginBottom: "5rem",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(6,182,212,0.05), rgba(139,92,246,0.05))",
            border: "1px solid rgba(6,182,212,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: 300, height: 200,
            background: "radial-gradient(ellipse, rgba(6,182,212,0.1), transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />
          <div style={{
            fontFamily: "var(--font)", fontSize: "3rem", lineHeight: 1,
            color: "#06B6D4", opacity: 0.4, marginBottom: "1rem",
          }}>"</div>
          <blockquote style={{
            fontFamily: "var(--font)", fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            letterSpacing: "-0.03em", lineHeight: 1.5,
            color: "#F0F6FF", maxWidth: 700, margin: "0 auto 1.5rem",
            position: "relative", zIndex: 1,
          }}>
            In a world where a single counterfeit IC can ground a fleet, crash a vehicle, or corrupt a medical device — authentication is not optional. It is essential.
          </blockquote>
          <div style={{
            fontFamily: "var(--font)", fontSize: "0.8rem",
            color: "#6B7A99", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>— Authentichip Mission Statement</div>
        </motion.div>

        {/* Vision stats */}
        <div ref={ref2} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "6rem",
        }}>
          {visionStats.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{
                fontFamily: "var(--font)", fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.06em",
                color: s.color,
                textShadow: `0 0 30px ${s.color}60`,
                marginBottom: "0.6rem",
              }}>{s.n}</div>
              <div style={{
                fontFamily: "var(--font)", fontSize: "0.78rem",
                lineHeight: 1.6, color: "#6B7A99",
              }}>{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA / Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="anim-border"
          style={{
            padding: "4rem 2rem",
            borderRadius: 28,
            background: "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(139,92,246,0.07))",
            textAlign: "center",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(6,182,212,0.1), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{
              fontFamily: "var(--font)", fontWeight: 900,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.05em", lineHeight: 1.1,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #F0F6FF, #06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              The Future of Semiconductor<br />Authentication Starts Here.
            </h3>
            <p style={{
              fontFamily: "var(--font)", fontSize: "1rem",
              lineHeight: 1.75, color: "#6B7A99",
              maxWidth: 520, margin: "0 auto 2.5rem",
            }}>
              Authentichip is a concept born from the real problem of IC counterfeiting. The technology is proven. The architecture is designed. The vision is clear.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a
                href="mailto:hello@authentichip.io"
                whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(6,182,212,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-shimmer"
                style={{
                  display: "inline-block",
                  padding: "14px 36px", borderRadius: 999,
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  fontFamily: "var(--font)", fontWeight: 700, fontSize: "0.95rem",
                  color: "#fff", textDecoration: "none",
                  boxShadow: "0 0 36px rgba(6,182,212,0.35)",
                }}
              >Get In Touch</motion.a>
              <motion.a
                href="#problem"
                onClick={e => { e.preventDefault(); document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.04 }}
                style={{
                  display: "inline-block",
                  padding: "14px 36px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "var(--font)", fontWeight: 600, fontSize: "0.95rem",
                  color: "#B0BDD6", textDecoration: "none",
                  transition: "border-color 0.3s",
                }}
              >Learn More ↑</motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
