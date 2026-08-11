import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const glow = { magenta: "#ff2e83", cyan: "#2ee6d6", gold: "#ffcf5c", violet: "#8b5cff" };

export default function TiltCard({ item, index, isPlaying, onToggleAudio, onOpenModal }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const c = glow[item.accent] || glow.magenta;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const handleCardClick = (e) => {
    // If user clicked the play audio button, handle audio
    if (e.target.closest(".audio-btn")) {
      e.stopPropagation();
      onToggleAudio(item.id, item.audioKey);
      return;
    }
    // Otherwise open modal view
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
        className="absolute -right-4 top-10 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-black via-zinc-900 to-black p-2 shadow-2xl border border-white/20"
        animate={{
          x: isPlaying ? 35 : 0,
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
          x: { duration: 0.4 },
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#ff2e83]/30">
          <div className="h-8 w-8 rounded-full border-2 border-black bg-zinc-900" />
        </div>
      </motion.div>

      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={handleCardClick}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative z-10 cursor-pointer overflow-hidden rounded-2xl bg-white p-3 shadow-2xl transition-all duration-300 group-hover:shadow-[0_25px_60px_rgba(255,46,131,0.25)]"
      >
        {/* Border glow highlight */}
        <div
          className="absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 2px ${c}, 0 30px 80px ${c}44` }}
        />

        {/* Photo Container */}
        <div className="relative overflow-hidden rounded-xl bg-black">
          <img
            src={item.src}
            alt={item.caption}
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Floating musical note indicator if active */}
          {isPlaying && (
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              <motion.div
                animate={{ y: [-10, -50], opacity: [1, 0], scale: [0.8, 1.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="text-4xl"
              >
                🎵
              </motion.div>
            </div>
          )}

          {/* Song Badge overlay on top */}
          <div className="absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
            <span className={isPlaying ? "animate-spin text-[#ff2e83]" : "text-[#2ee6d6]"}>🎵</span>
            <span className="truncate max-w-[150px]">{item.songTitle}</span>
          </div>

          {/* Floating audio trigger button */}
          <button
            className="audio-btn absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2e83] text-white shadow-lg transition hover:scale-110 active:scale-95"
            title="Play Card Song"
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

          {/* Caption Overlay */}
          <div
            className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 text-left"
            style={{ transform: "translateZ(40px)" }}
          >
            <p className="text-lg font-bold" style={{ color: c }}>{item.caption}</p>
            <p className="mt-0.5 text-xs text-white/70">{item.sub}</p>

            {/* Song title row */}
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-medium text-white/60">
              <span className="truncate">▶ {item.songArtist}</span>
              <span className="text-[#ffcf5c] font-hand text-sm">Click to expand</span>
            </div>
          </div>

          {/* Card Number Badge */}
          <span
            className="absolute right-3 bottom-16 z-20 font-hand text-3xl font-extrabold text-white/80 drop-shadow-md"
            style={{ transform: "translateZ(50px)" }}
          >
            #{String(item.id).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
