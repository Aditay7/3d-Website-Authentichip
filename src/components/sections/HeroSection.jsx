import { useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import ChipScene from "../3d/ChipScene";

/* ── Stagger container ─────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const canvasRef = useRef(null);

  /* Particle canvas for subtle background */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    let raf;
    const resize = () => {
      el.width  = window.innerWidth;
      el.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random(),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = el.width;
        if (p.x > el.width) p.x = 0;
        if (p.y < 0) p.y = el.height;
        if (p.y > el.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.a * 0.5})`;
        ctx.fill();
      });

      /* Connect nearby particles */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${(1 - d/90) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 64,
      }}
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* Radial glow bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(6,182,212,0.10) 0%, rgba(139,92,246,0.07) 50%, transparent 80%)",
      }} />

      {/* ── Two-column layout ── */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1260, margin: "0 auto",
        padding: "4rem 2rem 6rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "center",
        width: "100%",
      }}
        className="hero-grid"
      >
        {/* LEFT — Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
        >
          {/* Label badge */}
          <motion.div variants={item}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(6,182,212,0.10)",
              border: "1px solid rgba(6,182,212,0.28)",
              fontFamily: "var(--font)", fontWeight: 700,
              fontSize: "0.65rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#06B6D4",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#06B6D4",
                boxShadow: "0 0 8px #06B6D4",
                animation: "pulse 2s infinite",
              }} />
              AI-Powered IC Authentication
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={item}>
            <h1 style={{
              fontFamily: "var(--font)", fontWeight: 900,
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              letterSpacing: "-0.05em", lineHeight: 1.0,
            }}>
              <span style={{
                background: "linear-gradient(135deg, #F0F6FF 0%, #B0BDD6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", display: "block",
              }}>
                Trust Every
              </span>
              <span style={{
                background: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", display: "block",
              }}>
                IC You Touch.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={item} style={{
            fontFamily: "var(--font)", fontWeight: 400,
            fontSize: "1.05rem", lineHeight: 1.75,
            color: "#6B7A99", maxWidth: 440,
          }}>
            A next-generation semiconductor authentication system powered by edge AI, OCR analysis, and cryptographic verification — making counterfeit ICs a thing of the past.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.a
              href="#problem"
              onClick={e => { e.preventDefault(); document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(6,182,212,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-shimmer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 999,
                background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                fontFamily: "var(--font)", fontWeight: 700, fontSize: "0.92rem",
                color: "#fff", textDecoration: "none",
                boxShadow: "0 0 36px rgba(6,182,212,0.35)",
              }}
            >
              Explore the Problem
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

            <motion.a
              href="#howitworks"
              onClick={e => { e.preventDefault(); document.querySelector("#howitworks")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.04, borderColor: "rgba(6,182,212,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontFamily: "var(--font)", fontWeight: 600, fontSize: "0.92rem",
                color: "#B0BDD6", textDecoration: "none",
                transition: "border-color 0.3s, color 0.3s",
              }}
            >
              How It Works
            </motion.a>
          </motion.div>

          {/* Trust bar */}
          <motion.div variants={item} style={{
            display: "flex", gap: "2rem", paddingTop: "0.5rem", flexWrap: "wrap",
          }}>
            {[
              { n: "99.9%", l: "Accuracy" },
              { n: "<100ms", l: "Inference" },
              { n: "∞",     l: "Audit Trail" },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily: "var(--font)", fontWeight: 800,
                  fontSize: "1.35rem", letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{s.n}</span>
                <span style={{ fontFamily: "var(--font)", fontSize: "0.72rem", color: "#6B7A99", letterSpacing: "0.04em" }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{
            position: "relative",
            height: "min(560px, 70vh)",
            borderRadius: 28,
            overflow: "visible",
          }}
        >
          <Suspense fallback={null}>
            <ChipScene style={{ width: "100%", height: "100%", pointerEvents: "none" }} />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: "var(--font)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7A99" }}>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ color: "#06B6D4" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
