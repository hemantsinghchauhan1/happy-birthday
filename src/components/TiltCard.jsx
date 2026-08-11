import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fireConfetti } from "./Confetti";

const glow = { magenta: "#ff2e83", cyan: "#2ee6d6", gold: "#ffcf5c", violet: "#8b5cff" };

// 10 Unique Surprise Box Visual Themes & 3D Unwrap Animations
const surpriseBoxThemes = {
  1: {
    icon: "✉️",
    badge: "Origami Envelope Flip ✉️",
    bg: "from-[#1a0c2e] via-[#091a28] to-[#040814]",
    accent: "#2ee6d6",
    buttonBg: "bg-[#2ee6d6] text-black shadow-[#2ee6d6]/40",
    anim: { rotateY: [0, 90, 0], scale: [1, 0.85, 1] }
  },
  2: {
    icon: "🎁",
    badge: "Gold Shimmer Unwrap 🎁",
    bg: "from-[#2e1d09] via-[#1a0f02] to-[#0a0601]",
    accent: "#ffcf5c",
    buttonBg: "bg-[#ffcf5c] text-black shadow-[#ffcf5c]/40",
    anim: { rotateZ: [0, -14, 14, 0], scale: [1, 1.12, 1] }
  },
  3: {
    icon: "🎆",
    badge: "Confetti Explosion Burst 🎆",
    bg: "from-[#2b081a] via-[#17040e] to-[#080206]",
    accent: "#ff2e83",
    buttonBg: "bg-[#ff2e83] text-white shadow-[#ff2e83]/40",
    anim: { scale: [1, 1.25, 1], rotateZ: [0, 360] }
  },
  4: {
    icon: "📸",
    badge: "Camera Shutter Flash 📸",
    bg: "from-[#081e2b] via-[#030e14] to-[#010609]",
    accent: "#2ee6d6",
    buttonBg: "bg-[#2ee6d6] text-black shadow-[#2ee6d6]/40",
    anim: { opacity: [1, 0.2, 1], scale: [1, 1.1, 1] }
  },
  5: {
    icon: "🔮",
    badge: "Hologram Portal Open 🔮",
    bg: "from-[#1e082b] via-[#0e0317] to-[#05010a]",
    accent: "#8b5cff",
    buttonBg: "bg-[#8b5cff] text-white shadow-[#8b5cff]/40",
    anim: { rotateX: [0, 360], scale: [1, 0.9, 1] }
  },
  6: {
    icon: "🌀",
    badge: "Cosmic Vortex Twist 🌀",
    bg: "from-[#2b0825] via-[#140311] to-[#070106]",
    accent: "#ff2e83",
    buttonBg: "bg-[#ff2e83] text-white shadow-[#ff2e83]/40",
    anim: { rotateZ: [0, 720], scale: [1, 0.6, 1] }
  },
  7: {
    icon: "👑",
    badge: "Royal Treasure Chest 👑",
    bg: "from-[#2b2408] via-[#141103] to-[#080701]",
    accent: "#ffcf5c",
    buttonBg: "bg-[#ffcf5c] text-black shadow-[#ffcf5c]/40",
    anim: { y: [0, -35, 0], scale: [1, 1.1, 1] }
  },
  8: {
    icon: "💖",
    badge: "Heart Locket Pulse 💖",
    bg: "from-[#2b0812] via-[#140308] to-[#080103]",
    accent: "#ff2e83",
    buttonBg: "bg-[#ff2e83] text-white shadow-[#ff2e83]/40",
    anim: { scale: [1, 1.2, 0.88, 1] }
  },
  9: {
    icon: "💿",
    badge: "Retro Vinyl Unseal 💿",
    bg: "from-[#08232b] via-[#031014] to-[#010608]",
    accent: "#2ee6d6",
    buttonBg: "bg-[#2ee6d6] text-black shadow-[#2ee6d6]/40",
    anim: { rotateZ: [0, 540], scale: [1, 0.8, 1] }
  },
  10: {
    icon: "✨",
    badge: "Magic Starburst Pop ✨",
    bg: "from-[#1c082b] via-[#0c0314] to-[#040108]",
    accent: "#8b5cff",
    buttonBg: "bg-[#8b5cff] text-white shadow-[#8b5cff]/40",
    anim: { scale: [1, 1.3, 1], rotateY: [0, 180, 0] }
  }
};

export default function TiltCard({ item, index, isPlaying, onToggleAudio, onOpenModal }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const c = glow[item.accent] || glow.magenta;

  const cardTheme = surpriseBoxThemes[item.id] || surpriseBoxThemes[1];

  const onMove = (e) => {
    // Disable 3D tilt on touch screens / mobile viewports to prevent cards from dancing on scroll!
    if (e.pointerType === "touch" || (typeof window !== "undefined" && window.innerWidth < 640)) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const handleCardClick = (e) => {
    // If card is not revealed yet, unwrap it as a surprise & play its song!
    if (!isRevealed) {
      fireConfetti();
      setIsRevealed(true);
      onToggleAudio(item.id, item.audioKey);
      return;
    }

    // If user clicked the audio play/pause button
    if (e.target.closest(".audio-btn")) {
      e.stopPropagation();
      onToggleAudio(item.id, item.audioKey);
      return;
    }

    // Otherwise open detail modal
    onOpenModal(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative pt-3"
      style={{ perspective: 1000 }}
      data-testid={`gallery-card-${item.id}`}
    >
      {/* Decorative Washi Tape */}
      <div className="washi-tape" />

      {/* Spinning Vinyl record effect emerging from behind */}
      <motion.div
        className="absolute -right-3 top-8 z-0 h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-r from-black via-zinc-900 to-black p-2 shadow-2xl border border-white/20 pointer-events-none"
        animate={{
          x: isPlaying ? 32 : 0,
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
          x: { duration: 0.4 },
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#ff2e83]/30">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-black bg-zinc-900" />
        </div>
      </motion.div>

      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={handleCardClick}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative z-10 cursor-pointer overflow-hidden rounded-2xl bg-white p-2.5 sm:p-3 shadow-2xl transition-all duration-300 group-hover:shadow-[0_25px_60px_rgba(255,46,131,0.25)]"
      >
        {/* Border glow highlight */}
        <div
          className="absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 2px ${cardTheme.accent}, 0 30px 80px ${cardTheme.accent}44` }}
        />

        {/* Card Frame Content */}
        {!isRevealed ? (
          /* Locked / Surprise Wrapped Gift Box Envelope — Unique Design & 3D Unwrap Animation! */
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-950">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.04 }}
              animate={isRevealed ? cardTheme.anim : { scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-br ${cardTheme.bg} p-5 text-center text-white border border-white/10`}
            >
              {/* Glowing ribbon / wax seal */}
              <div
                className="relative mb-3 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full p-1 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${cardTheme.accent}, #ffffff)`,
                  boxShadow: `0 0 30px ${cardTheme.accent}66`,
                }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black/80 text-2xl sm:text-3xl">
                  {cardTheme.icon}
                </div>
              </div>

              <span className="font-hand text-xl sm:text-2xl" style={{ color: cardTheme.accent }}>
                Memory #{String(item.id).padStart(2, "0")}
              </span>

              <h4 className="mt-1 text-sm sm:text-base font-extrabold text-white">
                {cardTheme.badge}
              </h4>

              <p className="mt-1.5 text-[11px] sm:text-xs text-white/60">
                Tap to unwrap photo & play song! ✨
              </p>

              <div className={`mt-4 rounded-full px-4 py-1.5 text-xs font-extrabold transition group-hover:scale-105 ${cardTheme.buttonBg}`}>
                🎉 Open Surprise
              </div>
            </motion.div>
          </div>
        ) : (
          /* Unwrapped Photo View — Clean Polaroid Layout with 0 Cutoff! */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Photo */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Song Badge overlay */}
              <div className="absolute left-2 top-2 z-30 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                <span className={isPlaying ? "animate-spin text-[#ff2e83]" : "text-[#2ee6d6]"}>🎵</span>
                <span className="truncate max-w-[110px] sm:max-w-[140px]">{item.songTitle}</span>
              </div>

              {/* Floating audio trigger button */}
              <button
                className="audio-btn absolute right-2 top-2 z-30 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#ff2e83] text-white shadow-lg transition hover:scale-110 active:scale-95 text-xs sm:text-sm"
                title="Play/Pause Song"
              >
                {isPlaying ? (
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 bg-white rounded-full animate-eq-1" />
                    <div className="w-1 bg-white rounded-full animate-eq-2" />
                    <div className="w-1 bg-white rounded-full animate-eq-3" />
                  </div>
                ) : (
                  <span>▶</span>
                )}
              </button>

              {/* Card Number Badge */}
              <span className="absolute right-2 bottom-2 z-20 font-hand text-xl sm:text-2xl font-extrabold text-white/90 drop-shadow-md bg-black/60 px-2 py-0.5 rounded-lg border border-white/10 backdrop-blur-md">
                #{String(item.id).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom Polaroid Caption Area — 100% Visible & Crisp! */}
            <div className="pt-2.5 pb-1 text-left px-1">
              <p className="text-sm sm:text-base font-extrabold truncate" style={{ color: c }}>
                {item.caption}
              </p>
              <p className="mt-0.5 text-xs text-gray-600 truncate">
                {item.sub}
              </p>

              {/* Song & Expand Footer */}
              <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-1.5 text-[10px] sm:text-[11px] font-semibold text-gray-500">
                <span className="truncate">▶ {item.songArtist}</span>
                <span className="text-[#ff2e83] font-hand text-xs sm:text-sm flex-shrink-0">Tap to expand 🔍</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
