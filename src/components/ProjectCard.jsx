import { useState } from "react";
const jitter = (Math.random() - 0.5) * 0.6;
function Lightbox({ src, color, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(7,5,15,0.92)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
      }}
    >
      <img
        src={src}
        style={{
          maxWidth: "82vw",
          maxHeight: "80vh",
          borderRadius: 14,
          border: `1px solid ${color}55`,
          boxShadow: `0 0 80px ${color}33`,
          animation: "fadeUp 0.35s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          fontSize: 20,
          color: "rgba(232,228,240,0.4)",
        }}
      >
        ✕
      </span>
    </div>
  );
}

export default function ProjectCard({ project: p }) {
  const [hovered, setHovered] = useState(false);
  const [lb, setLb] = useState(false);

  return (
    <>
      {lb && (
        <Lightbox src={p.img} color={p.color} onClose={() => setLb(false)} />
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 18,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? p.color + "44" : "rgba(124,58,237,0.14)"}`,
          background: hovered
            ? "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(240,171,202,0.06))"
            : "rgba(124,58,237,0.04)",
          transform: hovered
            ? `translateY(-6px) rotate(${jitter}deg)`
            : "rotate(0deg)",
          boxShadow: hovered ? `0 16px 52px ${p.color}1a` : "none",
          transition: "all 0.3s ease",
          cursor: "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 20px 0",
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 12,
              fontStyle: "italic",
              color: p.color,
              opacity: 0.65,
            }}
          >
            _{p.id}.
          </span>
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.3px",
                color: "var(--mist)",
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 11,
                fontStyle: "italic",
                color: p.color,
                opacity: 0.6,
                marginTop: 1,
              }}
            >
              {p.tagline}
            </div>
          </div>
        </div>

        {/* 70-30 layout */}
        <div style={{ display: "grid", gridTemplateColumns: "70% 30%" }}>
          {/* Image */}
          <div
            style={{
              padding: "12px 6px 12px 14px",
              cursor: "zoom-in",
              overflow: "hidden",
            }}
            onClick={() => setLb(true)}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 9,
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 182,
                  objectFit: "cover",
                  display: "block",
                  filter: hovered
                    ? "saturate(1) brightness(0.92)"
                    : "saturate(0.65) brightness(0.7)",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "filter 0.5s, transform 0.55s",
                  boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.6)" : "none",
                }}
              />
              {hovered && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(7,5,15,0.3)",
                    borderRadius: 9,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--mist)",
                      background: "rgba(7,5,15,0.55)",
                      padding: "5px 11px",
                      borderRadius: 5,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    🔍 expand
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stack */}
          <div
            style={{
              padding: "12px 12px 12px 2px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 8,
                letterSpacing: "2px",
                color: "rgba(232,228,240,0.22)",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Stack
            </div>
            {p.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 7px",
                  borderRadius: 5,
                  textAlign: "center",
                  border: "1px solid",
                  color: p.color,
                  borderColor: p.color + "33",
                  background: p.color + "12",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Desc */}
        <p
          style={{
            padding: "0 18px 12px",
            fontSize: 12,
            color: "rgba(232,228,240,0.4)",
            lineHeight: 1.65,
          }}
        >
          {p.desc}
        </p>

        {/* Links */}
        <div
          style={{
            padding: "11px 18px 16px",
            borderTop: "1px solid rgba(124,58,237,0.1)",
            display: "flex",
            gap: 8,
          }}
        >
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 13px",
              borderRadius: 5,
              border: `1px solid ${p.color}44`,
              background: p.color + "10",
              color: p.color,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = p.color + "22")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = p.color + "10")
            }
          >
            Live ↗
          </a>
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 13px",
              borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "rgba(232,228,240,0.3)",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--mist)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,228,240,0.3)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            GitHub →
          </a>
        </div>
      </div>
    </>
  );
}
