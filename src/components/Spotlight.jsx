import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--x", e.clientX + "px");
      ref.current.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        background: `
            radial-gradient(
            220px at var(--x) var(--y),
            rgba(167,139,250,0.08),
            transparent 75%
            )
        `,
      }}
    />
  );
}
