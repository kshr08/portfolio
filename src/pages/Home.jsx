import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

const ROLES = [
  "Full Stack Developer Intern @ Paarsh Infotech.",
  "Open to SDE Roles.",
  "Graduating July 2026.",
];
const TAGS = [
  {
    label: "● Full Stack Dev",
    c: "#a78bfa",
    bg: "rgba(124,58,237,0.12)",
    border: "rgba(124,58,237,0.25)",
  },
  {
    label: "● Java + React",
    c: "#f0abca",
    bg: "rgba(240,171,202,0.08)",
    border: "rgba(240,171,202,0.2)",
  },
  {
    label: "● AI Integrations",
    c: "#c4b5fd",
    bg: "rgba(196,181,253,0.08)",
    border: "rgba(196,181,253,0.2)",
  },
  {
    label: "@ MIT CSN '26",
    c: "rgba(232,228,240,0.4)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
  },
];


// letter scramble on mount
function useScramble(ref, target, delay = 0) {
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let iter = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (!ref.current) {
          clearInterval(iv);
          return;
        }
        ref.current.textContent = target
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < iter) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        iter += 0.55;
        if (iter >= target.length) {
          ref.current.textContent = target;
          clearInterval(iv);
        }
      }, 38);
    }, delay);
    return () => clearTimeout(t);
  }, []);
}



export default function Home() {
  const nav = useNavigate();
  const rFirst = useRef(null);
  const rLast = useRef(null);
  useScramble(rFirst, "Shravani", 280);
  useScramble(rLast, "Khindre", 620);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        alignItems: "center",
        gap: 40,
      }}
    >
      <section
        className="section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 100,
        }}
      >
        {/* meta line */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(167,139,250,0.45)",
            marginBottom: 20,
          }}
        >
          Full Stack Developer &nbsp;·&nbsp; MIT CSN '26 &nbsp;·&nbsp; Nashik,
          India
        </p>

        {/* name */}
        <div
          style={{
            marginBottom: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h1
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(60px,10vw,120px)",
              letterSpacing: -3,
              lineHeight: 0.95,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Shravani */}
            <span
              ref={rFirst}
              style={{
                // animation: "subtleFloat 4s ease-in-out infinite",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--text)",
                opacity: 0.9,
                textShadow: "0 0 30px rgba(167,139,250,0.18)",
              }}
            >
              Shravani
            </span>

            {/* Khindre */}
            <span
              ref={rLast}
              style={{
                // animation: "subtleFloat 5s ease-in-out infinite",
                fontWeight: 700,
                background:
                  "linear-gradient(118deg,#7c3aed 0%,#a78bfa 45%,#f0abca 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 25px rgba(124,58,237,0.25))",
              }}
            >
              Khindre
            </span>
          </h1>
        </div>

        {/* role chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 22,
          }}
        >
          {TAGS.map((t) => (
            <span
              key={t.label}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.8px",
                padding: "5px 13px",
                borderRadius: 4,
                textTransform: "uppercase",
                color: t.c,
                background: t.bg,
                border: `1px solid ${t.border}`,
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* bio */}
        <p
          style={{
            fontSize: 15,
            // color: "rgba(232,228,240,0.5)",
            maxWidth: 480,
            lineHeight: 1.75,
            marginBottom: 14,
            marginTop: 18,
            color: "var(--muted)",
          }}
        >
          I build at the intersection of{" "}
          <strong style={{ color: "var(--primary)", fontWeight: 500 }}>
            full-stack engineering
          </strong>{" "}
          and{" "}
          <strong style={{ color: "var(--highlight)", fontWeight: 500 }}>
            AI integration
          </strong>
          . Not just features —{" "}
          <strong style={{ color: "var(--text)"}}>
            experiences that make people pause
          </strong>
          .
        </p>

        {/* typewriter */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 16,
            // color: "rgba(240,171,202,0.7)",
            color: "var(--dim)",
            marginBottom: 36,
          }}
        >
          Currently: <Typewriter words={ROLES} />
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
          <button className="btn-primary" onClick={() => nav("/projects")}>
            View Projects →
          </button>
          <button className="btn-ghost" onClick={() => nav("/contact")}>
            Let's Talk
          </button>
        </div>

        {/* stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid rgba(124,58,237,0.15)",
            paddingTop: 32,
          }}
        >
          {[
            { v: "8.49", l: "CGPA" },
            { v: "4+", l: "Projects" },
            { v: "2026", l: "Graduating" },
            { v: "∞", l: "Curiosity" },
          ].map((s, i) => (
            <div
              key={s.l}
              style={{
                textAlign: "center",
                padding: "0 12px",
                borderRight: i < 3 ? "1px solid rgba(124,58,237,0.12)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 38,
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#a78bfa,#f0abca)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.v}
              </div>

              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "rgba(232,228,240,0.28)",
                  marginTop: 4,
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div
        style={{
          height: "420px",
          borderRadius: 20,
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.18), transparent 60%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
