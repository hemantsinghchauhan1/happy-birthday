import { useState } from "react";
import { motion } from "framer-motion";
import { memories } from "../data";
import TiltCard from "./TiltCard";
import PhotoModal from "./PhotoModal";

export default function Gallery({ activeCardId, onToggleAudio }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:py-32" data-testid="gallery">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <p className="font-hand text-2xl text-[#ffcf5c]">yaadon ki gallery 🎵</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none sm:text-6xl">
            Frozen <span className="font-serif-i italic normal-case text-[#2ee6d6]">moments & beats</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white/60">
          Har photo par alag gaana h! Card par hover ya click karke gaana suno. 🎧
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((m, i) => (
          <TiltCard
            key={m.id}
            item={m}
            index={i}
            isPlaying={activeCardId === m.id}
            onToggleAudio={onToggleAudio}
            onOpenModal={(item) => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* Full-screen detail modal */}
      {selectedItem && (
        <PhotoModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isPlaying={activeCardId === selectedItem.id}
          onToggleAudio={onToggleAudio}
        />
      )}
    </section>
  );
}
