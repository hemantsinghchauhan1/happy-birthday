import { motion } from "framer-motion";

const chapters = [
  {
    n: "01",
    hi: "Pehla Din, Anjaan Sheher",
    sub: "AMU Entry · 2022",
    body: "College ke pehle din jab poori AMU University mere liye anjaan thi, main akela tha. Har taraf bheed thi, par mera koi apna nahi tha.",
    accent: "#ff2e83",
    icon: "🎒",
  },
  {
    n: "02",
    hi: "Sir Ross Masood Hall Ka Gate",
    sub: "The Iconic Meeting",
    body: "Aaj bhi yaad hai mujhe — Sir Ross Masood Hall ke gate par tu mera intezaar kar raha tha. Us anjaan sheher mein pehla haath tune hi milaaya tha, aur wahi se humari sachhi dosti shuru hui.",
    accent: "#2ee6d6",
    icon: "🏛️",
  },
  {
    n: "03",
    hi: "AMU Ki Galiyan Aur Late Night Chai",
    sub: "Unforgettable Memories",
    body: "Sir Ross Masood Hall se lekar dukaano ki late night chai tak... wo baatein, future ke sapne, aur be-wajah ki hansi ne college ke dino ko zindadili se bhar diya.",
    accent: "#ffcf5c",
    icon: "☕",
  },
  {
    n: "04",
    hi: "AMU Se IIT Tak Ka Shandaar Safar",
    sub: "Growing Together",
    body: "Saal badal gaye, sheher badal gaye, par teri niyat aur teri yaari bilkul nahi badli. Tu aaj bhi wahi imandar aur sachha insaan hai jo us gate par mila tha.",
    accent: "#8b5cff",
    icon: "🚀",
  },
  {
    n: "05",
    hi: "Dosti Se Badhkar Bhaichara",
    sub: "Brotherhood Beyond Words",
    body: "Jab koi nahi tha, tab tu tha. Teri khushi mein meri jeet hai, aur teri kamyabi par mujhe apne aap se zyaada garv hota hai. Tu mera pehla aur sabse khaas dost hai.",
    accent: "#ff2e83",
    icon: "👑",
  },
  {
    n: "06",
    hi: "Jeetna Hai Toh Sirf Tere Saath",
    sub: "The Promise · 12 August",
    body: "Zindagi ki har race mein, har mod par mujhe aage badhna hai — par sirf tere saath. Happy Birthday Mithlesh! Tu tha, tu hai, aur tu hi hamesha mera sabse sachha dost rahega.",
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
        <p className="font-hand text-3xl text-[#2ee6d6]">dil se nikli kahani 📖</p>
        <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none sm:text-6xl text-white">
          Ross Masood Hall Se <span className="font-serif-i italic normal-case text-[#ff2e83]">IIT Tak</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-white/75 leading-relaxed">
          Pehle din ki tanhai se lekar aaj tak ki pukhta dosti — Mithlesh aur meri dosti ki asli dastan.
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
