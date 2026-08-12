import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "./Confetti";

export default function CakeWish() {
  const [blown, setBlown] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [isCuttingAnim, setIsCuttingAnim] = useState(false);
  const [isPlayingMeme, setIsPlayingMeme] = useState(false);
  const audioRef = useRef(null);

  const handleCakeClick = () => {
    // Phase 1: Blow Candles
    if (!blown) {
      setBlown(true);
      fireConfetti();
      setTimeout(fireConfetti, 400);

      // Play Happy Birthday Meme Song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        audioRef.current
          .play()
          .then(() => setIsPlayingMeme(true))
          .catch((err) => {
            console.warn("Audio playback allowed on click:", err);
            setIsPlayingMeme(true);
          });
      }
      return;
    }

    // Phase 2: Cut Cake
    if (!isCut && !isCuttingAnim) {
      setIsCuttingAnim(true);

      // Fire celebratory confetti for cake cutting
      setTimeout(() => {
        setIsCut(true);
        setIsCuttingAnim(false);
        fireConfetti();
        setTimeout(fireConfetti, 500);
      }, 900);
    }
  };

  const toggleMemeSong = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlayingMeme) {
      audioRef.current.pause();
      setIsPlayingMeme(false);
    } else {
      audioRef.current.play();
      setIsPlayingMeme(true);
    }
  };

  return (
    <section className="relative z-10 flex flex-col items-center px-5 py-28 text-center overflow-hidden" data-testid="cake-wish">
      {/* Explicit Preloaded HTML5 Audio Element */}
      <audio ref={audioRef} src="/audio/birthday_meme.mp3" preload="auto" loop />

      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2e83]/15 blur-[140px]" />
        <div className="absolute left-1/3 bottom-10 h-72 w-72 rounded-full bg-[#ffcf5c]/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-2"
      >
        <span className="font-hand text-2xl text-[#2ee6d6]">12 August Celebration 🎂</span>
        <h2 className="mt-1 text-4xl font-extrabold uppercase sm:text-6xl text-white">
          Make a <span className="font-serif-i italic normal-case text-[#ff2e83]">Wish</span>
        </h2>
      </motion.div>

      {/* Dynamic Status Helper Badge */}
      <div className="relative z-10 mb-12 flex items-center justify-center">
        {!blown ? (
          <span className="rounded-full bg-white/10 px-5 py-2 text-sm sm:text-base font-semibold text-white backdrop-blur-md border border-white/20 animate-pulse">
            🕯️ Tap the cake to blow the candles!
          </span>
        ) : !isCut ? (
          <span className="rounded-full bg-[#ffcf5c]/20 px-5 py-2 text-sm sm:text-base font-extrabold text-[#ffcf5c] backdrop-blur-md border border-[#ffcf5c]/40 animate-bounce">
            🔪 Tap or click the cake to CUT IT!
          </span>
        ) : (
          <span className="rounded-full bg-[#2ee6d6]/20 px-5 py-2 text-sm sm:text-base font-extrabold text-[#2ee6d6] backdrop-blur-md border border-[#2ee6d6]/40">
            🎉 Cake Cut Successfully! Wish Mithlesh Happiest Birthday! 🥳
          </span>
        )}
      </div>

      {/* 3D Realistic Animated Birthday Cake Container */}
      <div className="relative z-10 my-4 select-none" style={{ perspective: 1000 }}>
        <div
          onClick={handleCakeClick}
          className="relative block cursor-pointer group focus:outline-none"
          data-testid="cake-button"
        >
          {/* 3D Golden Birthday Knife for Cutting */}
          <AnimatePresence>
            {blown && (
              <motion.div
                initial={{ opacity: 0, y: -60, rotate: -25 }}
                animate={
                  isCuttingAnim
                    ? { y: [0, 110, 110], x: [0, 0, 10], rotate: [-25, 0, 15] }
                    : isCut
                    ? { opacity: 0, scale: 0 }
                    : { opacity: 1, y: 0, rotate: -25 }
                }
                transition={{ duration: isCuttingAnim ? 0.9 : 0.4, ease: "easeInOut" }}
                className="absolute -top-24 right-10 z-50 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              >
                {/* 3D Knife Blade & Handle */}
                <div className="flex flex-col items-center">
                  <div className="h-20 w-4 bg-gradient-to-r from-gray-200 via-white to-gray-400 rounded-t-sm border border-gray-400 shadow-xl clip-knife" />
                  <div className="h-10 w-5 bg-gradient-to-b from-[#ffcf5c] to-[#ff9a3c] rounded-b-md border border-amber-600 shadow-md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5 Realistic Candles */}
          <div className="absolute -top-20 left-1/2 flex -translate-x-1/2 gap-5 z-40">
            {[
              { color: "from-[#ff2e83] to-[#ff7b00]", glow: "#ff2e83" },
              { color: "from-[#2ee6d6] to-[#0088ff]", glow: "#2ee6d6" },
              { color: "from-[#ffcf5c] to-[#ff8000]", glow: "#ffcf5c" },
              { color: "from-[#8b5cff] to-[#ff2e83]", glow: "#8b5cff" },
              { color: "from-[#ff2e83] to-[#ffcf5c]", glow: "#ff2e83" },
            ].map((c, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame Area */}
                <AnimatePresence>
                  {!blown ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: [1, 1.25, 0.95, 1.15, 1],
                        rotate: [-6, 6, -4, 4, -6],
                        y: [-2, 2, -2],
                      }}
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                      className="relative mb-1 flex items-center justify-center"
                    >
                      <div
                        className="h-7 w-4 rounded-full blur-[1px]"
                        style={{
                          background: "radial-gradient(circle at 50% 40%, #ffffff, #ffcf5c 40%, #ff5500 85%)",
                          boxShadow: `0 0 20px ${c.glow}, 0 0 40px ${c.glow}`,
                        }}
                      />
                      <div className="absolute bottom-0.5 h-3 w-1.5 rounded-full bg-cyan-200 blur-[0.5px]" />
                    </motion.div>
                  ) : (
                    /* Smoke Animation when Blown */
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.8, 0], y: [-10, -40], scale: [0.5, 1.8] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute -top-8 h-8 w-4 rounded-full bg-white/40 blur-md pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="h-2 w-0.5 bg-gray-800" />

                {/* Candle Body */}
                <div
                  className={`h-16 w-3.5 rounded-sm bg-gradient-to-b ${c.color} shadow-lg border border-white/30`}
                  style={{ boxShadow: `0 4px 15px ${c.glow}66` }}
                />
              </div>
            ))}
          </div>

          {/* 3-Tier Layered Birthday Cake with Cut Slice Separation Animation! */}
          <div className="relative flex flex-col items-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
            {/* Cut Slice Separating Outward */}
            {isCut && (
              <motion.div
                initial={{ opacity: 0, x: 0, rotateY: 0 }}
                animate={{ opacity: 1, x: -45, y: 10, rotateY: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-6 top-4 z-40 flex flex-col items-center pointer-events-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
              >
                {/* Triangular Cake Slice Representation */}
                <div className="h-12 w-16 bg-gradient-to-b from-[#ffffff] to-[#ffd6e7] rounded-tl-xl border-l-2 border-t-2 border-white" />
                <div className="-mt-1 h-14 w-20 bg-gradient-to-b from-[#ffcf5c] to-[#e67e00] border-l-2 border-amber-300" />
                <div className="-mt-1 h-16 w-24 bg-gradient-to-b from-[#ff2e83] to-[#800c3b] rounded-bl-xl border-l-2 border-pink-400" />
              </motion.div>
            )}

            {/* Top Tier (Strawberry White Cream) */}
            <div className="relative h-16 w-48 rounded-t-2xl bg-gradient-to-b from-[#ffffff] via-[#fff0f5] to-[#ffd6e7] border-t-2 border-white flex justify-around items-end pb-1 shadow-inner">
              <div className="absolute top-0 left-0 right-0 h-4 bg-white/80 rounded-t-2xl flex justify-around items-center px-2">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-[#ff2e83]" />
                ))}
              </div>
            </div>

            {/* Middle Tier (Gold Mango Cream with Chocolate Pearls) */}
            <div className="-mt-1 relative h-20 w-64 rounded-md bg-gradient-to-b from-[#ffcf5c] via-[#ffaa2b] to-[#e67e00] border-t border-white/50 flex items-center justify-around px-4 shadow-lg">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-[#4a2610] shadow-md border border-white/30" />
              ))}
            </div>

            {/* Bottom Tier (Royal Velvet Magenta) */}
            <div className="-mt-1 relative h-24 w-80 rounded-b-xl bg-gradient-to-b from-[#ff2e83] via-[#d61b67] to-[#800c3b] border-t border-white/40 flex items-center justify-around px-6 shadow-2xl">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="text-xs">✨</span>
              ))}
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="mx-auto h-4 w-96 rounded-b-2xl bg-gradient-to-r from-gray-300 via-white to-gray-400 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border-t border-white/80" />
        </div>
      </div>

      {/* Meme Song Control Button & Celebration Message */}
      <AnimatePresence>
        {blown && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            {/* Audio Meme Song Control Bar */}
            <div className="flex items-center gap-3 rounded-full bg-black/80 px-6 py-2.5 backdrop-blur-xl border border-[#ff2e83]/40 shadow-[0_0_30px_rgba(255,46,131,0.4)]">
              <span className="text-xl animate-bounce">🎶</span>
              <div className="text-left">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#2ee6d6]">Playing Birthday Meme Song</p>
                <p className="text-xs font-bold text-white truncate max-w-[200px]">Rohit Katwara - Happy Birthday</p>
              </div>

              <button
                onClick={toggleMemeSong}
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2e83] text-white font-bold shadow-lg transition hover:scale-110 active:scale-95 text-sm"
                title="Play/Pause Meme Song"
              >
                {isPlayingMeme ? "⏸" : "▶"}
              </button>
            </div>

            <p
              className="max-w-lg font-serif-i text-2xl italic text-[#2ee6d6] neon-cyan sm:text-3xl"
              data-testid="wish-message"
            >
              Happy Birthday mere yaar — hamesha khush rah, hamesha jeet! ❤
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
