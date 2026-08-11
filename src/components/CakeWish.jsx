import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "./Confetti";

export default function CakeWish() {
  const [blown, setBlown] = useState(false);

  const makeWish = () => {
    if (blown) return;
    setBlown(true);
    fireConfetti();
    setTimeout(fireConfetti, 400);
    setTimeout(fireConfetti, 850);
  };

  return (
    <section className="relative z-10 flex flex-col items-center px-5 py-28 text-center" data-testid="cake-wish">
      <motion.h2
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="mb-3 text-4xl font-extrabold uppercase sm:text-6xl"
      >
        Make a <span className="font-serif-i italic normal-case text-[#ff2e83]">wish</span>
      </motion.h2>
      <p className="mb-14 text-white/60">{blown ? "Wish poori ho meri jaan ✨" : "Tap the cake to blow the candles"}</p>

      {/* Cake */}
      <div className="relative" style={{ perspective: 800 }}>
        <button onClick={makeWish} className="relative block cursor-pointer" data-testid="cake-button" aria-label="blow candles">
          {/* candles */}
          <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      animate={{ scale: [1, 1.25, 1], rotate: [-4, 4, -4] }}
                      transition={{ repeat: Infinity, duration: 0.7 + i * 0.1 }}
                      className="h-5 w-3 rounded-full"
                      style={{ background: "radial-gradient(circle at 50% 30%, #fff, #ffcf5c 40%, #ff7b00 90%)", boxShadow: "0 0 20px #ffb400, 0 0 40px #ff7b00" }}
                    />
                  )}
                </AnimatePresence>
                {blown && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0], y: -24 }} transition={{ duration: 1.2 }}
                    className="absolute -top-6 h-6 w-3 rounded-full bg-white/30 blur-sm" />
                )}
                <div className="h-14 w-3 rounded-sm bg-gradient-to-b from-[#ff2e83] to-[#8b5cff]" />
              </div>
            ))}
          </div>

          {/* tiers */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-44 rounded-t-md bg-gradient-to-b from-[#fff0f6] to-[#ffd6e7] shadow-inner" />
            <div className="-mt-2 h-20 w-60 rounded-md bg-gradient-to-b from-[#ffcf5c] to-[#ff9a3c] shadow-lg" />
            <div className="-mt-2 h-24 w-72 rounded-md bg-gradient-to-b from-[#ff5fa2] to-[#c9186b] shadow-2xl" />
          </div>
          <div className="mx-auto h-3 w-80 rounded-b-xl bg-black/50 blur-[2px]" />
        </button>
      </div>

      <AnimatePresence>
        {blown && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-12 max-w-lg font-serif-i text-2xl italic text-[#2ee6d6] neon-cyan sm:text-3xl"
            data-testid="wish-message"
          >
            Happy Birthday mere yaar — hamesha khush rah, hamesha jeet. ❤
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
