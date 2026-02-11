/**
 * Speech — Text-to-speech narration using Web Speech API
 */

let enabled = false;
let voice = null;
let currentUtterance = null;
let voicesReady = false;

const RATE = 0.85;
const PITCH = 0.75;

/**
 * Initialize voices (they load asynchronously in some browsers)
 */
export function initSpeech() {
  if (!('speechSynthesis' in window)) return;

  const loadVoices = () => {
    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) return;
    voicesReady = true;

    // Prefer a Spanish voice
    voice =
      voices.find((v) => v.lang.startsWith('es') && v.localService) ||
      voices.find((v) => v.lang.startsWith('es')) ||
      voices.find((v) => v.lang.startsWith('en') && v.localService) ||
      voices[0];
  };

  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Toggle narration on/off. Returns new state.
 */
export function toggleSpeech() {
  enabled = !enabled;
  if (!enabled) {
    stopSpeech();
  }
  return enabled;
}

export function isSpeechEnabled() {
  return enabled;
}

export function isSpeechAvailable() {
  return 'speechSynthesis' in window;
}

/**
 * Narrate a text. Cleans it up and speaks it.
 */
export function speak(text) {
  if (!enabled || !('speechSynthesis' in window)) return;

  stopSpeech();

  // Clean text for speech: remove special characters, normalize whitespace
  const clean = text
    .replace(/\n+/g, '. ')
    .replace(/["""''«»]/g, '')
    .replace(/—/g, ', ')
    .replace(/\.\.\./g, '...')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (!clean) return;

  currentUtterance = new SpeechSynthesisUtterance(clean);
  currentUtterance.rate = RATE;
  currentUtterance.pitch = PITCH;
  currentUtterance.volume = 0.9;

  if (voice) {
    currentUtterance.voice = voice;
  }
  currentUtterance.lang = 'es-ES';

  currentUtterance.onend = () => {
    currentUtterance = null;
  };

  speechSynthesis.speak(currentUtterance);
}

/**
 * Stop any current narration.
 */
export function stopSpeech() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  currentUtterance = null;
}
