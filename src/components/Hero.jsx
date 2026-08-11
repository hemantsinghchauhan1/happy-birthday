import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { memories } from "../data";

// Letter-by-Letter 3D Animated Text Component
function Animated3DText({ text, className, text3dStyle, delayOffset = 0 }) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delayOffset,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90, scale: 0.3 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="inline-flex flex-wrap justify-center overflow-visible"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          whileHover={{
            y: -14,
            scale: 1.22,
            rotateZ: index % 2 === 0 ? 8 : -8,
            transition: { duration: 0.2 },
          }}
          className={`inline-block cursor-pointer transition-colors duration-200 ${className} ${text3dStyle}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// 4 Corner Pad Positions
const padCoordinates = [
  { id: 0, pos: { left: "1.5%", top: "4%" }, rot: -12, glow: "#ff2e83" },   // Top-Left
  { id: 1, pos: { left: "74%", top: "4%" }, rot: 10, glow: "#2ee6d6" },    // Top-Right
  { id: 2, pos: { left: "74%", top: "82%" }, rot: -8, glow: "#ffcf5c" },   // Bottom-Right
  { id: 3, pos: { left: "1.5%", top: "82%" }, rot: 9, glow: "#8b5cff" },    // Bottom-Left
];

// 4 Dynamic Flight Jump Styles
const jumpStyles = [
  {
    name: "Paper Airplane Flight ✈️",
    badge: "✈️",
    anim: (padRot) => ({
      scale: [1, 0.25, 1.3, 1],
      rotateZ: [0, 540, 720, padRot],
      y: [0, -140, -80, 0],
      borderRadius: ["16px", "999px", "16px", "16px"],
    }),
  },
  {
    name: "3D Corkscrew Spin 🌀",
    badge: "🌀",
    anim: (padRot) => ({
      scale: [1, 1.35, 0.8, 1],
      rotateZ: [0, -360, 360, padRot],
      rotateY: [0, 360, 720, 0],
      y: [0, -150, -70, 0],
      borderRadius: ["16px", "24px", "16px", "16px"],
    }),
  },
  {
    name: "Frog Super Leap 🐸",
    badge: "🐸",
    anim: (padRot) => ({
      scale: [1, 1.45, 1.15, 1],
      rotateZ: [0, 25, -25, padRot],
      y: [0, -180, -90, 0],
      borderRadius: ["16px", "16px", "16px", "16px"],
    }),
  },
  {
    name: "Rocket Speed Zoom 🚀",
    badge: "🚀",
    anim: (padRot) => ({
      scale: [1, 0.35, 1.4, 1],
      rotateZ: [0, 45, 90, padRot],
      y: [0, -200, -100, 0],
      borderRadius: ["16px", "999px", "16px", "16px"],
    }),
  },
];

export default function Hero({ music, cardAudio, onOpenModal }) {
  const [activePad, setActivePad] = useState(0); // 0, 1, 2, 3
  const [photoOffset, setPhotoOffset] = useState(0);
  const [jumpStyleIdx, setJumpStyleIdx] = useState(0);

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

  // Jump Interval: Launches flight every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePad((prev) => {
        const nextPad = (prev + 1) % 4;
        if (nextPad === 0) {
          setPhotoOffset((po) => (po + 1) % memories.length);
        }
        return nextPad;
      });
      setJumpStyleIdx((prev) => (prev + 1) % jumpStyles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentPad = padCoordinates[activePad];
  const activeMemory = memories[(photoOffset + activePad) % memories.length];
  const currentJumpStyle = jumpStyles[jumpStyleIdx];

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

      {/* 4 Corner Landing Pads */}
      <motion.div
        className="absolute inset-0 z-10 block"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        {padCoordinates.map((pad, idx) => {
          const padMemory = memories[(photoOffset + idx) % memories.length];
          const isCurrentActive = idx === activePad;

          return (
            <motion.div
              key={pad.id}
              className={`absolute cursor-pointer group transition-opacity duration-300 ${
                isCurrentActive ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
              }`}
              style={{ ...pad.pos, transformStyle: "preserve-3d" }}
              onClick={() => onOpenModal && onOpenModal(padMemory)}
              whileHover={{ scale: 1.12, zIndex: 40 }}
            >
              <div
                className="relative w-[76px] sm:w-36 md:w-40 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/50"
                style={{ transform: `rotate(${pad.rot}deg)` }}
              >
                {/* Washi tape clip */}
                <div className="washi-tape" />

                <div className="relative h-24 sm:h-44 md:h-52 w-full overflow-hidden rounded-lg sm:rounded-xl bg-black">
                  <img src={padMemory.src} alt="" className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-500" />
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 sm:bottom-1.5 sm:left-1.5 sm:right-1.5 rounded bg-black/75 px-1 py-0.5 sm:px-2 sm:py-1 text-[7px] sm:text-[10px] font-bold text-white backdrop-blur-md truncate text-left border border-white/10">
                    <span className="text-[#2ee6d6] mr-0.5 sm:mr-1">#{String(padMemory.id).padStart(2, "0")}</span>
                    {padMemory.caption}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Single Dynamic 3D Flying Card */}
      <motion.div
        className="absolute z-30 block pointer-events-auto cursor-pointer"
        animate={{
          left: currentPad.pos.left,
          top: currentPad.pos.top,
        }}
        transition={{
          duration: 1.3,
          ease: [0.25, 1, 0.5, 1],
        }}
        onClick={() => onOpenModal && onOpenModal(activeMemory)}
      >
        <motion.div
          key={`${photoOffset}-${activePad}-${jumpStyleIdx}`}
          animate={currentJumpStyle.anim(currentPad.rot)}
          transition={{
            duration: 1.3,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
          className="relative w-[76px] sm:w-36 md:w-40 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-2 shadow-[0_30px_90px_rgba(255,46,131,0.8)] border-2 border-[#ff2e83] overflow-hidden"
        >
          {/* Dynamic Flight Style Badge */}
          <div className="absolute -top-1.5 -right-1.5 sm:-top-3 sm:-right-3 z-40 flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#ff2e83] to-[#2ee6d6] text-white text-[9px] sm:text-sm font-bold shadow-xl animate-pulse">
            {currentJumpStyle.badge}
          </div>

          {/* Washi tape clip */}
          <div className="washi-tape" />

          <div className="relative h-24 sm:h-44 md:h-52 w-full overflow-hidden rounded-lg sm:rounded-xl bg-black">
            <img
              src={activeMemory.src}
              alt={activeMemory.caption}
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0.5 left-0.5 right-0.5 sm:bottom-1.5 sm:left-1.5 sm:right-1.5 rounded bg-black/85 px-1 py-0.5 sm:px-2 sm:py-1 text-[7px] sm:text-[10px] font-extrabold text-white backdrop-blur-md truncate text-left border border-white/20">
              <span className="text-[#2ee6d6] mr-0.5 sm:mr-1">#{String(activeMemory.id).padStart(2, "0")}</span>
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
            className="absolute text-lg sm:text-3xl"
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
          className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-extrabold transition shadow-lg backdrop-blur-md border ${
            cardAudio?.isPlayAllMode
              ? "bg-[#2ee6d6] text-black border-[#2ee6d6] shadow-[#2ee6d6]/50 scale-105"
              : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105"
          }`}
          data-testid="play-all-toggle"
        >
          <span className={cardAudio?.isPlayAllMode ? "animate-spin" : ""}>🔁</span>
          {cardAudio?.isPlayAllMode ? "Playing..." : "Play All Songs"}
        </button>

        {/* Background Theme Button */}
        <button
          onClick={music.toggle}
          className="glass flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold transition hover:scale-105 text-white/90"
          data-testid="music-toggle"
        >
          <span className={`inline-flex h-2 w-2 rounded-full ${music.playing ? "bg-[#ff2e83] animate-pulse" : "bg-white/40"}`} />
          {music.playing ? "Theme On" : "Theme Music"}
        </button>
      </div>

      {/* Main Hero Title Area */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center py-16 sm:py-0">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-3 sm:mb-5 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3.5 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-sm font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/30 shadow-[0_0_20px_rgba(46,230,214,0.3)] max-w-[90vw]"
        >
          <span className="text-xs sm:text-base">👑</span> 12 AUGUST · HAPPIEST BIRTHDAY <span className="text-xs sm:text-base">✨</span>
        </motion.div>

        {/* Letter-by-Letter 3D Extruded Animated Title */}
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
            <span className="block">
              <Animated3DText
                text="HAPPY"
                className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]"
                delayOffset={0.2}
              />
            </span>

            <span className="block mt-1 sm:mt-2">
              <Animated3DText
                text="BIRTHDAY"
                className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83]"
                text3dStyle="text-3d-title"
                delayOffset={0.5}
              />
            </span>

            <span className="block mt-1 sm:mt-2">
              <Animated3DText
                text="Mithlesh"
                className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c]"
                text3dStyle="text-3d-gold"
                delayOffset={0.8}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 sm:mt-8 max-w-[260px] sm:max-w-md text-xs sm:text-base text-white/80 leading-relaxed"
        >
          Mere pehle dost ke liye ek chhoti si duniya — banayi gayi yaadon, hansi aur dosti se. 💖
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={cardAudio?.startPlayAllSongs}
            className="flex items-center gap-2 rounded-full bg-[#ff2e83] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,46,131,0.5)] transition hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Play All Memory Songs</span> 🎧
          </button>

          <button
            onClick={scrollToCarousel}
            className="flex items-center gap-2 rounded-full bg-white/10 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Explore 3D Showcase</span> 📸
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 sm:mt-14 flex flex-col items-center gap-1 text-white/50"
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
