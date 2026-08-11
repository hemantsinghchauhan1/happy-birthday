import { motion } from "framer-motion";

const chapters = [
  {
    n: "01",
    hi: "Pehla Din, Anjaan Sheher",
    sub: "The Beginning · 2022",
    body: "Naye sheher ki bheed mein jab har chehra anjaan tha... tab pehla haath tune hi badhaya tha.",
    accent: "#ff2e83",
    icon: "🎒",
  },
  {
    n: "02",
    hi: "Sir Ross Masood Hall Ka Gate",
    sub: "The Unforgettable Meeting",
    body: "Gate par tera mera intezaar karna — wahi se ek aisi dosti shuru hui jo waqt ke saath aur gehri hoti gayi.",
    accent: "#2ee6d6",
    icon: "🏛️",
  },
  {
    n: "03",
    hi: "Yaadon Ki Kitaab Ka Ek Khaas Kona",
    sub: "Treasured Moments",
    body: "Zindagi ki is kitaab mein hazaron safhe hain, par sabse khoobsurat aur khaas panna sirf tere naam ka hai.",
    accent: "#ffcf5c",
    icon: "📖",
  },
  {
    n: "04",
    hi: "Waqt Badla, Par Tu Nahi Badla",
    sub: "Unchanged Loyalty",
    body: "Kitne hi saal beet gaye, mausam badal gaye... par teri imandari aur tera apnapan aaj bhi wahi hai.",
    accent: "#8b5cff",
    icon: "✨",
  },
  {
    n: "05",
    hi: "Shukriya Meri Zindagi Ka Hissa Banne Ke Liye",
    sub: "Pure Gratitude",
    body: "Bas itna kehna tha ki tera hona hi meri sabse badi taqat hai. Shukriya har us lamhe ke liye jo tune khaas banaya.",
    accent: "#ff2e83",
    icon: "👑",
  },
  {
    n: "06",
    hi: "Jeetna Hai Toh Sirf Tere Saath",
    sub: "The Promise · 12 August",
    body: "Happy Birthday Mithlesh! Zindagi ki har daur mein aage badhenge — hamesha ek doosre ke saath.",
    accent: "#ffcf5c",
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
        <p className="font-hand text-3xl text-[#2ee6d6]">dil ki kitaab 📖</p>
        <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none sm:text-6xl text-white">
          Yaadon Ka <span className="font-serif-i italic normal-case text-[#ff2e83]">Khaas Kona</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-white/75 leading-relaxed">
          Zindagi ke hazaron panno mein se sabse sunehra panna — Mithlesh aur meri yaari.
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
