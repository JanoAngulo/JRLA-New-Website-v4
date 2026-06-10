<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'about'"
      ref="aboutSection"
      class="relative w-full overflow-x-hidden md:overflow-hidden overflow-y-auto app-slide">
      <div class="grid grid-cols-1 grid-rows-[420px_auto] min-h-full w-full md:grid-cols-[40fr_60fr] md:grid-rows-1 md:h-full">
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
          <div class="group absolute inset-x-4 inset-y-12 md:inset-x-8 md:inset-y-18 lg:inset-x-10 lg:inset-y-20 overflow-hidden z-2">
            <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 top-1.5 left-1.5 md:top-2.5 md:left-2.5 border-t-2 border-l-2 border-current"></span>
            <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 top-1.5 right-1.5 md:top-2.5 md:right-2.5 border-t-2 border-r-2 border-current"></span>
            <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 bottom-1.5 left-1.5 md:bottom-2.5 md:left-2.5 border-b-2 border-l-2 border-current"></span>
            <span class="absolute z-3 pointer-events-none w-5 h-5 md:w-7 md:h-7 bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 border-b-2 border-r-2 border-current"></span>
            <LazyImage
              :src="portraitSrc"
              alt="Portrait of John Russel Angulo, photographed in Bulacan"
              class="w-full h-full object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] select-none pointer-events-none [-webkit-user-drag:none] group-hover:scale-[1.04]"
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
          <div class="dot-grid bg-size-[22px_22px]" aria-hidden="true"></div>

          <div class="relative flex flex-col md:justify-between p-6 md:p-10 lg:p-14 gap-6 md:h-full min-w-0">
            <!-- Top eyebrow -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">
              <span>04 — Biography</span>
              <span class="hidden sm:inline">Issue / 2026</span>
            </div>

            <!-- Headline + body -->
            <div class="space-y-5">
              <h2 class="text-[clamp(1.5rem,8vw,2.25rem)] md:text-[clamp(1.75rem,3.6vw,3.25rem)] tracking-[-0.025em] font-Gilroy-extra-bold uppercase leading-[0.92]">
                <span class="heading-line"><span class="hl-inner">Designing Seamless</span></span>
                <span class="heading-line"><span class="hl-inner">Journeys, <em class="not-italic dark:text-dark-primary text-light-primary">One</em></span></span>
                <span class="heading-line"><span class="hl-inner"><em class="not-italic dark:text-dark-primary text-light-primary">Pixel</em> At A Time.</span></span>
              </h2>
              <div class="hairline"></div>
              <p class="font-Gilroy text-[0.95rem] md:text-lg leading-relaxed opacity-90 max-w-2xl text-pretty">
                I'm Jano — a UI/UX designer and front-end developer from Bulacan with <span class="dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">3+ years</span> building interfaces that feel <em class="not-italic dark:text-dark-primary text-light-primary font-Gilroy-extra-bold">considered</em>.
              </p>
            </div>

            <!-- Stats counter -->
            <div class="grid grid-cols-2 items-start gap-x-5 gap-y-4 max-[380px]:gap-2 border-y border-current/12 py-4 md:flex md:flex-wrap md:items-center md:gap-4 md:border-0">
              <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]">
                <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.years }}<span class="text-[0.7em] opacity-70 ml-0.5">+</span></p>
                <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-[0.55]">Years exp.</p>
              </div>
              <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
              <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]">
                <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.technologies }}<span class="text-[0.7em] opacity-70 ml-0.5">+</span></p>
                <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-[0.55]">Technologies</p>
              </div>
              <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
              <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]">
                <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.tools }}<span class="text-[0.7em] opacity-70 ml-0.5">+</span></p>
                <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-[0.55]">Creative Tools</p>
              </div>
              <div class="hidden md:block w-px h-7 bg-current opacity-[0.18]"></div>
              <div class="flex flex-col gap-1 min-w-0 md:min-w-[70px]">
                <p class="font-Gilroy-extra-bold text-[1.6rem] md:text-[clamp(1.6rem,2.4vw,2.25rem)] max-[380px]:text-[1.2rem] leading-none tracking-[-0.02em] text-light-primary dark:text-dark-primary">{{ stats.disciplines }}</p>
                <p class="font-Mono text-[0.58rem] md:text-[0.6rem] tracking-[0.22em] md:tracking-[0.28em] uppercase opacity-[0.55]">Disciplines</p>
              </div>
            </div>

            <!-- Meta facts grid -->
            <div class="grid grid-cols-2 max-[380px]:grid-cols-1 gap-x-5 gap-y-[0.9rem] md:gap-x-8 md:gap-y-5 lg:grid-cols-[repeat(3,max-content)] lg:justify-start lg:gap-x-12 border-y border-current/12 py-4 md:py-5">
              <div class="flex flex-col gap-[0.35rem]">
                <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-[0.55]">Based in</p>
                <p class="font-Gilroy text-[0.85rem] md:text-[0.95rem] tracking-[-0.005em]">Bulacan · PH</p>
              </div>
              <div class="flex flex-col gap-[0.35rem]">
                <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-[0.55]">Disciplines</p>
                <p class="font-Gilroy text-[0.85rem] md:text-[0.95rem] tracking-[-0.005em]">Web · UI/UX · Motion</p>
              </div>
              <div class="flex flex-col gap-[0.35rem]">
                <p class="font-Mono text-[0.55rem] md:text-[0.625rem] tracking-[0.24em] md:tracking-[0.3em] uppercase opacity-[0.55]">Available</p>
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
                <button
                  @click="downloadResume"
                  class="btn-primary group relative inline-flex items-center justify-center gap-[0.6rem] overflow-hidden cursor-pointer font-Mono uppercase px-[1.1rem] py-3 md:px-6 md:py-[0.85rem] text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] md:tracking-[0.25em]">
                  <span>Download CV</span>
                  <i class="fa-solid fa-arrow-down transition-transform duration-250 ease-in-out group-hover:translate-y-0.5"></i>
                </button>
                <button
                  @click="$emit('changeSlide')"
                  class="btn-ghost group relative inline-flex items-center justify-center gap-[0.6rem] overflow-hidden cursor-pointer font-Mono uppercase px-[1.1rem] py-3 md:px-6 md:py-[0.85rem] text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] md:tracking-[0.25em]">
                  <span>View Works</span>
                  <i class="fa-solid fa-arrow-right transition-transform duration-250 ease-in-out group-hover:translate-x-[3px]"></i>
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
  const Resume = '/downloads/Angulo-John-Russel-CV.pdf'
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
        link.download = 'Angulo-John-Russel-CV.pdf'
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


  /* Headline reveal animation */
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
