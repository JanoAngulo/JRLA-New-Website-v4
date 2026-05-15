<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'home'"
      class="relative w-full overflow-hidden"
      :style="{
        height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px`
      }">
      <div class="w-full h-full hero-grid">
        <!-- LEFT: accent block -->
        <section class="relative overflow-hidden text-dark hero-left dark:bg-dark-primary bg-light-primary">
          <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14">
            <div class="flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-Mono">
              <span class="status-dot"></span>
              <span>Available · 2026</span>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-xs sm:text-sm tracking-[0.4em] uppercase font-Mono opacity-80">Portfolio of</p>
              <h1 class="hero-name font-Gilroy-extra-bold leading-[0.85] uppercase">
                <span class="block">John</span>
                <span class="block">Russel</span>
                <span class="block hero-name--outline">Angulo</span>
              </h1>
              <div class="flex items-baseline gap-2 mt-4 text-base font-Gilroy sm:text-lg md:text-xl">
                <span class="opacity-70">→</span>
                <span class="capitalize" aria-live="polite">{{ typed }}</span><span class="caret" aria-hidden="true">|</span>
              </div>
            </div>

            <div class="flex items-end justify-between text-[10px] sm:text-xs tracking-[0.25em] uppercase font-Mono opacity-80">
              <span>Bulacan · PH</span>
              <span>Est. 2021</span>
            </div>
          </div>
        </section>

        <!-- RIGHT: content / wordmark -->
        <section class="relative overflow-hidden hero-right dark:bg-dark bg-light dark:text-light text-dark">
          <!-- Vertical wordmark -->
          <div class="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none select-none hero-wordmark md:pr-6" aria-hidden="true">
            <span class="tracking-tight font-Gilroy-extra-bold dark:text-light/5 text-dark/5">JRLA</span>
          </div>

          <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs tracking-[0.3em] uppercase font-Mono opacity-70">
              <span>01 — Index</span>
              <span class="hidden sm:inline">v.04</span>
            </div>

            <div class="max-w-md space-y-4">
              <p class="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-60 font-Gilroy">About</p>
              <p class="text-base leading-relaxed sm:text-lg md:text-xl font-Gilroy">
                Front-end developer & UI/UX designer building interfaces that feel <em class="not-italic dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">considered</em> — not assembled.
              </p>
              <div class="hairline"></div>
              <p class="text-xs leading-relaxed sm:text-sm opacity-70">
                Working across web, mobile, motion, and vector. Currently shipping product UI at CoreProc and freelancing on the side.
              </p>
            </div>

            <div class="flex items-end justify-between gap-6">
              <div class="flex flex-col gap-3">
                <p class="text-xs tracking-[0.3em] uppercase opacity-60 font-Gilroy">Find me</p>
                <div class="flex gap-3 no-swipe">
                  <a target="_blank" rel="noopener" aria-label="LinkedIn" href="https://www.linkedin.com/in/jrla1219/" class="social-pill">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Facebook" href="https://www.facebook.com/Jano1219" class="social-pill">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a target="_blank" rel="noopener" aria-label="Behance" href="https://www.behance.net/JRLA" class="social-pill">
                    <i class="fa-brands fa-behance"></i>
                  </a>
                </div>
              </div>
              <div class="flex-col items-end hidden text-right md:flex">
                <p class="text-xs tracking-[0.3em] uppercase opacity-60 font-Gilroy">Scroll →</p>
                <p class="mt-1 text-xs opacity-50 font-Gilroy">to explore works</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
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
    mounted() {
      this.tick()
    },
    beforeUnmount() {
      clearTimeout(this.timer)
    },
    methods: {
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Split layout: 45/55 on desktop, stacked on mobile */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 55fr 45fr;
  }

  @media (min-width: 768px) {
    .hero-grid {
      grid-template-columns: 45fr 55fr;
      grid-template-rows: 1fr;
    }
  }

  /* Staggered entrance */
  .hero-left {
    animation: slide-in-l 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .hero-right {
    animation: slide-in-r 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
  }

  @keyframes slide-in-l {
    from {
      transform: translateX(-3%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-in-r {
    from {
      transform: translateX(3%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Hero name — fluid scaling, oversized */
  .hero-name {
    font-size: clamp(3.5rem, 11vw, 11rem);
    letter-spacing: -0.04em;
  }

  /* Outlined last name for typographic contrast */
  .hero-name--outline {
    color: transparent;
    -webkit-text-stroke: 1.5px currentColor;
    opacity: 0.85;
  }

  /* Massive vertical wordmark — fades into background */
  .hero-wordmark {
    font-size: clamp(8rem, 28vw, 22rem);
    letter-spacing: -0.06em;
    line-height: 0.8;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  /* Status dot — pulse */
  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: currentColor;
    opacity: 0.9;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.9;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.4;
    }
  }

  /* Hairline rule */
  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  /* Caret */
  .caret {
    display: inline-block;
    margin-left: 0.1em;
    animation: caret-blink 1s steps(1) infinite;
  }

  @keyframes caret-blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  /* Social pill — outlined, hover fills */
  .social-pill {
    display: grid;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 9999px;
    border: 1px solid currentColor;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: inherit;
  }

  @media (hover: hover) {
    .social-pill:hover {
      background: currentColor;
      transform: translateY(-2px);
    }

    .social-pill:hover :deep(i) {
      color: var(--color-light);
    }

    :is(.dark) .social-pill:hover :deep(i) {
      color: var(--color-dark);
    }
  }
</style>
