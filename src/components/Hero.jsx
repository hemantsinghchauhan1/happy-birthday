import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { memories } from "../data";

const reveal = {
  hidden: { y: "115%" },
  show: (i) => ({ y: 0, transition: { delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] } }),
};

function Line({ children, i, className }) {
  return (
    <span className="block overflow-hidden">
      <motion.span variants={reveal} custom={i} initial="hidden" animate="show" className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

const floatCards = [
  { src: memories[10].src, pos: "top-[14%] left-[4%]", rot: -12, d: 0, size: "w-28 sm:w-40" },
  { src: memories[11].src, pos: "top-[16%] right-[4%]", rot: 10, d: 0.4, size: "w-24 sm:w-36" },
  { src: memories[9].src, pos: "bottom-[12%] right-[7%]", rot: -8, d: 0.8, size: "w-24 sm:w-36" },
  { src: memories[6].src, pos: "bottom-[14%] left-[6%]", rot: 9, d: 1.1, size: "w-24 sm:w-32" },
];

export default function Hero({ music, cardAudio }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative z-10 min-h-screen w-full overflow-hidden"
      style={{ perspective: 1200 }}
      data-testid="hero"
    >
      {/* radial glow backdrops */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2e83]/20 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 h-[45vh] w-[45vh] rounded-full bg-[#2ee6d6]/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[40vh] w-[40vh] rounded-full bg-[#8b5cff]/20 blur-[120px]" />
      </div>

      {/* floating polaroid photos with parallax */}
      <motion.div className="absolute inset-0 z-10 hidden md:block" style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
        {floatCards.map((c, i) => (
          <motion.div
            key={i}
            className={`absolute ${c.pos} float-slow`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
          >
            <div
              className={`${c.size} rounded-xl bg-white/90 p-1.5`}
              style={{ transform: `rotate(${c.rot}deg)`, animationDelay: `${c.d}s`, boxShadow: "0 30px 60px rgba(0,0,0,.6)" }}
            >
              <img src={c.src} alt="" className="h-40 w-full rounded-lg object-cover sm:h-52" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Top Header Music Controls */}
      <div className="fixed right-4 top-4 z-40 flex items-center gap-3">
        {/* Play All Songs Button */}
        <button
          onClick={cardAudio?.startPlayAllSongs}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold transition shadow-lg backdrop-blur-md border ${
            cardAudio?.isPlayAllMode
              ? "bg-[#2ee6d6] text-black border-[#2ee6d6] shadow-[#2ee6d6]/50 scale-105"
              : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105"
          }`}
          data-testid="play-all-toggle"
        >
          <span className={cardAudio?.isPlayAllMode ? "animate-spin" : ""}>🔁</span>
          {cardAudio?.isPlayAllMode ? "Playlist Playing..." : "Play All Songs"}
        </button>

        {/* Background Theme Button */}
        <button
          onClick={music.toggle}
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition hover:scale-105 text-white/90"
          data-testid="music-toggle"
        >
          <span className={`inline-flex h-2 w-2 rounded-full ${music.playing ? "bg-[#ff2e83] animate-pulse" : "bg-white/40"}`} />
          {music.playing ? "Theme On" : "Theme Music"}
        </button>
      </div>

      {/* headline */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="mb-4 font-hand text-2xl text-[#2ee6d6] neon-cyan sm:text-3xl"
        >
          12 August · Happiest Day
        </motion.p>

        <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
          <Line i={0} className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
          <Line i={1} className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83] neon-magenta">Birthday</Line>
          <Line i={2} className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c] neon-gold">Mithlesh</Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 max-w-md text-sm text-white/70 sm:text-base"
        >
          Mere pehle dost ke liye ek chhoti si duniya — banayi gayi yaadon, hansi aur dosti se.
        </motion.p>

        {/* Quick action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={cardAudio?.startPlayAllSongs}
            className="flex items-center gap-2 rounded-full bg-[#ff2e83] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff2e83]/40 transition hover:scale-105 active:scale-95"
          >
            <span>Play All Memory Songs</span> 🎧
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="mt-10 flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-xs uppercase tracking-[0.3em]">scroll down for memories & songs</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.span>
        </motion.div>
      </div>

      {/* balloons */}
      {["#ff2e83", "#2ee6d6", "#ffcf5c"].map((c, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-20%] z-10"
          style={{ left: `${12 + i * 34}%` }}
          animate={{ y: ["0%", "-8%", "0%"] }}
          transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
        >
          <div className="h-16 w-12 rounded-[50%] opacity-70 sm:h-24 sm:w-20" style={{ background: c, boxShadow: `0 0 40px ${c}` }} />
        </motion.div>
      ))}
    </section>
  );
}
