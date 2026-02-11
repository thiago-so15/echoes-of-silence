/**
 * AudioManager — Generates all sound using Web Audio API (no external files)
 */

let ctx = null;
let masterGain = null;
let droneOsc = null;
let droneGain = null;
let lfoOsc = null;
let isAudioStarted = false;
let isMuted = false;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

export function startAudio() {
  if (isAudioStarted) return;
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
  isAudioStarted = true;
  startDrone();
}

export function toggleMute() {
  isMuted = !isMuted;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.3, ctx.currentTime, 0.1);
  }
  return isMuted;
}

export function isMutedState() {
  return isMuted;
}

// --- Ambient drone ---
function startDrone() {
  const c = getCtx();

  droneGain = c.createGain();
  droneGain.gain.value = 0.08;
  droneGain.connect(masterGain);

  // Base drone — very low frequency
  droneOsc = c.createOscillator();
  droneOsc.type = 'sine';
  droneOsc.frequency.value = 55;
  droneOsc.connect(droneGain);
  droneOsc.start();

  // Second detuned oscillator for unease
  const drone2 = c.createOscillator();
  drone2.type = 'sine';
  drone2.frequency.value = 55.8;
  const drone2Gain = c.createGain();
  drone2Gain.gain.value = 0.05;
  drone2.connect(drone2Gain);
  drone2Gain.connect(masterGain);
  drone2.start();

  // LFO for subtle pulsing
  lfoOsc = c.createOscillator();
  lfoOsc.type = 'sine';
  lfoOsc.frequency.value = 0.15;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.03;
  lfoOsc.connect(lfoGain);
  lfoGain.connect(droneGain.gain);
  lfoOsc.start();
}

export function setDroneIntensity(level) {
  // level 0-1, increases drone presence
  if (!droneGain || !ctx) return;
  const base = 0.04 + level * 0.12;
  droneGain.gain.setTargetAtTime(base, ctx.currentTime, 0.5);
  if (droneOsc) {
    droneOsc.frequency.setTargetAtTime(55 - level * 15, ctx.currentTime, 1.0);
  }
}

// --- Sound effects ---

export function playClick() {
  if (!isAudioStarted) return;
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'square';
  osc.frequency.value = 800;
  gain.gain.value = 0.06;
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 0.08);
}

export function playTransition() {
  if (!isAudioStarted) return;
  const c = getCtx();

  // Low thud
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = 80;
  osc.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.4);
  gain.gain.value = 0.15;
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 0.5);

  // Noise burst
  const bufferSize = c.sampleRate * 0.3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = c.createGain();
  noiseGain.gain.value = 0.04;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start();
}

export function playHeartbeat() {
  if (!isAudioStarted) return;
  const c = getCtx();

  function beat(delay) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = 60;
    gain.gain.value = 0;
    gain.gain.setValueAtTime(0, c.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.2, c.currentTime + delay + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + 0.2);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + 0.25);
  }

  beat(0);
  beat(0.18);
}

export function playWarning() {
  if (!isAudioStarted) return;
  const c = getCtx();

  // Dissonant warning tone
  [330, 349].forEach((freq) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    gain.gain.setValueAtTime(0.05, c.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, c.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(c.currentTime + 0.6);
  });
}

export function playEndingSound() {
  if (!isAudioStarted) return;
  const c = getCtx();

  // Long, fading tone
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = 220;
  osc.frequency.linearRampToValueAtTime(110, c.currentTime + 3);
  gain.gain.value = 0.12;
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 3);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 3.1);

  // Reverb-like tail with noise
  const bufferSize = c.sampleRate * 2;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const nGain = c.createGain();
  nGain.gain.value = 0.02;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  noise.connect(filter);
  filter.connect(nGain);
  nGain.connect(masterGain);
  noise.start();
}

export function playWhisper() {
  if (!isAudioStarted) return;
  const c = getCtx();

  const bufferSize = c.sampleRate * 1.5;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const env = Math.sin((Math.PI * i) / bufferSize);
    data[i] = (Math.random() * 2 - 1) * env * 0.5;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;

  const bandpass = c.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2000;
  bandpass.Q.value = 3;

  const gain = c.createGain();
  gain.gain.value = 0.06;

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(masterGain);
  noise.start();
}
