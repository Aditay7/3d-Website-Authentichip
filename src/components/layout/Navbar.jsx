import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Problem",    href: "#problem" },
  { label: "Solution",   href: "#solution" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Technology", href: "#tech" },
  { label: "Vision",     href: "#vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(5,10,20,0.88)" : "rgba(5,10,20,0.35)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled
          ? "1px solid rgba(6,182,212,0.18)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{
          height: 64, display: "flex",
          alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <a href="#home" onClick={(e) => scrollTo(e, "#home")}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <motion.div whileHover={{ scale: 1.06 }} style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font)", fontWeight: 800, fontSize: 13,
              color: "#fff", boxShadow: "0 0 22px rgba(6,182,212,0.45)",
              flexShrink: 0,
            }}>AC</motion.div>
            <span style={{
              fontFamily: "var(--font)", fontWeight: 700,
              fontSize: "1.05rem", letterSpacing: "-0.03em", color: "#F0F6FF",
            }}>Authentichip</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2.2rem" }}>
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                style={{
                  fontFamily: "var(--font)", fontWeight: 500,
                  fontSize: "0.78rem", letterSpacing: "0.07em",
                  textTransform: "uppercase", color: "#6B7A99",
                  textDecoration: "none", cursor: "pointer",
                  transition: "color 0.22s",
                }}
                onMouseEnter={e => e.target.style.color = "#06B6D4"}
                onMouseLeave={e => e.target.style.color = "#6B7A99"}
              >{l.label}</motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            className="hidden md:inline-block btn-shimmer"
            href="#vision"
            onClick={(e) => scrollTo(e, "#vision")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "8px 22px", borderRadius: 999,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              fontFamily: "var(--font)", fontWeight: 600, fontSize: "0.8rem",
              color: "#fff", textDecoration: "none",
              boxShadow: "0 0 24px rgba(6,182,212,0.3)",
            }}
          >Explore Vision</motion.a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            style={{ background: "none", border: "none", color: "#F0F6FF", cursor: "pointer", padding: 4 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: "hidden",
              background: "rgba(5,10,20,0.97)",
              borderBottom: "1px solid rgba(6,182,212,0.12)",
            }}
          >
            <div style={{ padding: "1rem 2rem 1.5rem" }}>
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: "block", padding: "10px 12px",
                    fontFamily: "var(--font)", fontWeight: 500,
                    fontSize: "0.85rem", letterSpacing: "0.06em",
                    textTransform: "uppercase", color: "#6B7A99",
                    textDecoration: "none", borderRadius: 8,
                  }}
                >{l.label}</motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
