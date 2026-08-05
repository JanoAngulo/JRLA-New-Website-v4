<div align="center">

# JRLA · Portfolio v4

**Front-end development · UI/UX design · video editing · vector art.**
An editorial issue that scrolls sideways — precise, technical, tactile.

[Live →](https://jrla1219.web.app/) &nbsp;·&nbsp; [Design system](./DESIGN.md) &nbsp;·&nbsp; [Product context](./PRODUCT.md) &nbsp;·&nbsp; [Contact](mailto:Angulo.johnrussel.l.7814@gmail.com)

![Vue](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&labelColor=18181b)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&labelColor=18181b)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&labelColor=18181b)
![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?style=flat-square&labelColor=18181b)
![Pinia](https://img.shields.io/badge/Pinia-3-ffd859?style=flat-square&labelColor=18181b)
![Firebase](https://img.shields.io/badge/Hosted-Firebase-ffca28?style=flat-square&labelColor=18181b)

</div>

---

## Overview

Five panels — **Home · Features · Works · About · Contact** — read left to right the way a thumb moves through paper. Vertical scroll drives a GSAP ScrollTrigger horizontal scrub on desktop; under `768px` the pin is released entirely and the panels stack into a native vertical scroll.

**20 work entries** across four disciplines (7 UI/UX · 5 website · 5 vector · 3 video). UI/UX and website pieces open as case studies in a side sheet; video and vector open in a modal. The category drives the badge colour and which surface opens.

Theme cycles **system → light → dark**, persisted, and applied before first paint. The accent swaps with it, and only ever one is live:

- ☀️ Light — **`#ff3656`** Signal Red
- 🌙 Dark — **`#ffca26`** Filament Yellow

The full visual language — palette, type scale, motion tokens, component contracts, named rules — lives in **[DESIGN.md](./DESIGN.md)**. It is normative: the code follows the doc. Product truth (who this is for, what counts as success) lives in **[PRODUCT.md](./PRODUCT.md)**.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 (Options API) + Vue Router 4 |
| Build | Vite 8 |
| Styles | Tailwind CSS v4 (`@theme` tokens, no config file) |
| State | Pinia 3 (theme store only) |
| Scroll engine | GSAP 3 — ScrollTrigger + ScrollToPlugin |
| Forms | Botpoison (spam token) → Formspark (delivery) |
| Type | Gilroy · GilroyExtraBold · IBM Plex Mono |
| Icons | Font Awesome 6 (self-hosted) |
| Hosting | Firebase Hosting |

No test runner and no linter are configured — the three npm scripts below are the whole toolchain.

---

## Quick start

```sh
npm install
npm run dev      # localhost:5173
npm run build    # → /dist
npm run preview  # serve /dist
```

Node `^20.19.0 || >=22.12.0` (Vite 8 requirement).

Useful while developing:

- **`?boot`** — replays the boot screen, which otherwise plays once per browser session (`sessionStorage`). It is bypassed automatically in dev.
- **Hash deep links** — `/#home` `/#features` `/#works` `/#about` `/#contact`. Any other hash on `/` is redirected to `/404` by a route guard before the panel mounts.

---

## Architecture

**The scroll engine** ([`useHorizontalScroll.js`](src/composables/useHorizontalScroll.js)) is the load-bearing piece.

- A normalized `0→1` GSAP timeline is linked to ScrollTrigger with `scrub: 1`. The track's `x` and each pan container's `scrollTop` are written from the *smoothed* playhead, so the layout is measured in scroll pixels and a content-height change (filtering Works) re-fits through `ScrollTrigger.refresh()` alone — no teardown, no rebuild.
- **Pause-and-pan** — a panel taller than the viewport locks horizontal travel and pans its inner `[data-pan-scroll]` region to the end before releasing. Tall content keeps its natural size instead of being squeezed to fit.
- **Free-form snap** — the scrub only pulls when a natural stop lands within a `0.06` dead-zone of a panel arrival, and never mid-pan.
- **Depth** — off-centre panels lerp toward `1 − 0.05·smoothstep(distance)` on the GSAP ticker, snapping inside an epsilon so a resting pager writes nothing.
- **Mobile inverts the model** rather than shrinking it: the pin is released, `transform` is forced to `none`, panels grow to content height, and numbered section dividers appear between them to keep the chapter metaphor legible in a vertical stack.

**Reveals** come in two flavours. [`sectionReveal.js`](src/composables/sectionReveal.js) is a mixin that toggles `.is-revealed` on a panel root off `activeSlide`, so entrances replay on every entry rather than firing once. [`useScrollScrub.js`](src/composables/useScrollScrub.js) drives scroll-linked, reversible element reveals on desktop and falls back to a cheap one-shot IntersectionObserver tween on mobile, where per-frame scrubbing is too heavy.

**The boot screen** renders over the app, not instead of it — the app mounts and warms up behind the overlay (`inert` while it does), so markup, images and fonts resolve during the intro instead of after it.

---

## Structure

```
src/
├── App.vue              ─ root · theme bootstrap · boot overlay + app shell
├── main.js              ─ Pinia · router · font CSS
├── assets/
│   ├── main.css         ─ Tailwind v4, @theme tokens, @layer components/utilities
│   └── img/             ─ portfolio art, tool logos, portraits
├── components/
│   ├── WebView.vue      ─ panel host · pager arrows · keyboard nav · hash sync
│   ├── Navbar.vue       ─ fixed chapter index + theme cycler
│   ├── Home.vue         ─ hero · typed tagline · social pills
│   ├── Features.vue     ─ discipline feed, theme-aware tool SVGs
│   ├── Works.vue        ─ filterable grid → sheet (uiux/website) | modal (video/vector)
│   ├── About.vue        ─ portrait plate · bio · counted stats · CV download
│   ├── Contact.vue      ─ validated form, Botpoison → Formspark
│   ├── Dialog.vue       ─ one component, two variants: modal | drag-dismissable sheet
│   ├── WorkDetails.vue  ─ async case study, Suspense-gated on image decode
│   ├── NotFound.vue     ─ 404, noindex, standalone editorial layout
│   ├── CustomCursor.vue ─ fine-pointer cursor (opts out under forced-colors)
│   ├── LazyImage.vue    ─ native lazy loading + shimmer until decoded
│   ├── Loader.vue       ─ boot screen, once per session, skipped under reduced motion
│   ├── SkeletonLoader.vue
│   └── PortfolioData.js ─ 20 work entries + feature copy
├── composables/
│   ├── useHorizontalScroll.js ─ the pager: pin, scrub, snap, pause-and-pan, depth
│   ├── useScrollScrub.js      ─ scroll-linked element reveals (desktop) / IO (mobile)
│   └── sectionReveal.js       ─ replay-on-entry panel reveal mixin
├── store/index.js       ─ useThemeStore (system | light | dark)
└── router/index.js      ─ / · /content/:id → / · catch-all → NotFound · hash guard
```

---

## Theming

```js
import { useThemeStore } from '@/store'

const theme = useThemeStore()

theme.initializeTheme()   // once on app mount; also binds the OS-preference listener
theme.cycleMode()         // system → light → dark → system
theme.setMode('dark')     // explicit: 'system' | 'light' | 'dark'

theme.mode                // current selection
theme.darkMode            // resolved boolean
theme.currentTheme        // 'dark' | 'light'
theme.followsSystem       // true when mode === 'system'
```

`localStorage['theme']` holds an explicit choice; `system` removes the key and follows `prefers-color-scheme` live. A FOUC guard in [`index.html`](index.html) applies `.dark` before Vue mounts, so there is no flash on reload. The toggle wraps the swap in a View Transition cross-fade where supported and falls through to the instant swap where not.

---

## Accessibility

A recruiter may arrive keyboard-only, on either OS theme, with reduced motion on. That sets the floor.

- **Reduced motion removes movement, not feedback.** Looping animations stop and transforms snap, but colour, opacity, border and shadow keep a calm `150ms` transition — the transitions that explain a state change survive. The boot screen is skipped outright.
- **Only the visible panel is reachable.** All five stay mounted, but the four off-screen ones carry `inert`, so focus, pointer and assistive tech never enter a panel the visitor cannot see.
- **Skip link** is the first tab stop; the pager sits inside `<main id="main-content">`.
- **Arrow keys page the issue** but yield to editable targets, IME composition, modifier combos and open dialogs — the caret always wins.
- **Dialogs** trap Tab, close on Esc, focus the dialog root with `preventScroll`, and return focus to the trigger on close.
- **Forms** wire `aria-required` / `aria-invalid` / `aria-describedby`, announce errors with `role="alert"`, and move focus to the first invalid field on a failed submit.
- **Contrast floor** is documented and enforced: `0.65` text opacity on page/card, `0.90` on an accent plate (*The Opacity Floor Rule* in DESIGN.md carries the measurements). Hit targets are `≥44px`.
- Decoration is hidden from assistive tech — the typed tagline ships an `sr-only` static equivalent, and the boot screen announces one line instead of reading out its stage set.

---

## Performance & security

- **Images** — `.webp` throughout; the first three of any grid are eager with `fetchpriority="high"`, the rest lazy behind a shimmer. Every image sits in a fixed-ratio box, so nothing reflows on load.
- **Fonts** — both Gilroy faces are preloaded; Font Awesome's stylesheets load via `preload` + `onload` swap with a `<noscript>` fallback, so icons never block render.
- **Motion** — three easing tokens and a six-step duration scale in `@theme`. No layout-property animation, and `will-change` is spent only on the track that is genuinely transformed every frame.
- **Caching** — hashed assets are `immutable, max-age=31536000`; HTML is `must-revalidate`.
- **Headers** ([`firebase.json`](firebase.json)) — HSTS preload, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo denied), `X-Frame-Options`, and a CSP scoped to the Formspark and Botpoison endpoints.
- **SEO** — meta + OpenGraph + Twitter + JSON-LD (`Person` · `WebSite` · `ItemList`) in [`index.html`](index.html), per-route title/description/robots in the router, plus [`sitemap.xml`](public/sitemap.xml) and [`robots.txt`](public/robots.txt).

---

## Known constraints

Recorded rather than hidden.

- **Case-study imagery is unoptimised.** Several `.webp` files run 0.5–3.4 MB, and the same file serves both the grid thumbnail and the full-size view. The real fix is build-time derivatives plus `srcset` — add `sharp` and `vite-imagetools`.
- **Two case-study hero colours** (`#00aeb3`, `#018441`) carry white text below AA. That is a data fix in `PortfolioData.js`, not a CSS one.
- **Accent stat numerals** measure 2.97:1 on the light card, just under the 3:1 large-text threshold. Moving it means moving Signal Red.

---

## Deploy

```sh
npm run build
firebase deploy --only hosting
```

Firebase project `jrla1219` → **https://jrla1219.web.app/**. Hosting config in [`firebase.json`](firebase.json), project alias in `.firebaserc`.

---

## Forking this

The code is here to be read. The content is not — swap all of it:

1. **Work entries** — rewrite [`PortfolioData.js`](src/components/PortfolioData.js) and replace `src/assets/img/`.
2. **Tokens and fonts** — the `@theme` block in [`main.css`](src/assets/main.css) is the only place colour is declared. Gilroy is licensed to JRLA; bring your own face.
3. **Copy** — `Home.vue`, `About.vue`, `Contact.vue`, and the boot screen's HUD strings in `Loader.vue`.
4. **Form IDs** — the Formspark action URL and Botpoison public key in [`Contact.vue`](src/components/Contact.vue).
5. **Identity** — favicons in `/public/` ([realfavicongenerator.net](https://realfavicongenerator.net)), the CV in `/public/downloads/`, and the meta + JSON-LD + `og:image` in [`index.html`](index.html).
6. **Docs** — `PRODUCT.md` and `DESIGN.md` describe *this* portfolio's goals and visual world. Rewrite or delete them; a stale design doc is worse than none.

> **Rights:** no licence is granted. The source is public to read and learn from; the imagery, portrait, CV, copy and the JRLA mark are not reusable. Ask if you want more than that.

---

## Credits

Designed and built by **John Russel L. Angulo** (JRLA) — Bulacan, PH. Available 2026 onwards.

[Email](mailto:Angulo.johnrussel.l.7814@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jrla1219/) · [Behance](https://www.behance.net/JRLA)

<div align="center">

—

<sub>Open the live site, then DevTools. There's a console banner waiting.</sub>

</div>
