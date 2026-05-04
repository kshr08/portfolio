import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const svgRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.13;
      trail.current.y += (pos.current.y - trail.current.y) * 0.13;
      if (svgRef.current) {
        svgRef.current.style.left = trail.current.x + "px";
        svgRef.current.style.top = trail.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => setHovered(true);
    const shrink = () => setHovered(false);
    document.querySelectorAll("button, a, [data-cursor]").forEach((el) => {
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
      {/* Precise dot at exact pointer position */}
      <div
        ref={dotRef}
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

      {/* Lagging dripping arrow cursor */}
      <div
        ref={svgRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: `translate(-4px, -4px) scale(${hovered ? 1.2 : 1})`,
          transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
          opacity: hovered ? 0.95 : 0.8,
          width: 54,
          height: 70,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 72"
          width="54"
          height="72"
        >
          <defs>
            <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="45%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="cg2" x1="0%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="cg3" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            <filter id="cshadow" x="-30%" y="-20%" width="160%" height="160%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.18)" />
            </filter>
          </defs>

          {/* Main arrow body */}
          <path
            d="M 6 3 C 6 1.5 8 0.5 10 2 L 46 24 C 49 26 49 30 46 32 L 26 43 C 23 45 20 43 20 40 L 20 30 C 20 27 18 25 15 25 L 10 25 C 8 25 6 23 6 21 Z"
            fill="url(#cg1)"
            filter="url(#cshadow)"
          />

          {/* Inner highlight layer */}
          <path
            d="M 10 5 C 10 4 11.5 3.5 12.5 4.5 L 42 24.5 C 43.5 25.5 43.5 28 42 29 L 27 37 L 24 35 L 24 26 C 24 24 22.5 22.5 20.5 22.5 L 13 22.5 C 11.5 22.5 10 21 10 19.5 Z"
            fill="url(#cg3)"
            opacity="0.35"
          />

          {/* Drip 1 - longest */}
          <path
            d="M 11 25 C 10.5 29 9.5 34 10.5 39 C 11 43 12.5 46 12 50 C 11.5 53 10 55 10.5 58 C 11 61 13 62 13 64.5 C 13 67 11.5 68.5 12.5 70 C 13.5 71 15.5 70 15.5 68 C 15.5 66 14.5 64 15 62 C 15.5 60 17 58.5 16.5 56 C 16 53 14.5 50.5 14.5 47 C 14.5 43 16 39 15.5 35 C 15 31 13 27 12 25 Z"
            fill="url(#cg2)"
          />

          {/* Drip 2 - medium */}
          <path
            d="M 16 27 C 15.5 31 15 35 16 39 C 16.5 42 18 44.5 17.5 47.5 C 17 50 16 52 16.5 54.5 C 17 56.5 18.5 57.5 18 59.5 C 17.5 61 16 61.5 16.5 63 C 17 64.5 19 64 19.5 62.5 C 20 61 19 59.5 19.5 58 C 20 56 21.5 54.5 21 52 C 20.5 49.5 19.5 47 19.5 44 C 19.5 40 21 36.5 20 32 C 19.5 29 17.5 27.5 17 27 Z"
            fill="url(#cg2)"
            opacity="0.85"
          />

          {/* Drip 3 - shortest */}
          <path
            d="M 22 38 C 21.5 41 21 44.5 21.5 48 C 22 51 23.5 52.5 23 55 C 22.5 57 21.5 58 22 59.5 C 22.5 61 24 61 24 59.5 C 24 58 23 57 23.5 55.5 C 24 53.5 25.5 52.5 25 50 C 24.5 47.5 23.5 45 23.5 42 C 23.5 39.5 22.5 38 22 38 Z"
            fill="url(#cg2)"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  );
}