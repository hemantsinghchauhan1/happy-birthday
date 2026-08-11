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

const heroSpotlightPhotos = memories;

export default function Hero({ music, cardAudio, onOpenModal }) {
  const [photoIndex, setPhotoIndex] = useState(0);

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

  // Continuous auto-changing photo cycle with Zoom-In / Zoom-Out Ken Burns animation!
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % heroSpotlightPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentPhoto = heroSpotlightPhotos[photoIndex];

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

      {/* Floating 3D Celebration Particles */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {["🎵", "✨", "💿", "💖", "🎂", "🎉"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-3xl"
            style={{ left: `${12 + i * 15}%`, top: `${15 + (i % 3) * 28}%` }}
            animate={{
              y: [-14, 14, -14],
              rotate: [-14, 14, -14],
              opacity: [0.35, 0.85, 0.35],
            }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Main Hero Container */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center py-12">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs sm:text-sm font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/30 shadow-[0_0_25px_rgba(46,230,214,0.35)]"
        >
          <span className="text-sm sm:text-base">👑</span> 12 AUGUST · HAPPIEST BIRTHDAY <span className="text-sm sm:text-base">✨</span>
        </motion.div>

        {/* 3D Extruded Headline */}
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <h1 className="font-extrabold uppercase leading-[0.86] tracking-tight">
            <Line i={0} className="text-4xl sm:text-6xl lg:text-7xl text-[#f4efe6]">Happy</Line>
            <Line i={1} className="text-5xl sm:text-7xl lg:text-8xl text-[#ff2e83] text-3d-title">Birthday</Line>
            <Line i={2} className="font-serif-i italic normal-case text-5xl sm:text-7xl lg:text-8xl text-[#ffcf5c] text-3d-gold">Mithlesh</Line>
          </h1>
        </motion.div>

        {/* Continuous Auto-Changing Photo Spotlight with Zoom-In / Zoom-Out Animation! */}
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="relative mt-8 sm:mt-10 cursor-pointer group"
          onClick={() => onOpenModal && onOpenModal(currentPhoto)}
        >
          <div className="washi-tape" />

          <div className="relative w-64 sm:w-80 md:w-96 rounded-2xl bg-white p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/50 transition-all duration-300 group-hover:shadow-[0_35px_80px_rgba(255,46,131,0.5)]">
            <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhoto.id}
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.7 },
                    scale: { duration: 4.5, ease: "easeInOut" },
                  }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Photo Overlay Badge */}
              <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                <span className="animate-spin text-[#2ee6d6]">✨</span>
                <span>Photo #{String(currentPhoto.id).padStart(2, "0")} / {heroSpotlightPhotos.length}</span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 text-left">
                <p className="text-base font-extrabold text-white truncate">{currentPhoto.caption}</p>
                <p className="text-xs text-[#2ee6d6] font-semibold truncate">🎵 {currentPhoto.songTitle}</p>
              </div>
            </div>

            <div className="mt-2 text-center text-xs font-semibold text-gray-700">
              🔍 Tap photo to view lightbox & play song
            </div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
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
          className="mt-10 sm:mt-12 flex flex-col items-center gap-1 text-white/50"
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
