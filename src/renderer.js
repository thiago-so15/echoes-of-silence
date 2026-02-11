/**
 * Renderer — UI rendering, typewriter effect, visual effects
 */

let typewriterInterval = null;
let typewriterResolve = null;
let isTyping = false;

/**
 * Typewriter effect — reveals text character by character
 */
export function typewriteText(element, text, speed = 30) {
  return new Promise((resolve) => {
    cancelTypewriter();
    isTyping = true;
    typewriterResolve = resolve;
    element.innerHTML = '';
    element.classList.add('typing');

    // Parse text into segments (paragraphs split by \n\n)
    const paragraphs = text.split('\n\n');
    let currentParagraph = 0;
    let currentChar = 0;
    let currentElement = document.createElement('p');
    element.appendChild(currentElement);

    // Handle single newlines within paragraphs
    const processChar = () => {
      if (currentParagraph >= paragraphs.length) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
        isTyping = false;
        element.classList.remove('typing');
        resolve();
        return;
      }

      const para = paragraphs[currentParagraph];

      if (currentChar >= para.length) {
        // Move to next paragraph
        currentParagraph++;
        currentChar = 0;
        if (currentParagraph < paragraphs.length) {
          currentElement = document.createElement('p');
          element.appendChild(currentElement);
          // Scroll to bottom of narrative container
          const container = document.getElementById('narrative-container');
          if (container) container.scrollTop = container.scrollHeight;
        }
        return;
      }

      const char = para[currentChar];

      if (char === '\n') {
        currentElement.appendChild(document.createElement('br'));
      } else {
        currentElement.textContent += char;
      }

      currentChar++;

      // Scroll to bottom
      const container = document.getElementById('narrative-container');
      if (container) container.scrollTop = container.scrollHeight;
    };

    // Vary speed slightly for natural feel
    let charCount = 0;
    typewriterInterval = setInterval(() => {
      processChar();
      charCount++;
      // Pause briefly at punctuation
      if (charCount % 3 === 0) {
        const lastChar =
          currentElement.textContent[currentElement.textContent.length - 1];
        if (lastChar === '.' || lastChar === ',' || lastChar === '—') {
          // Extra delay handled by skipping next tick
        }
      }
    }, speed);
  });
}

export function cancelTypewriter() {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
    typewriterInterval = null;
  }
  isTyping = false;
}

export function skipTypewriter(element, text) {
  cancelTypewriter();
  // Show full text immediately
  element.innerHTML = '';
  const paragraphs = text.split('\n\n');
  paragraphs.forEach((para) => {
    const p = document.createElement('p');
    p.innerHTML = para.replace(/\n/g, '<br>');
    element.appendChild(p);
  });
  if (typewriterResolve) {
    typewriterResolve();
    typewriterResolve = null;
  }
}

export function isCurrentlyTyping() {
  return isTyping;
}

/**
 * Render choices as buttons
 */
export function renderChoices(choices, onChoose) {
  const container = document.getElementById('choices-container');
  container.innerHTML = '';
  container.classList.remove('visible');

  // Small delay before showing choices
  setTimeout(() => {
    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.style.animationDelay = `${index * 0.15}s`;

      btn.addEventListener('click', () => {
        // Disable all buttons
        container.querySelectorAll('.choice-btn').forEach((b) => {
          b.disabled = true;
          b.classList.add('disabled');
        });
        // Mark chosen
        btn.classList.add('chosen');
        onChoose(index);
      });

      container.appendChild(btn);
    });

    container.classList.add('visible');
  }, 300);
}

export function clearChoices() {
  const container = document.getElementById('choices-container');
  container.innerHTML = '';
  container.classList.remove('visible');
}

/**
 * Show a screen, hide others
 */
export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach((s) => {
    s.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

/**
 * Visual effects
 */

export function flashScreen(color = 'white', duration = 150) {
  const flash = document.getElementById('flash-overlay');
  flash.style.backgroundColor = color;
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), duration);
}

export function glitchEffect(duration = 400) {
  const glitch = document.getElementById('glitch-layer');
  glitch.classList.add('active');
  setTimeout(() => glitch.classList.remove('active'), duration);
}

export function setAtmosphere(variables) {
  const root = document.documentElement;

  // Fear affects vignette intensity
  const fearLevel = Math.min(variables.miedo / 100, 1);
  root.style.setProperty('--vignette-intensity', 0.3 + fearLevel * 0.5);

  // Sanity affects color saturation and noise
  const sanityLevel = Math.max(variables.cordura / 100, 0);
  root.style.setProperty('--saturation', sanityLevel);
  root.style.setProperty('--noise-opacity', 0.03 + (1 - sanityLevel) * 0.08);

  // Paranoia affects subtle distortion
  const paranoiaLevel = Math.min(variables.paranoia / 100, 1);
  root.style.setProperty('--distortion', paranoiaLevel * 2);

  // Apply body class for high-stress states
  document.body.classList.toggle('high-fear', variables.miedo > 60);
  document.body.classList.toggle('low-sanity', variables.cordura < 40);
  document.body.classList.toggle('high-paranoia', variables.paranoia > 50);
}

export function transitionScene(callback) {
  const gameScreen = document.getElementById('game-screen');
  gameScreen.classList.add('scene-transition');

  setTimeout(() => {
    callback();
    setTimeout(() => {
      gameScreen.classList.remove('scene-transition');
    }, 600);
  }, 400);
}

/**
 * Render endings gallery
 */
export function renderEndingsGallery(unlockedEndings, allEndings, total) {
  const list = document.getElementById('endings-list');
  list.innerHTML = '';

  const endingIds = Object.keys(allEndings);

  endingIds.forEach((id) => {
    const info = allEndings[id];
    const unlocked = unlockedEndings.find((e) => e.id === id);
    const card = document.createElement('div');
    card.className = 'ending-card' + (unlocked ? ' unlocked' : ' locked');

    if (unlocked) {
      card.innerHTML = `
        <div class="ending-card-type ending-type-${info.type}">${info.type.toUpperCase()}</div>
        <h3>${info.title}</h3>
        <p class="ending-card-hint">${info.hint}</p>
      `;
    } else {
      card.innerHTML = `
        <div class="ending-card-type">???</div>
        <h3>???</h3>
        <p class="ending-card-hint">Final no descubierto</p>
      `;
    }

    list.appendChild(card);
  });

  // Counter
  const counter = document.createElement('p');
  counter.className = 'endings-counter';
  counter.textContent = `${unlockedEndings.length} / ${total} finales desbloqueados`;
  list.appendChild(counter);
}

/**
 * Render ending screen
 */
export function renderEnding(scene, variables = {}) {
  const title = document.getElementById('ending-title');
  const typeLabel = document.getElementById('ending-type-label');
  const text = document.getElementById('ending-text');

  title.textContent = scene.endingTitle;

  const typeMap = {
    malo: 'FINAL MALO',
    neutro: 'FINAL NEUTRO',
    perturbador: 'FINAL PERTURBADOR',
    ambiguo: 'FINAL AMBIGUO',
  };

  typeLabel.textContent = typeMap[scene.endingType] || 'FINAL';
  typeLabel.className = `ending-type-badge ending-type-${scene.endingType}`;

  // Typewrite the ending text
  const endingContent = typeof scene.getText === 'function' ? scene.getText(variables) : scene.getText;
  text.innerHTML = '';
  return typewriteText(text, endingContent, 40);
}
