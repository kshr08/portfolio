import { useEffect, useRef } from "react";

const BLOBS = [
  { x: 0.12, y: 0.18, r: 420, a: 0.055, c: "#7c3aed", px: 0, py: 0 },
  { x: 0.82, y: 0.38, r: 380, a: 0.045, c: "#a78bfa", px: 1.3, py: 0.9 },
  { x: 0.48, y: 0.78, r: 310, a: 0.038, c: "#f0abca", px: 0.7, py: 1.7 },
  { x: 0.65, y: 0.1, r: 280, a: 0.03, c: "#4c1d95", px: 1.8, py: 0.4 },
];
const PARTICLE_COLORS = ["#a78bfa", "#f0abca", "#c4b5fd", "#ddd6fe"];

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function AuroraCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let W,
      H,
      t = 0,
      raf;

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -(Math.random() * 0.0004 + 0.0001),
      life: Math.random(),
      c: PARTICLE_COLORS[Math.floor(Math.random() * 4)],
    }));

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.0035;

      BLOBS.forEach((b) => {
        const bx = (b.x + Math.sin(t + b.px) * 0.09) * W;
        const by = (b.y + Math.cos(t + b.py) * 0.07) * H;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        g.addColorStop(0, hexToRgba(b.c, b.a));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        if (p.life > 1) {
          p.x = Math.random();
          p.y = 1.05;
          p.life = 0;
        }
        const tt = p.life;
        const alpha =
          (tt < 0.2 ? tt / 0.2 : tt > 0.8 ? (1 - tt) / 0.2 : 1) * 0.28;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
