import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-5 pb-16 pt-10 text-center" data-testid="footer">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
        className="mx-auto max-w-4xl text-3xl font-extrabold uppercase leading-tight sm:text-5xl"
      >
        Tu hai toh <span className="font-serif-i italic normal-case text-[#ff2e83] neon-magenta">sab hai</span>, yaar.
      </motion.h2>

      <div className="mx-auto mt-14 max-w-md border-t border-white/10 pt-8">
        <p className="text-sm uppercase tracking-[0.25em] text-white/40">with all my love</p>
        <p className="mt-3 font-hand text-4xl text-[#2ee6d6] neon-cyan">your Kalu</p>
        <p className="mt-1 text-sm text-white/50">from IIT Jammu</p>
      </div>

      <p className="mt-14 text-xs text-white/30">Made with ❤ for Mithlesh · 12 August</p>
    </footer>
  );
}
