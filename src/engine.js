/**
 * GameEngine — Core game logic, state management, scene flow
 */

import { SCENES, DEFAULT_VARIABLES, ENDING_DESCRIPTIONS, TOTAL_ENDINGS } from './story.js';
import { startTimer, clearTimer, isActive as isTimerActive } from './timer.js';
import { saveGame, loadGame, deleteSave, unlockEnding, getUnlockedEndings, hasSave } from './save.js';
import {
  startAudio, playClick, playTransition, playHeartbeat,
  playWarning, playEndingSound, playWhisper, setDroneIntensity
} from './audio.js';
import {
  typewriteText, skipTypewriter, isCurrentlyTyping, cancelTypewriter,
  renderChoices, clearChoices, showScreen, flashScreen, glitchEffect,
  setAtmosphere, transitionScene, renderEndingsGallery, renderEnding
} from './renderer.js';

let state = {
  currentScene: 'inicio',
  variables: { ...DEFAULT_VARIABLES },
  history: [],
};

let currentFullText = '';

/**
 * Initialize the game engine
 */
export function initEngine() {
  setupMenuButtons();
  setupKeyboardShortcuts();
  showScreen('menu-screen');

  // Show/hide continue and delete buttons
  if (hasSave()) {
    document.getElementById('btn-continue').style.display = '';
    document.getElementById('btn-delete').style.display = '';
  }
}

function setupMenuButtons() {
  document.getElementById('btn-new-game').addEventListener('click', () => {
    startAudio();
    newGame();
  });

  document.getElementById('btn-continue').addEventListener('click', () => {
    startAudio();
    continueGame();
  });

  document.getElementById('btn-endings').addEventListener('click', () => {
    startAudio();
    showEndingsGallery();
  });

  document.getElementById('btn-delete').addEventListener('click', () => {
    if (confirm('¿Borrar todo el progreso? Esta acción no se puede deshacer.')) {
      deleteSave();
      document.getElementById('btn-continue').style.display = 'none';
      document.getElementById('btn-delete').style.display = 'none';
      playClick();
    }
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    deleteSave();
    showScreen('menu-screen');
    document.getElementById('btn-continue').style.display = 'none';
    document.getElementById('btn-delete').style.display = 'none';
    playClick();
  });

  document.getElementById('btn-back-menu').addEventListener('click', () => {
    showScreen('menu-screen');
    playClick();
  });
}

function setupKeyboardShortcuts() {
  // Click on narrative area to skip typewriter
  document.getElementById('narrative-container').addEventListener('click', (e) => {
    if (isCurrentlyTyping()) {
      e.stopPropagation();
      const narrativeText = document.getElementById('narrative-text');
      skipTypewriter(narrativeText, currentFullText);
    }
  });

  // Space or Enter to skip typewriter
  document.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter') && isCurrentlyTyping()) {
      e.preventDefault();
      const narrativeText = document.getElementById('narrative-text');
      skipTypewriter(narrativeText, currentFullText);
    }
  });
}

/**
 * Start a new game
 */
function newGame() {
  state = {
    currentScene: 'inicio',
    variables: { ...DEFAULT_VARIABLES },
    history: [],
  };
  deleteSave();
  playTransition();
  flashScreen('black', 800);

  setTimeout(() => {
    showScreen('game-screen');
    loadScene('inicio');
  }, 600);
}

/**
 * Continue from save
 */
function continueGame() {
  const saved = loadGame();
  if (!saved) {
    newGame();
    return;
  }

  state.currentScene = saved.currentScene;
  state.variables = { ...DEFAULT_VARIABLES, ...saved.variables };
  state.history = saved.history || [];

  playTransition();
  showScreen('game-screen');
  loadScene(state.currentScene);
}

/**
 * Load and display a scene
 */
function loadScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) {
    console.error(`Scene not found: ${sceneId}`);
    return;
  }

  state.currentScene = sceneId;
  clearTimer();
  clearChoices();

  // Update atmosphere based on variables
  setAtmosphere(state.variables);

  // Update drone intensity based on fear/paranoia
  const intensity = Math.min(
    (state.variables.miedo + state.variables.paranoia) / 150,
    1
  );
  setDroneIntensity(intensity);

  // Get scene text (may be dynamic)
  const text =
    typeof scene.getText === 'function'
      ? scene.getText(state.variables)
      : scene.getText;

  currentFullText = text;

  // Check if this is an ending
  if (scene.isEnding) {
    handleEnding(scene);
    return;
  }

  // Transition effect
  transitionScene(() => {
    const narrativeText = document.getElementById('narrative-text');

    // Start typewriter
    typewriteText(narrativeText, text, 28).then(() => {
      // After text is done, show choices
      showChoices(scene);
    });

    // Start timer AFTER transition completes (inside callback)
    if (scene.timeLimit) {
      startSceneTimer(scene);
    }

    // Save progress
    saveGame(state);
  });
}

/**
 * Show available choices for a scene
 */
function showChoices(scene) {
  // Filter choices by conditions
  const availableChoices = scene.choices.filter((choice) => {
    if (choice.condition) {
      return choice.condition(state.variables);
    }
    return true;
  });

  // Resolve dynamic text in choices
  const resolvedChoices = availableChoices.map((choice) => ({
    ...choice,
    text: typeof choice.text === 'function'
      ? choice.text(state.variables)
      : choice.text,
  }));

  renderChoices(resolvedChoices, (index) => {
    handleChoice(resolvedChoices[index]);
  });
}

/**
 * Handle a player's choice
 */
function handleChoice(choice) {
  playClick();
  clearTimer();

  // Apply effects
  if (choice.effects) {
    Object.entries(choice.effects).forEach(([key, value]) => {
      if (state.variables[key] !== undefined) {
        state.variables[key] += value;
      } else {
        state.variables[key] = value;
      }
    });

    // Clamp values
    state.variables.miedo = Math.max(0, Math.min(100, state.variables.miedo));
    state.variables.cordura = Math.max(0, Math.min(100, state.variables.cordura));
    state.variables.paranoia = Math.max(0, Math.min(100, state.variables.paranoia));
    state.variables.culpa = Math.max(0, Math.min(100, state.variables.culpa));
    state.variables.trauma = Math.max(0, Math.min(100, state.variables.trauma));
  }

  // Record in history
  state.history.push({
    scene: state.currentScene,
    choice: choice.text,
  });

  // Determine next scene
  const nextScene = typeof choice.nextScene === 'function'
    ? choice.nextScene(state.variables)
    : choice.nextScene;

  // Small delay for feedback
  setTimeout(() => {
    glitchEffect(200);
    playTransition();
    setTimeout(() => loadScene(nextScene), 300);
  }, 200);
}

/**
 * Start timer for timed scenes
 */
function startSceneTimer(scene) {
  const warningPlayed = { done: false };
  let lastHeartbeat = 0;

  startTimer(
    scene.timeLimit,
    // On timeout
    () => {
      flashScreen('rgba(139, 0, 0, 0.4)', 300);
      glitchEffect(500);
      playWarning();

      // Find timeout default choice or go to timeout scene
      if (scene.timeoutScene) {
        const defaultChoice = scene.choices.find((c) => c.isTimeoutDefault);
        if (defaultChoice) {
          // Apply default choice effects
          state.history.push({
            scene: state.currentScene,
            choice: '[tiempo agotado]',
          });
          if (defaultChoice.effects) {
            Object.entries(defaultChoice.effects).forEach(([key, value]) => {
              if (state.variables[key] !== undefined) {
                state.variables[key] += value;
              } else {
                state.variables[key] = value;
              }
            });
          }
        }
        setTimeout(() => loadScene(scene.timeoutScene), 400);
      }
    },
    // On tick
    (remaining, total) => {
      const pct = remaining / total;
      const now = Date.now();

      // Warning sound once
      if (pct < 0.4 && !warningPlayed.done) {
        warningPlayed.done = true;
        playWarning();
      }

      // Heartbeat — throttle to once per 800ms
      if (pct < 0.3 && now - lastHeartbeat > 800) {
        lastHeartbeat = now;
        playHeartbeat();
      }

      // Flicker effect when time is low
      if (pct < 0.3 && Math.random() < 0.05) {
        document.getElementById('game-screen').classList.add('flicker');
        setTimeout(() => {
          document.getElementById('game-screen').classList.remove('flicker');
        }, 100);
      }

      // Glitch when very low
      if (pct < 0.15 && Math.random() < 0.08) {
        glitchEffect(100);
      }
    }
  );
}

/**
 * Handle game ending
 */
function handleEnding(scene) {
  // Save ending
  unlockEnding(scene.id, scene.endingTitle, scene.endingType);

  // Delete current save (game is over)
  deleteSave();

  playEndingSound();

  // Dramatic pause then show ending
  flashScreen('black', 1500);

  setTimeout(() => {
    showScreen('ending-screen');
    renderEnding(scene, state.variables);
  }, 1200);
}

/**
 * Show endings gallery
 */
function showEndingsGallery() {
  const unlocked = getUnlockedEndings();
  renderEndingsGallery(unlocked, ENDING_DESCRIPTIONS, TOTAL_ENDINGS);
  showScreen('endings-screen');
}
