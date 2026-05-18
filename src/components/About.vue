<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'about'"
      ref="aboutSection"
      class="relative w-full overflow-x-hidden md:overflow-hidden overflow-y-auto"
      :style="{ height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px` }">
      <div class="about-grid h-full w-full">
        <!-- LEFT: portrait on accent block -->
        <section class="about-left relative dark:bg-dark-primary bg-light-primary text-dark overflow-hidden">
          <!-- Corner meta labels -->
          <div class="absolute top-0 inset-x-0 z-10 flex items-start justify-between px-5 md:px-8 pt-5 md:pt-8 font-Mono text-[10px] tracking-[0.3em] uppercase">
            <span class="flex items-center gap-2">
              <span class="live-dot"></span>
              Portrait
            </span>
            <span class="opacity-70">JR / Angulo</span>
          </div>

          <!-- Portrait — framed by accent block -->
          <div class="portrait-frame group">
            <span class="frame-corner frame-tl"></span>
            <span class="frame-corner frame-tr"></span>
            <span class="frame-corner frame-bl"></span>
            <span class="frame-corner frame-br"></span>
            <LazyImage
              :src="portraitSrc"
              alt="Portrait of John Russel Angulo, photographed in Bulacan"
              class="portrait-img"
              draggable="false"
              @dragstart.prevent />
          </div>

          <!-- Bottom caption -->
          <div class="absolute bottom-0 inset-x-0 z-10 flex items-end justify-between px-5 md:px-8 pb-5 md:pb-8 font-Mono text-[10px] tracking-[0.3em] uppercase">
            <span>— Photographed in Bulacan</span>
            <span class="hidden sm:inline opacity-70">FIG. 01</span>
          </div>
        </section>

        <!-- RIGHT: biography -->
        <section class="about-right relative dark:bg-dark bg-light dark:text-light text-dark md:overflow-y-auto">
          <!-- Subtle dot-grid backdrop -->
          <div class="dot-grid" aria-hidden="true"></div>

          <div class="relative flex flex-col md:justify-between p-6 md:p-10 lg:p-14 gap-6 md:h-full">
            <!-- Top eyebrow -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">
              <span>04 — Biography</span>
              <span class="hidden sm:inline">Issue / 2026</span>
            </div>

            <!-- Headline + body -->
            <div class="space-y-5">
              <h2 class="about-heading font-Gilroy-extra-bold uppercase leading-[0.92]">
                <span class="heading-line"><span class="hl-inner">Designing Seamless</span></span>
                <span class="heading-line"><span class="hl-inner">Journeys, <em class="not-italic dark:text-dark-primary text-light-primary">One</em></span></span>
                <span class="heading-line"><span class="hl-inner"><em class="not-italic dark:text-dark-primary text-light-primary">Pixel</em> At A Time.</span></span>
              </h2>
              <div class="hairline"></div>
              <p class="about-body font-Gilroy text-base sm:text-lg leading-relaxed opacity-90 max-w-2xl">
                I'm Jano — a UI/UX designer and front-end developer from Bulacan with <span class="dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">3+ years</span> building interfaces that feel <em class="not-italic dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">considered</em>.
              </p>
            </div>

            <!-- Stats counter -->
            <div class="stats-row">
              <div class="stat-cell">
                <p class="stat-num">{{ stats.years }}<span class="stat-suffix">+</span></p>
                <p class="stat-label">Years exp.</p>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-cell">
                <p class="stat-num">{{ stats.technologies }}<span class="stat-suffix">+</span></p>
                <p class="stat-label">Technologies</p>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-cell">
                <p class="stat-num">{{ stats.tools }}<span class="stat-suffix">+</span></p>
                <p class="stat-label">Creative Tools</p>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-cell">
                <p class="stat-num">{{ stats.disciplines }}</p>
                <p class="stat-label">Disciplines</p>
              </div>
            </div>

            <!-- Meta facts grid -->
            <div class="meta-grid">
              <div class="meta-cell">
                <p class="meta-label">Based in</p>
                <p class="meta-value">Bulacan · PH</p>
              </div>
              <div class="meta-cell">
                <p class="meta-label">Disciplines</p>
                <p class="meta-value">Web · UI/UX · Motion</p>
              </div>
              <div class="meta-cell">
                <p class="meta-label">Available</p>
                <p class="meta-value flex items-center gap-2"><span class="status-dot"></span> 2026 Onwards</p>
              </div>
            </div>

            <!-- Skill marquee -->
            <div class="marquee" aria-hidden="true">
              <div class="marquee-track">
                <span v-for="n in 2" :key="n" class="marquee-group">
                  <span class="role">Front-End Developer</span><span class="dot">●</span>
                  <span class="role">UI/UX Designer</span><span class="dot">●</span>
                  <span class="role">Video Editor</span><span class="dot">●</span>
                  <span class="role">Vector Artist</span><span class="dot">●</span>
                  <span>HTML</span><span class="dot">●</span>
                  <span>CSS</span><span class="dot">●</span>
                  <span>JavaScript</span><span class="dot">●</span>
                  <span>Vue</span><span class="dot">●</span>
                  <span>React</span><span class="dot">●</span>
                  <span>Next.js</span><span class="dot">●</span>
                  <span>Tailwind</span><span class="dot">●</span>
                  <span>SASS</span><span class="dot">●</span>
                  <span>Laravel</span><span class="dot">●</span>
                  <span>Git</span><span class="dot">●</span>
                  <span>Docker</span><span class="dot">●</span>
                  <span>Figma</span><span class="dot">●</span>
                  <span>Adobe XD</span><span class="dot">●</span>
                  <span>Illustrator</span><span class="dot">●</span>
                  <span>Photoshop</span><span class="dot">●</span>
                  <span>Premiere Pro</span><span class="dot">●</span>
                  <span>After Effects</span><span class="dot">●</span>
                  <span>Wacom</span><span class="dot">●</span>
                </span>
              </div>
            </div>

            <!-- Powered by + CTAs -->
            <div class="flex flex-col gap-5 pt-2">
              <div class="flex items-center gap-3 flex-wrap">
                <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-60">Powered by</p>
                <div class="flex items-center gap-2">
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/vue.svg" alt="Vue.js" loading="lazy" decoding="async" />
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/tailwind.svg" alt="Tailwind CSS" loading="lazy" decoding="async" />
                  <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/swiper-logo.svg" alt="Swiper" loading="lazy" decoding="async" />
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="downloadResume" class="btn-primary">
                  <span>Download CV</span>
                  <i class="fa-solid fa-arrow-down"></i>
                </button>
                <button @click="$emit('changeSlide')" class="btn-ghost">
                  <span>View Works</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script>
  import Resume from '@/assets/img/John_Russel_Angulo_CV_updated.pdf'
  import portraitDark from '@/assets/img/pictures/converted/dark-paper-effect.webp'
  import portraitLight from '@/assets/img/pictures/converted/light-paper-effect.webp'
  import { useThemeStore } from '../store'
  import LazyImage from './LazyImage.vue'

  export default {
    name: 'About',
    components: { LazyImage },
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    emits: ['changeSlide'],
    data() {
      return {
        Resume,
        stats: { years: 0, technologies: 0, tools: 0, disciplines: 0 },
        statsTargets: { years: 3, technologies: 13, tools: 10, disciplines: 4 },
        _countAnimDone: false
      }
    },
    computed: {
      portraitSrc() {
        return useThemeStore().darkMode ? portraitDark : portraitLight
      }
    },
    watch: {
      activeSlide(val) {
        if (val === 'about' && !this._countAnimDone) {
          this.animateStats()
        }
      }
    },
    mounted() {
      if (this.activeSlide === 'about') this.animateStats()
    },
    methods: {
      animateStats() {
        this._countAnimDone = true
        const duration = 1400
        const start = performance.now()
        const targets = this.statsTargets
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          this.stats = {
            years: Math.round(targets.years * eased),
            technologies: Math.round(targets.technologies * eased),
            tools: Math.round(targets.tools * eased),
            disciplines: Math.round(targets.disciplines * eased)
          }
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      downloadResume() {
        const link = document.createElement('a')
        link.href = this.Resume
        link.download = 'John_Russel_Angulo_CV.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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

  /* Split: portrait left 40%, body 60% on desktop */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(360px, 50vh) auto;
  }

  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: 40fr 60fr;
      grid-template-rows: 1fr;
    }
  }

  .about-left {
    animation: slide-in-l 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    min-width: 0;
    overflow: hidden;
  }

  .about-right {
    animation: slide-in-r 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both;
    min-width: 0;
    overflow-x: hidden;
  }

  .about-right > div { min-width: 0; }

  @keyframes slide-in-l {
    from { transform: translateX(-3%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-in-r {
    from { transform: translateX(3%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Live dot in top-left meta */
  .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse-dot 1.6s ease-in-out infinite;
  }

  /* Portrait framed by accent block */
  .portrait-frame {
    position: absolute;
    inset: 3.5rem 1.25rem;
    overflow: hidden;
    z-index: 2;
  }

  @media (min-width: 768px) {
    .portrait-frame { inset: 4.5rem 2rem; }
  }
  @media (min-width: 1024px) {
    .portrait-frame { inset: 5rem 2.5rem; }
  }

  .portrait-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  }

  .portrait-frame:hover .portrait-img {
    transform: scale(1.04);
  }

  /* Portrait corner brackets — matches loader brand */
  .frame-corner {
    position: absolute;
    width: 28px;
    height: 28px;
    z-index: 3;
    pointer-events: none;
    color: currentColor;
  }
  .frame-tl { top: 10px; left: 10px;     border-top: 2px solid currentColor; border-left: 2px solid currentColor; }
  .frame-tr { top: 10px; right: 10px;    border-top: 2px solid currentColor; border-right: 2px solid currentColor; }
  .frame-bl { bottom: 10px; left: 10px;  border-bottom: 2px solid currentColor; border-left: 2px solid currentColor; }
  .frame-br { bottom: 10px; right: 10px; border-bottom: 2px solid currentColor; border-right: 2px solid currentColor; }

  /* Dot-grid backdrop on right panel */
  .dot-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(currentColor 1px, transparent 1px);
    background-size: 22px 22px;
    opacity: 0.05;
    mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  }

  /* Headline — fluid, tight + reveal */
  .about-heading {
    font-size: clamp(1.75rem, 3.6vw, 3.25rem);
    letter-spacing: -0.025em;
  }
  .heading-line {
    display: block;
    overflow: hidden;
  }
  .hl-inner {
    display: inline-block;
    transform: translateY(105%);
    animation: hl-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .heading-line:nth-child(1) .hl-inner { animation-delay: 0.2s; }
  .heading-line:nth-child(2) .hl-inner { animation-delay: 0.32s; }
  .heading-line:nth-child(3) .hl-inner { animation-delay: 0.44s; }
  @keyframes hl-rise {
    to { transform: translateY(0); }
  }

  .about-body {
    text-wrap: pretty;
  }

  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
  }

  /* Stats row */
  .stats-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem 0;
  }
  .stat-cell {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 70px;
  }
  .stat-num {
    font-family: var(--font-Gilroy-extra-bold);
    font-size: clamp(1.6rem, 2.4vw, 2.25rem);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--color-light-primary);
  }
  :is(.dark) .stat-num { color: var(--color-dark-primary); }
  .stat-suffix {
    font-size: 0.7em;
    opacity: 0.7;
    margin-left: 2px;
  }
  .stat-label {
    font-family: var(--font-Mono);
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    opacity: 0.55;
  }
  .stat-divider {
    width: 1px;
    height: 28px;
    background: currentColor;
    opacity: 0.18;
  }

  /* Meta facts */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 2rem;
    border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    padding: 1.25rem 0;
  }
  @media (min-width: 1024px) {
    .meta-grid {
      grid-template-columns: repeat(3, max-content);
      justify-content: start;
      gap: 1.25rem 3rem;
    }
  }
  .meta-cell {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .meta-label {
    font-family: var(--font-Mono);
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.55;
  }
  .meta-value {
    font-family: var(--font-Gilroy);
    font-size: 0.95rem;
    letter-spacing: -0.005em;
  }
  .status-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: var(--color-light-primary);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  :is(.dark) .status-dot {
    background: var(--color-dark-primary);
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.5; }
  }

  /* Marquee */
  .marquee {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    border-top: 1px solid color-mix(in oklab, currentcolor 10%, transparent);
    border-bottom: 1px solid color-mix(in oklab, currentcolor 10%, transparent);
    padding: 1rem 0;
    flex-shrink: 0;
    line-height: 1;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }
  .marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee 55s linear infinite;
  }
  .marquee:hover .marquee-track {
    animation-play-state: paused;
  }
  .marquee-group .role {
    color: var(--color-light-primary);
    font-weight: 700;
  }
  :is(.dark) .marquee-group .role {
    color: var(--color-dark-primary);
  }
  .marquee-group {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    padding-right: 1.5rem;
    font-family: var(--font-Mono);
    font-size: 0.75rem;
    line-height: 1.4;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .marquee-group .dot {
    color: var(--color-light-primary);
    font-size: 0.5rem;
  }
  :is(.dark) .marquee-group .dot { color: var(--color-dark-primary); }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* Buttons */
  .btn-primary,
  .btn-ghost {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.85rem 1.5rem;
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    border-radius: 0;
    overflow: hidden;
  }

  .btn-primary {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
  }
  :is(.dark) .btn-primary {
    background: var(--color-dark-primary);
    color: var(--color-dark);
    border-color: var(--color-dark-primary);
  }
  .btn-primary:hover {
    background: var(--color-dark);
    color: var(--color-light-primary);
    border-color: var(--color-dark);
  }
  :is(.dark) .btn-primary:hover {
    background: var(--color-dark-card);
    color: var(--color-dark-primary);
    border-color: var(--color-dark-card);
  }

  .btn-ghost {
    background: transparent;
    color: currentColor;
    border: 1px solid currentColor;
  }
  .btn-ghost:hover {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
  }
  :is(.dark) .btn-ghost:hover {
    background: var(--color-dark-primary);
    color: var(--color-dark);
    border-color: var(--color-dark-primary);
  }

  .btn-primary :deep(i),
  .btn-ghost :deep(i) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-primary:hover :deep(i.fa-arrow-down) {
    transform: translateY(2px);
  }
  .btn-ghost:hover :deep(i.fa-arrow-right) {
    transform: translateX(3px);
  }

  /* ===== Mobile ===== */
  @media (max-width: 767px) {
    .about-grid {
      grid-template-rows: 420px auto;
      height: auto !important;
      min-height: 100%;
    }
    .about-right {
      overflow: visible !important;
    }
    .about-left {
      overflow: hidden;
    }

    .portrait-frame {
      inset: 3rem 1rem;
    }
    .frame-corner {
      width: 20px;
      height: 20px;
    }
    .frame-tl { top: 6px; left: 6px; }
    .frame-tr { top: 6px; right: 6px; }
    .frame-bl { bottom: 6px; left: 6px; }
    .frame-br { bottom: 6px; right: 6px; }

    .about-heading {
      font-size: clamp(1.5rem, 8vw, 2.25rem);
    }

    .about-body {
      font-size: 0.95rem;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem 1.25rem;
      padding: 1rem 0;
      border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
      border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    }
    .stat-cell {
      min-width: 0;
      flex: initial;
      gap: 0.25rem;
    }
    .stat-num {
      font-size: 1.6rem;
    }
    .stat-label {
      font-size: 0.58rem;
      letter-spacing: 0.22em;
    }
    .stat-divider {
      display: none;
    }

    .meta-grid {
      gap: 0.9rem 1.25rem;
      padding: 1rem 0;
    }
    .meta-label {
      font-size: 0.55rem;
      letter-spacing: 0.24em;
    }
    .meta-value {
      font-size: 0.85rem;
    }

    .marquee {
      padding: 0.75rem 0;
    }
    .marquee-group {
      font-size: 0.65rem;
      gap: 1rem;
      padding-right: 1rem;
      letter-spacing: 0.22em;
    }

    .btn-primary,
    .btn-ghost {
      padding: 0.75rem 1.1rem;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
    }
  }

  @media (max-width: 380px) {
    .stats-row {
      gap: 0.5rem;
    }
    .stat-num {
      font-size: 1.2rem;
    }
    .meta-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
