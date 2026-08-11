import { wishes, friendshipQuotes } from "../data";
import { motion } from "framer-motion";

export default function Wishes() {
  const row = [...wishes, ...wishes];
  return (
    <section className="relative z-10 overflow-hidden py-20" data-testid="wishes">
      <div className="relative border-y border-white/10 py-8">
        <div className="marquee-track whitespace-nowrap">
          {row.map((w, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8 text-5xl font-extrabold uppercase sm:text-7xl">
              <span className={i % 2 ? "text-white/15" : "text-[#ff2e83] neon-magenta"}>{w}</span>
              <span className="text-[#ffcf5c]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-4xl space-y-16 px-5">
        {friendshipQuotes.map((q, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className={i % 2 ? "text-right" : "text-left"}
          >
            <p className="font-serif-i text-3xl italic leading-tight text-[#f4efe6] sm:text-5xl">"{q.hi}"</p>
            <p className="mt-3 text-base text-white/50 sm:text-lg">{q.en}</p>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
