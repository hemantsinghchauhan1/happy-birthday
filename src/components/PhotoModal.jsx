import { motion, AnimatePresence } from "framer-motion";

export default function PhotoModal({ item, onClose, isPlaying, onToggleAudio }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" data-testid="photo-modal">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-[#0f0f18] p-4 border border-white/15 shadow-2xl sm:p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image side */}
            <div className="relative overflow-hidden rounded-2xl bg-black/50">
              <img src={item.src} alt={item.caption} className="h-72 w-full object-cover sm:h-96 md:h-full" />
              <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                Memory #{String(item.id).padStart(2, "0")}
              </div>
            </div>

            {/* Info side */}
            <div className="flex flex-col justify-between py-2">
              <div>
                <p className="font-hand text-2xl text-[#2ee6d6]">yaad `#${item.id}`</p>
                <h3 className="mt-1 text-2xl font-extrabold sm:text-3xl text-[#f4efe6]">{item.caption}</h3>
                <p className="mt-2 text-sm text-white/60">{item.sub}</p>

                {/* Song card player info */}
                <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#ff2e83] ${isPlaying ? "spin-vinyl shadow-lg shadow-[#ff2e83]/50" : ""}`}>
                        <span className="text-xl">🎵</span>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/50">Card Anthem</p>
                        <p className="font-bold text-sm text-white">{item.songTitle}</p>
                        <p className="text-xs text-[#ffcf5c]">{item.songArtist}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleAudio(item.id, item.audioKey)}
                      className={`flex h-11 px-4 items-center gap-2 rounded-full font-bold text-xs transition ${
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
                    <div className="mt-4 flex items-center justify-center gap-1">
                      <div className="w-1 bg-[#2ee6d6] rounded-full animate-eq-1" />
                      <div className="w-1 bg-[#ff2e83] rounded-full animate-eq-2" />
                      <div className="w-1 bg-[#ffcf5c] rounded-full animate-eq-3" />
                      <div className="w-1 bg-[#8b5cff] rounded-full animate-eq-4" />
                      <div className="w-1 bg-[#2ee6d6] rounded-full animate-eq-1" />
                      <span className="ml-2 text-xs text-[#2ee6d6] font-semibold">Playing snippet...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-center sm:text-left">
                <p className="font-serif-i italic text-lg text-white/80">"Har pal jo saath bitaya, wahi sach hai."</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
