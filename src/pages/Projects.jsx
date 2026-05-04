import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardSwap, { Card } from "../components/CardSwap.jsx";
import { PROJECTS } from "../data.js";

const ICON = ["</>", "≋", "◈", "⬡"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function ProjectInfo({ project: p }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: 22 }}
      >
        {/* Eyebrow + title */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 11,
              fontStyle: "italic",
              color: p.color,
              opacity: 0.8,
              marginBottom: 10,
              letterSpacing: "0.4px",
            }}
          >
            _{p.id}.
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 4.8vw, 60px)",
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 0.93,
              color: "#0f0e11",
              marginBottom: 10,
            }}
          >
            {p.name}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: p.color,
              opacity: 0.85,
            }}
          >
            {p.tagline}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(15,14,17,0.6)",
            lineHeight: 1.85,
            maxWidth: 420,
          }}
        >
          {p.desc}
        </p>

        {/* Stack pills */}
        <div>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(15,14,17,0.35)",
              marginBottom: 10,
            }}
          >
            Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {p.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 13px",
                  borderRadius: 6,
                  border: `1px solid ${p.color}44`,
                  background: p.color + "12",
                  color: p.color,
                  letterSpacing: "0.2px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTA links */}
        <div style={{ display: "flex", gap: 11, marginTop: 2 }}>
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              padding: "11px 24px",
              borderRadius: 8,
              border: `1px solid ${p.color}55`,
              background: p.color + "16",
              color: p.color,
              transition: "background 0.2s, transform 0.18s",
              cursor: "none",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = p.color + "28";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = p.color + "16";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Live ↗
          </a>
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              padding: "11px 24px",
              borderRadius: 8,
              border: "1px solid rgba(15,14,17,0.15)",
              background: "transparent",
              color: "rgba(15,14,17,0.5)",
              transition: "border-color 0.2s, color 0.2s, transform 0.18s",
              cursor: "none",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0f0e11";
              e.currentTarget.style.borderColor = "rgba(15,14,17,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(15,14,17,0.5)";
              e.currentTarget.style.borderColor = "rgba(15,14,17,0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            GitHub →
          </a>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 7, marginTop: 2 }}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              style={{
                width: proj.id === p.id ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: proj.id === p.id ? p.color : "rgba(15,14,17,0.12)",
                transition: "all 0.36s ease",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CardHeader({ project: p, index }) {
  return (
    <div
      style={{
        height: 38,
        background: "rgba(245,243,240,0.97)",
        borderBottom: "1px solid rgba(15,14,17,0.08)",
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: 9,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: 5 }}>
        {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: c,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div style={{ width: 1, height: 16, background: "rgba(15,14,17,0.1)", marginLeft: 2 }} />

      <span
        style={{
          fontSize: 11,
          color: p.color,
          fontFamily: "var(--font-sans, monospace)",
          fontWeight: 700,
          letterSpacing: "0.3px",
        }}
      >
        {ICON[index % ICON.length]}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "rgba(15,14,17,0.55)",
          fontFamily: "var(--font-sans, monospace)",
          letterSpacing: "0.2px",
        }}
      >
        {p.name}
      </span>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = PROJECTS[activeIdx];

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "100px 72px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1.15fr",
        gap: 60,
        alignItems: "center",
      }}
    >
      {/* LEFT: info panel */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <motion.div {...fade()} style={{ marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "rgba(109,40,217,0.55)",
              marginBottom: 4,
            }}
          >
            02 &nbsp;/&nbsp; selected projects
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(15,14,17,0.4)",
              fontStyle: "italic",
              fontFamily: "var(--font-serif)",
            }}
          >
            Click a card to explore →
          </p>
        </motion.div>

        <ProjectInfo project={activeProject} index={activeIdx} />
      </div>

      {/* RIGHT: card stack */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: 560,
        }}
      >
        <CardSwap
          width={500}
          height={340}
          cardDistance={20}
          verticalDistance={36}
          delay={3200}
          pauseOnHover
          onFrontChange={(refIdx) => setActiveIdx(refIdx)}
        >
          {PROJECTS.map((p, i) => (
            <Card
              key={p.id}
              style={{
                border: `1px solid ${p.color}25`,
                background: "rgba(250,249,246,0.98)",
                boxShadow: `
                  0 24px 64px rgba(0,0,0,0.1),
                  0 0 0 1px ${p.color}10,
                  inset 0 1px 0 rgba(255,255,255,0.8)
                `,
                cursor: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardHeader project={p} index={i} />

              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(0.75) brightness(0.9)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${p.color}0e 0%, transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}