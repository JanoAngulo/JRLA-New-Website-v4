<template>
  <div
    ref="aboutSection"
    :class="['relative w-full overflow-x-hidden md:overflow-hidden overflow-y-auto app-slide', { 'is-active': activeSlide === 'about' }]">
    <div class="grid grid-cols-1 grid-rows-[420px_auto] min-h-full w-full md:grid-cols-[40fr_60fr] md:grid-rows-1 md:h-full">
      <!-- LEFT: portrait on accent block -->
      <section data-accent-surface class="about-left relative dark:bg-dark-primary bg-light-primary text-dark overflow-hidden">
        <!-- Corner meta labels -->
        <div class="absolute top-0 inset-x-0 z-10 flex items-start justify-between px-5 md:px-8 pt-5 md:pt-8 font-Mono text-[10px] tracking-[0.3em] uppercase" data-reveal="fade" data-reveal-at="0.12" data-reveal-y="-8">
          <span class="flex items-center gap-2">
            <span class="live-dot"></span>
            Portrait
          </span>
          <span class="opacity-90">JR / Angulo</span>
        </div>

        <!-- Portrait — framed by accent block -->
        <div class="portrait-plate group absolute inset-x-4 inset-y-12 md:inset-x-8 md:inset-y-18 lg:inset-x-10 lg:inset-y-20 overflow-hidden z-2" data-reveal="draw" data-reveal-at="0.06">
          <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 top-1.5 left-1.5 md:top-2.5 md:left-2.5 border-t-2 border-l-2 border-current"></span>
          <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 top-1.5 right-1.5 md:top-2.5 md:right-2.5 border-t-2 border-r-2 border-current"></span>
          <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 bottom-1.5 left-1.5 md:bottom-2.5 md:left-2.5 border-b-2 border-l-2 border-current"></span>
          <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 border-b-2 border-r-2 border-current"></span>
          <LazyImage
            :src="portraitSrc"
            alt="Portrait of John Russel Angulo, photographed in Bulacan"
            class="w-full h-full object-cover object-top select-none pointer-events-none [-webkit-user-drag:none] hover-fine:group-hover:scale-[1.04]"
            draggable="false"
            @dragstart.prevent />
        </div>

        <!-- Bottom caption -->
        <div class="absolute bottom-0 inset-x-0 z-10 flex items-end justify-between px-5 md:px-8 pb-5 md:pb-8 font-Mono text-[10px] tracking-[0.3em] uppercase" data-reveal="fade" data-reveal-at="0.16">
          <span>— Photographed in Bulacan</span>
          <span class="hidden sm:inline opacity-90">FIG. 01</span>
        </div>
      </section>

      <!-- RIGHT: biography -->
      <section data-pan-scroll class="about-right relative dark:bg-dark bg-light dark:text-light text-dark md:overflow-y-auto" data-reveal="slide" data-reveal-x="3" data-reveal-at="0.06">
        <!-- Subtle dot-grid backdrop -->
        <div class="dot-grid bg-size-[22px_22px]" aria-hidden="true"></div>

        <div class="relative flex flex-col md:justify-between p-6 md:p-10 lg:p-14 gap-6 md:h-full min-w-0">
          <!-- Top eyebrow -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase" data-reveal="fade" data-reveal-at="0.06" data-reveal-o="0.7">
            <span>04 — Biography</span>
            <span class="hidden sm:inline">Issue / 2026</span>
          </div>

          <!-- Headline + body -->
          <div class="space-y-5">
            <h2 class="text-[clamp(1.5rem,8vw,2.25rem)] md:text-[clamp(1.75rem,3.6vw,3.25rem)] tracking-[-0.025em] font-Gilroy-extra-bold uppercase leading-[0.92]">
              <span class="heading-line"><span class="hl-inner" data-reveal="line" data-reveal-at="0.08">Designing Seamless</span></span>
              <span class="heading-line"><span class="hl-inner" data-reveal="line" data-reveal-at="0.14">Journeys, <em class="not-italic dark:text-dark-primary text-light-primary">One</em></span></span>
              <span class="heading-line"><span class="hl-inner" data-reveal="line" data-reveal-at="0.2"><em class="not-italic dark:text-dark-primary text-light-primary">Pixel</em> At A Time.</span></span>
            </h2>
            <div class="hairline rule-draw" data-reveal="draw" data-reveal-at="0.24"></div>
            <p class="font-Gilroy text-[0.95rem] md:text-lg leading-relaxed opacity-90 max-w-2xl text-pretty">
              <span class="inline-block" data-reveal="fade" data-reveal-at="0.14">I'm Jano — a UI/UX designer and front-end developer from Bulacan </span><span class="inline-block" data-reveal="fade" data-reveal-at="0.18">with <span class="dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">3+ years</span> building interfaces </span><span class="inline-block" data-reveal="fade" data-reveal-at="0.22">that feel <em class="not-italic dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">considered</em>.</span>
            </p>
          </div>

          <!-- Stats counter -->
          <div class="grid grid-cols-2 items-start gap-x-5 gap-y-4 max-[380px]:gap-2 border-y border-current/12 py-4 md:flex md:flex-wrap md:items-center md:gap-4 md:border-0">
            <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]" data-reveal="fade" data-reveal-at="0.1">
              <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.years }}<span class="text-[0.7em] ml-0.5">+</span></p>
              <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-65">Years exp.</p>
            </div>
            <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
            <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]" data-reveal="fade" data-reveal-at="0.14">
              <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.technologies }}<span class="text-[0.7em] ml-0.5">+</span></p>
              <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-65">Technologies</p>
            </div>
            <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
            <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]" data-reveal="fade" data-reveal-at="0.18">
              <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.tools }}<span class="text-[0.7em] ml-0.5">+</span></p>
              <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-65">Creative Tools</p>
            </div>
            <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
            <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]" data-reveal="fade" data-reveal-at="0.22">
              <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.disciplines }}</p>
              <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-65">Disciplines</p>
            </div>
          </div>

          <!-- Meta facts grid -->
          <div class="grid grid-cols-2 max-[380px]:grid-cols-1 gap-x-5 gap-y-[0.9rem] md:gap-x-8 md:gap-y-5 lg:grid-cols-[repeat(3,max-content)] lg:justify-start lg:gap-x-12 border-y border-current/12 py-4 md:py-5">
            <div class="flex flex-col gap-[0.35rem]" data-reveal="fade" data-reveal-at="0.12">
              <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-65">Based in</p>
              <p class="font-Gilroy text-[0.85rem] md:text-[0.95rem] tracking-[-0.005em]">Bulacan · PH</p>
            </div>
            <div class="flex flex-col gap-[0.35rem]" data-reveal="fade" data-reveal-at="0.16">
              <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-65">Disciplines</p>
              <p class="font-Gilroy text-[0.85rem] md:text-[0.95rem] tracking-[-0.005em]">Web · UI/UX · Motion</p>
            </div>
            <div class="flex flex-col gap-[0.35rem]" data-reveal="fade" data-reveal-at="0.2">
              <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-65">Available</p>
              <p class="font-Gilroy text-[0.85rem] md:text-[0.95rem] tracking-[-0.005em] flex items-center gap-2"><span class="status-dot"></span> 2026 Onwards</p>
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
                <span>GSAP</span><span class="dot">●</span>
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
            <div class="flex items-center gap-3 flex-wrap" data-reveal="fade" data-reveal-at="0.12">
              <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-65">Powered by</p>
              <div class="flex items-center gap-2">
                <!-- width/height are each SVG's own viewBox, so the browser can
                     reserve the right box before the file arrives. `h-5 w-auto`
                     still drives the rendered size. -->
                <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/vue.svg" alt="Vue.js" width="50" height="44" loading="lazy" decoding="async" />
                <img class="h-5 w-auto opacity-90" src="@/assets/img/features/frontend/tailwind.svg" alt="Tailwind CSS" width="70" height="43" loading="lazy" decoding="async" />
                <!-- GSAP ships two fills, so it swaps with the theme like the Features grid does. -->
                <img class="h-5 w-auto opacity-90" :src="gsapSrc" alt="GSAP" width="82" height="30" loading="lazy" decoding="async" />
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="downloadResume"
                class="btn btn-primary group px-[1.1rem] py-3 md:px-6 tracking-[0.2em] md:tracking-[0.25em]">
                <span>Download CV</span>
                <i class="fa-solid fa-arrow-down transition-transform duration-250 ease-in-out hover-fine:group-hover:translate-y-0.5" aria-hidden="true"></i>
              </button>
              <button
                @click="$emit('changeSlide')"
                class="btn btn-ghost group px-[1.1rem] py-3 md:px-6 tracking-[0.2em] md:tracking-[0.25em]">
                <span>View Works</span>
                <i class="fa-solid fa-arrow-right transition-transform duration-250 ease-in-out hover-fine:group-hover:translate-x-[3px]" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  const Resume = '/downloads/Angulo-John-Russel-CV.pdf'
  import portraitDark from '@/assets/img/pictures/converted/dark-paper-effect.webp'
  import portraitLight from '@/assets/img/pictures/converted/light-paper-effect.webp'
  import gsap from '@/assets/img/features/frontend/gsap.svg'
  import gsapLight from '@/assets/img/features/frontend/gsap-light.svg'
  import { useThemeStore } from '../store'
  import LazyImage from './LazyImage.vue'

  import { panelEntrance } from '../composables/panelEntrance'

  export default {
    name: 'About',
    components: { LazyImage },
    mixins: [panelEntrance('about')],
    props: {
      activeSlide: String,
      settledSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    emits: ['changeSlide'],
    data() {
      return {
        Resume,
        stats: { years: 0, technologies: 0, tools: 0, disciplines: 0 },
        statsTargets: { years: 3, technologies: 14, tools: 10, disciplines: 4 }
      }
    },
    computed: {
      portraitSrc() {
        return useThemeStore().darkMode ? portraitDark : portraitLight
      },
      gsapSrc() {
        return useThemeStore().darkMode ? gsapLight : gsap
      }
    },
    watch: {
      // Re-count on every entry so the stat counters replay with the section.
      activeSlide(val) {
        if (val === 'about') this.animateStats()
      }
    },
    mounted() {
      if (this.activeSlide === 'about') this.animateStats()
    },
    beforeUnmount() {
      if (this._statsRaf) cancelAnimationFrame(this._statsRaf)
    },
    methods: {
      animateStats() {
        // Counting digits is motion, and it replays on every entry, so reduced
        // motion gets the final numbers outright.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.stats = { ...this.statsTargets }
          return
        }
        // Re-entering mid-count would otherwise leave two rAF chains writing the
        // same four values, racing to a flickering result.
        if (this._statsRaf) cancelAnimationFrame(this._statsRaf)

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
          this._statsRaf = t < 1 ? requestAnimationFrame(step) : null
        }
        this._statsRaf = requestAnimationFrame(step)
      },
      downloadResume() {
        const link = document.createElement('a')
        link.href = this.Resume
        link.download = 'Angulo-John-Russel-CV.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="css" scoped>
  /* The entrance lives in panelEntrance.js; these two only keep the containment
     the layout needs. `.about-right` carries `data-reveal="slide"`; the accent
     half deliberately does not — it is the fixed ground the entrance happens
     against, present from the first frame. */
  .about-left {
    min-width: 0;
    overflow: hidden;
  }
  .about-right {
    min-width: 0;
    overflow-x: hidden;
  }

  /* Deliberately static: `.status-dot` below is already the panel's one pulsing
     element, and two loops at different tempos read as a glitch. */
  .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }


  /* Headline mask. The per-line delays used to live in these nth-child rules;
     they are `data-reveal-at` on the lines themselves now, next to the words. */
  .heading-line {
    display: block;
    overflow: hidden;
  }
  .hl-inner {
    display: inline-block;
  }

  /* A standalone rule draws rather than appears — the same gesture as Home's
     seam. Defaulting the var to 1 leaves it drawn without JS. */
  .rule-draw {
    transform: scaleX(var(--reveal-draw, 1));
    transform-origin: left;
  }

  /* The portrait is a plate being exposed, not a box fading in: it wipes down
     from its own top edge, corner brackets included, because they sit inside
     the clip. A fade would have made it one more panel element; this makes it
     the subject. Clip is bounded to this one element, and `draw` is what lets
     CSS pick the gesture — GSAP only supplies the 0→1. */
  .portrait-plate {
    clip-path: inset(0 0 calc((1 - var(--reveal-draw, 1)) * 100%) 0);
  }

  /* Gated on the panel being on screen: an ungated loop animates for the whole
     session behind other panels. */
  .is-active .status-dot {
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

  /* ===== Mobile ===== */
  @media (max-width: 767px) {
    .about-right {
      overflow: visible !important;
    }
    .about-left {
      overflow: hidden;
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
  }
</style>
