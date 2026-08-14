import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ── Stagger helpers ──────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const wordAnim = {
  hidden: { y: 60, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const features = [
  "Hardware-Verified",
  "ML-Powered Decisions",
  "Real-Time Scan",
  "Lab-Grade Confidence",
];

/* ── Floating particles canvas ───────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.4,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "6,182,212" : "139,92,246",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        paddingTop: "64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Layered Bg ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Deep space gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 90% 80% at 50% 30%, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.08) 40%, transparent 75%)",
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(5,10,20,0.95) 100%)",
        }} />
      </div>

      {/* ── Dot grid ── */}
      <div className="dot-grid" />

      {/* ── Floating particles ── */}
      <ParticleCanvas />

      {/* ── Orbit Rings ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
        {[680, 520, 380].map((size, i) => (
          <div
            key={size}
            className="orbit-ring"
            style={{
              width: size,
              height: size,
              borderColor: i === 0
                ? "rgba(6,182,212,0.08)"
                : i === 1
                ? "rgba(139,92,246,0.06)"
                : "rgba(6,182,212,0.05)",
              animationDuration: `${30 + i * 15}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
            marginBottom: "2rem",
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#06B6D4",
            boxShadow: "0 0 8px #06B6D4",
            animation: "pulse-dot 2s ease-in-out infinite",
            display: "inline-block",
          }} />
          <span style={{
            fontFamily: "var(--font)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#06B6D4",
          }}>
            Real-Time Chip Authentication
          </span>
        </motion.div>

        {/* Heading — word by word */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ marginBottom: "1.5rem", overflow: "hidden" }}
        >
          <div style={{
            fontFamily: "var(--font)",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 0.25em",
          }}>
            {["Authentichip"].map((word, i) => (
              <motion.span
                key={i}
                variants={wordAnim}
                style={{ display: "inline-block", overflow: "hidden" }}
              >
                <span className="grad-cyan" style={{ display: "block" }}>{word}</span>
              </motion.span>
            ))}
          </div>
          <div style={{
            fontFamily: "var(--font)",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "#F0F6FF",
            marginTop: "0.4em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 0.25em",
          }}>
            {["Trust", "Every", "IC", "You", "Touch."].map((word, i) => (
              <motion.span
                key={i}
                variants={wordAnim}
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{
            fontFamily: "var(--font)",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            fontWeight: 400,
            color: "#6B7A99",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          A dedicated inspection rig fused with AI that tells you—instantly—if your IC is genuine or counterfeit.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.6rem",
            marginBottom: "2.5rem",
          }}
        >
          {features.map((f) => (
            <motion.span
              key={f}
              variants={fadeUp}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font)",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#B0BDD6",
                cursor: "default",
                transition: "border-color 0.2s, box-shadow 0.2s, color 0.2s",
              }}
              whileHover={{
                borderColor: "rgba(6,182,212,0.4)",
                boxShadow: "0 0 16px rgba(6,182,212,0.2)",
                color: "#06B6D4",
              }}
            >
              {f}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(6,182,212,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#solution")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-shimmer"
            style={{
              padding: "13px 32px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              color: "#fff",
              fontFamily: "var(--font)",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(6,182,212,0.35)",
            }}
          >
            Explore Solution
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.04, borderColor: "rgba(6,182,212,0.7)", color: "#06B6D4" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#tech")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "13px 32px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
              color: "#B0BDD6",
              fontFamily: "var(--font)",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            Discover Technology
          </motion.button>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--font)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#6B7A99",
        }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "160px",
        background: "linear-gradient(to bottom, transparent, var(--bg-base))",
        pointerEvents: "none", zIndex: 5,
      }} />
    </section>
  );
}
