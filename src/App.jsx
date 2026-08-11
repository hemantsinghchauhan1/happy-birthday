import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";
import "@/index.css";

import { useMusic } from "@/hooks/useMusic";
import { useCardAudio } from "@/hooks/useCardAudio";
import ParticleField from "@/components/ParticleField";
import Confetti, { fireConfetti } from "@/components/Confetti";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import MemoryCarousel from "@/components/MemoryCarousel";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import CakeWish from "@/components/CakeWish";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import PhotoModal from "@/components/PhotoModal";
import BottomAudioDock from "@/components/BottomAudioDock";

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const music = useMusic();
  const cardAudio = useCardAudio(music);

  const finish = () => {
    setLoading(false);
    setTimeout(fireConfetti, 500);
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="App grain relative min-h-screen bg-[#06060c]">
        <ParticleField />
        <Confetti />

        <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>

        <main className="relative">
          <Hero music={music} cardAudio={cardAudio} onOpenModal={(item) => setSelectedPhoto(item)} />
          <MemoryCarousel cardAudio={cardAudio} onOpenModal={(item) => setSelectedPhoto(item)} />
          <StorySection />
          <Gallery activeCardId={cardAudio.activeCardId} onToggleAudio={cardAudio.toggleCardAudio} onOpenModal={(item) => setSelectedPhoto(item)} />
          <Wishes />
          <CakeWish />
          <Countdown />
          <Footer />
        </main>

        <BottomAudioDock
          activeCardId={cardAudio.activeCardId}
          isModalOpen={Boolean(selectedPhoto)}
          onToggleAudio={cardAudio.toggleCardAudio}
          onStopAudio={cardAudio.stopAudio}
          onOpenModal={(item) => setSelectedPhoto(item)}
        />

        <PhotoModal
          item={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          isPlaying={cardAudio.activeCardId === selectedPhoto?.id}
          onToggleAudio={() => selectedPhoto && cardAudio.toggleCardAudio(selectedPhoto.id, selectedPhoto.audioKey)}
        />
      </div>
    </ReactLenis>
  );
}

export default App;
