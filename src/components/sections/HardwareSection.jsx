import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Count-up hook ─────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, inView = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const isNum = typeof target === "number";
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(isNum ? Math.floor(eased * target) : target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return value;
}

/* ── Stat Card ────────────────────────────────────────────────────── */
function StatCard({ label, value, unit, gradient, index, inView }) {
  // Only animate count-up for plain numeric values (no < prefix)
  const isSimpleNum = /^[0-9.]+/.test(value);
  const numericPart = isSimpleNum ? parseFloat(value.replace(/[^0-9.]/g, "")) : 0;
  const suffix = isSimpleNum ? value.replace(/[0-9.]/g, "") : "";
  const countedNum = useCountUp(numericPart, 1500 + index * 200, inView && isSimpleNum);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(6,182,212,0.2)" }}
      className="glass"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80,
        background: gradient.replace("linear-gradient(135deg,", "radial-gradient(circle at top right,").slice(0, -1) + ", transparent)",
        opacity: 0.3, filter: "blur(20px)",
        pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: "var(--font)", fontSize: "0.68rem", fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7A99",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font)", fontWeight: 900,
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        letterSpacing: "-0.04em",
        background: gradient,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {isSimpleNum ? `${countedNum}${suffix}` : value}
      </div>
      <div style={{
        fontFamily: "var(--font)", fontSize: "0.72rem", fontWeight: 400, color: "#6B7A99",
      }}>
        {unit}
      </div>
    </motion.div>
  );
}

/* ── Capability Card ──────────────────────────────────────────────── */
function CapabilityCard({ icon, title, description, index, inView, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, borderColor: "rgba(6,182,212,0.35)" }}
      className="glass"
      style={{
        padding: "1.5rem",
        cursor: "default",
        borderColor: "rgba(255,255,255,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `rgba(6,182,212,0.1)`,
        border: "1px solid rgba(6,182,212,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1rem", color: "#06B6D4",
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "var(--font)", fontWeight: 700,
        fontSize: "0.95rem", letterSpacing: "-0.02em",
        color: "#F0F6FF", marginBottom: "0.5rem",
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "var(--font)", fontSize: "0.8rem",
        lineHeight: 1.65, color: "#6B7A99",
      }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */
export default function HardwareSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const specs = [
    { label: "OCR Accuracy",       value: "95%",   unit: "precision",  gradient: "linear-gradient(135deg, #06B6D4, #818CF8)" },
    { label: "Edge Inference",      value: "<100ms", unit: "latency",   gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)" },
    { label: "Anomaly Detection",   value: "99.9%", unit: "accuracy",   gradient: "linear-gradient(135deg, #06B6D4, #10B981)" },
  ];

  const capabilities = [
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "OCR + GAN Analysis",
      description: "Fine-tuned OCR for IC markings with GAN-based authenticity scoring pipeline",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Edge Inference Layer",
      description: "Raspberry Pi / ESP32 deployment with optimized TorchScript models",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "MongoDB Audit Logs",
      description: "Immutable scan records with tamper-evident logging and complete traceability",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Audit & Compliance",
      description: "Role-based access control with tamper-evident logs and dispute resolution",
    },
  ];

  return (
    <section
      id="hardware"
      ref={ref}
      className="section-pad"
      style={{ position: "relative", zIndex: 10, scrollMarginTop: "64px" }}
    >
      {/* Subtle section glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.25)",
            marginBottom: "1.2rem",
          }}>
            <span style={{
              fontFamily: "var(--font)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#8B5CF6",
            }}>
              Hardware Platform
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
              Built for Precision.
            </span>
            <br />
            <span className="grad-cyan">Engineered for Scale.</span>
          </h2>

          <p style={{
            fontFamily: "var(--font)", fontSize: "1rem",
            lineHeight: 1.7, color: "#6B7A99", maxWidth: "480px",
          }}>
            Camera-enabled capture with edge ML inference, backend microservices, and immutable audit logging for IC authentication.
          </p>
        </motion.div>

        {/* ── Stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}>
          {specs.map((spec, i) => (
            <StatCard key={spec.label} {...spec} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Capability Cards Bento ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}>
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} {...cap} index={i} inView={inView} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
