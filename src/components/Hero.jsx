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

// Split memories into two columns for vertical infinite 3D scrolling marquee
const leftColMemories = [...memories.slice(0, 6), ...memories.slice(0, 6)];
const rightColMemories = [...memories.slice(6, 12), ...memories.slice(6, 12)];

export default function Hero({ music, cardAudio, onOpenModal }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16]);

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
        <div className="absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2e83]/25 blur-[140px]" />
        <div className="absolute left-1/5 bottom-0 h-[50vh] w-[50vh] rounded-full bg-[#2ee6d6]/20 blur-[130px]" />
        <div className="absolute right-1/5 top-1/4 h-[45vh] w-[45vh] rounded-full bg-[#8b5cff]/25 blur-[130px]" />
      </div>

      {/* LEFT COLUMN: 3D Vertical Scrolling Marquee UP */}
      <div className="absolute left-2 sm:left-6 top-0 bottom-0 z-10 hidden md:block w-36 sm:w-44 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex flex-col gap-6 pt-4 pointer-events-auto"
        >
          {leftColMemories.map((m, i) => (
            <motion.div
              key={`left-${i}`}
              whileHover={{ scale: 1.1, zIndex: 40 }}
              onClick={() => onOpenModal && onOpenModal(m)}
              className="cursor-pointer rounded-2xl bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rotate-[-6deg] transition-all hover:shadow-[0_25px_60px_rgba(255,46,131,0.4)] border border-white/40"
            >
              <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl bg-black">
                <img src={m.src} alt="" className="h-full w-full object-cover" />
                <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md truncate">
                  #{String(m.id).padStart(2, "0")} {m.caption}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT COLUMN: 3D Vertical Scrolling Marquee DOWN */}
      <div className="absolute right-2 sm:right-6 top-0 bottom-0 z-10 hidden md:block w-36 sm:w-44 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex flex-col gap-6 pt-4 pointer-events-auto"
        >
          {rightColMemories.map((m, i) => (
            <motion.div
              key={`right-${i}`}
              whileHover={{ scale: 1.1, zIndex: 40 }}
              onClick={() => onOpenModal && onOpenModal(m)}
              className="cursor-pointer rounded-2xl bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rotate-[6deg] transition-all hover:shadow-[0_25px_60px_rgba(46,230,214,0.4)] border border-white/40"
            >
              <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl bg-black">
                <img src={m.src} alt="" className="h-full w-full object-cover" />
                <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md truncate">
                  #{String(m.id).padStart(2, "0")} {m.caption}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating 3D Musical Notes & Celebration Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {["🎵", "✨", "💿", "💖", "🎂", "🎉"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl"
            style={{ left: `${25 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
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

      {/* Hero Central 3D Headline Area */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-5 text-center"
      >
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs sm:text-sm font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/30 shadow-[0_0_20px_rgba(46,230,214,0.3)]"
        >
          <span className="text-base">👑</span> 12 AUGUST · HAPPIEST BIRTHDAY <span className="text-base">✨</span>
        </motion.div>

        {/* 3D Extruded Title */}
        <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
          <Line i={0} className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
          <Line i={1} className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83] text-3d-title">Birthday</Line>
          <Line i={2} className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c] text-3d-gold">Mithlesh</Line>
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
      </motion.div>

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
