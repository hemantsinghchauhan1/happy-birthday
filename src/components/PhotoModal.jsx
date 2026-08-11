import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoModal({ item, onClose, isPlaying, onToggleAudio }) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom on photo change or close
  useEffect(() => {
    setZoom(1);
  }, [item]);

  if (!item) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoom(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6" data-testid="photo-modal">
        {/* Backdrop with ambient blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window — Scrollable max-h-[88vh] for Mobile Responsiveness! */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0b0b14] p-3.5 sm:p-6 border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
        >
          {/* Top Bar Controls — Fully Responsive for Mobile & Desktop */}
          <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 sm:pb-3">
            <div className="flex items-center gap-2 overflow-hidden max-w-[55%] sm:max-w-xs">
              <span className="flex-shrink-0 rounded-full bg-[#ff2e83]/20 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#ff2e83] border border-[#ff2e83]/30">
                #{String(item.id).padStart(2, "0")}
              </span>
              <h3 className="text-xs sm:text-base font-bold text-white truncate">
                {item.caption}
              </h3>
            </div>

            {/* Zoom Controls & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-sm sm:text-lg font-bold text-white transition hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Zoom Out (-)"
              >
                −
              </button>

              {/* Zoom Percentage Reset Badge */}
              <button
                onClick={handleResetZoom}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white transition hover:bg-[#2ee6d6] hover:text-black"
                title="Reset Zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-sm sm:text-lg font-bold text-white transition hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Zoom In (+)"
              >
                +
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="ml-1 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#ff2e83] text-white text-xs sm:text-base shadow-lg transition hover:scale-110 active:scale-95"
                title="Close Lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 items-center">
            {/* 100% Rock-Solid Static Image Area (0 Wobble / 0 Motion Drag!) */}
            <div className="md:col-span-7 relative h-52 sm:h-80 md:h-[440px] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black flex items-center justify-center border border-white/10 p-1">
              <img
                key={item.id}
                src={item.src}
                alt={item.caption}
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.25s ease-out",
                }}
                className="max-h-full max-w-full object-contain rounded-lg select-none pointer-events-none"
              />

              {/* Zoom instruction overlay */}
              {zoom === 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] sm:text-xs text-white/80 backdrop-blur-md border border-white/15 whitespace-nowrap">
                  🔍 Click + / − to Zoom photo
                </div>
              )}
            </div>

            {/* Content & Music Controls */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-1 text-left">
              <div>
                <span className="font-hand text-xl sm:text-2xl text-[#2ee6d6]">yaad `#${item.id}`</span>
                <h2 className="mt-0.5 sm:mt-1 text-xl sm:text-3xl font-extrabold text-[#f4efe6]">
                  {item.caption}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.sub}
                </p>

                {/* Song Card Player Info */}
                <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-white/5 p-3 sm:p-4 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#ff2e83] ${isPlaying ? "spin-vinyl shadow-lg shadow-[#ff2e83]/50" : ""}`}>
                        <span className="text-base sm:text-xl">🎵</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">Card Anthem</p>
                        <p className="font-bold text-xs sm:text-sm text-white truncate">{item.songTitle}</p>
                        <p className="text-[10px] sm:text-xs text-[#ffcf5c] truncate">{item.songArtist}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleAudio(item.id, item.audioKey)}
                      className={`flex h-9 sm:h-11 px-3 sm:px-4 items-center gap-1.5 rounded-full font-bold text-xs transition flex-shrink-0 ${
                        isPlaying ? "bg-[#2ee6d6] text-black shadow-lg shadow-[#2ee6d6]/40" : "bg-[#ff2e83] text-white hover:scale-105"
                      }`}
                    >
                      {isPlaying ? (
                        <><span>Pause</span> <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" /></>
                      ) : (
                        <><span>Play Song</span> ▶</>
                      )}
                    </button>
                  </div>

                  {/* 100% Static Playing Track Audio Indicator */}
                  {isPlaying && (
                    <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-white/10 pt-2.5 h-7">
                      <div className="w-1 h-3 bg-[#2ee6d6] rounded-full" />
                      <div className="w-1 h-4 bg-[#ff2e83] rounded-full" />
                      <div className="w-1 h-2.5 bg-[#ffcf5c] rounded-full" />
                      <div className="w-1 h-3.5 bg-[#8b5cff] rounded-full" />
                      <span className="ml-2 text-[10px] sm:text-xs text-[#2ee6d6] font-semibold">Playing track audio...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Heartfelt Quote Footer */}
              <div className="mt-4 sm:mt-6 border-t border-white/10 pt-3 text-center sm:text-left">
                <p className="font-serif-i italic text-sm sm:text-base text-white/80">
                  "Har photo ek kahani hai, har gaana ek yaad."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
