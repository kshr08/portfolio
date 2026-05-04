import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { TECH_SKILLS, SOFT_SKILLS } from "../data.js";

// Darker, bolder color overrides for light mode visibility
const COLOR_MAP = {
  Frontend: "#5b21b6",
  Backend: "#9d174d",
  Database: "#1e40af",
  "AI / ML": "#065f46",
  Tools: "#92400e",
};

export default function Skills() {
  const [tab, setTab] = useState("tech");

  const entries = Object.entries(TECH_SKILLS);

  // Pair entries into rows of 2 for side-by-side layout
  const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }

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

      {/* Toggle */}
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
          {[["tech", "Technical"], ["soft", "Soft Skills"]].map(([key, label]) => (
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
                background: tab === key
                  ? "linear-gradient(135deg,#7c3aed,#a78bfa)"
                  : "transparent",
                color: tab === key ? "#fff" : "rgba(15,14,17,0.45)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {tab === "tech" ? (
        <ScrollReveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                style={{
                  display: "grid",
                  gridTemplateColumns: row.length === 2 ? "1fr 1fr" : "1fr",
                  gap: 16,
                }}
              >
                {row.map(([cat, { tags }]) => {
                  const color = COLOR_MAP[cat] || "#374151";
                  return (
                    <div
                      key={cat}
                      style={{
                        padding: "22px 24px",
                        borderRadius: 14,
                        border: `1.5px solid ${color}22`,
                        background: `${color}05`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      {/* Category header with accent bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 3,
                            height: 18,
                            borderRadius: 2,
                            background: color,
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 15,
                            fontStyle: "italic",
                            fontWeight: 700,
                            color: color,
                            letterSpacing: "0.2px",
                          }}
                        >
                          {cat}
                        </p>
                      </div>

                      {/* Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {tags.map((t) => (
                          <span
                            key={t}
                            data-cursor="true"
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "6px 13px",
                              borderRadius: 7,
                              border: `1px solid ${color}28`,
                              background: "#fff",
                              color: color,
                              boxShadow: `0 1px 3px ${color}10`,
                              transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
                              cursor: "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-3px)";
                              e.currentTarget.style.boxShadow = `0 6px 18px ${color}28`;
                              e.currentTarget.style.background = `${color}0e`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "none";
                              e.currentTarget.style.boxShadow = `0 1px 3px ${color}10`;
                              e.currentTarget.style.background = "#fff";
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
                  border: `1px solid rgba(15,14,17,0.1)`,
                  background: "#fff",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.22s, box-shadow 0.22s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f0e11" }}>
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