/**
 * Echoes of Silence — Entry point
 */

import './style.css';
import { initEngine } from './engine.js';

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine);
} else {
  initEngine();
}
