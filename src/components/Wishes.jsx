import { wishes, friendshipQuotes } from "../data";
import { motion } from "framer-motion";

export default function Wishes() {
  const row = [...wishes, ...wishes];
  return (
    <section className="relative z-10 overflow-hidden py-20" data-testid="wishes">
      {/* Marquee Banner */}
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

      {/* Main Dedicated Letter Block — Dil Se Khat for Mithlesh */}
      <div className="mx-auto mt-20 max-w-3xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#180c29] via-[#0d1627] to-[#080612] p-8 sm:p-12 border border-[#ff2e83]/30 shadow-[0_30px_90px_rgba(255,46,131,0.25)] text-left"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="font-hand text-3xl text-[#ffcf5c]">Dil Se Khat ✉️</span>
            <span className="text-xs font-bold text-[#2ee6d6] uppercase tracking-widest bg-[#2ee6d6]/10 px-3 py-1 rounded-full border border-[#2ee6d6]/30">
              12 August 2026
            </span>
          </div>

          <h3 className="font-serif-i text-3xl sm:text-5xl italic text-[#f4efe6] leading-tight mb-6">
            "Mithlesh, Sir Ross Masood Hall ke gate ka wo pehla din main kabhi nahi bhool sakta."
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-white/85 leading-relaxed font-sans">
            <p>
              College ke pehle din jab main poori AMU University mein bilkul akela tha, na kisi se pehchan thi na aage ka pata... tab Sir Ross Masood Hall ke gate par tu mera intezaar kar raha tha. Us anjaan sheher mein tune pehla haath milaaya aur dosti ki aisi misaal kayam ki jo aaj tak kayam hai.
            </p>
            <p>
              Sir Ross Masood Hall ke un dino se lekar aaj IIT ke is safar tak, tune har kadam par ek sachhe bhai ki tarah mera saath diya hai. Tu sirf ek accha dost nahi hai — tu mera wo sachha yaar hai jis par main hamesha garv karta hoon.
            </p>
            <p className="font-bold text-[#2ee6d6]">
              Aaj tere janamdin par main upar wale se bas yahi maangta hoon ki teri har khwahish poori ho. Mujhe zindagi ki har race jeetni hai, par sirf tere saath.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
            <div>
              <p className="font-hand text-2xl text-[#ff2e83]">Tera Sabse Purana Dost</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Forever Grateful</p>
            </div>
            <span className="text-4xl">👑</span>
          </div>
        </motion.div>
      </div>

      {/* Friendship Quotes */}
      <div className="mx-auto mt-24 max-w-4xl space-y-16 px-5">
        {friendshipQuotes.map((q, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
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
