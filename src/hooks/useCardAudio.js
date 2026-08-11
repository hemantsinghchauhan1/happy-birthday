import { useRef, useState, useCallback, useEffect } from "react";
import { memories } from "../data";

// Global singleton audio lock to prevent ANY overlapping audio tracks!
let globalActiveAudio = null;

function stopGlobalAudio() {
  if (globalActiveAudio) {
    try {
      globalActiveAudio.pause();
      globalActiveAudio.currentTime = 0;
      globalActiveAudio.removeAttribute("src");
      globalActiveAudio.load();
    } catch (e) {}
    globalActiveAudio = null;
  }
}

// Audio URL mappings with local fallback chains (.mp3, .mp4, .m4a)
export const songAudioMap = {
  jagjit: { title: "Jagjit Singh Ghazal", artist: "Jagjit Singh Classic", urls: ["/audio/jagjit.mp3", "/audio/jagjit.m4a", "/audio/jagjit.mp4"] },
  chandlamhe: { title: "Chand Lamhe", artist: "Memorable Vibe", urls: ["/audio/chandlamhe.mp3"] },
  binkahe: { title: "Bin Kahe", artist: "Late Night Vibe", urls: ["/audio/binkahe.mp3"] },
  yehdosti: { title: "Yeh Dosti Hum Nahi Todenge", artist: "Sholay", urls: ["/audio/yehdosti.mp4", "/audio/yehdosti.mp3", "/audio/yehdosti.m4a"] },
  dilchahtahai: { title: "Dil Chahta Hai", artist: "Shankar Mahadevan", urls: ["/audio/dilchahtahai.mp3", "/audio/dilchahtahai.mp4"] },
  lipstick: { title: "Jab Lagaawelu Tu Lipastic", artist: "Pawan Singh", urls: ["/audio/lipstick.mp4", "/audio/lipstick.mp3", "/audio/lipstick.m4a"] },
  terejaisa: { title: "Tere Jaisa Yaar Kahan", artist: "Kishore Kumar", urls: ["/audio/terejaisa.mp4", "/audio/terejaisa.mp3", "/audio/terejaisa.m4a"] },
  janeman: { title: "Janeman Jaane Jigar", artist: "Classic Hit Vibe", urls: ["/audio/janeman.mp4", "/audio/janeman.m4a", "/audio/janeman.mp3"] },
  fateh: { title: "Kar Har Maidaan Fateh", artist: "Sanju", urls: ["/audio/fateh.mp4", "/audio/fateh.mp3", "/audio/fateh.m4a"] },
  jungle: { title: "Jungle Tere Parvat Tere", artist: "YouTube dN1O1vQju2Q", urls: ["/audio/jungle.mp4", "/audio/jungle.mp3", "/audio/jungle.m4a"] },
  yunhichala: { title: "Yun Hi Chala Chala Rahi", artist: "Swades", urls: ["/audio/yunhichala.mp4", "/audio/yunhichala.mp3", "/audio/yunhichala.m4a"] },
  senorita: { title: "Senorita", artist: "ZNMD", urls: ["/audio/senorita.mp4", "/audio/senorita.mp3", "/audio/senorita.m4a"] },
  lakshya: { title: "Lakshya Title Track", artist: "Shankar Mahadevan", urls: ["/audio/lakshya.mp3", "/audio/lakshya.mp4"] },
  reelaudio50230: { title: "Instagram Reel Track", artist: "River Vibe (Reel 50230)", urls: ["/audio/reelaudio50230.mp3"] }
};

// Distinct synthesized melody fallback hooks
const songMelodies = {
  jagjit: { bpm: 100, type: "sine", gain: 0.35, notes: [[329.63, 1], [392.0, 1], [440.0, 1.5], [493.88, 1], [440.0, 1.5], [392.0, 1], [329.63, 2]] },
  chandlamhe: { bpm: 108, type: "sine", gain: 0.3, notes: [[349.23, 1], [392.0, 1], [440.0, 1.5], [392.0, 1], [349.23, 2]] },
  binkahe: { bpm: 115, type: "sine", gain: 0.3, notes: [[392.0, 1], [440.0, 1], [493.88, 1.5], [440.0, 1], [392.0, 2]] },
  janeman: { bpm: 124, type: "sine", gain: 0.3, notes: [[349.23, 1], [392.0, 1], [440.0, 1.5], [493.88, 1], [440.0, 2]] },
  chaudhwi: { bpm: 110, type: "sine", gain: 0.3, notes: [[293.66, 1], [369.99, 1], [440.0, 1.5], [493.88, 1], [440.0, 1.5], [369.99, 1], [329.63, 1], [293.66, 2]] },
  yehdosti: { bpm: 140, type: "triangle", gain: 0.35, notes: [[261.63, 0.75], [329.63, 0.75], [392.0, 1], [392.0, 0.5], [440.0, 1], [392.0, 1], [329.63, 0.75], [261.63, 1]] },
  dilchahtahai: { bpm: 128, type: "square", gain: 0.22, notes: [[329.63, 0.5], [415.3, 0.5], [493.88, 0.75], [554.37, 0.75], [493.88, 0.5], [415.3, 0.75], [369.99, 1.5]] },
  lipstick: { bpm: 156, type: "sawtooth", gain: 0.2, notes: [[392.0, 0.5], [392.0, 0.5], [440.0, 0.75], [523.25, 0.75], [523.25, 0.5], [440.0, 0.5], [392.0, 0.5], [349.23, 0.5]] },
  terejaisa: { bpm: 104, type: "triangle", gain: 0.32, notes: [[440.0, 1], [369.99, 0.75], [329.63, 0.75], [293.66, 1.5], [369.99, 1], [440.0, 1], [493.88, 1.5], [440.0, 2]] },
  fateh: { bpm: 135, type: "sawtooth", gain: 0.22, notes: [[261.63, 1], [293.66, 1], [329.63, 1.25], [392.0, 1.25], [523.25, 1.5], [493.88, 1], [392.0, 1], [440.0, 2]] },
  jungle: { bpm: 118, type: "sine", gain: 0.38, notes: [[587.33, 1], [523.25, 0.75], [440.0, 0.75], [392.0, 1.25], [440.0, 1], [523.25, 1], [587.33, 1.25], [659.25, 1]] },
  yunhichala: { bpm: 130, type: "triangle", gain: 0.3, notes: [[392.0, 0.75], [523.25, 0.75], [659.25, 1], [587.33, 1], [523.25, 0.75], [493.88, 0.75], [440.0, 1], [392.0, 1.5]] },
  senorita: { bpm: 125, type: "sine", gain: 0.35, notes: [[329.63, 0.5], [392.0, 0.5], [493.88, 0.75], [523.25, 0.75], [493.88, 0.5], [440.0, 0.75], [392.0, 0.75], [369.99, 1.5]] },
  lakshya: { bpm: 120, type: "square", gain: 0.18, notes: [[293.66, 1], [440.0, 1], [587.33, 1.5], [554.37, 1], [493.88, 1], [440.0, 1], [392.0, 1], [369.99, 1]] },
  reelaudio50230: { bpm: 120, type: "sine", gain: 0.3, notes: [[329.63, 1], [392.0, 1], [440.0, 1.5], [493.88, 1], [440.0, 2]] },
};

export function useCardAudio(mainMusic) {
  const [activeCardId, setActiveCardId] = useState(null);
  const [isPlayAllMode, setIsPlayAllMode] = useState(false);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const synthMasterRef = useRef(null);

  const stopAudio = useCallback(() => {
    stopGlobalAudio();
    if (audioRef.current) {
      audioRef.current = null;
    }
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthMasterRef.current && ctxRef.current) {
      try {
        synthMasterRef.current.gain.exponentialRampToValueAtTime(0.0001, ctxRef.current.currentTime + 0.2);
      } catch (e) {}
    }
    setActiveCardId(null);
    setIsPlayAllMode(false);
  }, []);

  const playSynthFallback = useCallback((cardId, audioKey) => {
    stopGlobalAudio();
    const melodyData = songMelodies[audioKey] || songMelodies.jagjit;
    const ctx = ctxRef.current || new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.value = melodyData.gain;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 3500;
    master.connect(filter); filter.connect(ctx.destination);
    synthMasterRef.current = master;

    const beat = 60 / melodyData.bpm;
    const totalBeats = melodyData.notes.reduce((acc, n) => acc + n[1], 0);
    let startT = ctx.currentTime + 0.05;

    const playNote = (freq, start, dur, type) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      osc.connect(g); g.connect(master);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(melodyData.gain, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.88);
      osc.start(start); osc.stop(start + dur);
    };

    const schedule = () => {
      const now = ctx.currentTime;
      if (startT < now + 0.4) {
        let t = startT;
        melodyData.notes.forEach(([freq, duration]) => {
          playNote(freq, t, duration * beat, melodyData.type);
          playNote(freq * 1.5, t, duration * beat * 0.5, "sine");
          t += duration * beat;
        });
        startT += totalBeats * beat;
      }
    };

    schedule();
    synthTimerRef.current = setInterval(schedule, 200);
    setActiveCardId(cardId);
  }, []);

  const playSongAudio = useCallback((cardId, audioKey, playAll = false) => {
    // 1. Immediately kill any currently playing theme or card audio!
    if (mainMusic && mainMusic.playing) {
      mainMusic.stop();
    }
    stopGlobalAudio();

    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }

    const songData = songAudioMap[audioKey] || songAudioMap.jagjit;
    const urls = songData.urls || [];

    const tryPlay = (index) => {
      if (index >= urls.length) {
        playSynthFallback(cardId, audioKey);
        return;
      }

      // Stop any existing global audio again right before creating new Audio
      stopGlobalAudio();

      const audio = new Audio(urls[index]);
      audio.volume = 0.85;
      audio.loop = !playAll;

      audio.onended = () => {
        if (playAll) {
          const currentIndex = memories.findIndex((m) => m.id === cardId);
          const nextIndex = (currentIndex + 1) % memories.length;
          const nextMemory = memories[nextIndex];
          playSongAudio(nextMemory.id, nextMemory.audioKey, true);
        }
      };

      audio.play().then(() => {
        stopGlobalAudio(); // lock out any concurrent attempt
        globalActiveAudio = audio;
        audioRef.current = audio;
        setActiveCardId(cardId);
        setIsPlayAllMode(playAll);

        if (playAll) {
          const cardEl = document.querySelector(`[data-testid="gallery-card-${cardId}"]`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }).catch((err) => {
        console.warn(`Could not play ${urls[index]}, trying next option...`, err);
        tryPlay(index + 1);
      });

      audio.onerror = () => {
        tryPlay(index + 1);
      };
    };

    tryPlay(0);
  }, [mainMusic, playSynthFallback]);

  const toggleCardAudio = useCallback((cardId, audioKey) => {
    if (activeCardId === cardId && !isPlayAllMode) {
      stopAudio();
    } else {
      setIsPlayAllMode(false);
      playSongAudio(cardId, audioKey, false);
    }
  }, [activeCardId, isPlayAllMode, playSongAudio, stopAudio]);

  const startPlayAllSongs = useCallback(() => {
    if (isPlayAllMode) {
      stopAudio();
    } else {
      const firstMemory = memories[0];
      playSongAudio(firstMemory.id, firstMemory.audioKey, true);
    }
  }, [isPlayAllMode, playSongAudio, stopAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return { activeCardId, isPlayAllMode, toggleCardAudio, startPlayAllSongs, playSongAudio, stopAudio };
}
