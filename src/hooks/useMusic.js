import { useRef, useCallback, useState, useEffect } from "react";

// Cheerful melody (freq in Hz, beats). Loops seamlessly.
const melody = [
  [523.25, 1], [523.25, 0.5], [587.33, 1.5], [523.25, 1.5], [698.46, 1.5], [659.25, 3],
  [523.25, 1], [523.25, 0.5], [587.33, 1.5], [523.25, 1.5], [783.99, 1.5], [698.46, 3],
  [523.25, 1], [523.25, 0.5], [1046.5, 1.5], [880.0, 1.5], [698.46, 1.5], [659.25, 1.5], [587.33, 3],
  [932.33, 1], [932.33, 0.5], [880.0, 1.5], [698.46, 1.5], [783.99, 1.5], [698.46, 3],
];
const bass = [261.63, 349.23, 392.0, 261.63];

// Synthesized warm "music-box" birthday melody — no external files, no copyright.
export function useMusic() {
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const masterRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const playNote = (ctx, dest, freq, start, dur, type, gain) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(g); g.connect(dest);
    const t = start;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.9);
    osc.start(t); osc.stop(t + dur);
  };

  const start = useCallback(() => {
    if (playing) return;
    const ctx = ctxRef.current || new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.5;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 3200;
    master.connect(lp); lp.connect(ctx.destination);
    masterRef.current = master;

    const bpm = 132;
    const beat = 60 / bpm;
    const loopBeats = melody.reduce((s, n) => s + n[1], 0);
    let barStart = ctx.currentTime + 0.1;

    const schedule = () => {
      const now = ctx.currentTime;
      if (barStart < now + 0.5) {
        let t = barStart;
        melody.forEach(([f, b]) => {
          playNote(ctx, master, f, t, b * beat, "triangle", 0.28);
          playNote(ctx, master, f * 2, t, b * beat * 0.6, "sine", 0.06);
          t += b * beat;
        });
        const bassStep = (loopBeats * beat) / bass.length;
        bass.forEach((bf, i) => {
          playNote(ctx, master, bf, barStart + i * bassStep, bassStep * 0.9, "sine", 0.16);
        });
        barStart += loopBeats * beat;
      }
    };
    schedule();
    timerRef.current = setInterval(schedule, 250);
    setPlaying(true);
  }, [playing]);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (masterRef.current && ctxRef.current) {
      const m = masterRef.current, ctx = ctxRef.current;
      m.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  useEffect(() => () => timerRef.current && clearInterval(timerRef.current), []);

  return { playing, toggle, start };
}
