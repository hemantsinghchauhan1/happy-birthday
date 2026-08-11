import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

// 4 Fixed Landing Pads Coordinates (Percentage based for responsiveness)
const padCoordinates = [
  { id: 0, x: "4vw", y: "12vh", rot: -12, name: "Top-Left" },
  { id: 1, x: "72vw", y: "14vh", rot: 10, name: "Top-Right" },
  { id: 2, x: "70vw", y: "62vh", rot: -8, name: "Bottom-Right" },
  { id: 3, x: "4vw", y: "60vh", rot: 9, name: "Bottom-Left" },
];

export default function Hero({ music, cardAudio, onOpenModal }) {
  const [activePad, setActivePad] = useState(0); // 0, 1, 2, 3
  const [photoOffset, setPhotoOffset] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Continuous Parabolic Frog Leap Timer: Leaps every 3 seconds!
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePad((prev) => {
        const nextPad = (prev + 1) % 4;
        if (nextPad === 0) {
          setPhotoOffset((po) => (po + 1) % memories.length);
        }
        return nextPad;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentPad = padCoordinates[activePad];
  const activeMemory = memories[(photoOffset + activePad) % memories.length];

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

      {/* 4 Fixed Landing Pads */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
        {padCoordinates.map((pad, idx) => {
          const padMemory = memories[(photoOffset + idx) % memories.length];
          const isCurrentActive = idx === activePad;

          return (
            <div
              key={pad.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{ left: pad.x, top: pad.y }}
              onClick={() => onOpenModal && onOpenModal(padMemory)}
            >
              <div
                className={`w-32 sm:w-40 md:w-44 rounded-2xl p-2 transition-all duration-500 ${
                  isCurrentActive
                    ? "bg-white ring-4 ring-[#ff2e83] shadow-[0_0_40px_rgba(255,46,131,0.6)] scale-105"
                    : "bg-white/70 opacity-60 shadow-xl group-hover:opacity-100 group-hover:scale-105"
                }`}
                style={{ transform: `rotate(${pad.rot}deg)` }}
              >
                {/* Washi tape clip */}
                <div className="washi-tape" />

                <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl bg-black">
                  <img src={padMemory.src} alt="" className="h-full w-full object-cover" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 rounded-lg bg-black/75 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md truncate text-left">
                    #{String(padMemory.id).padStart(2, "0")} {padMemory.caption}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic 3D Frog Leap Parabolic Arc Card (Jumps from Pad to Pad) */}
      <motion.div
        className="absolute z-30 hidden md:block pointer-events-auto cursor-pointer"
        animate={{
          left: currentPad.x,
          top: currentPad.y,
          rotate: currentPad.rot,
        }}
        transition={{
          duration: 1.1,
          ease: [0.34, 1.56, 0.64, 1], // Springy Frog Leap physics easing curve!
        }}
        onClick={() => onOpenModal && onOpenModal(activeMemory)}
      >
        <motion.div
          animate={{
            y: [0, -90, 0], // Parabolic arc leap up into the air and land!
            scale: [1, 1.25, 1],
            rotateZ: [0, 15, 0],
          }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
          }}
          className="relative w-36 sm:w-44 md:w-48 rounded-2xl bg-white p-2.5 shadow-[0_30px_80px_rgba(255,46,131,0.7)] border-2 border-[#ff2e83]"
        >
          {/* Frog Leap Rocket Badge */}
          <div className="absolute -top-3 -right-3 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff2e83] text-white text-sm font-bold shadow-lg animate-bounce">
            🐸
          </div>

          {/* Washi tape clip */}
          <div className="washi-tape" />

          <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden rounded-xl bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeMemory.id}
                src={activeMemory.src}
                alt={activeMemory.caption}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/85 px-2.5 py-1 text-xs font-extrabold text-white backdrop-blur-md truncate text-left border border-white/20">
              <span className="text-[#2ee6d6] mr-1">#{String(activeMemory.id).padStart(2, "0")}</span>
              {activeMemory.caption}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating 3D Musical Notes & Celebration Sparkles */}
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

      {/* Main Hero Title Area */}
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

        {/* 3D Extruded Title */}
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
            <Line i={0} className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
            <Line i={1} className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83] text-3d-title">Birthday</Line>
            <Line i={2} className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c] text-3d-gold">Mithlesh</Line>
          </h1>
        </motion.div>

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
            className="flex items-center gap-2 rounded-full bg-[#ff2e83] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,46,131,0.5)] transition hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Play All Memory Songs</span> 🎧
          </button>

          <button
            onClick={scrollToCarousel}
            className="flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20"
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
