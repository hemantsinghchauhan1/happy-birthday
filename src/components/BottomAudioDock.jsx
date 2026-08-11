import { memories } from "../data";

export default function BottomAudioDock({ activeCardId, onToggleAudio, onStopAudio, onOpenModal }) {
  // Always select either current playing item or default first memory card
  const currentItem = memories.find((m) => m.id === activeCardId) || memories[0];
  const isPlaying = Boolean(activeCardId);

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4"
      style={{
        bottom: "max(12px, env(safe-area-inset-bottom, 12px))",
      }}
      data-testid="bottom-audio-dock"
    >
      <div className="w-full max-w-xl pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl bg-[#0b0b14]/95 p-2 sm:p-3 px-3 sm:px-4 text-white backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Neon accent top bar line */}
        <div
          className={`absolute -top-[1px] left-6 right-6 h-[2px] rounded-full transition-all duration-500 ${
            isPlaying ? "bg-gradient-to-r from-[#2ee6d6] via-[#ff2e83] to-[#ffcf5c] animate-pulse" : "bg-white/20"
          }`}
        />

        {/* Left: Thumbnail & Info */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group overflow-hidden"
          onClick={() => onOpenModal && onOpenModal(currentItem)}
        >
          <div className="relative h-9 w-9 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-gray-900 border border-white/20">
            <img
              src={currentItem.src}
              alt={currentItem.caption}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Vinyl badge */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className={`text-[10px] sm:text-sm ${isPlaying ? "animate-spin" : "opacity-70"}`}>💿</span>
            </div>
          </div>

          <div className="text-left overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className={`text-[9px] sm:text-xs font-semibold uppercase tracking-wider truncate ${isPlaying ? "text-[#ff2e83]" : "text-[#2ee6d6]"}`}>
                {isPlaying ? `Playing #${String(currentItem.id).padStart(2, "0")}` : `Memory #${String(currentItem.id).padStart(2, "0")}`}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5 flex-shrink-0">
                  <span className="h-2 sm:h-3 w-0.5 sm:w-1 bg-[#2ee6d6] animate-bounce" />
                  <span className="h-3 sm:h-4 w-0.5 sm:w-1 bg-[#ff2e83] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 sm:h-2.5 w-0.5 sm:w-1 bg-[#ffcf5c] animate-bounce [animation-delay:0.4s]" />
                </span>
              )}
            </div>
            <h4 className="text-[11px] sm:text-sm font-bold text-white truncate max-w-[120px] sm:max-w-[240px]">
              {currentItem.songTitle}
            </h4>
            <p className="text-[9px] sm:text-xs text-white/60 truncate max-w-[120px] sm:max-w-[240px]">
              {currentItem.songArtist}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Play/Pause Toggle Button */}
          <button
            onClick={() => onToggleAudio(currentItem.id, currentItem.audioKey)}
            className={`flex h-8 sm:h-11 px-3 sm:px-4 items-center gap-1 rounded-full font-bold text-[11px] sm:text-xs transition shadow-lg ${
              isPlaying
                ? "bg-[#ff2e83] text-white hover:scale-105"
                : "bg-[#2ee6d6] text-black shadow-[#2ee6d6]/40 hover:scale-105"
            }`}
            title={isPlaying ? "Pause Song" : "Play Song"}
          >
            {isPlaying ? (
              <><span>Pause</span> <span className="text-[10px] sm:text-xs">⏸</span></>
            ) : (
              <><span>Play</span> <span className="text-[10px] sm:text-xs">▶</span></>
            )}
          </button>

          {/* Stop Audio Button */}
          {isPlaying && (
            <button
              onClick={onStopAudio}
              className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white text-[10px] sm:text-sm"
              title="Stop Music"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
