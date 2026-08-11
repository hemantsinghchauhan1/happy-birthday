import { memories } from "../data";

export default function BottomAudioDock({ activeCardId, onToggleAudio, onStopAudio, onOpenModal }) {
  if (!activeCardId) return null;

  const currentItem = memories.find((m) => m.id === activeCardId) || memories[0];

  return (
    <div
      className="fixed left-1/2 bottom-3 sm:bottom-6 z-50 -translate-x-1/2 w-[92%] max-w-xl h-16 sm:h-20 pointer-events-auto"
      style={{
        bottom: "max(12px, env(safe-area-inset-bottom, 12px))",
        transform: "translateX(-50%)",
      }}
      data-testid="bottom-audio-dock"
    >
      <div className="relative flex h-full items-center justify-between gap-2 sm:gap-4 rounded-3xl bg-[#0b0b14]/95 p-2 sm:p-3 px-3.5 sm:px-4 text-white backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Static neon top border line */}
        <div className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-[#2ee6d6] via-[#ff2e83] to-[#ffcf5c] rounded-full" />

        {/* Left: Thumbnail & Info */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group overflow-hidden"
          onClick={() => onOpenModal && onOpenModal(currentItem)}
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-900 border border-white/20">
            <img
              src={currentItem.src}
              alt={currentItem.caption}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Spinning mini vinyl badge */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-xs sm:text-sm animate-spin">💿</span>
            </div>
          </div>

          <div className="text-left overflow-hidden">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-semibold text-[#ff2e83] uppercase tracking-wider truncate">
                Playing #{String(currentItem.id).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-0.5 flex-shrink-0">
                <span className="h-2.5 sm:h-3 w-0.5 sm:w-1 bg-[#2ee6d6] animate-bounce" />
                <span className="h-3.5 sm:h-4 w-0.5 sm:w-1 bg-[#ff2e83] animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 sm:h-2.5 w-0.5 sm:w-1 bg-[#ffcf5c] animate-bounce [animation-delay:0.4s]" />
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[240px]">
              {currentItem.songTitle}
            </h4>
            <p className="text-[10px] sm:text-xs text-white/60 truncate max-w-[130px] sm:max-w-[240px]">
              {currentItem.caption}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Play/Pause Toggle */}
          <button
            onClick={() => onToggleAudio(currentItem.id, currentItem.audioKey)}
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#ff2e83] text-white shadow-lg transition hover:scale-110 active:scale-95 text-xs sm:text-base"
            title="Pause/Play Audio"
          >
            ⏸
          </button>

          {/* Stop Audio Button */}
          <button
            onClick={onStopAudio}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white text-xs sm:text-sm"
            title="Stop Music"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
