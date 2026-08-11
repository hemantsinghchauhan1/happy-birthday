import { motion, AnimatePresence } from "framer-motion";
import { memories } from "../data";

export default function BottomAudioDock({ activeCardId, onToggleAudio, onStopAudio, onOpenModal }) {
  if (!activeCardId) return null;

  const currentItem = memories.find((m) => m.id === activeCardId) || memories[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[92%] max-w-xl"
        data-testid="bottom-audio-dock"
      >
        <div className="relative flex items-center justify-between gap-4 rounded-3xl bg-black/85 p-3 px-4 text-white backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Glowing neon accent bar */}
          <div className="absolute -top-1 left-8 right-8 h-0.5 bg-gradient-to-r from-[#2ee6d6] via-[#ff2e83] to-[#ffcf5c] rounded-full animate-pulse" />

          {/* Left: Thumbnail & Info */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onOpenModal && onOpenModal(currentItem)}
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-900 border border-white/20">
              <img
                src={currentItem.src}
                alt={currentItem.caption}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Spinning mini vinyl badge */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-sm animate-spin">💿</span>
              </div>
            </div>

            <div className="text-left overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#ff2e83] uppercase tracking-wider">
                  Playing #{String(currentItem.id).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="h-3 w-1 bg-[#2ee6d6] animate-bounce" />
                  <span className="h-4 w-1 bg-[#ff2e83] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2.5 w-1 bg-[#ffcf5c] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate max-w-[160px] sm:max-w-[240px]">
                {currentItem.songTitle}
              </h4>
              <p className="text-xs text-white/60 truncate max-w-[160px] sm:max-w-[240px]">
                {currentItem.caption}
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Toggle */}
            <button
              onClick={() => onToggleAudio(currentItem.id, currentItem.audioKey)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff2e83] text-white shadow-lg transition hover:scale-110 active:scale-95"
              title="Pause/Play Audio"
            >
              ⏸
            </button>

            {/* Stop Audio Button */}
            <button
              onClick={onStopAudio}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              title="Stop Music"
            >
              ✕
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
