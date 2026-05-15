<div align="center">

# JRLA · Portfolio v4

**Front-end developer & UI/UX designer.**
A horizontal slide portfolio built for speed, type, and texture.

[Live →](https://jrla-portfolio.web.app/) &nbsp;·&nbsp; [Design system](./DESIGN.md) &nbsp;·&nbsp; [Contact](mailto:Angulo.johnrussel.l.7814@gmail.com)

![Vue](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&labelColor=18181b)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&labelColor=18181b)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&labelColor=18181b)
![Pinia](https://img.shields.io/badge/Pinia-3-ffd859?style=flat-square&labelColor=18181b)
![Firebase](https://img.shields.io/badge/Hosted-Firebase-ffca28?style=flat-square&labelColor=18181b)

</div>

---

## Overview

Five-slide narrative — **Home · Features · Works · About · Contact** — driven by Swiper with keyboard, touch, and pointer nav. UI/UX case studies open in a side sheet; video/vector pieces open in a modal. Theme cycles **system → light → dark** with FOUC-safe boot.

Primary accent flips by mode:
- ☀️ Light — **`#ff3656`** red-pink
- 🌙 Dark — **`#ffca26`** yellow

Full visual language lives in **[DESIGN.md](./DESIGN.md)** — colors, type scale, motion timings, component primitives, data schema. Treat it as source of truth; code follows the doc.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 + Vue Router 4 |
| Build | Vite 8 |
| Styles | Tailwind CSS v4 (`@theme` tokens) |
| State | Pinia 3 (theme store) |
| Carousel | Swiper 12 (web component) |
| Forms | Formspark + Botpoison |
| Type | Gilroy · GilroyExtraBold · IBM Plex Mono |
| Icons | Font Awesome 6 |
| Hosting | Firebase Hosting |

---

## Quick start

```sh
npm install
npm run dev      # localhost:5173
npm run build    # → /dist
npm run preview  # serve /dist
```

Node 20.19+ or 22.12+ required (Vite 7+ requirement).

---

## Structure

```
src/
├── App.vue              ─ root, theme bootstrap, route switch
├── main.js              ─ Pinia · router · swiper register
├── assets/
│   ├── main.css         ─ Tailwind v4 + @theme tokens + utilities
│   └── img/             ─ static art
├── components/
│   ├── WebView.vue      ─ Swiper orchestrator + slide host
│   ├── Navbar.vue       ─ fixed nav + theme cycler
│   ├── Home.vue         ─ hero + typed tagline
│   ├── Features.vue     ─ expertise feed (theme-aware SVG)
│   ├── Works.vue        ─ filterable grid + sheet/modal
│   ├── About.vue        ─ bio + meta + resume DL
│   ├── Contact.vue      ─ Botpoison-protected form
│   ├── Dialog.vue       ─ reusable modal | sheet
│   ├── WorkDetails.vue  ─ async UI/UX case study (/content/:id)
│   ├── SkeletonLoader.vue
│   └── PortfolioData.js ─ all work entries (uiux · web · video · vector)
├── store/index.js       ─ useThemeStore (system | light | dark)
└── router/index.js      ─ /  ·  /content/:id
```

---

## Design system

A few highlights — see [DESIGN.md](./DESIGN.md) for the full spec.

- **Tokens** declared once in [`src/assets/main.css`](src/assets/main.css) under `@theme`. No raw hex elsewhere.
- **Z-index scale** via CSS vars (`--z-nav` 100 → `--z-grain` 9999).
- **Motion** snaps to one easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`. All durations collapse under `prefers-reduced-motion`.
- **Focus rings** are bold and consistent (2px primary, 3px offset) on every interactive role.
- **Category badges** for uiux / web / vector / video each ship a light + dark pair.

---

## Theming

```js
import { useThemeStore } from '@/store'

const theme = useThemeStore()
theme.cycleTheme()       // system → light → dark → system
theme.setTheme('dark')   // explicit
```

FOUC guard runs inline in [`index.html`](index.html) before Vue mounts — `localStorage['theme']` decides, otherwise OS preference wins.

---

## Forms

Contact uses **Botpoison** (anti-spam token) → **Formspark** (delivery). Replace the IDs in [`src/components/Contact.vue`](src/components/Contact.vue) if forking.

---

## Deploy

```sh
npm run build
firebase deploy --only hosting
```

Config: [`firebase.json`](firebase.json). Production URL: `https://jrla-portfolio.web.app/`.

---

## Contributing to your own fork

1. Update `PortfolioData.js` — add/remove work entries.
2. Swap fonts and tokens in `main.css` (`@theme` block).
3. Rewrite copy in `Home.vue`, `About.vue`, `Contact.vue`.
4. Replace favicons in `/public/` (use [realfavicongenerator.net](https://realfavicongenerator.net)).
5. Update meta + JSON-LD in `index.html`.

---

## Credits

Designed and built by **John Russel L. Angulo** (JRLA).
Hire / collaborate → [Angulo.johnrussel.l.7814@gmail.com](mailto:Angulo.johnrussel.l.7814@gmail.com)

<div align="center">

—

<sub>Open the live site, then DevTools. There's a console banner waiting.</sub>

</div>
