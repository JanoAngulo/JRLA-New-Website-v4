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
            <div class="flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-Mono fade-up" style="--d:0.2s">
              <span class="status-dot"></span>
              <span>Available · 2026</span>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-xs sm:text-sm tracking-[0.4em] uppercase font-Mono opacity-80 fade-up" style="--d:0.3s">Portfolio of</p>
              <h1 class="hero-name font-Gilroy-extra-bold leading-[0.85] uppercase">
                <span class="hero-name-line"><span class="hnl-inner" style="--d:0.4s">John</span></span>
                <span class="hero-name-line"><span class="hnl-inner" style="--d:0.55s">Russel</span></span>
                <span class="hero-name-line"><span class="hnl-inner hero-name--outline" style="--d:0.7s">Angulo</span></span>
              </h1>
              <div class="flex items-baseline gap-2 mt-4 text-base font-Gilroy sm:text-lg md:text-xl fade-up" style="--d:0.95s">
                <span class="opacity-70">→</span>
                <span class="capitalize" aria-live="polite">{{ typed }}</span><span class="caret" aria-hidden="true">|</span>
              </div>
            </div>

            <div class="flex items-end justify-between text-[10px] sm:text-xs tracking-[0.25em] uppercase font-Mono opacity-80 fade-up" style="--d:1.1s">
              <span>Bulacan · PH</span>
              <span>Est. 2021</span>
            </div>
          </div>
        </section>

        <!-- RIGHT: content / wordmark -->
        <section class="relative overflow-hidden hero-right dark:bg-dark bg-light dark:text-light text-dark">
          <!-- Dot-grid backdrop -->
          <div class="hero-dot-grid" aria-hidden="true"></div>

          <!-- Vertical wordmark -->
          <div class="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none select-none hero-wordmark md:pr-6" aria-hidden="true">
            <span class="tracking-tight font-Gilroy-extra-bold dark:text-light/5 text-dark/5">JRLA</span>
          </div>

          <div class="relative flex flex-col justify-between h-full p-6 md:p-10 lg:p-14">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs tracking-[0.3em] uppercase font-Mono opacity-70">
              <span>01 — Home</span>
              <span class="hidden sm:inline">v.04</span>
            </div>

            <div class="max-w-md about-block">
              <div class="about-eyebrow fade-up" style="--d:0.4s">
                <span class="about-dash"></span>
                <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-65">About</p>
              </div>

              <h2 class="about-statement font-Gilroy-extra-bold uppercase leading-[0.92]">
                <span class="as-line"><span class="as-inner" style="--d:0.5s">Half designer.</span></span>
                <span class="as-line"><span class="as-inner" style="--d:0.65s">Half developer.</span></span>
                <span class="as-line"><span class="as-inner accent" style="--d:0.8s">Fully shipping.</span></span>
              </h2>

              <div class="about-meta font-Mono fade-up" style="--d:1s">
                <div class="about-meta-row">
                  <span class="about-meta-label">Practice</span>
                  <span class="about-meta-value">Front-end · UI/UX</span>
                </div>
                <div class="about-meta-row">
                  <span class="about-meta-label">Scope</span>
                  <span class="about-meta-value">Web · Mobile · Motion · Vector</span>
                </div>
              </div>
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
                <p class="text-xs tracking-[0.3em] uppercase opacity-60 font-Gilroy">Navigate →</p>
                <p class="mt-1 text-xs opacity-50 font-Gilroy">use arrows to explore</p>
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

  @media (max-width: 767px) {
    .hero-name {
      font-size: clamp(2.75rem, 12vw, 4.5rem);
    }
    .hero-grid {
      grid-template-rows: auto 1fr;
    }
    .hero-left > div,
    .hero-right > div {
      padding: 1.5rem !important;
      gap: 1rem;
    }
    .hero-right > div {
      justify-content: flex-start !important;
      gap: 1.25rem;
    }
    .about-statement {
      font-size: clamp(1.35rem, 6vw, 1.85rem);
    }
    .about-meta-row {
      padding: 0.5rem 0;
    }
    .about-meta {
      margin-top: 1rem;
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

  /* Dot-grid backdrop */
  .hero-dot-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(currentColor 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.05;
    mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  }

  /* Fade-up util — uses --d for staggered delays */
  .fade-up {
    opacity: 0;
    transform: translateY(8px);
    animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--d, 0s);
  }
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Hero name line reveal — rise from overflow mask */
  .hero-name-line {
    display: block;
    overflow: hidden;
  }
  .hnl-inner {
    display: inline-block;
    transform: translateY(105%);
    animation: hnl-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--d, 0s);
  }
  @keyframes hnl-rise {
    to { transform: translateY(0); }
  }

  /* Hero name — fluid scaling, oversized */
  .hero-name {
    font-size: clamp(2.75rem, 8.5vw, 7rem);
    letter-spacing: -0.035em;
    line-height: 0.9;
    word-break: break-word;
  }
  .hero-name-line {
    line-height: 0.95;
  }

  /* Outlined last name for typographic contrast */
  .hero-name--outline {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1.5px var(--color-dark);
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

  /* About block — editorial statement */
  .about-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }
  .about-dash {
    width: 24px;
    height: 1.5px;
    background: var(--color-light-primary);
  }
  :is(.dark) .about-dash {
    background: var(--color-dark-primary);
  }

  .about-statement {
    font-size: clamp(1.5rem, 2.6vw, 2.25rem);
    letter-spacing: -0.025em;
  }
  .as-line {
    display: block;
    overflow: hidden;
    line-height: 1.05;
  }
  .as-inner {
    display: inline-block;
    transform: translateY(105%);
    animation: as-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--d, 0s);
  }
  @keyframes as-rise {
    to { transform: translateY(0); }
  }
  .as-inner.accent {
    color: var(--color-light-primary);
  }
  :is(.dark) .as-inner.accent {
    color: var(--color-dark-primary);
  }

  .about-meta {
    margin-top: 1.5rem;
    border-top: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  }
  .about-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent);
    font-size: 0.7rem;
  }
  .about-meta-label {
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.55;
    flex-shrink: 0;
  }
  .about-meta-value {
    letter-spacing: 0.02em;
    text-align: right;
    opacity: 0.95;
  }

  /* Hairline rule */
  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  /* Spec sheet — editorial numbered layout */
  .spec-sheet {
    display: flex;
    flex-direction: column;
  }
  .spec-row {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  }
  .spec-row:first-child {
    border-top: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  }
  .spec-num {
    font-family: var(--font-Mono);
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    opacity: 0.55;
    padding-top: 0.25rem;
  }
  .spec-content {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }
  .spec-label {
    font-family: var(--font-Mono);
    font-size: 0.6rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    opacity: 0.55;
  }
  .spec-value {
    font-family: var(--font-Gilroy);
    font-size: 0.95rem;
    line-height: 1.45;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .spec-value--lg {
    font-size: 1.05rem;
    line-height: 1.4;
  }
  @media (min-width: 768px) {
    .spec-value--lg { font-size: 1.15rem; }
  }
  .spec-value strong {
    font-family: var(--font-Gilroy-extra-bold);
  }
  .spec-accent {
    font-style: normal;
    font-family: var(--font-Gilroy-extra-bold);
    color: var(--color-light-primary);
  }
  :is(.dark) .spec-accent {
    color: var(--color-dark-primary);
  }
  .spec-blob {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-light-primary);
    animation: blob-pulse 1.8s ease-in-out infinite;
  }
  :is(.dark) .spec-blob {
    background: var(--color-dark-primary);
  }
  @keyframes blob-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }

  /* Hairline that grows in */
  .hairline-grow {
    height: 1px;
    width: 0;
    background: currentColor;
    opacity: 0.35;
    animation: hairGrow 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both;
  }
  @keyframes hairGrow {
    to { width: 6rem; }
  }

  /* Live pulse badge dot */
  .live-pulse {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-light-primary);
  }
  :is(.dark) .live-pulse { background: var(--color-dark-primary); }
  .live-pulse::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid currentColor;
    opacity: 0.5;
    animation: livePing 1.8s ease-out infinite;
  }
  @keyframes livePing {
    0% { transform: scale(0.6); opacity: 0.7; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  /* Focus list */
  .focus-list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .focus-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-family: var(--font-Gilroy);
    font-size: 0.9rem;
    line-height: 1.5;
    opacity: 0.92;
  }
  .focus-arrow {
    color: var(--color-light-primary);
    font-weight: 700;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
  :is(.dark) .focus-arrow { color: var(--color-dark-primary); }
  .focus-item:hover .focus-arrow {
    transform: translateX(3px);
  }

  /* CoreProc chip */
  .coreproc-chip {
    display: inline-flex;
    align-items: center;
    padding: 1px 8px;
    background: var(--color-light-primary);
    color: var(--color-dark);
    font-family: var(--font-Gilroy-extra-bold);
    font-size: 0.78em;
    letter-spacing: 0.02em;
    border-radius: 3px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
  }
  :is(.dark) .coreproc-chip {
    background: var(--color-dark-primary);
    color: var(--color-dark);
  }
  .coreproc-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px color-mix(in srgb, currentColor 20%, transparent);
  }

  /* Tag row */
  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding-top: 0.25rem;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 999px;
    font-family: var(--font-Mono);
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.85;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }
  .tag:hover {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
  }
  :is(.dark) .tag:hover {
    background: var(--color-dark-primary);
    color: var(--color-dark);
    border-color: var(--color-dark-primary);
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
