export default function FooterSection() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      position: "relative", zIndex: 10,
      padding: "3rem 2rem 2.5rem",
      borderTop: "1px solid rgba(6,182,212,0.12)",
      background: "rgba(5,10,20,0.95)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font)", fontWeight: 800, fontSize: 12,
              color: "#fff", boxShadow: "0 0 18px rgba(6,182,212,0.35)",
            }}>AC</div>
            <span style={{
              fontFamily: "var(--font)", fontWeight: 700,
              fontSize: "1rem", letterSpacing: "-0.03em", color: "#F0F6FF",
            }}>Authentichip</span>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
            {["#problem", "#solution", "#howitworks", "#tech", "#vision"].map((href, i) => {
              const labels = ["Problem", "Solution", "How It Works", "Technology", "Vision"];
              return (
                <a
                  key={href}
                  href={href}
                  onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    fontFamily: "var(--font)", fontSize: "0.78rem",
                    fontWeight: 500, color: "#6B7A99",
                    textDecoration: "none", letterSpacing: "0.04em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.color = "#06B6D4"}
                  onMouseLeave={e => e.target.style.color = "#6B7A99"}
                >{labels[i]}</a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 999,
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.2)",
              color: "#06B6D4", cursor: "pointer",
              fontFamily: "var(--font)", fontWeight: 600, fontSize: "0.78rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.08)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Top
          </button>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          marginBottom: "1.5rem",
        }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "0.8rem",
        }}>
          <span style={{
            fontFamily: "var(--font)", fontSize: "0.75rem",
            color: "#6B7A99", letterSpacing: "0.04em",
          }}>
            © 2025 Authentichip. A concept project for AI-powered IC authentication.
          </span>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 8px #10B981",
            }} />
            <span style={{
              fontFamily: "var(--font)", fontSize: "0.72rem",
              color: "#6B7A99", letterSpacing: "0.04em",
            }}>Concept — No Functional Services Running</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
