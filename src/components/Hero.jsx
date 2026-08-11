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
  { item: memories[10], pos: "top-[12%] left-[2%] sm:left-[5%]", rot: -12, d: 0, size: "w-24 sm:w-36 md:w-44" },
  { item: memories[11], pos: "top-[14%] right-[2%] sm:right-[5%]", rot: 10, d: 0.4, size: "w-24 sm:w-36 md:w-40" },
  { item: memories[6], pos: "bottom-[12%] left-[3%] sm:left-[6%]", rot: -8, d: 0.8, size: "w-24 sm:w-32 md:w-40" },
  { item: memories[9], pos: "bottom-[14%] right-[3%] sm:right-[6%]", rot: 9, d: 1.1, size: "w-24 sm:w-32 md:w-36" },
];

export default function Hero({ music, cardAudio, onOpenModal }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20 });
  const sy = useSpring(my, { stiffness: 70, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

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
        <div className="absolute left-1/2 top-1/3 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2e83]/20 blur-[130px]" />
        <div className="absolute left-1/4 bottom-0 h-[45vh] w-[45vh] rounded-full bg-[#2ee6d6]/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[40vh] w-[40vh] rounded-full bg-[#8b5cff]/20 blur-[120px]" />
      </div>

      {/* Floating 3D Polaroid Cards with Responsive Positions & Click Preview */}
      <motion.div
        className="absolute inset-0 z-10 block"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        {floatCards.map((c, i) => (
          <motion.div
            key={i}
            className={`absolute ${c.pos} float-slow cursor-pointer group`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
            onClick={() => onOpenModal && onOpenModal(c.item)}
            whileHover={{ scale: 1.1, zIndex: 40 }}
          >
            <div
              className={`${c.size} rounded-2xl bg-white p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:shadow-[0_25px_60px_rgba(255,46,131,0.4)] border border-white/40`}
              style={{ transform: `rotate(${c.rot}deg)`, animationDelay: `${c.d}s` }}
            >
              {/* Tape clip */}
              <div className="washi-tape" />

              <div className="relative h-32 sm:h-44 md:h-56 w-full overflow-hidden rounded-xl bg-black">
                <img src={c.item.src} alt="" className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-500" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 rounded-lg bg-black/70 px-2 py-1 text-[9px] sm:text-[11px] font-bold text-white backdrop-blur-md truncate text-left">
                  #{String(c.item.id).padStart(2, "0")} {c.item.caption}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating 3D Celebration Particles */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {["🎵", "✨", "💿", "💖", "🎂", "🎉"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-3xl"
            style={{ left: `${15 + i * 14}%`, top: `${18 + (i % 3) * 26}%` }}
            animate={{
              y: [-12, 12, -12],
              rotate: [-12, 12, -12],
              opacity: [0.35, 0.85, 0.35],
            }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Top Header Music Controls */}
      <div className="fixed right-3 sm:right-6 top-3 sm:top-5 z-40 flex items-center gap-2 sm:gap-3">
        {/* Play All Songs Button */}
        <button
          onClick={cardAudio?.startPlayAllSongs}
          className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-extrabold transition shadow-lg backdrop-blur-md border ${
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
          className="glass flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition hover:scale-105 text-white/90"
          data-testid="music-toggle"
        >
          <span className={`inline-flex h-2 w-2 rounded-full ${music.playing ? "bg-[#ff2e83] animate-pulse" : "bg-white/40"}`} />
          {music.playing ? "Theme On" : "Theme Music"}
        </button>
      </div>

      {/* Hero Headline Area */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 sm:px-6 py-2 text-xs sm:text-sm font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/30 shadow-[0_0_20px_rgba(46,230,214,0.3)]"
        >
          <span className="text-sm sm:text-base">👑</span> 12 AUGUST · HAPPIEST BIRTHDAY <span className="text-sm sm:text-base">✨</span>
        </motion.div>

        <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
          <Line i={0} className="text-3xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
          <Line i={1} className="text-4xl sm:text-7xl lg:text-8xl text-[#ff2e83] neon-magenta">Birthday</Line>
          <Line i={2} className="font-serif-i italic normal-case text-4xl sm:text-7xl lg:text-8xl text-[#ffcf5c] neon-gold">Mithlesh</Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 sm:mt-8 max-w-sm sm:max-w-md text-xs sm:text-base text-white/80 leading-relaxed"
        >
          Mere pehle dost ke liye ek chhoti si duniya — banayi gayi yaadon, hansi aur dosti se. 💖
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={cardAudio?.startPlayAllSongs}
            className="flex items-center gap-2 rounded-full bg-[#ff2e83] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,46,131,0.5)] transition hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Play All Memory Songs</span> 🎧
          </button>

          <button
            onClick={scrollToCarousel}
            className="flex items-center gap-2 rounded-full bg-white/10 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Explore 3D Showcase</span> 📸
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em]">scroll down for memories & songs</span>
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
          <div className="h-16 w-12 rounded-[50%] opacity-70 sm:h-28 sm:w-24" style={{ background: c, boxShadow: `0 0 50px ${c}` }} />
        </motion.div>
      ))}
    </section>
  );
}
