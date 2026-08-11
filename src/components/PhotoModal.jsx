import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoModal({ item, onClose, isPlaying, onToggleAudio }) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom on photo change or close
  useEffect(() => {
    setZoom(1);
  }, [item]);

  if (!item) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoom(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" data-testid="photo-modal">
        {/* Backdrop with ambient blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-[#0b0b14] p-4 sm:p-6 border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
        >
          {/* Top Bar Controls */}
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#ff2e83]/20 px-3 py-1 text-xs font-bold text-[#ff2e83] border border-[#ff2e83]/30">
                Memory #{String(item.id).padStart(2, "0")}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                {item.caption}
              </h3>
            </div>

            {/* Zoom Controls & Close Button */}
            <div className="flex items-center gap-2">
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white transition hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Zoom Out (-)"
              >
                −
              </button>

              {/* Zoom Percentage Reset Badge */}
              <button
                onClick={handleResetZoom}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#2ee6d6] hover:text-black"
                title="Reset Zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3.5}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white transition hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Zoom In (+)"
              >
                +
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2e83] text-white shadow-lg transition hover:scale-110 active:scale-95"
                title="Close Lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
            {/* Interactive Zoomable Image Area */}
            <div className="md:col-span-7 relative h-72 sm:h-96 md:h-[480px] w-full overflow-hidden rounded-2xl bg-black flex items-center justify-center border border-white/10">
              <motion.img
                key={item.id}
                src={item.src}
                alt={item.caption}
                animate={{ scale: zoom }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag={zoom > 1}
                dragConstraints={{ left: -150 * zoom, right: 150 * zoom, top: -150 * zoom, bottom: 150 * zoom }}
                className={`max-h-full max-w-full object-contain ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
              />

              {/* Zoom instruction overlay */}
              {zoom === 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none rounded-full bg-black/70 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md border border-white/15">
                  🔍 Click + / − buttons above to Zoom photo
                </div>
              )}
            </div>

            {/* Content & Music Controls */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-1 text-left">
              <div>
                <span className="font-hand text-2xl text-[#2ee6d6]">yaad `#${item.id}`</span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#f4efe6] sm:text-3xl">
                  {item.caption}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.sub}
                </p>

                {/* Song Card Player Info */}
                <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#ff2e83] ${isPlaying ? "spin-vinyl shadow-lg shadow-[#ff2e83]/50" : ""}`}>
                        <span className="text-xl">🎵</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] uppercase tracking-wider text-white/50">Card Anthem</p>
                        <p className="font-bold text-sm text-white truncate">{item.songTitle}</p>
                        <p className="text-xs text-[#ffcf5c] truncate">{item.songArtist}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleAudio(item.id, item.audioKey)}
                      className={`flex h-11 px-4 items-center gap-2 rounded-full font-bold text-xs transition flex-shrink-0 ${
                        isPlaying ? "bg-[#2ee6d6] text-black shadow-lg shadow-[#2ee6d6]/40" : "bg-[#ff2e83] text-white hover:scale-105"
                      }`}
                    >
                      {isPlaying ? (
                        <><span>Pause</span> <span className="h-2 w-2 rounded-full bg-black animate-pulse" /></>
                      ) : (
                        <><span>Play Song</span> ▶</>
                      )}
                    </button>
                  </div>

                  {/* Equalizer animation when playing */}
                  {isPlaying && (
                    <div className="mt-4 flex items-center justify-center gap-1 border-t border-white/10 pt-3">
                      <div className="w-1 bg-[#2ee6d6] rounded-full animate-eq-1" />
                      <div className="w-1 bg-[#ff2e83] rounded-full animate-eq-2" />
                      <div className="w-1 bg-[#ffcf5c] rounded-full animate-eq-3" />
                      <div className="w-1 bg-[#8b5cff] rounded-full animate-eq-4" />
                      <div className="w-1 bg-[#2ee6d6] rounded-full animate-eq-1" />
                      <span className="ml-2 text-xs text-[#2ee6d6] font-semibold">Playing track audio...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Heartfelt Quote Footer */}
              <div className="mt-6 border-t border-white/10 pt-4 text-center sm:text-left">
                <p className="font-serif-i italic text-base text-white/80">
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
