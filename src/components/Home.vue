<template>
  <Transition name="fade">
    <div
      :class="['relative w-full app-slide max-md:overflow-y-auto max-md:overflow-x-hidden md:overflow-hidden', { 'is-revealed': entered }]">
      <div class="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr] min-h-full md:grid-cols-[45fr_55fr] md:grid-rows-1">
        <!-- LEFT: accent block -->
        <section data-accent-surface class="relative overflow-hidden max-md:overflow-visible text-dark hero-left dark:bg-dark-primary bg-light-primary">
          <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14 max-md:py-12 max-md:gap-8 max-md:min-h-full">
            <div class="flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-Mono fade-up" style="--d:0.2s">
              <span class="status-dot w-2 h-2 rounded-full bg-current opacity-90"></span>
              <span>Available · 2026</span>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-xs sm:text-sm tracking-[0.4em] uppercase font-Mono opacity-80 fade-up" style="--d:0.3s">Portfolio of</p>
              <h1 class="text-[clamp(3.25rem,18vw,5.5rem)] md:text-[clamp(2.75rem,8.5vw,7rem)] tracking-[-0.035em] leading-[0.9] wrap-break-word font-Gilroy-extra-bold uppercase">
                <span class="reveal-line leading-[0.95]"><span class="hnl-inner" style="--d:0.4s">John</span></span>
                <span class="reveal-line leading-[0.95]"><span class="hnl-inner" style="--d:0.55s">Russel</span></span>
                <span class="reveal-line leading-[0.95]"><span class="hnl-inner [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_var(--color-dark)] opacity-85" style="--d:0.7s">Angulo</span></span>
              </h1>
              <div class="flex items-baseline gap-2 mt-4 text-base font-Gilroy sm:text-lg md:text-xl fade-up" style="--d:0.95s">
                <span class="opacity-70" aria-hidden="true">→</span>
                <!-- The typing effect is decoration: announcing it would read one
                     letter at a time forever. Hide it and give assistive tech the
                     four roles as one static string instead. -->
                <span class="capitalize" aria-hidden="true">{{ typed }}</span><span class="caret inline-block ml-[0.1em]" aria-hidden="true">|</span>
                <span class="sr-only">Front-end developer, UI/UX designer, video editor, and vector artist.</span>
              </div>
            </div>

            <div class="flex items-end justify-between text-[10px] sm:text-xs tracking-[0.25em] uppercase font-Mono opacity-80 fade-up" style="--d:1.1s">
              <span>Bulacan · PH</span>
              <span>Est. 2021</span>
            </div>
          </div>
        </section>

        <!-- RIGHT: content / wordmark -->
        <section class="relative overflow-hidden max-md:overflow-visible hero-right dark:bg-dark bg-light dark:text-light text-dark">
          <!-- Dot-grid backdrop -->
          <div class="dot-grid bg-size-[24px_24px]" aria-hidden="true"></div>

          <!-- Vertical wordmark -->
          <div class="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none select-none md:pr-6" aria-hidden="true">
            <span class="font-Gilroy-extra-bold dark:text-light/5 text-dark/5 text-[clamp(8rem,28vw,22rem)] tracking-[-0.01em] leading-[0.8] [writing-mode:vertical-rl] rotate-180">JRLA</span>
          </div>

          <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14 max-md:gap-10 max-md:min-h-full">
            <div class="reveal-fade flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs tracking-[0.3em] uppercase font-Mono" style="--d:0.25s;--o:0.7">
              <span>01 — Home</span>
              <span class="hidden sm:inline">v.04</span>
            </div>

            <div class="max-w-md">
              <h2 class="text-[clamp(1.35rem,6vw,1.85rem)] md:text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[-0.025em] font-Gilroy-extra-bold uppercase leading-[0.92]">
                <span class="reveal-line leading-[1.05]"><span class="as-inner" style="--d:0.5s">Half designer.</span></span>
                <span class="reveal-line leading-[1.05]"><span class="as-inner" style="--d:0.65s">Half developer.</span></span>
                <span class="reveal-line leading-[1.05]"><span class="as-inner text-light-primary dark:text-dark-primary" style="--d:0.8s">Fully shipping.</span></span>
              </h2>

              <div class="mt-4 md:mt-6 border-t border-current/15 font-Mono fade-up" style="--d:1s">
                <div class="flex justify-between items-baseline gap-4 py-2 md:py-[0.6rem] border-b border-current/15 text-[0.7rem]">
                  <span class="tracking-[0.3em] uppercase opacity-55 shrink-0">Practice</span>
                  <span class="tracking-[0.02em] text-right opacity-95">Front-end · UI/UX</span>
                </div>
                <div class="flex justify-between items-baseline gap-4 py-2 md:py-[0.6rem] border-b border-current/15 text-[0.7rem]">
                  <span class="tracking-[0.3em] uppercase opacity-55 shrink-0">Scope</span>
                  <span class="tracking-[0.02em] text-right opacity-95">Web · Mobile · Motion · Vector</span>
                </div>
              </div>
            </div>

            <div class="flex items-end justify-between gap-6">
              <div class="flex flex-col gap-3">
                <p class="text-xs tracking-[0.3em] uppercase opacity-60 font-Gilroy">Find me</p>
                <div class="flex gap-3 no-swipe">
                  <a target="_blank" rel="noopener" aria-label="LinkedIn" href="https://www.linkedin.com/in/jrla1219/" class="social-pill group border-current text-inherit hover:bg-current hover:-translate-y-0.5">
                    <i class="fa-brands fa-linkedin-in group-hover:text-light dark:group-hover:text-dark"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Facebook" href="https://www.facebook.com/Jano1219" class="social-pill group border-current text-inherit hover:bg-current hover:-translate-y-0.5">
                    <i class="fa-brands fa-facebook-f group-hover:text-light dark:group-hover:text-dark"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Behance" href="https://www.behance.net/JRLA" class="social-pill group border-current text-inherit hover:bg-current hover:-translate-y-0.5">
                    <i class="fa-brands fa-behance group-hover:text-light dark:group-hover:text-dark"></i>
                  </a>
                </div>
              </div>
              <div class="flex flex-col items-end text-right">
                <p class="text-xs tracking-[0.3em] uppercase opacity-60 font-Gilroy">Navigate <span class="md:hidden">↓</span><span class="hidden md:inline">→</span></p>
                <p class="hidden mt-1 text-xs opacity-50 font-Gilroy md:block">scroll or ← → keys</p>
                <p class="mt-1 text-xs opacity-50 font-Gilroy md:hidden">swipe ↑ or ↓</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script>
  import { sectionReveal } from '../composables/sectionReveal'

  export default {
    name: 'Home',
    // Entrance replays whenever Home becomes active; initial reveal waits for
    // WebView's `ready` (wrap is visibility:hidden until then).
    mixins: [sectionReveal('home', { gateReady: true })],
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number,
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
      // The loop used to run forever, even while the visitor was four panels
      // away — pure timer churn. Type only while Home is on screen.
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
  /* Vue <Transition> classes */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Entrance reveals — gated on `.is-revealed` (added by v-reveal on scroll
     entry) so they fire when the panel scrolls into view, not at mount. */
  .hero-left {
    transform: translateX(-3%);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
                opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .hero-right {
    transform: translateX(3%);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s,
                opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s;
  }
  .is-revealed .hero-left,
  .is-revealed .hero-right {
    transform: translateX(0);
    opacity: 1;
  }

  /* Fade-up — staggered via --d */
  .fade-up {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0s);
  }
  .is-revealed .fade-up {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hero name line-reveal */
  .hnl-inner {
    display: inline-block;
    transform: translateY(105%);
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0s);
  }
  .is-revealed .hnl-inner {
    transform: translateY(0);
  }

  /* Statement line-reveal */
  .as-inner {
    display: inline-block;
    transform: translateY(105%);
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0s);
  }
  .is-revealed .as-inner {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-left,
    .hero-right,
    .fade-up,
    .hnl-inner,
    .as-inner {
      transition-duration: 0.2s;
      transition-delay: 0s;
    }
    .hero-left,
    .hero-right { transform: none; }
  }

  /* Status dot pulse */
  .status-dot {
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.4); opacity: 0.4; }
  }

  /* Typing caret blink */
  .caret {
    animation: caret-blink 1s steps(1) infinite;
  }
  @keyframes caret-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
</style>
