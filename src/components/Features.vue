<template>
  <div
    ref="featuresSection"
    class="relative w-full overflow-hidden app-slide">
    <!-- Scroll-feed -->
    <div
      data-pan-scroll
      class="relative w-full overflow-y-auto pb-6 dark:text-light text-dark h-full">
      <header class="px-6 pt-6 md:px-10 md:pt-10 lg:px-14 lg:pt-14">
        <div data-scrub data-scrub-entry data-scrub-y="20" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-current/12">
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-80">02 — Practice</p>
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">{{ portfolioData.portfolio.features.length }} Disciplines</p>
        </div>
      </header>

      <article
        v-for="(item, i) in portfolioData.portfolio.features"
        :key="item.id"
        class="grid grid-cols-1 gap-8 px-6 py-12 border-b border-current/10 last:border-b-0 last:pb-6 md:gap-12 md:px-10 md:py-16 md:items-start lg:gap-16 lg:px-14 lg:py-20"
        :class="i % 2 === 1 ? 'md:grid-cols-[7fr_5fr]' : 'md:grid-cols-[5fr_7fr]'">
        <!-- Visual column: accent block -->
        <div data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-y="48" class="scrub-el relative hidden md:flex md:flex-col" :class="{ 'md:order-2': i % 2 === 1 }">
          <div data-accent-surface class="ex-art relative w-full aspect-square max-h-[560px] overflow-hidden flex items-end justify-center sm:aspect-4/5 md:aspect-3/4 md:min-h-[480px] md:max-h-[640px] lg:max-h-[720px] dark:bg-dark-primary bg-light-primary">
            <LazyImage :src="item.img[0]" :alt="item.title + ' illustration'" :eager="i === 0" draggable="false" @dragstart.prevent />
          </div>
        </div>

        <!-- Content column -->
        <div class="flex flex-col gap-4">
          <p data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-y="24" class="scrub-el font-Mono text-xs tracking-[0.35em] uppercase opacity-65">— {{ ids[item.id] }}</p>
          <h3 class="text-[clamp(2.5rem,5.5vw,4.5rem)] tracking-[-0.03em] font-Gilroy-extra-bold uppercase leading-[0.9]">
            <span class="reveal-line leading-none"><span data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-fade="0" data-scrub-y="105" data-scrub-start="0.80" data-scrub-end="0.48" class="etl-inner">{{ item.title.split(' ')[0] }}</span></span>
            <span class="reveal-line leading-none"><span data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-fade="0" data-scrub-y="105" data-scrub-start="0.76" data-scrub-end="0.44" class="etl-inner dark:text-dark-primary text-light-primary">{{ item.title.split(' ').slice(1).join(' ') }}</span></span>
          </h3>
          <div class="hairline my-2"></div>
          <div data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-y="30" class="scrub-el ex-prose" v-html="item.description"></div>

          <div data-scrub :data-scrub-entry="i === 0 ? '' : undefined" data-scrub-y="34" data-scrub-start="0.88" data-scrub-end="0.56" class="scrub-el pt-4">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-65 mb-3">Toolkit · {{ featureAsset[item.id]?.length || 0 }}</p>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-3">
              <div
                v-for="(t, j) in featureAsset[item.id]"
                :key="j"
                class="tool-pill"
                :title="t.name">
                <img :src="t.src" :alt="t.name" loading="lazy" class="max-w-[65%] max-h-[65%] w-auto h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import { useThemeStore } from '../store'
  import portfolioData from './PortfolioData'
  import LazyImage from './LazyImage.vue'
  import { createScrollScrub } from '../composables/useScrollScrub'

  // FRONTEND
  import html from '@/assets/img/features/frontend/html.svg'
  import htmlLight from '@/assets/img/features/frontend/html-light.svg'
  import css from '@/assets/img/features/frontend/css.svg'
  import cssLight from '@/assets/img/features/frontend/css-light.svg'
  import js from '@/assets/img/features/frontend/js.svg'
  import jsLight from '@/assets/img/features/frontend/js-light.svg'
  import sass from '@/assets/img/features/frontend/sass.svg'
  import tailwind from '@/assets/img/features/frontend/tailwind.svg'
  import bootstrap from '@/assets/img/features/frontend/bootstrap.svg'
  import laravel from '@/assets/img/features/frontend/laravel.svg'
  import git from '@/assets/img/features/frontend/git.svg'
  import docker from '@/assets/img/features/frontend/docker.svg'
  import vue from '@/assets/img/features/frontend/vue.svg'
  import nextjs from '@/assets/img/features/frontend/nextjs.svg'
  import lightNextJs from '@/assets/img/features/frontend/light-nextjs.svg'
  import reactjs from '@/assets/img/features/frontend/react.svg'
  import claude from '@/assets/img/features/frontend/claude.svg'

  // UI/UX
  import figma from '@/assets/img/features/uiux/figma.svg'
  import xd from '@/assets/img/features/uiux/xd.svg'
  import illustrator from '@/assets/img/features/uiux/illustrator.svg'

  // Videos
  import premiere from '@/assets/img/features/video/premiere.svg'
  import afterEffects from '@/assets/img/features/video/after-effects.svg'
  import mediaEncoder from '@/assets/img/features/video/media-encoder.svg'

  // Vector
  import photoshop from '@/assets/img/features/vector/photoshop.svg'
  import wacom from '@/assets/img/features/vector/wacom.svg'
  import lightwacom from '@/assets/img/features/vector/light-wacom.svg'

  export default {
    name: 'Features',
    components: { LazyImage },
    props: {
      activeSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    data() {
      return {
        portfolioData,
        ids: {
          frontend: 'Web · Front-end',
          uiux: 'Product · UI/UX',
          videos: 'Motion · Video',
          vector: 'Illustration · Vector'
        },
        featureAsset: {
          frontend: [],
          uiux: [],
          videos: [
            { src: premiere, name: 'Adobe Premiere Pro' },
            { src: afterEffects, name: 'Adobe After Effects' },
            { src: mediaEncoder, name: 'Adobe Media Encoder' }
          ],
          vector: []
        }
      }
    },
    computed: {
      currentTheme() {
        return useThemeStore().currentTheme
      }
    },
    watch: {
      activeSlide: {
        immediate: true,
        handler(v) {
          // The first article + header have no scroll travel to scrub against, so
          // they play a timed entrance on arrival instead. $nextTick so the scrub
          // instance exists on the initial immediate call.
          this.$nextTick(() => this._scrub?.setActive(v === 'features'))
        }
      },
      currentTheme: {
        immediate: true,
        handler(theme) {
          const htmlSrc = theme === 'dark' ? htmlLight : html
          const cssSrc = theme === 'dark' ? cssLight : css
          const jsSrc = theme === 'dark' ? jsLight : js
          const nextSrc = theme === 'dark' ? lightNextJs : nextjs
          const wacomSrc = theme === 'dark' ? lightwacom : wacom

          this.featureAsset.frontend = [
            { src: htmlSrc, name: 'HTML5' },
            { src: cssSrc, name: 'CSS3' },
            { src: jsSrc, name: 'JavaScript' },
            { src: sass, name: 'Sass' },
            { src: tailwind, name: 'Tailwind CSS' },
            { src: bootstrap, name: 'Bootstrap' },
            { src: laravel, name: 'Laravel' },
            { src: git, name: 'Git' },
            { src: docker, name: 'Docker' },
            { src: vue, name: 'Vue.js' },
            { src: nextSrc, name: 'Next.js' },
            { src: reactjs, name: 'React' },
            { src: claude, name: 'Claude' }
          ]
          this.featureAsset.uiux = [
            { src: figma, name: 'Figma' },
            { src: xd, name: 'Adobe XD' },
            { src: illustrator, name: 'Adobe Illustrator' },
            { src: claude, name: 'Claude' }
          ]
          this.featureAsset.vector = [
            { src: illustrator, name: 'Adobe Illustrator' },
            { src: photoshop, name: 'Adobe Photoshop' },
            { src: wacomSrc, name: 'Wacom' }
          ]
        }
      }
    },
    mounted() {
      // Scroll-linked, reversible reveals — see useScrollScrub.
      this.$nextTick(() => {
        this._scrub = createScrollScrub(this.$refs.featuresSection)
        this._scrub.start()
        this._scrub.setActive(this.activeSlide === 'features')
      })
    },
    beforeUnmount() {
      this._scrub?.destroy()
    }
  }
</script>

<style lang="css" scoped>
  /* Reveals here are scroll-linked: useScrollScrub writes opacity/transform inline
     every frame, so there is no CSS transition — one would lag the scrub. The
     from-states below only prevent a flash before JS engages.

     No `will-change` either: GSAP's force3D already puts these on the GPU while
     they move, and a standing hint would hold a layer per line all session. */

  /* Masked title lines rise from an overflow-hidden parent; JS drives Y only. */
  .reveal-line {
    display: block;
    overflow: hidden;
  }
  .etl-inner {
    display: inline-block;
    transform: translateY(105%); /* JS overrides once engaged */
  }

  /* Fading elements: hidden until JS sets opacity/Y. */
  .scrub-el {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    /* useScrollScrub reveals everything statically, so clear the from-states. */
    .etl-inner { transform: none; }
    .scrub-el { opacity: 1; }
  }

  /* The illustration lives inside the LazyImage child, hence the descendant
     selector. */
  .ex-art img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  }

  /* Prose comes from v-html, so the injected markup can't carry utility classes. */
  .ex-prose :deep(p) {
    font-family: var(--font-Gilroy);
    font-size: clamp(1rem, 1.05vw, 1.125rem);
    line-height: 1.7;
    opacity: 0.85;
    margin-bottom: 1rem;
  }
  .ex-prose :deep(hr) {
    display: none;
  }
  .ex-prose :deep(ul) {
    list-style: none;
    padding: 0;
    margin: 1.25rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .ex-prose :deep(li) {
    font-family: var(--font-Mono);
    font-size: 0.8125rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.5rem 0;
    border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    opacity: 0.9;
  }
  .ex-prose :deep(li:last-child) {
    border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
  }
  .ex-prose :deep(li i) {
    font-size: 0.625rem;
    padding-right: 0 !important;
  }
</style>
