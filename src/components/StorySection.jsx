import { motion } from "framer-motion";

const chapters = [
  {
    n: "01",
    hi: "Pehla din, akela main",
    body: "College ke pehle din mere saath koi nahi tha. Na koi dost, na rukne ke liye koi jagah. Bas ek anjaan sheher aur ek dar.",
    accent: "#ff2e83",
  },
  {
    n: "02",
    hi: "Aur phir tu mila",
    body: "Us bheed mein ek insaan tha jo ruk gaya. Jo tha, aur aaj bhi hai. Tune sirf jagah nahi di — tune apnapan diya. AMU ki wo galiyan tere bina adhoori lagti.",
    accent: "#2ee6d6",
  },
  {
    n: "03",
    hi: "Aaj tak, hamesha",
    body: "Kitna accha dost hai tu — main hamesha yaad karta hoon. Wo saara waqt jo humne saath bitaya, aaj bhi mere paas hai. Aur hamesha jeetna hai, saath mein.",
    accent: "#ffcf5c",
  },
];

export default function StorySection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-5 py-28 sm:py-40" data-testid="story">
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="font-hand text-2xl text-[#2ee6d6]">hamari kahani</p>
        <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none sm:text-6xl">
          The AMU <span className="font-serif-i italic normal-case text-[#ff2e83]">first day</span>
        </h2>
      </motion.div>

      <div className="space-y-24">
        {chapters.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col gap-4 sm:flex-row sm:gap-10 ${i % 2 ? "sm:flex-row-reverse sm:text-right" : ""}`}
          >
            <div className="shrink-0">
              <span className="text-6xl font-extrabold sm:text-8xl" style={{ color: c.accent, textShadow: `0 0 40px ${c.accent}66` }}>
                {c.n}
              </span>
            </div>
            <div className="max-w-xl">
              <h3 className="mb-3 font-serif-i text-3xl italic sm:text-4xl" style={{ color: c.accent }}>{c.hi}</h3>
              <p className="text-lg leading-relaxed text-white/75 sm:text-xl">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
