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
  { item: memories[10], pos: "top-[10%] left-[3%]", rot: -14, d: 0, size: "w-32 sm:w-44" },
  { item: memories[11], pos: "top-[12%] right-[3%]", rot: 12, d: 0.4, size: "w-28 sm:w-40" },
  { item: memories[0], pos: "top-[48%] left-[2%]", rot: 8, d: 0.6, size: "w-28 sm:w-36" },
  { item: memories[1], pos: "top-[50%] right-[2%]", rot: -10, d: 0.8, size: "w-28 sm:w-36" },
  { item: memories[6], pos: "bottom-[8%] left-[7%]", rot: -8, d: 1.1, size: "w-28 sm:w-36" },
  { item: memories[3], pos: "bottom-[6%] right-[7%]", rot: 10, d: 1.3, size: "w-28 sm:w-36" },
];

export default function Hero({ music, cardAudio }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const scrollToCarousel = () => {
    const carouselEl = document.querySelector('[data-testid="memory-carousel"]');
    if (carouselEl) {
      carouselEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative z-10 min-h-screen w-full overflow-hidden"
      style={{ perspective: 1200 }}
      data-testid="hero"
    >
      {/* 3D Radial Glow Backdrops */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2e83]/25 blur-[140px]" />
        <div className="absolute left-1/5 bottom-0 h-[50vh] w-[50vh] rounded-full bg-[#2ee6d6]/20 blur-[130px]" />
        <div className="absolute right-1/5 top-1/4 h-[45vh] w-[45vh] rounded-full bg-[#8b5cff]/25 blur-[130px]" />
      </div>

      {/* Floating 3D Polaroid Cards with Interactive Parallax */}
      <motion.div
        className="absolute inset-0 z-10 hidden md:block"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        {floatCards.map((c, i) => (
          <motion.div
            key={i}
            className={`absolute ${c.pos} float-slow cursor-pointer group`}
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
            whileHover={{ scale: 1.12, zIndex: 40 }}
          >
            <div
              className={`${c.size} rounded-2xl bg-white p-2 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:shadow-[0_30px_70px_rgba(255,46,131,0.4)] border border-white/40`}
              style={{ transform: `rotate(${c.rot}deg)`, animationDelay: `${c.d}s` }}
            >
              {/* Tape clip */}
              <div className="washi-tape" />

              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-black sm:h-56">
                <img src={c.item.src} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md truncate">
                  #{String(c.item.id).padStart(2, "0")} {c.item.caption}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating 3D Musical Notes & Celebration Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {["🎵", "✨", "💿", "💖", "🎂", "🎉"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-15, 15, -15],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

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

      {/* Hero Central Headline */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs sm:text-sm font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/30 shadow-[0_0_20px_rgba(46,230,214,0.3)]"
        >
          <span className="text-base">👑</span> 12 AUGUST · HAPPIEST BIRTHDAY <span className="text-base">✨</span>
        </motion.div>

        <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
          <Line i={0} className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
          <Line i={1} className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83] neon-magenta">Birthday</Line>
          <Line i={2} className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c] neon-gold">Mithlesh</Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 max-w-md text-sm text-white/80 sm:text-base leading-relaxed"
        >
          Mere pehle dost ke liye ek chhoti si duniya — banayi gayi yaadon, hansi aur dosti se. 💖
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={cardAudio?.startPlayAllSongs}
            className="flex items-center gap-2 rounded-full bg-[#ff2e83] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,46,131,0.5)] transition hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Play All Memory Songs</span> 🎧
          </button>

          <button
            onClick={scrollToCarousel}
            className="flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Explore 3D Showcase</span> 📸
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-xs uppercase tracking-[0.3em]">scroll down for memories & songs</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.span>
        </motion.div>
      </div>

      {/* Floating 3D Balloons */}
      {["#ff2e83", "#2ee6d6", "#ffcf5c"].map((c, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-15%] z-10 pointer-events-none"
          style={{ left: `${10 + i * 36}%` }}
          animate={{ y: ["0%", "-10%", "0%"] }}
          transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
        >
          <div className="h-20 w-16 rounded-[50%] opacity-75 sm:h-28 sm:w-24" style={{ background: c, boxShadow: `0 0 50px ${c}` }} />
        </motion.div>
      ))}
    </section>
  );
}
