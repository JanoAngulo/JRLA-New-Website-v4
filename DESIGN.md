---
name: JRLA Portfolio
description: An editorial issue that scrolls sideways — precise, technical, tactile.
colors:
  dark: "#18181b"
  dark-card: "#212124"
  dark-deep: "#0b0b0d"
  dark-primary: "#ffca26"
  light: "#e8ebf0"
  light-card: "#f5f7fa"
  light-primary: "#ff3656"
  uiux-fg: "#403d99"
  uiux-bg: "#e6edfe"
  uiux-fg-dark: "#b7c7f9"
  uiux-bg-dark: "#353275"
  web-fg: "#2d6c6c"
  web-bg: "#e2f6ec"
  web-fg-dark: "#78debe"
  web-bg-dark: "#1a4638"
  vector-fg: "#7c2d12"
  vector-bg: "#fed7aa"
  vector-fg-dark: "#f29d2a"
  vector-bg-dark: "#431407"
  video-fg: "#7f1d1d"
  video-bg: "#fee2e2"
  video-fg-dark: "#fecaca"
  video-bg-dark: "#4c0519"
  danger: "#e15050"
  danger-dark: "#ff8a8a"
  danger-text: "#961923"
  danger-text-dark: "#fcc8c8"
  success: "#22c55e"
  success-dark: "#4ade80"
  success-text: "#146e3c"
  success-text-dark: "#bef0d2"
typography:
  display:
    fontFamily: "GilroyExtraBold, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 8.5vw, 7rem)"
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline-lg:
    fontFamily: "GilroyExtraBold, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)"
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "GilroyExtraBold, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 3.25rem)"
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  title:
    fontFamily: "GilroyExtraBold, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2.25rem)"
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Gilroy, system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 1.05vw, 1.125rem)"
    lineHeight: 1.625
    letterSpacing: "-0.005em"
  body-md:
    fontFamily: "Gilroy, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
    letterSpacing: "-0.005em"
  body-sm:
    fontFamily: "Gilroy, system-ui, sans-serif"
    fontSize: "0.85rem"
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  body-xs:
    fontFamily: "Gilroy, system-ui, sans-serif"
    fontSize: "0.8125rem"
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  title-sm:
    fontFamily: "GilroyExtraBold, system-ui, sans-serif"
    fontSize: "1.2rem"
    lineHeight: 1
    letterSpacing: "-0.02em"
  label:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.3em"
  label-2xs:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.5rem"
    fontWeight: 400
    letterSpacing: "0.22em"
  label-xs:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.55rem"
    fontWeight: 400
    letterSpacing: "0.24em"
  label-sm:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.65rem"
    fontWeight: 400
    letterSpacing: "0.22em"
  label-md:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.25em"
  label-lg:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.35em"
rounded:
  none: "0"
  sm: "4px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "0.35rem"
  sm: "0.6rem"
  md: "1.25rem"
  lg: "1.75rem"
  page-sm: "1.5rem"
  page-md: "2.5rem"
  page-lg: "3.5rem"
  navbar: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.light-primary}"
    textColor: "{colors.dark}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
  button-primary-hover:
    backgroundColor: "color-mix(in oklab, #ff3656 82%, #000)"
    textColor: "{colors.light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "currentColor"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "color-mix(in oklab, #ff3656 12%, transparent)"
    textColor: "{colors.light-primary}"
  button-disabled:
    backgroundColor: "{colors.light-primary}"
    textColor: "{colors.dark}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
  nav-arrow:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    width: "2.75rem"
  nav-arrow-hover:
    backgroundColor: "{colors.light-primary}"
    textColor: "{colors.dark}"
  dialog-close:
    backgroundColor: "{colors.light-primary}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    width: "2.75rem"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "currentColor"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.6rem 0.9rem"
  filter-pill-active:
    backgroundColor: "{colors.light-primary}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
  work-card:
    backgroundColor: "{colors.light-card}"
    textColor: "{colors.dark}"
    rounded: "{rounded.none}"
    padding: "0"
  input:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.none}"
    padding: "0.75rem 0.65rem"
  input-focus:
    backgroundColor: "transparent"
    textColor: "currentColor"
  input-error:
    backgroundColor: "transparent"
    textColor: "{colors.danger-text}"
  social-pill:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.full}"
    height: "2.75rem"
    width: "2.75rem"
  tool-pill:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.lg}"
    padding: "0.75rem"
  badge-uiux:
    backgroundColor: "{colors.uiux-bg}"
    textColor: "{colors.uiux-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.5rem"
---

# Design System: JRLA Portfolio

## Overview

**Creative North Star: "The Printed Issue"**

This is a magazine issue that happens to scroll sideways. Every panel is a spread, every spread is numbered, and the reader moves through it left to right the way a thumb moves through paper. The system already speaks this language natively: chapters are labelled `04 — BIOGRAPHY`, the masthead reads `ISSUE / 2026`, the portrait carries a plate caption (`— PHOTOGRAPHED IN BULACAN` · `FIG. 01`), and hairline rules separate matter the way column rules do in print. None of that is decoration; it is the organizing metaphor made literal.

The register is **precise, technical, and tactile**. Precision shows in the labels — IBM Plex Mono at 10px with 0.3em tracking, uppercase, always prefixing a value, never floating on its own. Technical shows in what the surface refuses: no gradients as decoration, no glass, no soft toy-like rounding, no illustration standing in for evidence. Tactile shows in the response — everything pressable depresses to `scale(0.95)` in `--dur-press` (80ms), cards lift 3px and sharpen their border to the accent, pager arrows lean the direction they will send you. Every one of those responses is gated behind `hover-fine` or `:active`, so a phone never inherits a pointer affordance it cannot honour. The interface behaves like machined controls, and the display type is the one place it raises its voice.

Two accents carry the whole system, and only one is ever live: **Signal Red** in light mode, **Filament Yellow** in dark. They are indicators, not paint. The rest of the palette is two greys and two card surfaces, so the moment the accent appears — a focus ring, an active chapter underline, a hovered card border, a counted stat — it means something. The category badges are the single exception, and they earn it by encoding real information: which of four disciplines a piece belongs to.

**Key Characteristics:**
- Sharp-cornered editorial surfaces; radius is reserved for pills and inputs, never for content plates
- Mono labels as instrumentation — uppercase, wide-tracked, always attached to a value
- One live accent per theme, spent on state rather than surface
- Flat at rest; depth arrives only as a response to hover, focus, or true layering
- Numbered chapters and plate captions as a persistent structural device
- Immediate physical feedback on every interactive element, gated to real pointers
- Three easing tokens and a six-step duration scale; nothing hand-typed

## Colors

Two neutrals, two card surfaces, and one accent that swaps identity with the theme — plus a four-colour category system that is informational rather than expressive.

### Primary

- **Signal Red** (`#ff3656`): The light-mode accent. It works at exactly two scales — as a full editorial plate, and as state on a control. As a plate it fills the left half of Home, About, and Contact, and the illustration blocks in Features. As state it appears on focus rings (2px, 3px offset), the active chapter underline, hovered card borders, the active filter pill, counted stat numerals, emphasized clauses inside body copy, and text selection. It is the light theme's only chromatic voice.
- **Filament Yellow** (`#ffca26`): The dark-mode accent, occupying every role Signal Red holds in light. The swap is total — no theme ever shows both. In dark it also carries the JRLA mark fill and the dialog close control.

### Neutral

- **Ink Black** (`#18181b`): Dark-mode page ground, and the text colour on every accent-filled control in light mode.
- **Plate Charcoal** (`#212124`): Dark-mode card surface. Distinguished from the page by tone alone — never by a border on its own.
- **Deep Ink** (`#0b0b0d`): One step *below* the page ground, and the only token that goes there. It exists for the boot screen's vignette, where the edge has to fall away from the centre rather than lift toward it. Not a surface colour: no card, panel, or control may use it, because a surface darker than the page would invert the system's own figure/ground.
- **Newsprint Grey** (`#e8ebf0`): Light-mode page ground. Cool, slightly blue, deliberately not white.
- **Bright Stock** (`#f5f7fa`): Light-mode card surface, one step brighter than the page.

Borders and dividers are never a grey token. They are `currentColor` at 6–14% via `color-mix(in oklab, …)` or Tailwind's `border-current/12`, so a hairline is always relative to the text sitting next to it and both themes get correct weight for free.

### Tertiary

Category badges. Each of the four disciplines gets a light and dark pair, contrast-checked against its own background:

- **UI/UX** — indigo (`#403d99` on `#e6edfe`, dark: `#b7c7f9` on `#353275`)
- **Website** — teal (`#2d6c6c` on `#e2f6ec`, dark: `#78debe` on `#1a4638`)
- **Vector** — burnt orange (`#7c2d12` on `#fed7aa`, dark: `#f29d2a` on `#431407`)
- **Video** — oxblood (`rgb(127,29,29)` on `rgb(254,226,226)`, dark: `rgb(254,202,202)` on `rgb(76,5,25)`)

**Case-study hero colours** are the one place a colour enters from data rather than from the palette. Each UI/UX entry in [PortfolioData.js](src/components/PortfolioData.js) carries a `color` class — `bg-[#660000]`, `bg-[#1E0025]`, `bg-[#018441]`, `bg-[#111124]`, `bg-[#00aeb3]`, `bg-[#0c0c0b]` — which fills the left plate of that project's case study under `text-light`, with `border-white/15` hairlines and an optional `mix-blend-soft-light` background image at 50%. That is the *client's* colour, quoted; it never leaves a `WorkDetails` hero and never becomes a system token.

### Named Rules

**The One Live Accent Rule.** A theme has exactly one accent. Signal Red never appears in dark mode; Filament Yellow never appears in light. Any new colour that is not a category badge is a bug.

**The Two Scales Rule.** The accent is either a whole plate or a single control state — never anything between. A full-bleed accent half-spread is correct; a focus ring is correct; an accent-tinted card, banner, callout, or mid-sized decorative block is not. If a proposed accent area is bigger than a button and smaller than a panel, the answer is a hairline or a tone shift instead.

**The Ink-on-Accent Rule.** An accent plate carries `--color-dark` text in *both* themes, and any focus ring inside it inverts to ink — an accent ring on an accent surface is invisible. Mark such plates with `data-accent-surface` and the global rule in [main.css](src/assets/main.css) handles the inversion.

**The Relative Hairline Rule.** Dividers, card borders, and rules use `currentColor` at 6–14% opacity. Never a literal grey, never `border-gray-200`. A hairline belongs to its text, not to the palette.

**The Opacity Floor Rule.** Text opacity is not a free dial — it is a contrast budget, and the light theme spends it fastest. Ink on the light ground measures 3.77:1 at `0.55` and 4.40:1 at `0.60`; both fail AA. A Signal Red plate is tighter still, because the plate is only 5.00:1 from ink to begin with: `0.70` gives 3.26:1 and even `0.85` reaches only 4.30:1.

| Ground | Floor | Measured |
|---|---|---|
| Page or card (`--color-light` / `--color-light-card`) | **0.65** | 5.11:1 |
| Accent plate (`data-accent-surface`) | **0.90** | 4.56:1 — `0.85` is not enough |

Dark mode is more forgiving (`0.60` already gives 6.07:1) and Filament Yellow has headroom to spare, so light sets the floor for both. Exempt: `aria-hidden` decoration, borders and rules (6–14% is correct there), and large display type at ≥3:1 — the outlined hero name stays at `0.85`.

Below the floor, hierarchy is carried by **type** — mono, uppercase, wide tracking, a smaller step — never by fading. The `WorkDetails` meta keys are the worked example: they sit on a per-project client colour where no opacity value passes, so they run at full strength and let case and tracking do the work.

## Typography

**Display Font:** GilroyExtraBold (`/fonts/Gilroy/Gilroy-ExtraBold.woff`, `font-display: swap`)
**Body Font:** Gilroy Regular (`/fonts/Gilroy/Gilroy-Regular.woff`), fallback `system-ui, sans-serif`
**Label/Mono Font:** IBM Plex Mono 400/500 (`@fontsource/ibm-plex-mono`), fallback `ui-monospace, SFMono-Regular, monospace`

**Character:** Three families, three non-overlapping jobs — a heavy geometric sans that only ever shouts, the same family at regular weight that only ever explains, and a monospace that only ever labels. The pairing reads as an editorial page laid out by an engineer: expressive at the headline, plain in the column, instrumented in the margins.

### Hierarchy

- **Display** (ExtraBold, `clamp(2.75rem, 8.5vw, 7rem)` at `md+`, `clamp(3.25rem, 18vw, 5.5rem)` below it, line-height 0.9, tracking −0.035em): The hero name only. Sized to be read across a room; tracking pulled tight so the mass reads as one object. Mobile takes a *higher* vw factor and a *lower* ceiling — a narrow column needs the aggression, a wide one would overflow with it.
- **Headline LG** (ExtraBold, `clamp(2.5rem, 5.5vw, 4.5rem)`, line-height 0.9, tracking −0.03em, uppercase): Discipline titles in Features, the 404 headline, and the Contact pull-quote (`clamp(2.25rem, 4.8vw, 4.25rem)`). One step below the hero name and the loudest thing on any panel that isn't Home.
- **Headline** (ExtraBold, `clamp(1.75rem, 3.6vw, 3.25rem)`, line-height 0.92, tracking −0.025em, uppercase): Section headings. Delivered as stacked `.heading-line` masks so each line can reveal independently.
- **Title** (ExtraBold, `clamp(1.6rem, 2.4vw, 2.25rem)`, line-height 1, tracking −0.02em): Stat numerals and card titles — type that must be *felt* as a quantity.
- **Body** (Regular, `clamp(0.95rem, 1.05vw, 1.125rem)`, line-height 1.625, tracking −0.005em): Prose, descriptions, meta values. Capped near `max-w-2xl` (~65ch) and set `text-pretty`.
- **Label** (Mono 400/500, `0.55–0.875rem`, tracking `0.18em–0.35em`, UPPERCASE): Eyebrows, chapter numbers, metadata keys, badges, button text, counters. Numerals use `tabular-nums` wherever they change in place.

### Named Rules

**The Attached Label Rule.** Mono exists to name a value: `ROLE`, `YEAR`, `TOOLS`, `BASED IN`, `AVAILABLE`, `04 — BIOGRAPHY`. A mono string with nothing beneath or beside it is mono used as decoration — rewrite it as body copy or delete it.

**The Loud-Once Rule.** GilroyExtraBold is for type meant to be felt across the room. One display-scale element per panel, maximum. Everything else steps down to headline or below.

**The Plain Column Rule.** Body prose stays Gilroy Regular — no italic, no oblique, no all-caps runs. Emphasis inside a paragraph is carried by the accent colour and ExtraBold weight on a short clause (`<em class="not-italic">`), never by a slant.

## Layout

**Panel architecture.** The page is a single flex row (`.h-scroll-track`) of viewport-wide panels (`.h-panel`, `flex: 0 0 100vw`) inside a pinned, clipped box (`.h-scroll-wrap`, `100dvh`). GSAP ScrollTrigger translates the track on vertical scroll. Content sits below a fixed `3.5rem` navbar, so the working canvas is `calc(100dvh - 3.5rem)` (`.app-slide`, with a `100vh` fallback under `@supports not`).

**Mobile inverts the model.** Under `768px` the pin is released entirely: the track becomes a column, `transform` is forced to `none`, panels grow to content height (`min-height: calc(100dvh - 3.5rem)`), inner `[data-pan-scroll]` regions unclamp, and numbered `.section-divider` rules appear between panels to keep the chapter metaphor legible in a vertical stack.

**Breakpoints** (Tailwind v4 defaults): `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`. The meaningful line is `md` — above it the issue is horizontal, below it vertical.

**Grid templates.**

| Pattern | Spec | Where |
|---|---|---|
| Editorial split | `45fr / 55fr` desktop; stacked `55fr / 45fr` rows on mobile | Home, About, Contact |
| Feature row | `5fr / 7fr` alternating L/R from `md+`, gap `3rem → 4rem` | Features |
| Works grid | `1 / 2 / 3` columns at `base / sm / lg`, gap `1.25rem → 1.75rem` | Works |
| Meta block | `2×2` mobile → `repeat(3, max-content)` at `lg` | About, work detail |

**Rhythm.** Page padding steps `1.5rem → 2.5rem → 3.5rem` (`p-6 md:p-10 lg:p-14`). Vertical stacks inside a panel use `gap-6` at the block level and `0.35rem` between a mono label and its value — that tight pairing is what makes a key/value read as one unit.

**Standalone routes opt out.** `NotFound` is the one surface that is not a panel: `min-h-dvh` with `place-items-center`, fluid page padding (`clamp(1.25rem, 4vw, 3rem)`), a `64rem` measure cap, and its own one-off breakpoint at `min-[900px]` where the `404` numeral and the headline split into `0.95fr / 1.05fr` columns. It keeps the type, colour and button contracts and drops the pager entirely — a lost visitor should not have to learn the scroll model to get out.

**Density.** Tall panels (Features, Works) do not shrink to fit. They lock the horizontal scrub and pan an inner `[data-pan-scroll]` region to its end before releasing, so content keeps its natural size instead of being compressed into the viewport.

### Named Rules

**The One Spread Per Panel Rule.** A panel is one chapter. If it needs a second heading of equal weight, it is two panels or an inner pan region — not a denser spread.

## Elevation & Depth

**Flat at rest.** Surfaces are distinguished by tone (`--color-light-card` / `--color-dark-card` against the page), by relative hairlines, and by the dot-grid backdrop at 5% opacity under a vertical mask. Shadow is not a surface property here — it is a state response. A card sits flush until it is hovered or focused, and then it lifts 3px, tightens its border to the accent, and gains a deeper ambient shadow.

`.neumorph` and its dark/hover variants have been **deleted** from the codebase. The six-layer emboss belonged to an earlier visual world and contradicted this one; nothing referenced it. Do not reintroduce it.

### Shadow Vocabulary

Two utilities in [main.css](src/assets/main.css) carry the whole system:

- **`.surface-rest`** (`0 1px 2px rgba(0,0,0,0.04), 0 8px 20px -8px rgba(0,0,0,0.08)`; dark: `0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -10px rgba(0,0,0,0.5)`): Barely-there contact shadow. Reads as a sheet lying on the page, not floating above it. This is the resting state of every card.
- **`.surface-lifted`** (`0 2px 4px rgba(0,0,0,0.06), 0 16px 32px -10px rgba(0,0,0,0.14)`; dark adds a faint accent edge at 8%): Hover, focus-visible, and modal surfaces, paired with `translateY(-3px)` where the element moves.
- **Focus ring as elevation** (`0 0 0 2px var(--color-light-primary)` plus the lifted ambient): Keyboard focus on a card gets the accent ring *and* the lift, so keyboard and pointer states are equally loud.
- **`.nav-arrow`** (`0 4px 16px -4px rgba(0,0,0,0.15)`; dark: `…0.5`): The one element that *is* floating — it sits over content on a translucent, `blur(10px)` ground, so it carries a resting shadow the flat rule otherwise forbids. Overlay controls are the exception; surfaces are not.
- **Dialog scrim** (`bg-black/30`; dark: `bg-black/60`): True layering, so no shadow is needed on the plate beyond `.surface-lifted`.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow appears only in response to state (hover, focus, true layering). A resting element carrying a shadow heavier than the contact shadow above is over-elevated.

**The No Emboss Rule.** No neumorphism, no inset highlight/shadow pairs, no soft-plastic depth. Depth is tone, hairline, and a single ambient shadow — nothing sculpted.

## Shapes

**Sharp is the default.** Content plates — work cards, panels, image frames, dialog bodies, the hero accent block — have square corners. This is the strongest single signal of the print metaphor: paper is cut, not rounded. Radius is spent deliberately and only in three places:

- **Fully round** (`9999px`) — pills. Filter pills, social pills (`2.75rem` circles), pager arrows (`2.75rem`), the dialog close control, the drag handle on the mobile sheet, status dots. Anything that reads as a control rather than content.
- **`8px`** (`rounded-lg`) — the square tool-logo chips, and nothing else. Just enough to say "this accepts interaction" without softening the page.
- **`4px`** (`rounded-sm`) — focus rings and the two alert dismiss controls, so the outline hugs mixed-shape targets consistently.

**Inputs are square.** They carry `rounded-none` and no box at all — the only thing drawing a field is the rule under it. An earlier revision gave them a `6px` radius; that is gone, and a rounded input now reads as foreign here.

The old `.card` / `.card-left` / `.card-right` helpers (`rounded-xl`) have been **deleted** — nothing used them, and rounded content plates contradict the rule above. All 40 remaining `rounded-2xl` uses, both `rounded-3xl` corners, and the single `bg-gray-300` in the codebase live inside `SkeletonLoader` — a pre-existing placeholder component that predates this world and is visible for under a second behind `<Suspense>`. It is a known holdout, not a licence: nothing new inherits its radius or its literal grey.

Borders are hairline-thin (`1px`) at 6–14% `currentColor`. Image frames use fixed ratios — `4/3` for work thumbnails — and clip with `overflow-hidden` rather than rounding.

**Corner brackets** are a recurring device, not a one-off: four L-shaped marks (two borders each, `currentColor` or the accent) inset from a frame's corners, marking it as a plate to be looked *at*. They appear on the About portrait at `2px` / `1.25–2.5rem` inset, and on the boot screen at `3px` / `32px` inset — the weight tracks the size of the frame it wraps. They are always symmetric and always four; a bracket on one side only is not this device.

### Named Rules

**The Cut-Paper Rule.** Content is square; controls are round. If a new surface holds information, it gets no radius. If it invites a press, it gets `9999px`.

**The Four Corners Rule.** Corner brackets ship as a complete set of four or not at all. A thick colored border on a single side of a surface is a different thing entirely, and this system does not use it.

## Components

### Buttons

Character: **tactile and exact.** Mono uppercase text, wide tracking, square corners, immediate depress.

- **Shape:** No radius (`0`). Padding `0.85rem 1.5rem` (`px-6 py-[0.85rem]`), `0.6rem` gap between icon and label.
- **Type:** Mono `0.7rem`, tracking `0.25em`, uppercase — carried by the `.btn` base class.
- **Primary** (`.btn btn-primary`): Accent fill, `--color-dark` text, accent border. Hover **deepens the same accent** via `color-mix(in oklab, accent 82%, #000)` (85% in dark) — it never flips to black, so the control stays on-brand under the pointer.
- **Ghost** (`.btn btn-ghost`): Transparent, `currentColor` text and border. Hover is a faint accent tint (`12%` light / `14%` dark) with accent border and accent text, so it reads as clearly secondary and never competes with a solid primary beside it.
- **Press:** `scale(0.95)` in `--dur-press` (80ms) on `:active`, gated behind `prefers-reduced-motion: no-preference`.
- **Focus:** Global `2px` accent outline, `3px` offset, `4px` radius.
- **Disabled:** `opacity: 0.55` + `cursor: not-allowed`, and the hover rules are explicitly *re-declared back to the resting fill* — a control that can't be pressed must not answer the pointer. Scoped to `.btn:disabled` (real buttons only), because an anchor never matches `:disabled` and a link styled as disabled would be a lie.
- **Icon nudge:** Trailing icons translate 2–3px toward their direction on `hover-fine:group-hover` over `--dur-slow`. The icon moves, the button doesn't.

### Chips

- **Filter pill:** Transparent with a `border-current/35` hairline, mono `0.7rem` at `0.22em` tracking, uppercase, fully round, with a `tabular-nums` count at 70% opacity trailing the label. Hover raises the border to `border-current/65`.
- **Selected:** Accent fill with `--color-dark` text and accent border. State announced via `aria-pressed`; count opacity lifts to 80%.
- **Category badge:** Square, mono, uppercase, using the discipline's fg/bg pair from §Colors. Informational — never restyled for emphasis.

### Cards / Containers

- **Corner style:** Square (`0`).
- **Background:** `--color-light-card` / `--color-dark-card`.
- **Border:** `1px` at `rgba(0,0,0,0.06)` (light) / `rgba(255,255,255,0.06)` (dark), rising to the accent on hover and focus-visible.
- **Shadow strategy:** Contact shadow at rest → lifted shadow on hover/focus (see §Elevation & Depth).
- **Internal padding:** `1.1rem` horizontal, `1rem` top, `1.25rem` bottom on the meta block; the image area is flush to the card edge.
- **Image area:** Fixed `4/3` ratio, `overflow-hidden`, `bg-current/5` placeholder, scaling to `1.04` on hover under a `bg-dark/[0.78]` scrim that fades in a mono `VIEW PROJECT` plate.
- **Meta block:** Separated from the image by a `border-current/10` hairline; leads with a zero-padded index (`01`, `02`) in mono at `0.3em` tracking.

### Inputs / Fields

Character: **a ruled line on paper, not a box.** Fields are open, square, and transparent — the only thing that draws them is the rule underneath.

- **Style:** No radius, no box. Transparent background, `border-bottom` at `currentColor/25`, `0.75rem 0.65rem` padding, placeholder at `currentColor/35`. Textareas are `resize-none` with `1.55` leading.
- **Label:** Mono `0.7rem` at `0.3em` tracking, `0.4rem` above the field. On focus it lifts `2px`, goes full opacity, and takes the accent colour — the label answers the focus, not just the field.
- **Focus:** The resting rule fades to transparent while an accent underline scales in from the centre (`scale-x-0 → 100`, `300ms`, `cubic-bezier(0.22,1,0.36,1)`). No ring, no glow, no border box.
- **Error:** The rule turns `--color-danger` (`--color-danger-dark` in dark), and a mono message in `--color-danger-text` appears beneath. `aria-invalid` and `aria-describedby` are set; the field never changes shape.
- **Counter:** The character count is wired to the field via `aria-describedby`, colours to the accent past 800, and pulses past 940.

### Status Alerts

- **Style:** Square, `1px` left rule in the semantic colour, background tinted `12%` (light) / `14%` (dark) from the same hue, mono uppercase text in the paired `-text` token. Never a thick colour bar.
- **Roles:** `role="status"` for success, `role="alert"` for failure. Both carry a 44px dismiss control.
- **Copy:** Errors name the problem and the recovery ("Something broke on the way. Try again or email me directly.").

### Navigation

- **Shell:** Fixed, `3.5rem` tall, page background at 95% with `backdrop-blur-md`, bottom border `black/10` / `white/10`, `z-index: var(--z-nav)`.
- **Items:** Mono uppercase, each prefixed by a zero-padded chapter number in `tabular-nums`. The number nudges `-1px` on hover; the label hides below `sm` so the numbers alone carry navigation on small screens.
- **Active:** A `2px` accent underline scaling in from the left (`origin-left`, `scale-x-0 → scale-x-100`, `300ms`). Inactive items pre-render it at `scale-x-0` and reveal on hover at 60% opacity.
- **Theme toggle:** `2rem` circle at `sm+`, `2.75rem` below it, hairline border at `black/40` / `white/40` that becomes accent on hover. The icon *rotates a full 360°* per press over `--dur-slow` with `--ease-out` — a click counter drives `rotate(n × 360deg)`, so every cycle turns the same way rather than snapping back. `scale(1.05)` hover / `scale(0.90)` press. Cycles system → light → dark, and the whole theme swap rides a View Transition cross-fade (see §Theming).
- **Pager arrows** (`.nav-arrow`): `2.75rem` circles, `white/70` / `dark-card/70` at `blur(10px)`, hairline border, their own shadow pair (`0 4px 16px -4px` at 15% / 50%). Hover fills with the accent; each arrow also *leans* 3px the way it will send you (`.nav-arrow-prev` → `-3px`, `-next` → `+3px`, `-up` / `-down` vertically), pointer-gated. At either end of the pager the relevant arrow takes `.is-hidden` and fades out rather than disappearing between frames.
- **Mobile:** Minimum `2.75rem` hit targets; `active:scale-95` on the brand mark. Arrows relocate to a bottom-right vertical stack and swap to up/down glyphs, because the model under `md` is vertical.

### Dialog (signature component)

One component, two personalities, chosen by `variant`:

- **`variant="modal"`** — centred plate, `p-7`, `max-w-4xl`, card background, square corners. Used for video and vector pieces. Accent-filled close control (`2.5rem` circle) pinned top-right.
- **`variant="sheet"`** — edge-anchored panel with a rounded drag handle (`50vw × 0.5rem`, `rounded-full`, `currentColor` at 50%). Drag past threshold dismisses. Used for UI/UX and website case studies.
- Both: `role="dialog"`, `aria-modal`, Esc to close, programmatic focus on a `tabindex="-1"` root whose focus ring sits flush (`outline-offset: 0`).

### Case-study surface (signature component)

`WorkDetails` — the UI/UX long-form view, loaded async inside the sheet and gated by `<Suspense>` until every hero image has decoded, so the case study arrives complete rather than assembling itself.

- **Hero plate:** full-bleed client colour from data (see §Colors), `text-light`, `sm:p-10` / `p-4`, with an optional background image at `opacity-50` + `mix-blend-soft-light` — the only blend mode in the system, and it exists to sink a photograph into a flat colour rather than to decorate it.
- **Meta ledger:** six mono key/value rows separated by `border-white/15` hairlines, keys at `0.625rem` / `0.3em` tracking / 70% opacity, values plain, `tabular-nums` on the year. The last row drops its rule.
- **Back control:** a mono uppercase text button preceded by a `1.5rem` hairline that *grows to `2.25rem`* on hover while the gap opens from `0.6rem` to `0.85rem`. The rule extending is the affordance; there is no box.
- **Body:** full-width screens stacked at their natural ratio, `space-y-1 md:space-y-4 lg:space-y-8`.
- **Skeleton:** while `<Suspense>` waits, `SkeletonLoader` holds the geometry (see §Shapes for its status as a holdout), cross-fading to the real content on `mode="out-in"` — opacity only, since the two layouts share no structure.

### Image loader

`LazyImage` — every content image in the app goes through it.

- **Placeholder:** a `currentColor` 6%→12%→6% horizontal sweep, `1.4s` shimmer, sitting under the image until `load` (or `error`) fires. It is a tone shimmer, not a grey box.
- **Reveal:** `opacity 0 → 1` over `0.45s` — deliberately slower than any interaction transition, because it masks a network event rather than answering a press.
- **Eagerness:** the first three images of any grid take `loading="eager"` + `fetchpriority="high"`; everything after is lazy.
- **Hover:** the wrapper clips, the image scales to `1.04`. Both `transform` and the standalone `scale`/`translate` properties are named in the transition, because Tailwind v4 emits `scale-*` as the standalone property and naming only `transform` would make the hover snap.

### Browser surfaces

The parts nobody draws still ship with the design. All themed in [main.css](src/assets/main.css):

- **Scrollbar:** `10px`, transparent track, thumb at `currentColor/22` inset by a 3px transparent border (so it reads as a floating bar, not a gutter), accent at 65% on hover. `scrollbar-color` covers Firefox.
- **Caret:** the accent, per theme.
- **Selection:** ink background with accent text.
- **Tap highlight:** removed — the `:active` scale already carries the press.

### Hairline (signature component)

`.hairline` — a `1px × 4rem` rule of `currentColor` at 30% opacity, used as a beat between a heading and its body copy. It is the print column-rule reduced to its smallest useful form, and it recurs often enough to count as a component rather than a utility.

## Do's and Don'ts

### Do:

- **Do** keep content surfaces square and controls fully round — the Cut-Paper Rule is the system's most legible signature.
- **Do** attach every mono label to a value directly beneath or beside it (`BASED IN` → `Bulacan · PH`).
- **Do** express borders as `currentColor` at 6–14% (`border-current/12`, `color-mix(in oklab, …)`) so both themes get correct weight without a second token.
- **Do** hover accent-filled controls by deepening the same accent (`color-mix(in oklab, var(--color-light-primary) 82%, #000)`), never by flipping to black or another hue.
- **Do** give keyboard focus the same visual weight as hover — the accent ring *and* the lift, not the ring alone.
- **Do** reference the z-index scale (`var(--z-nav)` … `var(--z-grain)`) for anything stacked.
- **Do** declare colour once, in `@theme` in [src/assets/main.css](src/assets/main.css), and reference the token everywhere else.
- **Do** step page padding `1.5rem → 2.5rem → 3.5rem`, and keep a mono label `0.35rem` from its value.
- **Do** answer `prefers-reduced-motion: reduce` by removing *movement*, not feedback: looping animations stop, transform/translate/scale/rotate snap, and colour, opacity, border and shadow keep a calm `150ms` transition on `--ease-out`. Those are the transitions that explain a state change rather than perform one.
- **Do** reach for `--ease-out` / `--ease-in-out` / `--ease-drawer` and the `--dur-press → --dur-reveal` scale. Both live in `@theme`; a hand-typed cubic-bezier or a raw `300ms` is drift.
- **Do** gate every hover affordance behind `hover-fine:` (or a `@media (hover: hover) and (pointer: fine)` block). On touch, a tap fires a phantom `:hover` that sticks to whatever was last touched until the next tap elsewhere.
- **Do** enumerate `transition-property` explicitly, and include `translate` and `scale` alongside `transform` — Tailwind v4 emits those as standalone CSS properties, so a `transform`-only list silently drops the effect. Never `transition-all`; `all` sweeps in layout properties the moment someone adds one.
- **Do** let tall panels pan their inner `[data-pan-scroll]` region instead of compressing content to fit the viewport.
- **Do** mark accent-filled plates with `data-accent-surface` so focus rings inside them invert to ink.
- **Do** use `.btn btn-primary` / `.btn btn-ghost` for every CTA — the base class carries the mono/tracking/press contract. Override padding inline; never re-declare the fill.
- **Do** reach for the semantic `danger` / `success` token pairs for form state. They are the only chromatic tokens outside the accent and the category badges.
- **Do** keep mono label weight at 400/500 — those are the only weights loaded, so `font-semibold` renders synthetic.

### Don't:

- **Don't** reintroduce `.neumorph`. It has been deleted; the emboss contradicts the flat doctrine.
- **Don't** put both accents in one theme. Light is Signal Red; dark is Filament Yellow; never both.
- **Don't** use the accent as a large surface fill between the two sanctioned scales. It marks state or it is a whole plate — the only mid-scale exceptions in the codebase are the 404's off-canvas radial wash (`14%` light / `16%` dark, blurred `20px`, pushed past the corner) and the boot screen's `25%` logo glow. Both are atmosphere behind content, not a tinted container.
- **Don't** round content plates. No `rounded-2xl` cards, no soft image frames. In this codebase `rounded-2xl` means "skeleton placeholder", nothing else.
- **Don't** write raw hex outside the `@theme` block, and don't write raw `z-index` numbers anywhere.
- **Don't** italicize or all-caps body prose. Emphasis is accent colour plus ExtraBold on a short clause.
- **Don't** ship more than one display-scale heading per panel.
- **Don't** use a literal grey (`border-gray-200`, `#e5e7eb`) for a divider.
- **Don't** restyle a category badge for emphasis — its colour encodes which discipline a piece belongs to.
- **Don't** add a fourth easing token. Three exist and they are enough: `--ease-out` for everything that arrives or responds, `--ease-in-out` for the few symmetric moves, `--ease-drawer` for sheet travel. There is deliberately **no `--ease-in`** — entering and exiting UI always starts fast, or it stalls on exactly the frame the visitor is watching. Built-in `ease` / `ease-in-out` are too weak for deliberate motion; don't fall back to them.
- **Don't** spend an overshoot on anything that carries content. The one sanctioned bounce is `cubic-bezier(0.34, 1.56, 0.64, 1)` on the submit checkmark — a once-per-visitor confirmation — plus GSAP `back.out(1.1)` when a half-dragged sheet loses its tug-of-war. Both are single elements answering a gesture, and both start at `scale(0.9)` rather than 0, because nothing in the real world appears from nothing.
- **Don't** put a permanent `will-change` on page furniture. It buys one transition and pays for it with a compositor layer per node for the whole session. GSAP's `force3D` already covers elements while they actually move; the only standing hint in the codebase is on `.h-scroll-track`, which is genuinely transformed every scroll frame.
- **Don't** run a lerp that writes every frame forever. A lerp approaches its target asymptotically and never arrives, so snap inside an epsilon and skip the write when the element has settled — otherwise a resting UI still costs a full frame of DOM writes.
- **Don't** animate `width`, `height`, `margin`, or `top`/`left` for a visual state change. Use `scale`, `translate`, or `opacity` so the change composites instead of forcing layout. The custom cursor learned this the hard way.

---

# Annexes

Project-specific engineering reference. Not part of the DESIGN.md spec — retained because the implementation depends on it.

## Motion

Motion is tokenised in `@theme` ([main.css](src/assets/main.css)). The curves used to be hand-typed at ~22 call sites in three near-identical variants; these three are canonical and nothing else is a system curve.

| Token | Value | Uses |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | The default. Reveals, presses, hover lifts, colour and border changes, pager arrows, view-transition cross-fade |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | The few genuinely symmetric moves (icon nudges that travel out and back) |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Sheet travel only. Almost all the distance happens up front, then it glides in — the reason a native sheet feels attached to your thumb |

**`--ease-in` deliberately does not exist.** Entering and exiting UI always starts fast; an ease-in holds still for the first half of its duration, which is exactly the frames the visitor is watching.

| Token | Value | Uses |
|---|---|---|
| `--dur-press` | `80ms` | `:active` depress |
| `--dur-fast` | `160ms` | Press/hover transition base on `.btn`, pills, cards |
| `--dur-base` | `200ms` | Modal enter/leave, scrim fade, tool/social pills, theme cross-fade, error slide-fade |
| `--dur-slow` | `250ms` | Button colour hover, icon nudges, image hover scale, theme-toggle rotation |
| `--dur-drawer` | `400ms` | Sheet open/close |
| `--dur-reveal` | `450ms` | Section entrances only — the one duration allowed past 300ms, because a panel arriving is editorial rather than UI |

Outside these: GSAP timing for scroll and gesture work (`0.5s` sheet settle, `0.6s` mobile IO reveal, `0.65s` entrance tween, `0.8s` pager nav, `1.4s` stat count-up), the boot screen's `--boot-tempo` scale, and the `0.45s` image load-in.

| Pattern | Spec |
|---|---|
| Horizontal scrub | GSAP ScrollTrigger `scrub: 1` smoothing a normalized 0→1 driver; `applyProgress` runs off the smoothed value, so the layout is measured in scroll px and `refresh()` alone re-fits it |
| Snap | Free-form: only pulls when the natural stop lands within a `0.06` dead-zone of an arrival, and never mid-pan (`0.004` margin inside a pan zone). During programmatic nav the snap resolves to the exact destination so trailing inertia can't drift |
| Depth | Off-centre panels lerp toward `1 − 0.05·smoothstep(dist)` at `0.12`/frame on the GSAP ticker, snapping inside a `0.0005` epsilon so a resting pager writes nothing |
| Pause-and-pan | Tall panels lock horizontal travel and drive `[data-pan-scroll].scrollTop` straight from progress before releasing |
| Section reveal | Replays on **every** arrival — `panelEntrance` builds one paused GSAP timeline per panel and plays it on `settledSlide`; leaving reverses it at `0.45 / 0.24` timeScale. Exits are faster than entrances and do not stagger: leaving is not a moment |
| Arrival, not active | `activeSlide` resolves half a viewport before travel stops, so it is the cue for nav state and never for an entrance. `onSettle` is the arrival, and it is defined as **quiet** rather than as any one event: `200ms` with no scroll change covers a snap landing, a free rest outside the snap dead-zone, a programmatic nav and the mobile scroll with one mechanism. Snap's own `120ms` delay is shorter than the window, so its travel restarts the clock before a false settle fires |
| Boot handoff | `bootState` latches the overlay's departure and fires `jrla:boot-reveal`. `ready` on the pager means "measured behind the overlay" and is **not** an entrance cue: a panel gated on it animates and finishes under an opaque plate. The latch exists because the event fires once and a remount would never hear it |
| Reveal vocabulary | One attribute opts an element in: `data-reveal="fade"` (opacity + `10px` rise) · `"line"` (`yPercent 105 → 0` inside a `.reveal-line` mask) · `"slide"` (`xPercent ±3` + opacity) · `"drift"` (slide that lands last and travels further) · `"draw"` (`--reveal-draw 0 → 1`, CSS decides what it scales). Modifiers: `data-reveal-at` · `-x` · `-y` · `-o`. Default position is `0.06 + i × 0.06` in DOM order; `data-reveal-at` is for ladders that genuinely break rank |
| No CSS from-state | GSAP writes the hidden state at runtime, so the markup's natural state is the visible one — a JS failure shows the page instead of blanking it. This is also why reduced motion needs no override rules: the mixin simply builds no timeline |
| Panel slide-in | `data-reveal="slide"`, `±3` xPercent + opacity at `0.06`. **The accent half never animates** — on Home, About and Contact alike it is the fixed ground the entrance happens against, present from the first frame, with only its contents staggering in. The content half settles **outward from the seam** rather than inward from the screen edge: it opens away from a surface that was already standing |
| Seam hairline | `.seam` — 1px `bg-current/20` on the trailing edge of the accent half. CSS owns the axis, because it flips at the breakpoint (`scaleX` from `left` stacked, `scaleY` from `top` at `md+`); GSAP only drives `--reveal-draw` `0 → 1` at `0.1s`. Defaulting the var to `1` leaves the seam drawn without JS |
| Ghost wordmark | `data-reveal="drift"` — `xPercent 4 → 0` + opacity against the panel's own outward travel. The counter direction is what seats it behind the content. Lands last, at `0.34s` |
| Scroll-scrub reveal | Desktop: opacity/Y interpolated across a band from `0.82` → `0.48` of the scroll viewport, reversible both ways, rects read before any write. Mobile: one-shot IO tween (`0.6s`, `power3.out`, `-25%` root margin) because per-frame scrubbing is too heavy for phones |
| Triggered entrance | Elements with no scroll travel play a timeline instead: `0.15s` lead, `0.08s` stagger, `0.65s` in, `0.3s` out |
| Typed text | 80ms/char · 2200ms hold · 400ms turnaround · 40ms delete · 1s caret blink. Runs only while Home is the active panel |
| Tactile press | `scale(0.95)` in `--dur-press`; work cards use `0.985` — perceived displacement scales with element size, so a large surface needs a smaller ratio to read as equal |
| Card lift | `translateY(-3px)` + image `scale(1.04)`, `--dur-slow`, `hover-fine` only |
| Filter swap | Grid dims to `opacity 0.25` for `120ms`, the set changes behind it, then it returns — one substitution rather than a teleport followed by a re-reveal |
| Status pulse | `scale 1 → 1.4`, `2s` loop. **One pulsing dot per panel, maximum** — two loops at different tempos read as a glitch, not a rhythm |
| Idle loops | Every infinite loop (status pulse, caret blink) is gated on the panel root's `.is-active` so it stops once the panel is off screen. Tied to visibility, not to the entrance: whether a loop should run is not a question about whether an animation has played |
| Sheet dismiss | Distance (12% of sheet height, floored at 64px) **or** velocity (>0.11 px/ms downward flick). Over-drag upward gets `pow(0.7) × 0.5` resistance; a failed dismiss settles on `back.out(1.1)` |
| Theme swap | View Transition cross-fade, `--dur-base`, opacity only. Progressive enhancement — no API or reduced motion falls through to the instant swap |
| Boot screen | Whole choreography scaled by one `BOOT_TEMPO` constant (currently `1.5`) shared between the CSS `calc()`s and the JS hold; plays once per session, resolves on `window.load` capped at `MIN_HOLD + 1000ms`, skipped entirely under reduced motion |
| Reduced motion | Movement removed, feedback kept: animations to `0.01ms` / one iteration, `transition-property` narrowed to colour · background · border · outline · fill · stroke · opacity · shadow at `150ms` on `--ease-out`. Panel entrances build no timeline at all, which leaves every element in its natural visible state |

## Z-Index Scale

Declared in `@theme`. Never write a raw `z-index`.

```
--z-nav      100
--z-overlay  200
--z-modal    300
--z-toast    400
--z-grain   9999
```

## Theming

Pinia store [src/store/index.js](src/store/index.js) — `useThemeStore`.

| State | Values |
|---|---|
| mode | `system` · `light` · `dark` |
| persistence | `localStorage['theme']` |
| cycle order | system → light → dark → system |

**FOUC guard** — inline script in [index.html](index.html) applies `.dark` before first paint; `localStorage` wins, else OS preference.

Dark mode swaps: accent (Signal Red → Filament Yellow), page and card surfaces, tool-logo SVG variants (html/css/js/nextjs/wacom), the About portrait (`dark-paper-effect` / `light-paper-effect`), focus-ring colour, caret, scrollbar-thumb hover, and the `::selection` foreground.

**Cross-fade.** The swap is the single harshest state change in the app — every surface, both accents and all text flip in one frame. `cycleTheme` wraps `store.cycleMode()` in `document.startViewTransition`, and `::view-transition-old/new(root)` cross-fade over `--dur-base`. Opacity only: the page is not moving, it is re-colouring, so movement would describe something that isn't happening. Purely additive — no API support or reduced motion falls through to the identical instant swap, and the store call is the same either way, so it cannot desync.

Tailwind v4 dark variant: `@custom-variant dark (&:is(.dark *))`. A second custom variant, `hover-fine`, gates pointer affordances: `@media (hover: hover) and (pointer: fine)`.

## Accessibility

- Focus rings: `2px` solid accent, `3px` offset, `4px` radius, applied via `:where(button, a, input, textarea, select, [role='button'], [tabindex]):focus-visible`. Dialog roots (`tabindex="-1"`) drop the offset to `0`.
- Minimum hit target `44px` (`2.75rem`) — nav arrows, social pills, mobile brand mark.
- `aria-label` required on every icon-only control; `aria-pressed` on filter pills.
- `prefers-reduced-motion` honoured globally in `@layer base` — movement removed, colour/opacity/border/shadow feedback kept at `150ms` (see §Motion).
- Landmarks: `nav[aria-label="Sections"]`, `<main id="main-content">` wrapping the pager (and on `NotFound`), `role="dialog"` + `aria-modal` on both dialog variants. Panels are `<section>` elements inside the track, and a `.skip-link` is the first tab stop on the page.
- **Only the active panel is reachable.** Desktop keeps all five mounted but marks the four off-screen ones `inert`, so focus, pointer and AT never enter a panel the visitor cannot see. Mobile stacks them and marks none.
- Arrow-key paging ignores editable targets, IME composition, modifier combos and any open dialog — the caret always wins over the pager.
- Boot screen: the overlay is `aria-hidden` in full and the app behind it is `inert` until it leaves; one `role="status"` line announces the load.
- Dialogs: focus moves to the dialog root with `preventScroll`, Tab is trapped inside, Esc closes, focus returns to the previously focused element, and the closed sheet carries `inert` + `aria-hidden`.
- Decoration is hidden from AT: the typed tagline is `aria-hidden` with an `sr-only` static string beside it, and the marquee, dot-grids, section dividers and corner brackets are all `aria-hidden`.
- Forms: `aria-required`, `aria-invalid` and `aria-describedby` on every field; the character counter is wired into the textarea's description; success is `role="status"`, failure is `role="alert"`.
- Keyboard: arrow keys drive panel navigation; Esc closes any dialog.
- Category badge pairs are contrast-checked against their own backgrounds in both themes.

- Text opacity respects **The Opacity Floor Rule** (see §Colors): 0.65 on page/card, 0.90 on an accent plate.

**Known contrast gaps** (recorded so nobody documents them as intent):
- The `#00aeb3` and `#018441` case-study grounds carry `text-light` at 2.76:1 and 4.80:1 — the teal fails even at full opacity for any text size, and the green fails for the 10px keys. Fixing that means darkening those two values in `PortfolioData.js` or switching those cards to ink, not adjusting opacity.
- The accent stat numerals (`text-light-primary` on `--color-light-card`) measure 2.97:1. They are large ExtraBold display figures, so they sit just under the 3:1 large-text threshold. Changing it means changing Signal Red, which the brand owns.

## Information Architecture

Five panels, in order ([src/components/WebView.vue](src/components/WebView.vue)):

| Idx | Panel | Role |
|---|---|---|
| 0 | Home | Hero — name, role, social pills, typed tagline |
| 1 | Features | Expertise feed — front-end, UI/UX, video, vector |
| 2 | Works | Filterable grid — uiux · website · video · vector |
| 3 | About | Portrait plate, bio, stats, meta facts, CV download |
| 4 | Contact | Form (Botpoison → Formspark) + direct channels |

Navigation: keyboard, click arrows, navbar chapter numbers; touch on mobile.

## Routing & Deep Links

Routes in [src/router/index.js](src/router/index.js):

| Path | Behaviour |
|---|---|
| `/` | Main scroll experience (`WebView`); honours `$route.hash` on entry to pick the initial panel |
| `/content/:id` | Legacy detail URL → redirected to `/` (detail is a modal inside `Works`, not a page) |
| `/404` / catch-all | `NotFound`, `robots: noindex, follow` |

Valid hashes — `#home` · `#features` · `#works` · `#about` · `#contact`, exported as `VALID_SLIDE_HASHES`. A `beforeEnter` guard on `/` redirects any other hash to `/404` before `WebView` mounts (mounting then redirecting would flash the navbar).

Hash sync: `useHorizontalScroll`'s `onActive(idx)` callback fires as each panel activates; `WebView` calls `$router.replace({ hash })` so the URL always reflects the visible panel without polluting history.

## Portfolio Data

Source: [src/components/PortfolioData.js](src/components/PortfolioData.js) — 20 entries.

Categories `uiux` · `website` · `video` · `vector` drive filtering, badge colour, and which surface opens (sheet for uiux/website, modal for video/vector).

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
  color?: string,         // hero colour for uiux detail
  imgSide?, imgContent1?, imgContent2?, imgBackground?  // uiux only
}
```

Adding a category means extending this enum, the badge pairs in §Colors, and `tagClasses()` in `Works.vue` — with literal class strings, so Tailwind's scanner keeps them.

## Iconography & Assets

- **Font Awesome 6** (brands · solid · regular · thin) from `/public/fonts/fontawesome/`, loaded via `rel=preload` + `onload` swap with a `<noscript>` fallback so it never blocks render.
- **Tool logos** — inline SVG, theme-swapped by a `watch` in `Features.vue`.
- **Imagery** — `.webp` throughout; first 3 images of any grid eager-loaded with `fetchpriority="high"`, the rest lazy via `LazyImage` (native `loading="lazy"` plus a `load`/`error`-gated shimmer). Aspect ratios come from the wrapper (`aspect-[4/3]` on cards), not from intrinsic attributes — `LazyImage` accepts `width`/`height` props but every call site leaves them at their `0` default, so no CLS attributes are actually emitted. Pass them, or keep every image inside a ratio box.
- **Project assets** — hosted on Echo UI CDN (`echoui.app`).

## Conventions

- Tailwind utility-first; shared patterns live in `@layer components` / `@layer utilities` in [src/assets/main.css](src/assets/main.css).
- No raw hex outside `@theme`. No raw `z-index` anywhere.
- `<style scoped>` only for one-off visuals (scoped reveal keyframes, marquee, boot screen, cursor). Anything used at more than one call site graduates to `@layer components` — that is how `.nav-arrow` was born, after four call sites carried an identical ~500-char utility string whose transition list had drifted out of sync with what it animated.
- Utilities sit in a later layer than `@layer components` — a dim `.reveal-fade` target must bake its opacity into `--o`, not a Tailwind `opacity-*` class, or the utility beats the hidden state.
- Enumerate `transition-property`; include `translate`/`scale` next to `transform` (Tailwind v4 emits them standalone). Never `transition-all`.
- Gate hover behind `hover-fine:` so touch never inherits a sticky phantom `:hover`.
- Tailwind class strings that come from a map (`tagClasses()`, category badges) stay literal so the scanner keeps them.
- New animation? Use an existing `--ease-*` / `--dur-*` token and add the pattern to §Motion. New category? Extend the badge pairs and the data enum.

## Hosting

- **Firebase Hosting** — production at `https://jrla1219.web.app/`. Build `npm run build` → `/dist`; deploy `firebase deploy --only hosting`.
- SEO: meta + OpenGraph + Twitter + JSON-LD (`Person` · `WebSite` · `ItemList`) in [index.html](index.html); share image `/JRLA-Website.png` (1200×630, `og:image:type` declared for Discord). Per-route `title` / `description` / `robots` in the router's `afterEach`. [public/sitemap.xml](public/sitemap.xml) · [public/robots.txt](public/robots.txt).
- Security headers in [firebase.json](firebase.json): HSTS preload, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo denied), `X-Frame-Options: SAMEORIGIN`, and a CSP allowing Formspark + Botpoison endpoints and `https:` iframes for project previews.

---

_Tokens in the frontmatter are normative; prose explains where and why. Machine-readable extensions (tonal ramps, shadow and motion tokens, component snippets) live in [.impeccable/design.json](.impeccable/design.json)._
