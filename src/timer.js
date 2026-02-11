/**
 * Timer — Visual countdown system for timed decisions
 */

let timerInterval = null;
let timerTimeout = null;
let remaining = 0;
let total = 0;
let onTimeoutCallback = null;
let onTickCallback = null;

export function startTimer(seconds, onTimeout, onTick) {
  clearTimer();
  total = seconds;
  remaining = seconds;
  onTimeoutCallback = onTimeout;
  onTickCallback = onTick;

  // Show timer UI
  const container = document.getElementById('timer-container');
  const bar = document.getElementById('timer-bar');
  container.classList.remove('hidden');
  bar.style.width = '100%';
  bar.classList.remove('warning', 'critical');

  const startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    remaining = Math.max(0, total - elapsed);
    const pct = (remaining / total) * 100;
    bar.style.width = pct + '%';

    // Thresholds for visual urgency
    if (pct < 20) {
      bar.classList.add('critical');
      bar.classList.remove('warning');
    } else if (pct < 40) {
      bar.classList.add('warning');
      bar.classList.remove('critical');
    }

    if (onTickCallback) onTickCallback(remaining, total);

    if (remaining <= 0) {
      clearTimer();
      if (onTimeoutCallback) onTimeoutCallback();
    }
  }, 50);
}

export function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (timerTimeout) {
    clearTimeout(timerTimeout);
    timerTimeout = null;
  }
  const container = document.getElementById('timer-container');
  if (container) container.classList.add('hidden');
  const bar = document.getElementById('timer-bar');
  if (bar) {
    bar.classList.remove('warning', 'critical');
    bar.style.width = '100%';
  }
}

export function getRemaining() {
  return remaining;
}

export function isActive() {
  return timerInterval !== null;
}
