import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memories } from "../data";

export default function MemoryCarousel({ cardAudio, onOpenModal }) {
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  // Automatic visual slide advancement timer (without auto-triggering audio)
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  return (
    <section className="relative z-10 my-16 w-full px-4 text-white overflow-hidden py-12" data-testid="memory-carousel">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#2ee6d6]/15 blur-[120px]" />
        <div className="absolute right-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#ff2e83]/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-hand text-2xl text-[#2ee6d6] neon-cyan sm:text-3xl">
            ✨ 3D Memory Highlights
          </span>
          <h2 className="mt-1 text-3xl font-extrabold uppercase sm:text-5xl text-[#f4efe6]">
            Memory <span className="text-[#ff2e83] neon-magenta">Carousel</span>
          </h2>
          <p className="mt-2 text-xs text-white/60 sm:text-sm">
            Swipe or use controls to browse special memories. Click any card to expand! 📸
          </p>
        </motion.div>

        {/* 3D Coverflow Container */}
        <div
          className="relative flex h-[460px] sm:h-[520px] w-full items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="relative flex w-full max-w-4xl items-center justify-center perspective-1000">
            <AnimatePresence initial={false}>
              {memories.map((item, i) => {
                const total = memories.length;
                let offset = (i - index + total) % total;
                if (offset > total / 2) offset -= total;

                // Display 5 cards around center
                if (Math.abs(offset) > 2) return null;

                const isCenter = offset === 0;
                const isPlayingThis = cardAudio?.activeCardId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.4,
                      scale: isCenter ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.65,
                      x: offset * (window.innerWidth < 640 ? 140 : 220),
                      rotateY: offset * -25,
                      zIndex: 30 - Math.abs(offset) * 10,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute cursor-pointer select-none"
                    onClick={() => {
                      if (isCenter) {
                        onOpenModal && onOpenModal(item);
                      } else {
                        setIndex(i);
                      }
                    }}
                  >
                    {/* Polaroid Styled Card */}
                    <div
                      className={`relative w-64 sm:w-80 overflow-hidden rounded-2xl p-3 transition-all duration-300 ${
                        isCenter
                          ? "bg-white/95 text-gray-900 shadow-[0_20px_50px_rgba(255,46,131,0.4)] border-2 border-[#ff2e83]"
                          : "bg-black/60 text-white border border-white/20 backdrop-blur-md"
                      }`}
                    >
                      {/* Washi tape header */}
                      <div className="absolute -top-3 left-1/2 z-20 h-6 w-20 -translate-x-1/2 bg-white/30 backdrop-blur-md rotate-[-2deg] border border-white/20" />

                      {/* Image container */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-gray-900">
                        <img
                          src={item.src}
                          alt={item.caption}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />

                        {/* Audio trigger button overlay */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cardAudio?.toggleCardAudio(item.id, item.audioKey);
                          }}
                          className={`absolute bottom-3 right-3 z-30 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                            isPlayingThis
                              ? "bg-[#ff2e83] text-white animate-pulse"
                              : "bg-black/70 text-white backdrop-blur-md hover:bg-[#ff2e83]"
                          }`}
                        >
                          {isPlayingThis ? "⏸" : "▶"}
                        </button>

                        {/* Playing Equalizer Animation */}
                        {isPlayingThis && (
                          <div className="absolute left-3 bottom-3 flex items-end gap-1 bg-black/60 px-2 py-1 rounded-full backdrop-blur-md">
                            <span className="h-4 w-1 bg-[#2ee6d6] animate-bounce" />
                            <span className="h-6 w-1 bg-[#ff2e83] animate-bounce [animation-delay:0.2s]" />
                            <span className="h-3 w-1 bg-[#ffcf5c] animate-bounce [animation-delay:0.4s]" />
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="mt-3 text-left">
                        <p className={`text-xs font-semibold ${isCenter ? "text-gray-500" : "text-white/60"}`}>
                          Memory #{String(item.id).padStart(2, "0")}
                        </p>
                        <h3 className={`text-base font-bold truncate ${isCenter ? "text-gray-900" : "text-white"}`}>
                          {item.caption}
                        </h3>
                        <p className={`text-xs truncate ${isCenter ? "text-pink-600 font-semibold" : "text-[#2ee6d6]"}`}>
                          🎵 {item.songTitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white transition hover:bg-[#ff2e83] hover:scale-110 active:scale-95 border border-white/20"
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-1.5">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#ff2e83]" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white transition hover:bg-[#ff2e83] hover:scale-110 active:scale-95 border border-white/20"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
