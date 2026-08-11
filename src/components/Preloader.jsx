import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = ["Ek dost ke naam", "12 August", "chalo yaadon mein"];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCount((c) => Math.min(c + Math.floor(Math.random() * 8) + 2, 100)), 90);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06060c]"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      data-testid="preloader"
    >
      <div className="overflow-hidden px-6 text-center">
        {lines.map((l, i) => (
          <div key={i} className="overflow-hidden">
            <motion.p
              className="font-serif-i italic text-2xl sm:text-4xl md:text-5xl leading-tight text-[#f4efe6]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              {l}
            </motion.p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 right-0 px-8">
        <div className="flex items-end justify-between">
          <span className="font-hand text-2xl text-[#ff2e83]">Mithlesh ❤</span>
          <span className="text-5xl sm:text-7xl font-extrabold tabular-nums text-[#f4efe6]" data-testid="preloader-count">
            {count}
          </span>
        </div>
        <div className="mt-4 h-[2px] w-full bg-white/10">
          <motion.div className="h-full bg-[#ff2e83]" style={{ width: `${count}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
