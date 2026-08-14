import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei";
import { ICJigModel } from "../3d/models";

/* ── Mock terminal lines ────────────────────────────────────────── */
const terminalLines = [
  { prefix: "sys", text: "Authentichip scanner v2.1 initialized", color: "#06B6D4" },
  { prefix: "hw",  text: "Camera module ready — resolution 4K", color: "#B0BDD6" },
  { prefix: "ai",  text: "Loading TorchScript model... OK", color: "#10B981" },
  { prefix: "ocr", text: "Waiting for component placement...", color: "#6B7A99" },
];

const scanLines = [
  { label: "OCR Extraction",      delay: 0,    color: "#06B6D4", duration: 1.1 },
  { label: "Anomaly Detection",   delay: 1.2,  color: "#8B5CF6", duration: 1.4 },
  { label: "GAN Scoring",         delay: 2.7,  color: "#EC4899", duration: 1.0 },
  { label: "Datasheet Match",     delay: 3.8,  color: "#10B981", duration: 0.9 },
];

/* ── Animated terminal ─────────────────────────────────────────── */
function Terminal({ running }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (!running) {
      setVisibleLines([]);
      setScanComplete(false);
      return;
    }
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, line]), i * 600);
    });
    setTimeout(() => setScanComplete(true), terminalLines.length * 600 + 800);
  }, [running]);

  return (
    <div style={{
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: "0.78rem",
      lineHeight: 1.8,
      padding: "1.2rem",
      background: "rgba(0,0,0,0.5)",
      borderRadius: 10,
      border: "1px solid rgba(6,182,212,0.15)",
      minHeight: 140,
      overflowY: "auto",
    }}>
      {visibleLines.map((line, i) => (
        <div key={i} style={{ display: "flex", gap: 8 }}>
          <span style={{ color: line.color, fontWeight: 600, opacity: 0.8 }}>
            [{line.prefix}]
          </span>
          <span style={{ color: "#B0BDD6" }}>{line.text}</span>
        </div>
      ))}
      {running && !scanComplete && (
        <div style={{ display: "flex", gap: 8, color: "#06B6D4" }}>
          <span>▋</span>
        </div>
      )}
      {scanComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", gap: 8 }}
        >
          <span style={{ color: "#10B981", fontWeight: 700 }}>[result]</span>
          <span style={{ color: "#10B981", fontWeight: 700 }}>✓ GENUINE — Confidence: 98.4%</span>
        </motion.div>
      )}
    </div>
  );
}

/* ── Scan progress bars ─────────────────────────────────────────── */
function ScanProgress({ running }) {
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (!running) { setDone([]); return; }
    scanLines.forEach((s, i) => {
      setTimeout(() => setDone((p) => [...p, i]), (s.delay + s.duration) * 1000);
    });
  }, [running]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {scanLines.map((s, i) => {
        const isDone = done.includes(i);
        const isRunning = running && !isDone;
        return (
          <div key={s.label}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 4,
              fontFamily: "var(--font)", fontSize: "0.75rem",
              color: isDone ? s.color : "#6B7A99",
              fontWeight: isDone ? 600 : 400,
              transition: "color 0.3s ease",
            }}>
              <span>{s.label}</span>
              <span>{isDone ? "100%" : running ? "…" : "0%"}</span>
            </div>
            <div style={{
              height: 4, borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: isDone ? "100%" : "0%" }}
                transition={{ duration: s.duration, delay: s.delay, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: s.color,
                  boxShadow: `0 0 8px ${s.color}80`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ScanDemoSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanDone(false);
    const totalTime = scanLines.reduce((acc, s) => Math.max(acc, (s.delay + s.duration) * 1000), 0);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
    }, totalTime + 1200);
  };

  return (
    <section
      id="scandemo"
      ref={ref}
      className="section-pad"
      style={{ position: "relative", zIndex: 10, scrollMarginTop: "64px" }}
    >
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "40%", left: "-5%",
        width: "500px", height: "500px",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(236,72,153,0.1)",
            border: "1px solid rgba(236,72,153,0.25)",
            marginBottom: "1.2rem",
          }}>
            <span style={{
              fontFamily: "var(--font)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#EC4899",
            }}>
              Live Demo
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font)", fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "-0.04em", lineHeight: 1.1,
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Try the Scanner.
            </span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #06B6D4, #EC4899)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Watch AI Verify in Real-Time.
            </span>
          </h2>
        </motion.div>

        {/* ── Main Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          alignItems: "start",
        }}
          className="scan-grid"
        >
          {/* Left: 3D canvas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
            style={{
              position: "relative", overflow: "hidden",
              aspectRatio: "4/3", minHeight: 280,
              borderColor: scanning ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.07)",
              boxShadow: scanning ? "0 0 60px rgba(6,182,212,0.2)" : "none",
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Scan beam */}
            {scanning && <div className="scan-beam" />}

            {/* Corner brackets */}
            {[
              { top: 8, left: 8, borderTop: "2px solid", borderLeft: "2px solid" },
              { top: 8, right: 8, borderTop: "2px solid", borderRight: "2px solid" },
              { bottom: 8, left: 8, borderBottom: "2px solid", borderLeft: "2px solid" },
              { bottom: 8, right: 8, borderBottom: "2px solid", borderRight: "2px solid" },
            ].map((s, i) => (
              <div key={i} style={{
                position: "absolute", width: 18, height: 18,
                borderColor: "#06B6D4", zIndex: 10,
                ...s,
              }} />
            ))}

            {/* Status dot */}
            <div style={{
              position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
              zIndex: 10, display: "flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 999,
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: scanning ? "#06B6D4" : scanDone ? "#10B981" : "#6B7A99",
                boxShadow: scanning ? "0 0 8px #06B6D4" : scanDone ? "0 0 8px #10B981" : "none",
                animation: scanning ? "pulse-dot 1s infinite" : "none",
              }} />
              <span style={{
                fontFamily: "var(--font)", fontSize: "0.65rem",
                fontWeight: 600, letterSpacing: "0.08em",
                color: scanning ? "#06B6D4" : scanDone ? "#10B981" : "#6B7A99",
              }}>
                {scanning ? "SCANNING" : scanDone ? "VERIFIED" : "READY"}
              </span>
            </div>

            {/* 3D Canvas */}
            <div style={{ width: "100%", height: "100%" }}>
              <Canvas style={{ width: "100%", height: "100%" }}>
                <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={40} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#06B6D4" />
                <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#8B5CF6" />
                <Suspense fallback={null}>
                  <ICJigModel />
                  <Environment preset="city" />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  autoRotate={!scanning}
                  autoRotateSpeed={1.5}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
            </div>
          </motion.div>

          {/* Right: controls + terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Scan Progress */}
            <div className="glass" style={{ padding: "1.5rem" }}>
              <div style={{
                fontFamily: "var(--font)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#6B7A99",
                marginBottom: "1.2rem",
              }}>
                Analysis Pipeline
              </div>
              <ScanProgress running={scanning} />
            </div>

            {/* Terminal */}
            <div className="glass" style={{ padding: "1.5rem" }}>
              <div style={{
                fontFamily: "var(--font)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#6B7A99",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  display: "flex", gap: 5,
                }}>
                  {["#FF5F56", "#FFBD2E", "#27C93F"].map(c => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                system.log
              </div>
              <Terminal running={scanning} done={scanDone} />
            </div>

            {/* CTA Button */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startScan}
                disabled={scanning}
                className="btn-shimmer"
                style={{
                  flex: 1,
                  padding: "13px 24px",
                  borderRadius: 999,
                  background: scanning
                    ? "rgba(6,182,212,0.2)"
                    : "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  color: "#fff",
                  fontFamily: "var(--font)",
                  fontWeight: 700, fontSize: "0.9rem",
                  border: scanning ? "1px solid rgba(6,182,212,0.3)" : "none",
                  cursor: scanning ? "not-allowed" : "pointer",
                  boxShadow: scanning ? "none" : "0 0 30px rgba(6,182,212,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                {scanning ? "Scanning…" : scanDone ? "Scan Again" : "Run Scan Demo"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/scan")}
                style={{
                  padding: "13px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  color: "#B0BDD6",
                  fontFamily: "var(--font)",
                  fontWeight: 600, fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                Full Scanner →
              </motion.button>
            </div>

            {/* Result badge */}
            <AnimatePresence>
              {scanDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass"
                  style={{
                    padding: "1.2rem 1.5rem",
                    display: "flex", alignItems: "center", gap: "1rem",
                    borderColor: "rgba(16,185,129,0.35)",
                    boxShadow: "0 0 40px rgba(16,185,129,0.15)",
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.2rem",
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font)", fontWeight: 700,
                      fontSize: "0.9rem", color: "#10B981",
                      marginBottom: "0.15rem",
                    }}>
                      IC Verified: GENUINE
                    </div>
                    <div style={{
                      fontFamily: "var(--font)", fontSize: "0.75rem", color: "#6B7A99",
                    }}>
                      Confidence: 98.4% — Logged to audit trail
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (min-width: 1024px) {
          .scan-grid { grid-template-columns: 1.2fr 1fr !important; }
        }
      `}</style>

      {/* Divider */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
