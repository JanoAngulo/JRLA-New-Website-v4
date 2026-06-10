<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'features'"
      ref="featuresSection"
      class="relative w-full overflow-hidden app-slide">
      <!-- Scroll-feed -->
      <div
        class="relative w-full overflow-y-auto pb-6 dark:text-light text-dark h-full scroll-smooth">
        <header class="px-6 pt-6 md:px-10 md:pt-10 lg:px-14 lg:pt-14">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-current/12">
            <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-80">02 — Practice</p>
            <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">{{ portfolioData.portfolio.features.length }} Disciplines</p>
          </div>
        </header>

        <article
          v-for="(item, i) in portfolioData.portfolio.features"
          :key="item.id"
          v-reveal
          class="reveal grid grid-cols-1 gap-8 px-6 py-12 border-b border-current/10 last:border-b-0 last:pb-6 md:gap-12 md:px-10 md:py-16 md:items-start lg:gap-16 lg:px-14 lg:py-20"
          :class="i % 2 === 1 ? 'is-reverse md:grid-cols-[7fr_5fr]' : 'md:grid-cols-[5fr_7fr]'">
          <!-- Visual column: accent block -->
          <div class="reveal-child relative hidden md:flex md:flex-col" :class="{ 'md:order-2': i % 2 === 1 }" style="--rd:0.05s">
            <div class="ex-art relative w-full aspect-square max-h-[560px] overflow-hidden flex items-end justify-center sm:aspect-4/5 md:aspect-3/4 md:min-h-[480px] md:max-h-[640px] lg:max-h-[720px] dark:bg-dark-primary bg-light-primary">
              <LazyImage :src="item.img[0]" :alt="item.title + ' illustration'" :eager="i === 0" draggable="false" @dragstart.prevent />
            </div>
          </div>

          <!-- Content column -->
          <div class="reveal-child flex flex-col gap-4" style="--rd:0.18s">
            <p class="font-Mono text-xs tracking-[0.35em] uppercase opacity-60">— {{ ids[item.id] }}</p>
            <h3 class="text-[clamp(2.5rem,5.5vw,4.5rem)] tracking-[-0.03em] font-Gilroy-extra-bold uppercase leading-[0.9]">
              <span class="reveal-line leading-none"><span class="etl-inner" style="--d:0.25s">{{ item.title.split(' ')[0] }}</span></span>
              <span class="reveal-line leading-none"><span class="etl-inner dark:text-dark-primary text-light-primary" style="--d:0.4s">{{ item.title.split(' ').slice(1).join(' ') }}</span></span>
            </h3>
            <div class="hairline my-2"></div>
            <div class="ex-prose" v-html="item.description"></div>

            <div class="pt-4">
              <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60 mb-3">Toolkit · {{ featureAsset[item.id]?.length || 0 }}</p>
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
  </Transition>
</template>

<script>
  import { useThemeStore } from '../store'
  import portfolioData from './PortfolioData'
  import LazyImage from './LazyImage.vue'

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
    directives: {
      reveal: {
        mounted(el) {
          const io = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  el.classList.add('is-revealed')
                  io.unobserve(el)
                }
              })
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
          )
          io.observe(el)
          el._revealIO = io
        },
        unmounted(el) {
          if (el._revealIO) el._revealIO.disconnect()
        }
      }
    },
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

  /* Title line-reveal — JS toggles .is-revealed on the article */
  .etl-inner {
    display: inline-block;
    transform: translateY(105%);
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0s);
  }
  .is-revealed .etl-inner {
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .etl-inner { transition-duration: 0.2s; }
  }

  /* Scroll reveal — JS toggles .is-revealed (CSS transform, not a Tailwind utility) */
  .reveal {
    opacity: 0;
  }
  .reveal.is-revealed {
    opacity: 1;
  }
  .reveal-child {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--rd, 0s);
  }
  .is-revealed .reveal-child {
    opacity: 1;
    transform: translateY(0);
  }
  @media (min-width: 768px) {
    .is-reverse .reveal-child:first-child {
      transform: translateX(28px);
    }
    .is-reverse.is-revealed .reveal-child:first-child {
      transform: translateX(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal-child {
      transition-duration: 0.2s;
      transform: none;
    }
  }

  /* Accent illustration lives inside the LazyImage child — reached via descendant */
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

  /* Prose from v-html — injected markup can't carry utility classes */
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
