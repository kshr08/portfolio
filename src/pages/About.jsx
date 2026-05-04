import ScrollReveal from "../components/ScrollReveal.jsx";

const TIMELINE = [
  {
    year: "2026",
    title: "C-DAC Interview Prep",
    place: "Self-directed",
    desc: "400+ questions — Java, React, Node.js, DSA, System Design, Core CS.",
    color: "#6d28d9",
  },
  {
    year: "2025–26",
    title: "Full Stack Intern",
    place: "Paarsh Infotech, Nashik",
    desc: "Java-based CRM system. Spring Boot, REST APIs, MySQL.",
    color: "#9d174d",
  },
  {
    year: "2025",
    title: "CityPulse AI — Finalist",
    place: "Competition",
    desc: "Led Edge AI phase. Python + OpenCV + Ollama gemma3:4b real-time pipeline.",
    color: "#7c3aed",
  },
  {
    year: "2022",
    title: "B.Tech CSE Begins",
    place: "MIT CSN",
    desc: "Where it all started.",
    color: "rgba(15,14,17,0.3)",
  },
];

const INFO = [
  { label: "Degree", val: "B.Tech CSE — MIT CSN" },
  { label: "CGPA", val: "8.49 / 10" },
  { label: "Interning", val: "Paarsh Infotech, Nashik" },
  { label: "Seeking", val: "SDE / Full Stack roles" },
  { label: "Location", val: "Maharashtra, India" },
  { label: "Languages", val: "English · Hindi · Marathi" },
];

export default function About() {
  return (
    <section className="section" style={{ minHeight: "100vh", paddingTop: 96 }}>
      <ScrollReveal>
        <p className="eyebrow">01 &nbsp;/&nbsp; about</p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2 className="sec-title">
          The Human
          <br />
          <em>Behind the Code</em>
        </h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          marginBottom: 56,
        }}
      >
        {/* bio */}
        <ScrollReveal delay={0.12}>
          <p style={{ fontSize: 15, color: "rgba(15,14,17,0.6)", lineHeight: 1.85, marginBottom: 16 }}>
            Final-year B.Tech CSE at{" "}
            <span style={{ color: "#5b21b6", fontWeight: 600 }}>MIT Chhatrapati Sambhajinagar</span>
            , graduating 2026 with a CGPA of 8.49. Currently interning as a Full Stack Developer at{" "}
            <span style={{ color: "#9d174d", fontWeight: 600 }}>Paarsh Infotech</span>, building a Java-based CRM system.
          </p>
          <p style={{ fontSize: 15, color: "rgba(15,14,17,0.6)", lineHeight: 1.85, marginBottom: 32 }}>
            Preparing for <span style={{ color: "#0f0e11", fontWeight: 600 }}>C-DAC</span>{" "}
            and exploring SDE roles across Pune, Bengaluru, Nagpur, and Coimbatore.
          </p>

          {/* timeline */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 72,
                top: 0,
                bottom: 0,
                width: 1,
                background: "rgba(124,58,237,0.15)",
              }}
            />
            {TIMELINE.map((t) => (
              <div
                key={t.title}
                style={{
                  display: "flex",
                  gap: 22,
                  alignItems: "flex-start",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(124,58,237,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 12,
                    fontStyle: "italic",
                    color: t.color,
                    minWidth: 56,
                    textAlign: "right",
                    paddingTop: 2,
                  }}
                >
                  {t.year}
                </span>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: t.color,
                    boxShadow: `0 0 8px ${t.color}`,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0f0e11",
                      marginBottom: 3,
                    }}
                  >
                    {t.title}
                  </h4>
                  <p style={{ fontSize: 11, color: t.color, marginBottom: 4 }}>{t.place}</p>
                  <p style={{ fontSize: 12, color: "rgba(15,14,17,0.45)", lineHeight: 1.55 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* info + quote */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INFO.map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "rgba(124,58,237,0.04)",
                  border: "1px solid rgba(124,58,237,0.12)",
                  borderLeft: "2px solid #7c3aed",
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(109,40,217,0.45)",
                    minWidth: 70,
                  }}
                >
                  {row.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f0e11" }}>
                  {row.val}
                </span>
              </div>
            ))}

            {/* quote */}
            <div
              style={{
                marginTop: 10,
                padding: "18px 20px",
                background: "rgba(157,23,77,0.03)",
                border: "1px solid rgba(157,23,77,0.12)",
                borderRadius: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "rgba(15,14,17,0.55)",
                  lineHeight: 1.65,
                }}
              >
                "I don't just build things that work.
                <br />I build things that make people feel something."
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}