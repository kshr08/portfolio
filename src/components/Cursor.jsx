import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.current.style.left = e.clientX + "px";
      dot.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.11;
      trail.current.y += (pos.current.y - trail.current.y) * 0.11;
      ring.current.style.left = trail.current.x + "px";
      ring.current.style.top = trail.current.y + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      dot.current.style.width = "18px";
      dot.current.style.height = "18px";
      dot.current.style.background = "var(--vsoft)";
      ring.current.style.width = "54px";
      ring.current.style.height = "54px";
      ring.current.style.borderColor = "rgba(167,139,250,0.6)";
    };
    const shrink = () => {
      dot.current.style.width = "8px";
      dot.current.style.height = "8px";
      dot.current.style.background = "var(--blush)";
      ring.current.style.width = "36px";
      ring.current.style.height = "36px";
      ring.current.style.borderColor = "rgba(167,139,250,0.4)";
    };

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

  const base = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%,-50%)",
    transition: "width .25s, height .25s, background .25s, border-color .25s",
  };

  return (
    <>
      <div
        ref={dot}
        style={{
          ...base,
          width: 8,
          height: 8,
          background: "var(--blush)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ring}
        style={{
          ...base,
          width: 36,
          height: 36,
          border: "1px solid rgba(167,139,250,0.4)",
          zIndex: 9998,
          transition: "all .14s ease",
        }}
      />
    </>
  );
}
