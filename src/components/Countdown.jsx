import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTarget() {
  const now = new Date();
  let year = now.getFullYear();
  const t = new Date(year, 7, 12, 0, 0, 0); // Aug = 7
  if (now > t) t.setFullYear(year + 1);
  return t;
}

export default function Countdown() {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => {
    const target = getTarget();
    const tick = () => {
      const diff = target - new Date();
      const isBday = new Date().getMonth() === 7 && new Date().getDate() === 12;
      if (diff <= 0 || isBday) return setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
        done: false,
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const units = [["Days", left.d], ["Hours", left.h], ["Mins", left.m], ["Secs", left.s]];

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center" data-testid="countdown">
      <p className="font-hand text-2xl text-[#2ee6d6]">the big day</p>
      <h2 className="mb-12 mt-2 text-4xl font-extrabold uppercase sm:text-6xl">
        {left.done ? "Aaj hai tera din! 🎉" : "Counting down to 12 Aug"}
      </h2>
      {!left.done && (
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {units.map(([label, val], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl py-6"
            >
              <div className="text-4xl font-extrabold tabular-nums text-[#ff2e83] neon-magenta sm:text-6xl" data-testid={`count-${label.toLowerCase()}`}>
                {String(val).padStart(2, "0")}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{label}</div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
