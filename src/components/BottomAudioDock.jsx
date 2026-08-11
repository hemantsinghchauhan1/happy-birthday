import { createPortal } from "react-dom";
import { memories } from "../data";

export default function BottomAudioDock({ activeCardId, isModalOpen, onToggleAudio, onStopAudio, onOpenModal }) {
  // Hide dock if no song is active OR if detail photo modal lightbox is open
  if (!activeCardId || isModalOpen) return null;

  const currentItem = memories.find((m) => m.id === activeCardId) || memories[0];

  return createPortal(
    <div
      className="fixed inset-x-0 z-[9999] flex justify-center pointer-events-none px-3 sm:px-4"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
        zIndex: 9999,
      }}
      data-testid="spotify-audio-dock"
    >
      <div className="w-full max-w-xl pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-full bg-[#12121c]/95 p-2 sm:p-2.5 px-3.5 sm:px-5 text-white backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Spotify Neon Progress Bar Top Accent */}
        <div className="absolute -top-[1px] left-4 right-4 h-[2.5px] bg-gradient-to-r from-[#2ee6d6] via-[#ff2e83] to-[#ffcf5c] rounded-full animate-pulse" />

        {/* Left: Thumbnail & Info (Clickable to open Lightbox) */}
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-xs sm:text-sm animate-spin">💿</span>
            </div>
          </div>

          <div className="text-left overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#2ee6d6]">
                Spotify Player #{String(currentItem.id).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-0.5 flex-shrink-0">
                <span className="h-2.5 w-1 bg-[#2ee6d6] rounded-full" />
                <span className="h-3.5 w-1 bg-[#ff2e83] rounded-full" />
                <span className="h-2 w-1 bg-[#ffcf5c] rounded-full" />
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[240px]">
              {currentItem.songTitle}
            </h4>
            <p className="text-[10px] sm:text-xs text-white/60 truncate max-w-[130px] sm:max-w-[240px]">
              {currentItem.songArtist}
            </p>
          </div>
        </div>

        {/* Right: Spotify Playback Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Pause / Play Button */}
          <button
            onClick={() => onToggleAudio(currentItem.id, currentItem.audioKey)}
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#1db954] text-black font-extrabold shadow-lg shadow-[#1db954]/40 transition hover:scale-110 active:scale-95 text-sm sm:text-base"
            title="Pause / Play Song"
          >
            ⏸
          </button>

          {/* Stop Button */}
          <button
            onClick={onStopAudio}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white text-xs sm:text-sm"
            title="Stop Music"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
