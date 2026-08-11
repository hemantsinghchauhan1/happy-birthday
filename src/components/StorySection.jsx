import { motion } from "framer-motion";

const chapters = [
  {
    n: "01",
    hi: "Pehla Din, Akela Main",
    sub: "AMU Entry · 2022",
    body: "College ke pehle din jab sab anjaan the, main akela tha. Na koi apna tha, na kisi se baat hoti thi. Ek aisi jagah jahan har chehra naya tha aur dil mein ek anjaana darr tha.",
    accent: "#ff2e83",
    icon: "🎒",
  },
  {
    n: "02",
    hi: "Bheed Mein Ek Apna Insaan",
    sub: "The Unforgettable Meeting",
    body: "Phir tu aaya. Bina kisi matlab ke tune haath badhaya, jagah di, aur sabse zaroori — apnapan diya. AMU ki wo hostel rooms aur galiyan tere bina bilkul adhoori lagti.",
    accent: "#2ee6d6",
    icon: "🤝",
  },
  {
    n: "03",
    hi: "Raat Ke 2 Baje Ki Maggi Aur Sapne",
    sub: "Hostel Room Chronicles",
    body: "Wo late night baatein, ex-girlfriend ke kisse, future ke sapne, aur be-wajah ki hansi. Humne saath mein hasti banayi hai, mushkilon ko muskura kar jeeta hai.",
    accent: "#ffcf5c",
    icon: "🍜",
  },
  {
    n: "04",
    hi: "Dost Se Badhkar, Bhai Se Kam Nahi",
    sub: "Brotherhood Beyond Words",
    body: "Tu sirf dost nahi — mera bhai hai. Jab koi nahi tha, tab tu tha. Teri khushi meri jeet hai, aur teri kamyabi par mujhe sabse bada garv hota hai.",
    accent: "#8b5cff",
    icon: "👑",
  },
  {
    n: "05",
    hi: "AMU Se IIT Tak, Hamesha Saath",
    sub: "Forever & Always",
    body: "Kitna bhi aage nikal jayein hum, ye yaari kabhi nahi badlegi. Happy Birthday Mithlesh — tu tha, tu hai, aur tu hi hamesha mera pehla aur sabse sachha dost rahega!",
    accent: "#ff2e83",
    icon: "💖",
  },
];

export default function StorySection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-5 py-28 sm:py-40" data-testid="story">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center sm:text-left"
      >
        <p className="font-hand text-3xl text-[#2ee6d6]">hamari dosti ki kahani 📖</p>
        <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none sm:text-6xl text-white">
          Dil Ke <span className="font-serif-i italic normal-case text-[#ff2e83]">Panno Se</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm sm:text-base text-white/70">
          Ek anjaan sheher se shuru hui ye dosti, aaj zindagi ka sabse khoobsurat hissa ban chuki hai.
        </p>
      </motion.div>

      {/* Step-by-Step Staggered Chapter Timeline */}
      <div className="space-y-20 sm:space-y-28 relative">
        {/* Timeline Connecting Glowing Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#ff2e83] via-[#2ee6d6] to-[#ffcf5c] opacity-30 pointer-events-none hidden sm:block" />

        {chapters.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 70, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12 ${
              i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
            }`}
          >
            {/* Chapter Number Badge */}
            <div className="shrink-0 flex items-center gap-3">
              <span
                className="text-6xl font-extrabold sm:text-8xl select-none"
                style={{ color: c.accent, textShadow: `0 0 50px ${c.accent}88` }}
              >
                {c.n}
              </span>
              <span className="text-3xl sm:hidden">{c.icon}</span>
            </div>

            {/* Chapter Card Content */}
            <div className="max-w-xl rounded-3xl bg-white/5 p-6 sm:p-8 border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl hidden sm:inline-block">{c.icon}</span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-white/50">{c.sub}</span>
              </div>
              <h3 className="mb-3 font-serif-i text-3xl italic sm:text-4xl leading-tight" style={{ color: c.accent }}>
                {c.hi}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-white/85">
                {c.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
