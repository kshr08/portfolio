import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Always light mode
  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 44px",
        height: 58,
        background: scrolled ? "rgba(250,249,246,0.82)" : "rgba(250,249,246,0.5)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(124,58,237,0.12)" : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <NavLink
        to="/"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontStyle: "italic",
          fontWeight: 300,
          color: "#0f0e11",
          letterSpacing: 1,
        }}
      >
        <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>
          shravani.
        </span>
      </NavLink>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              background: "none",
              border: "none",
              color: isActive ? "#0f0e11" : "rgba(15,14,17,0.5)",
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: "0.5px",
              padding: "6px 13px",
              borderRadius: 6,
              transition: "color 0.2s",
              textDecoration: "none",
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        style={{
          fontSize: 12,
          fontWeight: 700,
          padding: "7px 16px",
          borderRadius: 7,
          border: "1px solid rgba(124,58,237,0.4)",
          background: "rgba(124,58,237,0.07)",
          color: "#5b21b6",
          letterSpacing: "0.3px",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(124,58,237,0.14)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(124,58,237,0.07)")
        }
      >
        Resume ↗
      </a>
    </nav>
  );
}