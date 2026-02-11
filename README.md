# ECHOES OF SILENCE

**Interactive psychological horror — decisions under pressure.**

You wake up in your apartment at 3:33 AM. You don't remember falling asleep. A note on the kitchen table, written in your own handwriting, reads:

*"Don't open the door. Don't trust the silence."*

---

## About

Echoes of Silence is a browser-based interactive fiction game built around psychological horror, paranoia, and the thin line between what's real and what's imagined. Every decision shapes the story — some of them have a time limit.

There are no jump scares. There is no gore. Just silence, tension, and the growing suspicion that something is very wrong.

- **~35 scenes** of branching narrative
- **6 distinct endings** (bad, neutral, disturbing, ambiguous)
- **Timed decisions** that force you to act under pressure
- **Hidden psychological variables** that alter the story without your knowledge
- **Voice narration** — optional text-to-speech that reads each scene aloud
- **No backend, no accounts, no external services** — runs entirely in the browser

## How to Play

Make choices. Read carefully. Some decisions are timed — if you don't choose, the game chooses for you.

The game tracks five hidden variables based on your decisions:

| Variable | What it does |
|---|---|
| Fear | Darkens the screen, intensifies the vignette |
| Sanity | Desaturates colors, adds screen shake and text distortion |
| Paranoia | Changes narrative text, makes UI elements twitch |
| Guilt | Gates certain dialogue and endings |
| Trauma | Accumulates across disturbing choices, alters the confrontation |

These are never shown to the player. You won't know your state — you'll feel it.

## Endings

There are 6 endings. Some are bad. Some are worse. One might be good, depending on how you define "good."

| # | Title | Type |
|---|---|---|
| 1 | El Silencio Permanece | Bad |
| 2 | Ecos | Neutral |
| 3 | Lo Que Hay Detrás | Disturbing |
| 4 | Aceptación | Ambiguous |
| 5 | El Bucle | Disturbing |
| 6 | Olvidado | Bad |

The endings gallery tracks which ones you've unlocked across playthroughs.

## Tech Stack

| Component | Technology |
|---|---|
| Build tool | Vite |
| Language | Vanilla JavaScript (ES modules) |
| Styling | CSS with custom properties |
| Audio | Web Audio API (generated at runtime, no audio files) |
| Voice narration | Web Speech API (browser-native TTS) |
| Persistence | localStorage |
| External dependencies | None at runtime |

The game works fully offline once loaded.

## Project Structure

```
src/
├── main.js          Entry point
├── engine.js        Game state, scene flow, choice handling
├── story.js         All narrative content (~35 scenes, 6 endings)
├── renderer.js      Typewriter effect, UI rendering, visual effects
├── timer.js         Countdown system for timed decisions
├── audio.js         Web Audio API sound generation
├── speech.js        Voice narration via Web Speech API
├── save.js          localStorage save/load and endings registry
└── style.css        Dark atmospheric UI with animations
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

## Design Philosophy

- **Minimalist UI** — dark backgrounds, muted typography, no unnecessary elements
- **Slow discomfort over shock** — animations are deliberate, transitions are uneasy
- **The interface reflects your state** — as fear rises, the screen darkens; as sanity drops, colors drain and text shivers
- **Sound is generated, not loaded** — low drones, heartbeats, and distorted tones created with oscillators and noise buffers
- **Voice narration is optional** — toggle it from the bottom-right corner; uses the browser's built-in Speech API with a slow, low-pitched Spanish voice for atmosphere
- **Time pressure is psychological** — the timer bar drains, the screen flickers, a heartbeat plays, and you have to decide *now*

## Browser Support

Works in any modern browser with ES module, Web Audio API, and Speech Synthesis support (Chrome, Firefox, Safari, Edge). Voice narration quality depends on the Spanish TTS voices available on your system.

## License

MIT
