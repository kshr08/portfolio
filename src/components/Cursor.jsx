import { useEffect, useRef, useState } from "react";

// SVG path for the melting/dripping play-button arrow cursor
// Matches the style in the reference image: chunky arrow with organic drips hanging below
const CURSOR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" width="64" height="80">
  <defs>
    <linearGradient id="greyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d1d5db"/>
      <stop offset="40%" style="stop-color:#9ca3af"/>
      <stop offset="100%" style="stop-color:#4b5563"/>
    </linearGradient>
    <linearGradient id="greyGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9ca3af"/>
      <stop offset="100%" style="stop-color:#374151"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.22)"/>
    </filter>
  </defs>

  <!-- Main arrow body (play button / cursor arrow shape) -->
  <path
    d="
      M 8 4
      C 8 2, 10 1, 12 2
      L 54 28
      C 57 30, 57 34, 54 36
      L 32 49
      C 28 47, 26 44, 26 40
      L 26 36
      C 26 33, 24 31, 22 31
      L 12 31
      C 10 31, 8 29, 8 27
      Z
    "
    fill="url(#greyGrad)"
    filter="url(#shadow)"
  />

  <!-- Drip 1 — left side, longer -->
  <path
    d="
      M 14 31
      C 13 34, 12 38, 13 43
      C 13.5 47, 15 50, 14 54
      C 13.5 57, 12 59, 13 62
      C 13.5 64, 15 65, 15 67
      C 15 70, 13 72, 14 73
      C 15 74, 17 73, 17 71
      C 17 69, 16 67, 16.5 65
      C 17 63, 18.5 62, 18.5 59
      C 18.5 56, 17 53, 17 50
      C 17 46, 18 43, 18 39
      C 18 35, 17 32, 16 31
      Z
    "
    fill="url(#greyGradDark)"
  />

  <!-- Drip 2 — middle, medium -->
  <path
    d="
      M 21 34
      C 20.5 37, 20 41, 21 45
      C 21.5 48, 23 50, 22.5 53
      C 22 56, 21 57.5, 21.5 59.5
      C 22 61.5, 23.5 62, 23 63.5
      C 22.5 65, 21 65, 21.5 66.5
      C 22 68, 24 68, 24.5 66.5
      C 25 65, 24 63.5, 24.5 62
      C 25 60, 26 59, 25.5 56.5
      C 25 54, 24 52, 24 49
      C 24 45, 25 41, 24.5 37
      C 24 34.5, 22.5 33, 22 34
      Z
    "
    fill="url(#greyGradDark)"
    opacity="0.9"
  />

  <!-- Drip 3 — right of arrow base, shorter blob -->
  <path
    d="
      M 28 46
      C 27.5 49, 27 52, 27.5 55
      C 28 58, 29.5 59, 29 61
      C 28.5 63, 27.5 63.5, 28 65
      C 28.5 66, 30 66, 30 65
      C 30 63.5, 29 63, 29.5 61.5
      C 30 60, 31 59, 31 57
      C 31 54, 30 51, 30 48
      C 30 45.5, 29 44.5, 28.5 46
      Z
    "
    fill="url(#greyGradDark)"
    opacity="0.8"
  />

  <!-- Inner highlight on arrow for the layered paper-cut depth -->
  <path
    d="
      M 12 6
      C 12 5, 13 4.5, 14 5
      L 50 28.5
      C 52 29.5, 52 32, 50 33
      L 34 42
      L 28 39
      L 28 27
      C 28 25, 27 23.5, 26 23
      L 14 23
      C 13 23, 12 22, 12 21
      Z
    "
    fill="url(#greyGrad)"
    opacity="0.45"
  />
</svg>
`;

const CURSOR_DATA_URL = `data:image/svg+xml;base64,${btoa(CURSOR_SVG)}`;

export default function Cursor() {
  const dot = useRef(null);
  const cursorImg = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.13;
      trail.current.y += (pos.current.y - trail.current.y) * 0.13;
      if (cursorImg.current) {
        cursorImg.current.style.left = trail.current.x + "px";
        cursorImg.current.style.top = trail.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => setHovered(true);
    const shrink = () => setHovered(false);

    const targets = document.querySelectorAll("button, a, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Tiny precise dot at exact pointer position */}
      <div
        ref={dot}
        style={{
          position: "fixed",
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          borderRadius: "50%",
          background: hovered ? "#6b7280" : "#374151",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "width .2s, height .2s, background .2s",
          mixBlendMode: "multiply",
        }}
      />

      {/* Lagging dripping cursor SVG */}
      <div
        ref={cursorImg}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: `translate(-4px, -4px) scale(${hovered ? 1.18 : 1})`,
          transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
          opacity: hovered ? 0.95 : 0.82,
          width: 54,
          height: 68,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 80"
          width="54"
          height="68"
        >
          <defs>
            <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="40%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="cg3" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            <filter id="cs" x="-30%" y="-20%" width="160%" height="160%">
              <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.18)" />
            </filter>
          </defs>

          {/* Main arrow body */}
          <path
            d="M 8 4 C 8 2 10 1 12 2 L 54 28 C 57 30 57 34 54 36 L 30 49 C 27 51 24 49 24 46 L 24 35 C 24 32 22 30 19 30 L 12 30 C 10 30 8 28 8 26 Z"
            fill="url(#cg1)"
            filter="url(#cs)"
          />

          {/* Inner shadow layer for depth */}
          <path
            d="M 13 7 C 13 5.5 14.5 5 15.5 5.5 L 50 29 C 51.5 30 51.5 32.5 50 33.5 L 31 44 L 28 42 L 28 31 C 28 28.5 26.5 27 24.5 27 L 16 27 C 14.5 27 13 25.5 13 24 Z"
            fill="url(#cg3)"
            opacity="0.4"
          />

          {/* Drip 1 — leftmost, longest */}
          <path
            d="M 13.5 30 C 13 34 12 39 13 44 C 13.5 48 15 51 14.5 55 C 14 58 12.5 60 13 63 C 13.5 65.5 15 66.5 15 69 C 15 71.5 13.5 73 14.5 74.5 C 15.5 76 17.5 75 17.5 72.5 C 17.5 70.5 16.5 68.5 17 66.5 C 17.5 64 19 62.5 18.5 59.5 C 18 56.5 16.5 54 16.5 50.5 C 16.5 46.5 18 43 17.5 38.5 C 17 34.5 15.5 31 14.5 30 Z"
            fill="url(#cg2)"
          />

          {/* Drip 2 — middle */}
          <path
            d="M 19.5 31.5 C 19 35 18.5 39.5 19.5 44 C 20 47 21.5 49.5 21 52.5 C 20.5 55.5 19.5 57 20 59.5 C 20.5 61.5 22 62.5 21.5 64.5 C 21 66 19.5 66.5 20 68 C 20.5 69.5 22.5 69 23 67.5 C 23.5 66 22.5 64.5 23 63 C 23.5 61 25 59.5 24.5 57 C 24 54.5 23 52 23 49 C 23 45 24.5 41 23.5 36.5 C 23 33.5 21 32 20 31.5 Z"
            fill="url(#cg2)"
            opacity="0.88"
          />

          {/* Drip 3 — rightmost, shortest blob */}
          <path
            d="M 26 44 C 25.5 47 25 50.5 25.5 54 C 26 57 27.5 58.5 27 61 C 26.5 63 25.5 64 26 65.5 C 26.5 67 28.5 67 28.5 65.5 C 28.5 64 27.5 63 28 61.5 C 28.5 59.5 30 58.5 29.5 56 C 29 53.5 28 51 28 48 C 28 45.5 27 44 26.5 44 Z"
            fill="url(#cg2)"
            opacity="0.75"
          />
        </svg>
      </div>
    </>
  );
}