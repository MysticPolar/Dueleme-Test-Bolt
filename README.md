# 读了么 (Dúle Me) — Mobile App V2

> *"Read Dangerously"* · The Owlery Press · Est. 2025

A newspaper-aesthetic mobile reading & oracle app built in React.  
Harry Potter Daily Prophet × literary social network × gamified reading.

---

## 🚀 Quick Start

### Option A — Zero Setup (Recommended for preview)

Open `duleme-standalone.html` directly in any browser.  
No installation, no build step required.

```bash
open duleme-standalone.html
```

---

### Option B — Vite Dev Server (Recommended for development)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
duleme-app/
├── duleme-standalone.html    ← ⭐ OPEN THIS for instant preview
├── index.html                ← Vite HTML entry
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← React root mount
    ├── App.jsx               ← Root component (routing, global state)
    ├── assets/
    │   ├── logo-dark.svg
    │   ├── avatar-scholar.svg
    │   └── coin-illustration.svg
    ├── data/
    │   └── content.js        ← Questions, articles, user data
    ├── styles/
    │   └── tokens.js         ← Colors, fonts, textures, keyframes
    ├── components/
    │   ├── Masthead.jsx      ← Newspaper header
    │   ├── NavBar.jsx        ← Bottom tab navigation
    │   ├── InputBar.jsx      ← Question input (Normal / Air / Max)
    │   ├── OracleDispatch.jsx ← AI response overlay (newspaper spread)
    │   └── Primitives.jsx    ← Shared atoms: cards, icons, XP, toast
    └── screens/
        ├── HomeScreen.jsx    ← 首页 · Main feed
        ├── ReadingScreen.jsx ← 阅读 · Article list + reader
        └── ProfileScreen.jsx ← 我的 · User stats, avatars, ranks
```

---

## 🎨 Design Identity

| Token | Value |
|---|---|
| **Primary** | `#1a1208` Ink |
| **Surface** | `#f5efe0` Paper |
| **Accent** | `#c9a227` Gold |
| **Alert** | `#c0392b` Red |
| **Display Font** | Playfair Display |
| **Blackletter** | UnifrakturMaguntia |
| **Body** | IM Fell English |
| **UI** | Space Grotesk |
| **Chinese** | Noto Serif SC |

---

## 📱 Screens

| Screen | Route | Description |
|---|---|---|
| **首页** | `home` | Question cards, challenge, trending, XP header |
| **阅读** | `reading` | Curated articles with filter tabs + in-app reader |
| **我的** | `profile` | Avatar collection, INK balance, rank progression, settings |
| **神谕特刊** | overlay | Full-screen Oracle AI response in newspaper spread format |

---

## 🛠 Input Modes

| Mode | Color | Style |
|---|---|---|
| **Normal** | Ink `#1a1208` | Standard oracle response |
| **✦ Air** | Teal `#2a7c6f` | Quick, concise reply |
| **◈ Max** | Purple `#5c2d7a` | Deep editorial with book recommendations |

---

## 🪙 Gamification

- **INK** — currency earned for reading, answering, streaks
- **XP Bar** — progress toward next rank, visible in header
- **Ranks** — Novice Scribe → Ink Apprentice → Page Turner → Oracle Reader → Archivist → Grand Librarian
- **Avatars** — collectible scholar characters (Scholar, Night Owl, Scribe, Alchemist…)
- **Daily Challenge** — streak-based daily reading prompt
- **Ink Toast** — animated reward notification on dispatch completion

---

## 🌐 Browser Support

Chrome 90+, Safari 14+, Firefox 88+, Edge 90+

---

*"The owl flies at midnight. Your story continues."*  
— The Owlery Press
