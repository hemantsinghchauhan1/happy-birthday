import { useEffect, useRef } from "react";

// Ambient depth field: glowing bokeh orbs drifting in 3D-ish parallax.
export default function ParticleField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const colors = ["#ff2e83", "#2ee6d6", "#ffcf5c", "#8b5cff"];
    let dots = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor(W / 22));
      dots = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          r: 1 + z * 4,
          c: colors[(Math.random() * colors.length) | 0],
          vy: -(0.15 + z * 0.5),
          vx: (Math.random() - 0.5) * 0.3,
          a: 0.15 + z * 0.5,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        d.y += d.vy; d.x += d.vx;
        if (d.y < -20) { d.y = H + 20; d.x = Math.random() * W; }
        if (d.x < -20) d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        ctx.beginPath();
        ctx.shadowBlur = 18 * d.z;
        ctx.shadowColor = d.c;
        ctx.fillStyle = d.c;
        ctx.globalAlpha = d.a;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.85 }} />;
}
