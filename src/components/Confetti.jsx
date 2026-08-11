import { useEffect, useRef } from "react";

export function fireConfetti() {
  window.dispatchEvent(new Event("confetti-burst"));
}

// Full-screen confetti burst on demand (fireConfetti()).
export default function Confetti() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, W, H, parts = [];
    const colors = ["#ff2e83", "#2ee6d6", "#ffcf5c", "#8b5cff", "#ffffff"];

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const burst = () => {
      const cx = W / 2, cy = H * 0.4;
      for (let i = 0; i < 160; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 4 + Math.random() * 13;
        parts.push({
          x: cx + (Math.random() - 0.5) * W * 0.5, y: cy,
          vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 6,
          r: 3 + Math.random() * 6, c: colors[(Math.random() * colors.length) | 0],
          rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, life: 1,
        });
      }
    };
    window.addEventListener("confetti-burst", burst);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += 0.22; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr; p.life -= 0.006;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      });
      parts = parts.filter((p) => p.life > 0 && p.y < H + 40);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("confetti-burst", burst);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-50 pointer-events-none" />;
}
