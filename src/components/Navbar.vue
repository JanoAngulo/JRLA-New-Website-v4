<template>
  <nav id="mainNavbar" class="fixed top-0 left-0 w-full select-none dark:bg-dark/95 bg-light/95 backdrop-blur-md border-b border-black/10 dark:border-white/10" style="z-index: var(--z-nav);">
    <div class="flex items-center justify-between gap-2 px-3 sm:px-6 lg:px-10 h-14">
      <!-- Brand monogram → home -->
      <button
        @click="goTo(0)"
        aria-label="Home"
        class="flex items-center gap-2 group cursor-pointer min-h-11 sm:min-h-0">
        <svg class="h-6 w-auto transition-colors duration-300 dark:fill-dark-primary fill-light-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 745.03 831.62">
          <g>
            <polygon points="347.69 0 347.69 831.62 322.85 817.28 298.02 802.93 273.18 788.6 248.35 774.25 223.52 759.91 198.68 745.57 173.84 731.25 149.02 716.9 124.17 702.59 99.34 688.23 74.5 673.89 49.67 659.55 24.86 645.23 0 630.88 0 401.47 24.84 415.81 49.67 430.15 49.67 602.2 74.53 616.55 99.34 630.88 124.17 645.23 149.02 659.55 173.84 673.91 223.52 702.59 248.35 716.92 273.18 731.25 298.02 745.59 298.02 28.68 322.85 14.34 347.69 0"></polygon>
            <polygon points="745.03 401.47 745.03 630.88 720.2 645.23 695.37 659.55 670.53 673.9 620.86 702.58 596.03 716.92 571.19 731.26 546.36 745.59 521.53 759.93 496.69 774.27 447.02 802.94 422.19 817.28 397.35 831.62 397.35 0 422.19 14.34 447.02 28.69 447.02 745.59 471.86 731.26 496.69 716.92 521.53 702.58 546.36 688.23 571.19 673.9 596.03 659.55 620.86 645.23 645.7 630.88 670.53 616.55 695.37 602.2 695.37 430.15 720.2 415.81 745.03 401.47"></polygon>
            <path d="M391,195.88l-24.84,14.34-24.83,14.33-24.84,14.34-24.83,14.34-24.84,14.34V697.73l24.84,14.34,24.83,14.34V525.66l24.82-14.34L366.16,497V755.08L391,769.42l24.83,14.34V497L391,482.65l24.83-14.34V181.54ZM366.16,439.64,341.31,454l-24.82,14.34v-172l24.84-14.35,24.83-14.33Z" transform="translate(-167.48 -124.19)"></path>
            <path d="M788.35,253.23l-24.84-14.32-24.83-14.36-24.84-14.32L689,195.9l-24.84-14.34V783.74L689,769.42l24.85-14.35V497l24.85,14.35,24.82,14.34V726.39l49.67-28.68V267.58ZM763.51,468.31,738.69,454l-24.85-14.33V267.57l24.84,14.34,24.83,14.35Z" transform="translate(-167.48 -124.19)"></path>
          </g>
        </svg>
        <span class="hidden sm:inline text-[10px] tracking-[0.3em] uppercase font-Mono text-dark dark:text-light opacity-75 group-hover:opacity-100 transition-opacity">JRLA</span>
      </button>

      <!-- Section index -->
      <div class="flex items-center gap-0.5 sm:gap-3">
        <button
          v-for="item in items"
          :key="item.idx"
          @click="goTo(item.idx)"
          :aria-current="activeSlide === item.idx ? 'page' : undefined"
          :aria-label="item.label"
          :class="[
            'group relative flex items-center justify-center gap-1.5 px-2 sm:px-3 min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-Mono transition-colors duration-300 cursor-pointer',
            activeSlide === item.idx
              ? 'font-semibold dark:text-dark-primary text-dark'
              : 'opacity-75 hover:opacity-100 dark:text-light text-dark'
          ]">
          <span class="tabular-nums opacity-85">0{{ item.idx + 1 }}</span>
          <span class="hidden sm:inline">{{ item.label }}</span>
          <span
            class="absolute bottom-2 sm:-bottom-0.5 left-2 right-2 sm:left-3 sm:right-3 h-0.5 transition-transform duration-300 origin-left dark:bg-dark-primary bg-light-primary"
            :class="activeSlide === item.idx ? 'scale-x-100' : 'scale-x-0'"></span>
        </button>
      </div>

      <!-- Theme cycle: system → light → dark → system -->
      <button
        @click="cycleTheme"
        :aria-label="themeButtonLabel"
        :title="themeButtonLabel"
        class="grid place-content-center w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-black/40 dark:border-white/40 hover:dark:border-dark-primary hover:border-light-primary transition-colors duration-300 cursor-pointer">
        <i v-if="systemTheme.mode === 'system'" class="fa-solid fa-desktop text-xs dark:text-dark-primary text-light-primary"></i>
        <i v-else-if="systemTheme.mode === 'light'" class="fa-solid fa-sun text-xs text-light-primary"></i>
        <i v-else class="fa-solid fa-moon text-xs dark:text-dark-primary"></i>
      </button>
    </div>
  </nav>
</template>

<script>
  import { useThemeStore } from '../store'
  export default {
    name: 'Navbar',
    props: {
      activeSlide: Number
    },
    data() {
      return {
        items: [
          { idx: 0, label: 'Index' },
          { idx: 1, label: 'Features' },
          { idx: 2, label: 'Works' },
          { idx: 3, label: 'About' },
          { idx: 4, label: 'Contact' }
        ]
      }
    },
    computed: {
      systemTheme() {
        return useThemeStore()
      },
      themeButtonLabel() {
        const next = { system: 'light', light: 'dark', dark: 'system' }[this.systemTheme.mode] || 'system'
        const current = this.systemTheme.mode === 'system' ? `system (${this.systemTheme.currentTheme})` : this.systemTheme.mode
        return `Theme: ${current}. Click to switch to ${next}.`
      }
    },
    methods: {
      goTo(idx) {
        const swiper = document.querySelector('.app-slider')?.swiper
        if (swiper) swiper.slideTo(idx)
      },
      cycleTheme() {
        useThemeStore().cycleMode()
      }
    }
  }
</script>
