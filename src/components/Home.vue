<template>
  <div
    :class="['relative w-full app-slide max-md:overflow-y-auto max-md:overflow-x-hidden md:overflow-hidden', { 'is-active': activeSlide === 'home' }]">
    <div class="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr] min-h-full md:grid-cols-[45fr_55fr] md:grid-rows-1">
      <!-- LEFT: accent block -->
      <section data-accent-surface class="relative overflow-hidden max-md:overflow-visible text-dark dark:bg-dark-primary bg-light-primary">
        <!-- The split itself, drawn. Half designer / half developer is the claim;
             the seam is where the two halves meet, so it gets a hairline. -->
        <div class="seam bg-current/20" aria-hidden="true" data-reveal="draw" data-reveal-at="0.1"></div>

        <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14 max-md:py-12 max-md:gap-8 max-md:min-h-full">
          <div class="flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-Mono" data-reveal="fade" data-reveal-at="0.06">
            <span class="status-dot w-2 h-2 rounded-full bg-current opacity-90"></span>
            <span>Available · 2026</span>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-xs sm:text-sm tracking-[0.4em] uppercase font-Mono opacity-90" data-reveal="fade" data-reveal-at="0.1">Portfolio of</p>
            <h1 class="text-[clamp(3.25rem,18vw,5.5rem)] md:text-[clamp(2.75rem,8.5vw,7rem)] tracking-[-0.035em] leading-[0.9] wrap-break-word font-Gilroy-extra-bold uppercase">
              <span class="reveal-line leading-[0.95]"><span class="hnl-inner" data-reveal="line" data-reveal-at="0.12">John</span></span>
              <span class="reveal-line leading-[0.95]"><span class="hnl-inner" data-reveal="line" data-reveal-at="0.18">Russel</span></span>
              <span class="reveal-line leading-[0.95]"><span class="hnl-inner [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_var(--color-dark)] opacity-85" data-reveal="line" data-reveal-at="0.24">Angulo</span></span>
            </h1>
            <div class="flex items-baseline gap-2 mt-4 text-base font-Gilroy sm:text-lg md:text-xl" data-reveal="fade" data-reveal-at="0.3">
              <span class="opacity-70" aria-hidden="true">→</span>
              <!-- The typing effect is decoration — announced, it would read one
                   letter at a time forever. Assistive tech gets the four roles as
                   one static string instead. -->
              <span class="capitalize" aria-hidden="true">{{ typed }}</span><span class="caret inline-block ml-[0.1em]" aria-hidden="true">|</span>
              <span class="sr-only">Front-end developer, UI/UX designer, video editor, and vector artist.</span>
            </div>
          </div>

          <div class="flex items-end justify-between text-[10px] sm:text-xs tracking-[0.25em] uppercase font-Mono opacity-90" data-reveal="fade" data-reveal-at="0.34">
            <span>Bulacan · PH</span>
            <span>Est. 2021</span>
          </div>
        </div>
      </section>

      <!-- RIGHT: content / wordmark -->
      <section class="relative overflow-hidden max-md:overflow-visible dark:bg-dark bg-light dark:text-light text-dark">
        <!-- Dot-grid backdrop -->
        <div class="dot-grid bg-size-[24px_24px]" aria-hidden="true"></div>

        <!-- Vertical wordmark -->
        <div class="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none select-none md:pr-6" aria-hidden="true">
          <span data-reveal="drift" data-reveal-at="0.34" class="font-Gilroy-extra-bold dark:text-light/5 text-dark/5 text-[clamp(8rem,28vw,22rem)] tracking-[-0.01em] leading-[0.8] [writing-mode:vertical-rl] rotate-180">JRLA</span>
        </div>

        <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14 max-md:gap-10 max-md:min-h-full">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs tracking-[0.3em] uppercase font-Mono" data-reveal="fade" data-reveal-at="0.08" data-reveal-o="0.7">
            <span>01 — Home</span>
            <span class="hidden sm:inline">v.04</span>
          </div>

          <div class="max-w-lg @container flex flex-col gap-[clamp(1.25rem,3.2vw,2rem)]">
            <h2 class="text-[clamp(1.6rem,3.9vw,2.25rem)] tracking-[-0.032em] font-Gilroy-extra-bold uppercase leading-[0.9]">
              <span class="reveal-line"><span class="as-inner" data-reveal="line" data-reveal-at="0.16">Half designer.</span></span>
              <span class="reveal-line"><span class="as-inner" data-reveal="line" data-reveal-at="0.22">Half developer.</span></span>
              <span class="reveal-line"><span class="as-inner text-light-primary dark:text-dark-primary" data-reveal="line" data-reveal-at="0.28">Fully shipping.</span></span>
            </h2>

            <dl class="grid grid-cols-1 @md:grid-cols-2 border-y border-current/15 font-Mono" data-reveal="fade" data-reveal-at="0.32">
              <div class="flex flex-col gap-[0.45rem] py-[0.8rem] @md:pr-6">
                <dt class="text-[0.65rem] tracking-[0.3em] uppercase opacity-60">Practice</dt>
                <dd class="text-[0.8125rem] leading-[1.35] tracking-[0.01em] opacity-95">Front-end · UI/UX</dd>
              </div>
              <div class="flex flex-col gap-[0.45rem] py-[0.8rem] border-t border-current/15 @md:border-t-0 @md:border-l @md:pl-6">
                <dt class="text-[0.65rem] tracking-[0.3em] uppercase opacity-60">Scope</dt>
                <dd class="text-[0.8125rem] leading-[1.35] tracking-[0.01em] opacity-95">Web · Mobile · Motion · Vector</dd>
              </div>
            </dl>
          </div>

          <div class="flex items-end justify-between gap-6">
            <div class="flex flex-col gap-3">
              <!-- `data-reveal-o` because the label rests at 65%: without it the
                   tween would land on full opacity and quietly restyle it. -->
              <p class="text-xs tracking-[0.3em] uppercase opacity-65 font-Gilroy" data-reveal="fade" data-reveal-at="0.34" data-reveal-o="0.65">Find me</p>
              <!-- The pills reveal one at a time rather than as a block: three
                   discrete objects read as a row arriving, and 30ms apart is
                   close enough that it still lands as one gesture. -->
              <div class="flex gap-3 no-swipe">
                <a target="_blank" rel="noopener" aria-label="LinkedIn" href="https://www.linkedin.com/in/jrla1219/" class="social-pill group border-current text-inherit hover:bg-current hover-fine:hover:-translate-y-0.5" data-reveal="fade" data-reveal-at="0.37" data-reveal-y="12">
                  <i class="fa-brands fa-linkedin-in group-hover:text-light dark:group-hover:text-dark"></i>
                </a>
                <a target="_blank" rel="noopener" aria-label="Facebook" href="https://www.facebook.com/Jano1219" class="social-pill group border-current text-inherit hover:bg-current hover-fine:hover:-translate-y-0.5" data-reveal="fade" data-reveal-at="0.40" data-reveal-y="12">
                  <i class="fa-brands fa-facebook-f group-hover:text-light dark:group-hover:text-dark"></i>
                </a>
                <a target="_blank" rel="noopener" aria-label="Behance" href="https://www.behance.net/JRLA" class="social-pill group border-current text-inherit hover:bg-current hover-fine:hover:-translate-y-0.5" data-reveal="fade" data-reveal-at="0.43" data-reveal-y="12">
                  <i class="fa-brands fa-behance group-hover:text-light dark:group-hover:text-dark"></i>
                </a>
              </div>
            </div>
            <!-- Reveals as one block, not per line: it is a single instruction,
                 and its lines already carry their own resting opacity. -->
            <div class="flex flex-col items-end text-right" data-reveal="fade" data-reveal-at="0.37">
              <p class="text-xs tracking-[0.3em] uppercase opacity-65 font-Gilroy">Navigate <span class="md:hidden">↓</span><span class="hidden md:inline">→</span></p>
              <p class="hidden mt-1 text-xs opacity-65 font-Gilroy md:block">scroll or ← → keys</p>
              <p class="mt-1 text-xs opacity-65 font-Gilroy md:hidden">swipe ↑ or ↓</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { panelEntrance } from '../composables/panelEntrance'

  export default {
    name: 'Home',
    // Entrance replays whenever Home is arrived at. `settledSlide` is the cue on
    // a return; on first load it also has to clear the boot overlay, and 260ms
    // of the overlay's 700ms fade buys a mostly-clear screen without leaving a
    // blank one.
    mixins: [panelEntrance('home', { gateReady: true, readyDelay: 260 })],
    props: {
      activeSlide: String,
      settledSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number,
      // Not "the pager is measured" — that happens behind the boot overlay.
      // This is "the overlay is leaving", i.e. the entrance can be seen.
      ready: { type: Boolean, default: false }
    },
    data() {
      return {
        titles: ['front-end developer.', 'UI/UX Designer.', 'video editor.', 'vector artist.'],
        typed: '',
        titleIdx: 0,
        charIdx: 0,
        phase: 'typing',
        timer: null
      }
    },
    watch: {
      // Only type while Home is on screen; otherwise the loop is timer churn for
      // a panel nobody is looking at.
      activeSlide(val) {
        if (val === 'home') this.start()
        else this.stop()
      }
    },
    mounted() {
      this.start()
    },
    beforeUnmount() {
      this.stop()
    },
    methods: {
      start() {
        // Reduced motion gets the full first title, no cycling.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.typed = this.titles[0]
          return
        }
        if (this.timer) return
        this.tick()
      },
      stop() {
        clearTimeout(this.timer)
        this.timer = null
      },
      tick() {
        const current = this.titles[this.titleIdx]
        let delay = 80

        if (this.phase === 'typing') {
          this.charIdx++
          this.typed = current.slice(0, this.charIdx)
          if (this.charIdx >= current.length) {
            this.phase = 'pausing'
            delay = 2200
          }
        } else if (this.phase === 'pausing') {
          this.phase = 'deleting'
          delay = 400
        } else if (this.phase === 'deleting') {
          this.charIdx--
          this.typed = current.slice(0, this.charIdx)
          delay = 40
          if (this.charIdx <= 0) {
            this.phase = 'typing'
            this.titleIdx = (this.titleIdx + 1) % this.titles.length
            delay = 300
          }
        }

        this.timer = setTimeout(this.tick, delay)
      }
    }
  }
</script>

<style lang="css" scoped>
  /* The entrance lives in panelEntrance.js — every element's from-state is
     written by GSAP, so nothing here hides anything. What is left is the
     structure those tweens need.

     Neither half moves as a block. Both are fixed ground; only their contents
     carry `data-reveal`. The content half used to slide outward from the seam,
     but a whole-panel xPercent drags the edge between the two halves across the
     accent surface, which reads as the accent block sliding — the one thing it
     is not supposed to do. */

  /* Seam hairline along the split. CSS owns which axis it draws on, because that
     flips at the breakpoint: stacked layouts meet on a horizontal edge, the
     45/55 split on a vertical one. GSAP only drives the 0→1. Defaulting to 1
     means no-JS leaves the seam drawn rather than invisible. */
  .seam {
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    transform: scaleX(var(--reveal-draw, 1));
    transform-origin: left;
  }
  @media (min-width: 48rem) {
    .seam {
      inset: 0 0 0 auto;
      width: 1px;
      height: auto;
      transform: scaleY(var(--reveal-draw, 1));
      transform-origin: top;
    }
  }

  /* Line-reveal inners: inline-block so the mask above them has something with a
     box to translate. The travel itself is GSAP's. */
  .hnl-inner,
  .as-inner {
    display: inline-block;
  }

  /* Status dot pulse. Gated on the panel being on screen — otherwise the loop
     runs for the whole session behind other panels. Tied to `is-active` rather
     than to the entrance: whether a loop should run is a question about
     visibility, not about whether an animation has played. */
  .is-active .status-dot {
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.4); opacity: 0.4; }
  }

  /* Typing caret blink — same gate; the typing loop already stops off screen. */
  .is-active .caret {
    animation: caret-blink 1s steps(1) infinite;
  }
  @keyframes caret-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  /* Last on purpose: these have to out-order the `.is-active`-gated loops
     above, which carry the same specificity. Both run forever, so a
     reduced-motion visitor gets the steady state instead. */
  @media (prefers-reduced-motion: reduce) {
    .is-active .status-dot,
    .is-active .caret { animation: none; }
  }
</style>
