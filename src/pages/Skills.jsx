import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { TECH_SKILLS, SOFT_SKILLS } from "../data.js";

export default function Skills() {
  const [tab, setTab] = useState("tech");

  return (
    <section className="section" style={{ minHeight: "100vh", paddingTop: 96 }}>
      <ScrollReveal>
        <p className="eyebrow">03 &nbsp;/&nbsp; toolkit</p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2 className="sec-title">
          What I <em>Know</em>
        </h2>
      </ScrollReveal>

      {/* toggle */}
      <ScrollReveal delay={0.14}>
        <div
          style={{
            display: "inline-flex",
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: 10,
            padding: 3,
            marginBottom: 44,
            gap: 3,
          }}
        >
          {[
            ["tech", "Technical"],
            ["soft", "Soft Skills"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "8px 22px",
                borderRadius: 8,
                border: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.5px",
                cursor: "none",
                transition: "all 0.22s",
                background:
                  tab === key
                    ? "linear-gradient(135deg,#7c3aed,#a78bfa)"
                    : "transparent",
                color: tab === key ? "#fff" : "rgba(15,14,17,0.4)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {tab === "tech" ? (
        <ScrollReveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {Object.entries(TECH_SKILLS).map(([cat, { color, tags }]) => (
              <div key={cat}>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 14,
                    fontStyle: "italic",
                    color,
                    marginBottom: 12,
                    opacity: 0.8,
                    fontWeight: 600,
                  }}
                >
                  {cat}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      data-cursor="true"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "7px 16px",
                        borderRadius: 7,
                        border: `1px solid ${color}33`,
                        background: color + "0e",
                        color,
                        boxShadow: "0 0 0 transparent",
                        transition: "transform 0.2s, background 0.2s",
                        cursor: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                        e.currentTarget.style.boxShadow = `0 8px 25px ${color}25`;
                        e.currentTarget.style.background = color + "1a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.background = color + "0e";
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))",
              gap: 12,
            }}
          >
            {SOFT_SKILLS.map((s) => (
              <div
                key={s.name}
                data-cursor="true"
                style={{
                  padding: "22px 18px",
                  borderRadius: 12,
                  border: `1px solid ${s.color}22`,
                  background: "rgba(124,58,237,0.03)",
                  textAlign: "center",
                  transition: "transform 0.22s, box-shadow 0.22s, background 0.22s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 8px 28px ${s.color}18`;
                  e.currentTarget.style.background = s.color + "0c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(124,58,237,0.03)";
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.color }}>
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}