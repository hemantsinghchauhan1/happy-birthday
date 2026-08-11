import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

export default function PhotoModal({ item, onClose, isPlaying, onToggleAudio }) {
  const lenis = useLenis();

  // Lock background body scroll & freeze Lenis smooth scroll while lightbox modal is open!
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [item, lenis]);

  if (!item) return null;

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

        {/* Modal Window — High-End Cinematic Lightbox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#080811] p-4 sm:p-7 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Top Header Bar — Clean Title & Close */}
          <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex-shrink-0 rounded-full bg-[#ff2e83]/20 px-3 py-1 text-xs sm:text-sm font-extrabold text-[#ff2e83] border border-[#ff2e83]/40">
                Memory #{String(item.id).padStart(2, "0")}
              </span>
              <h3 className="text-sm sm:text-xl font-extrabold text-white truncate">
                {item.caption}
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white text-sm sm:text-base font-bold shadow-lg transition hover:bg-[#ff2e83] hover:scale-110 active:scale-95 border border-white/20"
              title="Close Lightbox"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12 items-center">
            {/* Cinematic Extra-Large Photo Viewport with Automatic Ken Burns Slow Zoom */}
            <div className="md:col-span-7 relative h-80 sm:h-[460px] md:h-[540px] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-black/90 flex items-center justify-center border border-white/15 p-2 shadow-2xl">
              <motion.img
                key={item.id}
                src={item.src}
                alt={item.caption}
                animate={{ scale: [1.02, 1.08, 1.02] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="h-full w-full object-contain rounded-xl select-none pointer-events-none"
              />
            </div>

            {/* Content & Music Controls */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-1 text-left">
              <div>
                <span className="font-hand text-2xl sm:text-3xl text-[#2ee6d6]">yaad `#${item.id}`</span>
                <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-[#f4efe6] leading-tight">
                  {item.caption}
                </h2>
                <p className="mt-2 text-xs sm:text-base text-white/75 leading-relaxed">
                  {item.sub}
                </p>

                {/* Card Anthem Player Section */}
                <div className="mt-6 sm:mt-8 rounded-2xl bg-white/5 p-4 sm:p-5 border border-white/15 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-[#ff2e83] ${isPlaying ? "spin-vinyl shadow-lg shadow-[#ff2e83]/50" : ""}`}>
                        <span className="text-lg sm:text-2xl">🎵</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 font-bold">Card Anthem</p>
                        <p className="font-extrabold text-xs sm:text-base text-white truncate">{item.songTitle}</p>
                        <p className="text-xs sm:text-sm text-[#ffcf5c] truncate">{item.songArtist}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleAudio(item.id, item.audioKey)}
                      className={`flex h-10 sm:h-12 px-4 sm:px-5 items-center gap-2 rounded-full font-extrabold text-xs sm:text-sm transition flex-shrink-0 shadow-lg ${
                        isPlaying ? "bg-[#2ee6d6] text-black shadow-[#2ee6d6]/40" : "bg-[#ff2e83] text-white hover:scale-105"
                      }`}
                    >
                      {isPlaying ? (
                        <><span>Pause</span> <span className="h-2 w-2 rounded-full bg-black animate-pulse" /></>
                      ) : (
                        <><span>Play Song</span> ▶</>
                      )}
                    </button>
                  </div>

                  {/* 100% Static Playing Track Audio Indicator */}
                  {isPlaying && (
                    <div className="mt-3.5 flex items-center justify-center gap-1.5 border-t border-white/10 pt-3 h-7">
                      <div className="w-1 h-3 bg-[#2ee6d6] rounded-full" />
                      <div className="w-1 h-4 bg-[#ff2e83] rounded-full" />
                      <div className="w-1 h-2.5 bg-[#ffcf5c] rounded-full" />
                      <div className="w-1 h-3.5 bg-[#8b5cff] rounded-full" />
                      <span className="ml-2 text-xs text-[#2ee6d6] font-extrabold">Playing track audio...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
