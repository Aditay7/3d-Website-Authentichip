import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import Navbar from "../layout/Navbar";
import HardwareModel3D from "../3d/HardwareModel3D";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAsAdmin, loginAsWorker } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const isAdmin =
        email.toLowerCase().includes("admin") || password === "admin";
      if (isAdmin) {
        loginAsAdmin();
        navigate("/admin/dashboard");
      } else {
        loginAsWorker();
        navigate("/");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      overflowX: "hidden",
      position: "relative",
    }}>
      <Navbar />

      {/* 3D Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
      }}>
        <HardwareModel3D scrollProgress={0.15} />
      </div>

      {/* Dot grid */}
      <div className="dot-grid" />

      {/* Radial glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
      }} />

      {/* Login card */}
      <div style={{
        position: "relative", zIndex: 10,
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "6rem 1.5rem 2rem",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="animated-border glass-strong"
          style={{
            width: "100%", maxWidth: 440,
            padding: "2.8rem 2.4rem",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font)", fontWeight: 800, fontSize: 15,
              color: "#fff", boxShadow: "0 0 30px rgba(6,182,212,0.4)",
            }}>
              AC
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{
              fontFamily: "var(--font)", fontWeight: 800,
              fontSize: "1.7rem", letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #F0F6FF, #B0BDD6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.4rem",
            }}>
              Welcome back
            </h1>
            <p style={{
              fontFamily: "var(--font)", fontSize: "0.85rem",
              color: "#6B7A99",
            }}>
              Enter your credentials to access your workspace
            </p>
          </div>

          {/* Hint */}
          <div style={{
            marginBottom: "1.5rem",
            padding: "0.8rem 1rem",
            borderRadius: 10,
            background: "rgba(6,182,212,0.06)",
            border: "1px solid rgba(6,182,212,0.2)",
            fontFamily: "var(--font)", fontSize: "0.75rem",
            color: "#06B6D4", lineHeight: 1.6,
          }}>
            <strong>Demo:</strong> Use email with "admin" or password "admin" for admin access. Any other credentials → worker access.
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: "1.2rem",
                padding: "0.8rem 1rem",
                borderRadius: 10,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                fontFamily: "var(--font)", fontSize: "0.8rem",
                color: "#F87171", textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{
                fontFamily: "var(--font)", fontSize: "0.78rem",
                fontWeight: 600, letterSpacing: "0.04em",
                color: "#B0BDD6",
              }}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0F6FF",
                  fontFamily: "var(--font)", fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(6,182,212,0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{
                fontFamily: "var(--font)", fontSize: "0.78rem",
                fontWeight: 600, letterSpacing: "0.04em",
                color: "#B0BDD6",
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 48px 12px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F0F6FF",
                    fontFamily: "var(--font)", fontSize: "0.9rem",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(6,182,212,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "#6B7A99", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#06B6D4")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7A99")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 40px rgba(6,182,212,0.5)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="btn-shimmer"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 999,
                background: loading
                  ? "rgba(6,182,212,0.3)"
                  : "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                color: "#fff",
                fontFamily: "var(--font)",
                fontWeight: 700, fontSize: "0.95rem",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 0 30px rgba(6,182,212,0.3)",
                transition: "all 0.3s ease",
                marginTop: "0.4rem",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    style={{ animation: "spin 1s linear infinite" }}
                    fill="none" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Signing in…
                </span>
              ) : "Sign in"}
            </motion.button>
          </form>

          <p style={{
            marginTop: "1.8rem", textAlign: "center",
            fontFamily: "var(--font)", fontSize: "0.82rem",
            color: "#6B7A99",
          }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#06B6D4", fontWeight: 600, textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
