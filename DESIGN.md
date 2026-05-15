# DESIGN.md — JRLA Portfolio Design System

> Single source of truth for the visual + interaction language of **jrla-portfolio.web.app**.
> Stack: Vue 3 · Vite · Tailwind CSS v4 · Swiper · Pinia.
> Owner: John Russel L. Angulo (JRLA).

---

## 1. Identity

| | |
|---|---|
| Product | JRLA Portfolio — front-end + UI/UX showcase |
| Voice | Confident, technical, playful. Minimal copy, expressive type. |
| Personality | Editorial × dev-tool. Bold display headings, mono micro-labels. |
| Posture | Horizontal slide architecture; one chapter per slide. |

---

## 2. Information Architecture

Two routes ([src/router/index.js](src/router/index.js)):

| Route | Component | Purpose |
|---|---|---|
| `/` | `WebView` → 5 Swiper slides | Main portfolio narrative |
| `/content/:id` | `WorkDetails` | UI/UX case-study deep dive |

**Slide order** ([src/components/WebView.vue](src/components/WebView.vue)):

| Idx | Slide | Role |
|---|---|---|
| 0 | Home | Hero — name, role, social pills, typed tagline |
| 1 | Features | Expertise feed — front-end, UI/UX, video, vector |
| 2 | Works | Filterable grid — uiux · website · video · vector |
| 3 | About | Bio + meta facts + resume download |
| 4 | Contact | Form (Botpoison + Formspark) + direct channels |

Navigation: keyboard, click arrows, navbar dots, touch on mobile only.

---

## 3. Color

Tokens declared in [src/assets/main.css](src/assets/main.css) under `@theme`.

### Core surfaces

| Token | Hex | Use |
|---|---|---|
| `--color-dark` | `#18181b` | Dark mode page bg |
| `--color-dark-card` | `#212124` | Dark mode card surface |
| `--color-light` | `#e8ebf0` | Light mode page bg |
| `--color-light-card` | `#f5f7fa` | Light mode card surface |

### Primary accent (swaps by mode)

| Token | Hex | Mode |
|---|---|---|
| `--color-light-primary` | `#ff3656` | Light — red-pink |
| `--color-dark-primary` | `#ffca26` | Dark — yellow |

Used for: hover fills, focus rings, swiper pagination, hero accent block, CTA text, link underlines.

### Semantic category badges

Each work category has a light/dark pair (bg + fg). Pulled from `@theme`:

| Category | Light fg/bg | Dark fg/bg |
|---|---|---|
| UI/UX | `#403d99` / `#e6edfe` | `#b7c7f9` / `#353275` |
| Web | `#2d6c6c` / `#e2f6ec` | `#78debe` / `#1a4638` |
| Vector | `#7c2d12` / `#fed7aa` | `#f29d2a` / `#431407` |
| Video | inline `rgb(127,29,29)` / `rgb(254,226,226)` | `rgb(254,202,202)` / `rgb(76,5,25)` |

### Borders / hairlines

Use `currentColor` with 10–14% opacity via `color-mix(in oklab, …)`. Avoid hard greys.

---

## 4. Typography

Three families, each with one job.

| Family | File | Role | Sizes |
|---|---|---|---|
| **GilroyExtraBold** | `/fonts/Gilroy/Gilroy-ExtraBold.woff` | Display headings, hero name, section H1/H2 | `clamp(3.5rem, 12vw, 11rem)` for hero; `clamp(2rem, 5vw, 4rem)` for sections |
| **Gilroy** (Regular) | `/fonts/Gilroy/Gilroy-Regular.woff` | Body, descriptions, nav | `clamp(1rem, 1.05vw, 1.125rem)` |
| **IBM Plex Mono** | `@fontsource/ibm-plex-mono` 400/500 | Eyebrow labels, metadata, badges | `0.625rem–0.875rem`, `tracking 0.25em–0.35em`, **UPPERCASE** |

Rules:
- Use `font-Mono` for any label that prefixes a value (`ROLE`, `YEAR`, `TOOLS`).
- Use `font-Gilroy-extra-bold` only for type meant to be felt across the room.
- Body prose stays Regular — no italic, no oblique, no all-caps.

---

## 5. Spacing & Layout

### Breakpoints (Tailwind v4 defaults)

`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`

### Grid templates

| Pattern | Spec | Where |
|---|---|---|
| Hero split | `45fr / 55fr` desktop · stacked `55fr / 45fr` rows mobile | Home, Contact |
| Feature row | `5fr / 7fr` alternating L/R from `md+`, gap `3rem→4rem` | Features |
| Works grid | `1 / 2 / 3` cols at `base / sm / lg`, gap `1.25–1.75rem` | Works |
| Meta block | `2×2` mobile → `4×1` on `lg` | About, Works detail |

Page padding scale: `p-6 md:p-10 lg:p-14`.

---

## 6. Z-Index Scale

Defined in `@theme`:

```
--z-nav    100
--z-overlay 200
--z-modal  300
--z-toast  400
--z-grain  9999
```

Never use raw `z-index` values. Always reference these tokens.

---

## 7. Components

### Primitives

| Class | What it does | Source |
|---|---|---|
| `.card` | Rounded card surface (`rounded-xl`, theme bg) | main.css:103 |
| `.card-left` / `.card-right` | Half-rounded variants | main.css:107–113 |
| `.input` | Form field — focus ring switches with mode | main.css:115 |
| `.card-elevated` | Soft layered shadow (replaces neumorph for clean depth) | main.css:172 |
| `.bg-radial-hero` | 10/8% accent wash from top-center | main.css:163 |
| `.neumorph` / `.dark:neumorph-dark` | Legacy embossed depth | main.css:146 |
| `.squares` | Hover-invert primary fill block | main.css:94 |

### Vue components

| Component | Role |
|---|---|
| `WebView` | Swiper container, slide orchestration, keyboard nav, console banner |
| `Navbar` | Fixed nav, theme cycler (system → light → dark) |
| `Home` | Hero — animated typed tagline, social pills |
| `Features` | Expertise feed — theme-aware SVG tool logos |
| `Works` | Filterable grid + offcanvas sheet (web/uiux) + modal (video/vector) |
| `About` | Portrait split, bio, meta facts, resume DL |
| `Contact` | Form + status alerts, Botpoison-protected |
| `Dialog` | Reusable `variant="modal" \| "sheet"`, drag-to-dismiss on sheet |
| `WorkDetails` | Async case-study page; preloads images before Suspense resolves |
| `Portfolio` / `Resume` | Legacy Swiper carousels (Autoplay) |
| `SkeletonLoader` | Pulse placeholder during Suspense |

---

## 8. Motion

Easing default: `cubic-bezier(0.2, 0.8, 0.2, 1)`.

| Pattern | Spec |
|---|---|
| Slide-in | 0.9s, ±3% translateX, stagger 0.15s |
| Rise | 0.7s, translateY 2rem → 0, stagger 0.08s |
| Typed text | 80ms char / 2200ms pause / 40ms delete / 1s blink |
| Swiper autoplay | 3500ms, `disableOnInteraction: false` |
| Card lift | translateY -3px, image scale 1.04 on hover |
| Status pulse | scale 1 → 1.4, opacity 0.9 → 0.4, 2s loop |
| Sheet dismiss | drag Y > 0 → close |

`prefers-reduced-motion: reduce` collapses durations to 0.01ms (main.css:133).

---

## 9. Theming

Pinia store [src/store/index.js](src/store/index.js) — `useThemeStore`.

| State | Values |
|---|---|
| mode | `system` · `light` · `dark` |
| persistence | `localStorage['theme']` |
| toggle order | system → light → dark → system |

**FOUC guard** — inline script in [index.html:42–53](index.html) applies `.dark` before paint.

Dark mode swaps:
- Primary accent (red → yellow)
- Surfaces (light → dark)
- Tool-logo SVGs (html/css/js/nextjs/wacom load light variants)
- Swiper pagination colors
- Focus ring color

---

## 10. Accessibility

- Focus rings: `2px` solid primary, `3px` offset, `4px` border-radius — applied to every interactive role.
- Min hit target ≥ 44px (nav arrows = 2.75rem).
- `aria-label` required on icon-only buttons.
- `prefers-reduced-motion` honored globally.
- Semantic landmarks: nav, main slide region, dialog with `role="dialog"` + `aria-modal`.
- Keyboard: arrow keys drive Swiper; Esc closes Dialog.

---

## 11. Portfolio Data

Source: [src/components/PortfolioData.js](src/components/PortfolioData.js)

### Categories

`uiux` · `website` · `video` · `vector` — drives filtering, badge color, and which surface opens (sheet vs modal).

### Work item schema (superset)

```ts
{
  work: 'uiux' | 'website' | 'video' | 'vector',
  thumbnail: string,
  title: string,
  role: string,
  year?: string,
  type?: string,
  projectType?: string,
  status?: string,
  tools: string | { name: string, icon: string }[],
  feature?: string,
  description?: string,
  border?: string,        // accent border for website cards
  link: string,           // external URL or download
  btnText?: string,
  color?: string,         // hero color for uiux detail
  imgSide?, imgContent1?, imgContent2?, imgBackground? // uiux only
}
```

---

## 12. Iconography & Assets

- **Font Awesome 6** (brands · solid · regular · thin) — loaded from `/public/fonts/fontawesome/`.
- **SVG tool logos** — inline, theme-aware via Vue `watch` in Features.vue.
- **Imagery** — `.webp` preferred; first 3 images of any grid eager-loaded, rest `loading="lazy"`.
- **Project assets** — hosted on Echo UI CDN (`echoui.app`).

---

## 13. Conventions

- Tailwind utility-first; custom utilities go in `@layer utilities` in main.css.
- No inline hex outside `@theme` — always reference tokens.
- Component-scoped `<style scoped>` only for one-off visuals (nav arrows, Swiper overrides).
- Z-index must use `var(--z-*)`.
- New animation? Add easing + duration table row here.
- New category? Extend the badge table (§3) and `PortfolioData.js` enum.

---

## 14. Hosting

- **Firebase Hosting** — production at `https://jrla-portfolio.web.app/`.
- Build: `npm run build` → `/dist`.
- SEO: meta + OpenGraph + Twitter + JSON-LD Person schema in [index.html](index.html).

---

_Last updated alongside the v4 redesign. Edit this file when design decisions change — code follows the doc, not the other way around._
