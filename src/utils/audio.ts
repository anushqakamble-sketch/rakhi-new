/**
 * Web Audio API synthesized festive chimes and ceremonial tones.
 * Zero external asset dependencies, zero network latency.
 */

let audioCtx: AudioContext | null = null;
let ambientInterval: number | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a single chime bell tone with harmonic overtones
 */
export function playBellTone(freq: number = 587.33, duration: number = 2.0, volume: number = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Harmonic overtone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2.76, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  gain2.gain.setValueAtTime(0.001, now);
  gain2.gain.exponentialRampToValueAtTime(volume * 0.35, now + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc.start(now);
  osc2.start(now);
  osc.stop(now + duration);
  osc2.stop(now + duration);
}

/**
 * Play auspicious festive fanfare chord (celebration reveal)
 */
export function playFestiveFanfare() {
  const notes = [
    { freq: 440.0, delay: 0 },      // A4
    { freq: 554.37, delay: 0.12 },  // C#5
    { freq: 659.25, delay: 0.24 },  // E5
    { freq: 880.0, delay: 0.38 },   // A5
    { freq: 1108.73, delay: 0.52 }, // C#6
  ];

  notes.forEach(({ freq, delay }) => {
    setTimeout(() => {
      playBellTone(freq, 2.2, 0.12);
    }, delay * 1000);
  });
}

/**
 * Play sacred Pooja bell ripple (for Aarti/Thali interaction)
 */
export function playPoojaBell() {
  playBellTone(784, 1.8, 0.18);
  setTimeout(() => playBellTone(1046.5, 2.0, 0.15), 150);
}

/**
 * Start gentle ambient meditative bells
 */
export function startAmbientChimes() {
  stopAmbientChimes();
  const pentatonicScale = [392, 440, 523.25, 587.33, 659.25, 784, 880];
  
  // Play initial soft chord
  playFestiveFanfare();

  ambientInterval = window.setInterval(() => {
    const randomNote = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    playBellTone(randomNote, 2.5, 0.08);
  }, 3800);
}

export function stopAmbientChimes() {
  if (ambientInterval !== null) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
}
