/**
 * SaveManager — Handles localStorage save/load
 */

const SAVE_KEY = 'echoes_save';
const ENDINGS_KEY = 'echoes_endings';

export function hasSave() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

export function saveGame(state) {
  const data = {
    currentScene: state.currentScene,
    variables: { ...state.variables },
    history: [...state.history],
    timestamp: Date.now(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function deleteAll() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(ENDINGS_KEY);
}

// --- Endings registry ---

export function getUnlockedEndings() {
  const raw = localStorage.getItem(ENDINGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function unlockEnding(endingId, title, type) {
  const endings = getUnlockedEndings();
  if (endings.find((e) => e.id === endingId)) return;
  endings.push({
    id: endingId,
    title,
    type,
    unlockedAt: Date.now(),
  });
  localStorage.setItem(ENDINGS_KEY, JSON.stringify(endings));
}

export function getTotalEndingsCount() {
  return 6;
}
