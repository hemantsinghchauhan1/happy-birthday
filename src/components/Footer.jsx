import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-5 pb-20 pt-16 text-center" data-testid="footer">
      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 bottom-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#2ee6d6]/20 blur-[130px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-4xl text-3xl font-extrabold uppercase leading-tight sm:text-6xl text-white relative z-10"
      >
        Tu hai toh <span className="font-serif-i italic normal-case text-[#ff2e83] neon-magenta">sab hai</span>, yaar.
      </motion.h2>

      {/* Prominent Glowing Highlighted Signature Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mt-14 max-w-lg rounded-3xl bg-gradient-to-br from-[#180d29] via-[#0b1424] to-[#060812] p-8 sm:p-10 border-2 border-[#2ee6d6]/40 shadow-[0_0_60px_rgba(46,230,214,0.3)] relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ff2e83]/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ff2e83] border border-[#ff2e83]/40 mb-3">
          ❤️ With All My Love
        </div>

        <h3 className="font-hand text-5xl sm:text-6xl font-extrabold text-[#2ee6d6] drop-shadow-[0_0_25px_#2ee6d6] my-2">
          Your Kalu 👑
        </h3>

        <div className="mt-3 inline-block rounded-full bg-white/10 px-5 py-1.5 backdrop-blur-md border border-white/20">
          <p className="text-base sm:text-lg font-extrabold text-[#ffcf5c] tracking-wide">
            🚀 From IIT Jammu
          </p>
        </div>
      </motion.div>

      <p className="mt-14 text-xs font-semibold text-white/40 relative z-10">
        Made with ❤ for Mithlesh · 12 August 2026
      </p>
    </footer>
  );
}
