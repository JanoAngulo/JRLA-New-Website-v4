<template>
  <div
    ref="worksSection"
    :class="['relative w-full md:overflow-hidden overflow-y-auto dark:text-light text-dark app-slide md:flex md:flex-col', { 'is-active': activeSlide === 'works' }]">
    <!-- Sticky top header -->
    <div class="relative z-5 px-5 pt-5 md:px-8 md:pt-6 lg:px-12 lg:pt-8 bg-light dark:bg-dark md:shrink-0">
      <div class="works-header-meta flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-current/12" data-reveal="fade" data-reveal-y="-8" data-reveal-at="0.04">
        <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-80">03 — Selected Works</p>
        <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">{{ filteredWorks.length }} / {{ works2.length }} Projects</p>
      </div>

      <!-- Filter pills -->
      <div class="no-swipe relative flex gap-[0.4rem] sm:gap-2 pt-4 pb-5 overflow-x-auto snap-x snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-24px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-24px),transparent_100%)] sm:[mask-image:none] sm:[-webkit-mask-image:none]">
        <button
          v-for="(f, i) in filters"
          :key="f.id"
          @click="setFilter(f.id)"
          :aria-pressed="activeFilter === f.id"
          data-reveal="fade"
          :data-reveal-at="0.1 + i * 0.05"
          class="filter-pill group inline-flex items-center gap-[0.4rem] sm:gap-2 px-3 sm:px-[0.9rem] py-[0.55rem] sm:py-[0.6rem] font-Mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase bg-transparent border rounded-full cursor-pointer transition-[background,border-color,color] duration-200 whitespace-nowrap shrink-0 snap-start"
          :class="activeFilter === f.id ? 'bg-light-primary text-dark border-light-primary dark:bg-dark-primary dark:border-dark-primary' : 'border-current/35 hover:border-current/65'">
          <span>{{ f.label }}</span>
          <span class="font-Mono tabular-nums text-[0.7rem] opacity-70 group-aria-pressed:opacity-80">{{ f.count }}</span>
        </button>
      </div>
    </div>

    <!-- Grid of works. `.works-grid` fades as one surface across a filter change;
         it has to be the container rather than each card, because the cards' own
         opacity is written inline by GSAP every frame and would overwrite a
         per-card transition.

         The pan region's height comes from `md:flex-1 md:min-h-0`, so it tracks
         the header however the filter row wraps. `min-h-0` is load-bearing:
         without it a flex child won't shrink below its content and never
         scrolls. -->
    <div data-pan-scroll class="pt-6 px-5 pb-12 md:pt-8 md:px-8 md:pb-12 md:flex-1 md:min-h-0 lg:px-12 lg:pb-16 md:overflow-y-auto">
      <div class="works-grid grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7" :class="{ 'is-swapping': swapping }">
        <div
          v-for="(item, i) in filteredWorks"
          :key="i + item.id + item.title"
          data-scrub
          data-scrub-y="28"
          data-scrub-start="0.85"
          data-scrub-end="0.6"
          class="reveal">
        <button
          type="button"
          class="work-card group relative flex flex-col text-left overflow-hidden w-full h-full p-0 [font:inherit] text-inherit cursor-pointer bg-light-card dark:bg-dark-card border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] transition-[border-color,translate,box-shadow] duration-300 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-10px_rgba(0,0,0,0.5)] hover:border-light-primary hover-fine:hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_32px_-10px_rgba(0,0,0,0.14)] dark:hover:border-dark-primary dark:hover:shadow-[0_2px_4px_rgba(0,0,0,0.5),0_16px_36px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,202,38,0.08)] focus-visible:outline-none focus-visible:border-light-primary focus-visible:-translate-y-[3px] focus-visible:shadow-[0_0_0_2px_var(--color-light-primary),0_16px_32px_-10px_rgba(0,0,0,0.14)] dark:focus-visible:border-dark-primary dark:focus-visible:shadow-[0_0_0_2px_var(--color-dark-primary),0_16px_36px_-12px_rgba(0,0,0,0.7)]"
          :aria-label="`Open ${item.title} project details`"
          @click="openWork(item)">
          <!-- Image area -->
          <div class="work-card-img relative aspect-[4/3] overflow-hidden bg-current/5" :class="{ 'work-card-img--contain': item.work === 'uiux' }">
            <LazyImage :src="item.thumbnail" :alt="item.title + ' thumbnail'" :eager="i < 3" />
            <div class="absolute inset-0 z-3 flex items-center justify-center bg-dark/[0.78] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span class="inline-flex items-center gap-2 px-[1.2rem] py-[0.7rem] font-Mono text-xs tracking-[0.25em] uppercase text-light border border-light">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                View Project
              </span>
            </div>
          </div>

          <!-- Meta -->
          <div class="px-[1.1rem] pt-4 pb-5 flex flex-col gap-2 border-t border-current/10">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="font-Mono text-[0.7rem] tracking-[0.3em] opacity-75">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="inline-flex items-center gap-[0.4rem] px-[0.6rem] py-[0.3rem] font-Mono text-[0.7rem] tracking-[0.22em] uppercase" :class="tagClasses(item.work)">
                <i :class="typeIcon(item.work)"></i>
                {{ workTypeLabel(item.work) }}
              </span>
            </div>
            <h3 class="text-[clamp(1.15rem,2vw,1.4rem)] tracking-[-0.02em] leading-[1.05] font-Gilroy-extra-bold uppercase">{{ item.title }}</h3>
            <div class="flex items-center gap-2 font-Mono text-xs tracking-[0.18em] uppercase opacity-80 pt-1">
              <span>{{ item.role }}</span>
              <span class="opacity-65">·</span>
              <span class="tabular-nums">{{ item.year }}</span>
            </div>
          </div>
        </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredWorks.length === 0" class="py-16 px-8 text-center">
        <p class="font-Mono text-xs tracking-[0.3em] uppercase opacity-65">No projects in this filter yet.</p>
      </div>
    </div>

    <app-dialog variant="sheet" :open="isOffcanvasOpen" :aria-label="content.title || 'Project details'" @close="closeOffCanvas" @after-leave="resetUiuxContent">
      <!-- The skeleton and the real case study share no geometry, so `mode="out-in"`
           cross-fades them on opacity alone — moving two unrelated layouts would
           describe a transformation that isn't happening. -->
      <Suspense v-if="isUiUx">
        <template #default>
          <Transition name="content-swap" mode="out-in" appear>
            <work-details :work="uiuxContent" @close="closeOffCanvas" />
          </Transition>
        </template>
        <template #fallback>
          <Transition name="content-swap" appear>
            <skeleton-loader />
          </Transition>
        </template>
      </Suspense>
      <div v-else class="flex flex-col gap-7 pb-12 text-dark dark:text-light">
        <!-- Header -->
        <div class="flex flex-col gap-2">
          <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-70">— Project · {{ workTypeLabel(content.type) }}</p>
          <h2 class="text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.025em] leading-[0.95] mt-1 font-Gilroy-extra-bold uppercase">{{ content.title }}</h2>
          <div class="hairline mt-3"></div>
        </div>

        <!-- Preview area -->
        <div v-if="content.link" class="relative w-full">
          <iframe :src="content.link" :title="content.title" frameborder="0" class="block w-full aspect-[9/16] min-h-[70vh] md:aspect-[16/10] md:min-h-0 bg-white border border-current/12" loading="lazy"></iframe>
        </div>

        <!-- Meta grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-current/12">
          <div v-if="content.role" class="flex flex-col gap-[0.4rem] py-4 border-b border-current/12 sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(even)]:pl-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4">
            <span class="font-Mono text-[0.625rem] tracking-[0.3em] uppercase opacity-65">Role</span>
            <span class="font-Gilroy text-[0.95rem] tracking-[-0.005em]">{{ content.role }}</span>
          </div>
          <div v-if="content.year" class="flex flex-col gap-[0.4rem] py-4 border-b border-current/12 sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(even)]:pl-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4">
            <span class="font-Mono text-[0.625rem] tracking-[0.3em] uppercase opacity-65">Year</span>
            <span class="font-Gilroy text-[0.95rem] tracking-[-0.005em] tabular-nums">{{ content.year }}</span>
          </div>
          <div v-if="content.projectType" class="flex flex-col gap-[0.4rem] py-4 border-b border-current/12 sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(even)]:pl-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4">
            <span class="font-Mono text-[0.625rem] tracking-[0.3em] uppercase opacity-65">Type</span>
            <span class="font-Gilroy text-[0.95rem] tracking-[-0.005em]">{{ content.projectType }}</span>
          </div>
          <div v-if="content.status" class="flex flex-col gap-[0.4rem] py-4 border-b border-current/12 sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(even)]:pl-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4">
            <span class="font-Mono text-[0.625rem] tracking-[0.3em] uppercase opacity-65">Status</span>
            <span class="font-Gilroy text-[0.95rem] tracking-[-0.005em]">{{ content.status }}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-3">
          <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-65">— About</p>
          <p class="font-Gilroy text-base sm:text-lg leading-relaxed opacity-90 whitespace-pre-wrap">{{ content.description }}</p>
        </div>

        <!-- Toolkit -->
        <div v-if="content.tools && content.tools.length" class="flex flex-col gap-[0.85rem]">
          <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-65">Toolkit · {{ content.tools.length }}</p>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-[0.65rem]">
            <div v-for="(t, idx) in content.tools" :key="idx" class="tool-pill" :title="toolUsed(t)">
              <img :src="toolLogo(t)" :alt="toolUsed(t)" loading="lazy" class="max-w-[65%] max-h-[65%] w-auto h-auto object-contain" />
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div v-if="content.link" class="flex flex-col gap-3 pt-3 sm:flex-row">
          <button type="button" class="btn btn-primary group" @click="openLink(content.link)">
            <span>{{ content.btnText || 'Visit Live' }}</span>
            <i class="fa-solid fa-arrow-up-right-from-square transition-transform duration-250 ease-in-out hover-fine:group-hover:translate-x-[2px] hover-fine:group-hover:-translate-y-[2px]"></i>
          </button>
          <button type="button" class="btn btn-ghost" @click="closeOffCanvas">
            <span>Close</span>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </app-dialog>

    <app-dialog variant="modal" :open="isModalOpen" :aria-label="content.title || 'Project'" @close="isModalOpen = false">
      <div class="flex flex-col gap-5 text-dark dark:text-light min-w-[min(80vw,720px)]">
        <!-- Media -->
        <iframe
          v-if="content.type === 'video'"
          :src="content.link"
          :title="content.title"
          class="w-full aspect-video bg-black"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>

        <div v-else-if="content.type === 'vector'" class="relative overflow-hidden bg-current/5">
          <img :src="content.link" :alt="content.title" loading="eager" fetchpriority="high" decoding="async" class="block w-full h-auto object-contain" />
          <button type="button" class="btn btn-primary absolute bottom-4 right-4 px-[0.85rem] py-[0.55rem] hover-fine:hover:-translate-y-0.5" @click="downloadImage(content.link)" aria-label="Download artwork">
            <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
            <span>Download</span>
          </button>
        </div>

        <!-- Header -->
        <div class="flex flex-col gap-[0.4rem]">
          <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-70">— {{ workTypeLabel(content.type) }}</p>
          <h2 class="text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.025em] leading-none font-Gilroy-extra-bold uppercase">{{ content.title }}</h2>
          <div class="hairline mt-3"></div>
        </div>

        <!-- Description -->
        <p class="font-Gilroy text-base leading-relaxed opacity-90 whitespace-pre-wrap">{{ content.description }}</p>

        <!-- Tools -->
        <div v-if="content.tools && content.tools.length" class="flex flex-col gap-[0.65rem]">
          <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-65">Toolkit</p>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-[0.55rem] max-w-[360px]">
            <div v-for="(t, idx) in content.tools" :key="idx" class="tool-pill" :title="toolUsed(t)">
              <img :src="toolLogo(t)" :alt="toolUsed(t)" loading="lazy" class="max-w-[65%] max-h-[65%] w-auto h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </app-dialog>
  </div>
</template>

<script>
  import portfolioData from './PortfolioData'
  import AppDialog from './Dialog.vue'
  import SkeletonLoader from './SkeletonLoader.vue'
  import LazyImage from './LazyImage.vue'
  import { useThemeStore } from '../store'
  import { defineAsyncComponent } from 'vue'
  import { panelEntrance } from '../composables/panelEntrance'
  import { createScrollScrub } from '../composables/useScrollScrub'

  // How long the grid dims before the filtered set swaps in. Must match the
  // `.works-grid` transition-duration below.
  const SWAP_FADE_MS = 120

  // Same imports as PortfolioData, so tool references can be mapped back to
  // display names (the URLs may be hashed or inlined as data URIs).
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
  import figma from '@/assets/img/features/uiux/figma.svg'
  import xd from '@/assets/img/features/uiux/xd.svg'
  import illustrator from '@/assets/img/features/uiux/illustrator.svg'
  import premiere from '@/assets/img/features/video/premiere.svg'
  import afterEffects from '@/assets/img/features/video/after-effects.svg'
  import mediaEncoder from '@/assets/img/features/video/media-encoder.svg'
  import photoshop from '@/assets/img/features/vector/photoshop.svg'
  import wacom from '@/assets/img/features/vector/wacom.svg'
  import lightwacom from '@/assets/img/features/vector/light-wacom.svg'

  const TOOL_NAMES = new Map([
    [html, 'HTML5'],
    [htmlLight, 'HTML5'],
    [css, 'CSS3'],
    [cssLight, 'CSS3'],
    [js, 'JavaScript'],
    [jsLight, 'JavaScript'],
    [sass, 'Sass'],
    [tailwind, 'Tailwind CSS'],
    [bootstrap, 'Bootstrap'],
    [laravel, 'Laravel'],
    [git, 'Git'],
    [docker, 'Docker'],
    [vue, 'Vue.js'],
    [nextjs, 'Next.js'],
    [lightNextJs, 'Next.js'],
    [reactjs, 'React'],
    [claude, 'Claude'],
    [figma, 'Figma'],
    [xd, 'Adobe XD'],
    [illustrator, 'Adobe Illustrator'],
    [premiere, 'Adobe Premiere Pro'],
    [afterEffects, 'Adobe After Effects'],
    [mediaEncoder, 'Adobe Media Encoder'],
    [photoshop, 'Adobe Photoshop'],
    [wacom, 'Wacom'],
    [lightwacom, 'Wacom']
  ])

  const DARK_OVERRIDES = new Map([
    [html, htmlLight],
    [css, cssLight],
    [js, jsLight],
    [nextjs, lightNextJs],
    [wacom, lightwacom]
  ])

  export default {
    name: 'Works',
    emits: ['close', 'remeasure'],
    mixins: [panelEntrance('works', { media: '(min-width: 768px)' })],
    components: {
      AppDialog,
      WorkDetails: defineAsyncComponent(() => import('./WorkDetails.vue')),
      SkeletonLoader,
      LazyImage
    },
    props: {
      activeSlide: String,
      settledSlide: String,
      windowWidth: Number,
      desktopHeight: Number,
      mobileHeight: Number
    },
    data() {
      return {
        works2: portfolioData.portfolio.myWorks2,
        activeFilter: 'all',
        // True only while the grid is dimmed between filter sets (SWAP_FADE_MS).
        swapping: false,
        isModalOpen: false,
        isOffcanvasOpen: false,
        isUiUx: false,
        uiuxContent: '',
        content: {
          thumbnail: '',
          type: '',
          link: '',
          title: '',
          description: '',
          feature: '',
          tools: [],
          btnText: '',
          role: '',
          year: '',
          projectType: '',
          status: ''
        }
      }
    },
    computed: {
      isDark() {
        return useThemeStore().darkMode
      },
      filters() {
        const all = this.works2.length
        const counts = this.works2.reduce((acc, w) => {
          acc[w.work] = (acc[w.work] || 0) + 1
          return acc
        }, {})
        return [
          { id: 'all', label: 'All', count: all },
          { id: 'uiux', label: 'UI/UX', count: counts.uiux || 0 },
          { id: 'website', label: 'Website', count: counts.website || 0 },
          { id: 'video', label: 'Video', count: counts.video || 0 },
          { id: 'vector', label: 'Vector', count: counts.vector || 0 }
        ]
      },
      filteredWorks() {
        if (this.activeFilter === 'all') return this.works2
        return this.works2.filter((w) => w.work === this.activeFilter)
      }
    },
    watch: {
      // Filtering re-renders the cards, so the scrub targets are stale and the
      // grid's scrollHeight — the pause-and-pan length — has changed. Re-collect
      // against the new DOM, then ask WebView to remeasure.
      activeFilter() {
        this.$nextTick(() => {
          this._scrub?.refresh()
          this.$emit('remeasure')
          // Give the re-revealed cards one frame to take their opening values, so
          // the grid fades in over the new set rather than a flash of the old one.
          requestAnimationFrame(() => { this.swapping = false })
        })
      }
    },
    mounted() {
      // Scroll-linked card reveals — see useScrollScrub.
      this.$nextTick(() => {
        this._scrub = createScrollScrub(this.$refs.worksSection)
        this._scrub.start()
      })
    },
    beforeUnmount() {
      this._scrub?.destroy()
    },
    methods: {
      // Filter changes go through here rather than assigning `activeFilter`
      // inline, so the grid can dim before the DOM swaps under it. The rAF gets
      // the dim class on screen for a frame first; without it the fade-out and
      // the swap land in the same paint and nothing is bridged.
      setFilter(id) {
        if (id === this.activeFilter) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.activeFilter = id
          return
        }
        this.swapping = true
        requestAnimationFrame(() => {
          setTimeout(() => { this.activeFilter = id }, SWAP_FADE_MS)
        })
      },
      typeIcon(work) {
        return {
          uiux: 'fa-solid fa-swatchbook',
          website: 'fa-solid fa-code',
          video: 'fa-solid fa-video',
          vector: 'fa-solid fa-draw-polygon'
        }[work] || 'fa-solid fa-folder'
      },
      workTypeLabel(work) {
        return { uiux: 'UI/UX', website: 'Website', video: 'Video', vector: 'Vector' }[work] || work
      },
      // WCAG-compliant type-tag colors. Literal strings so Tailwind's scanner keeps them.
      tagClasses(work) {
        return {
          uiux: 'text-uiux-fg bg-uiux-bg dark:text-uiux-fg-dark dark:bg-uiux-bg-dark',
          website: 'text-web-fg bg-web-bg dark:text-web-fg-dark dark:bg-web-bg-dark',
          video: 'text-video-fg bg-video-bg dark:text-video-fg-dark dark:bg-video-bg-dark',
          vector: 'text-vector-fg bg-vector-bg dark:text-vector-fg-dark dark:bg-vector-bg-dark'
        }[work] || ''
      },
      toolUsed(tool) {
        if (!tool) return ''
        return TOOL_NAMES.get(tool) || ''
      },
      toolLogo(path) {
        if (!path) return path
        if (this.isDark && DARK_OVERRIDES.has(path)) return DARK_OVERRIDES.get(path)
        return path
      },
      closeOffCanvas() {
        this.isOffcanvasOpen = false
      },
      resetUiuxContent() {
        this.uiuxContent = []
        this.content.thumbnail = ''
        this.content.type = ''
        this.content.link = ''
        this.content.title = ''
        this.content.description = ''
        this.content.feature = ''
        this.content.tools = []
        this.content.btnText = ''
        this.content.role = ''
        this.content.year = ''
        this.content.projectType = ''
        this.content.status = ''
      },
      openLink(link) {
        window.open(link, '_blank', 'noopener')
      },
      downloadImage(img) {
        fetch(img)
          .then((response) => response.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.download = img.split('/').pop()
            a.href = url
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          })
          .catch(() => {
            alert('Failed to download image.')
          })
      },
      openWork(item) {
        if (item.work === 'uiux') {
          this.isUiUx = true
          this.isOffcanvasOpen = true
          this.uiuxContent = item
        } else if (item.work === 'website') {
          this.isUiUx = false
          this.isOffcanvasOpen = true
          this.assignContent(item)
        } else if (item.work === 'video' || item.work === 'vector') {
          this.isModalOpen = true
          this.assignContent(item)
        }
      },
      assignContent(item) {
        this.content.type = item.work
        this.content.thumbnail = item.thumbnail
        this.content.link = item.link
        this.content.title = item.title
        this.content.description = item.description
        this.content.feature = item.feature
        this.content.tools = Array.isArray(item.tools) ? item.tools : []
        this.content.btnText = item.btnText
        this.content.role = item.role || ''
        this.content.year = item.year || ''
        this.content.projectType = item.projectType || ''
        this.content.status = item.status || ''
      }
    }
  }
</script>

<style lang="css" scoped>
  /* Header and filter entrance live in panelEntrance.js, built only at
     (min-width: 768px). On mobile the section goes active later than its cards'
     scroll-scrub, so an entrance here would hold the header hidden while a card
     was already fading in below it — the mixin's `media` option skips the build
     entirely there, and with no CSS from-state the header is simply present. */

  /* Skeleton -> case-study cross-fade (see the <Suspense> block above). */
  .content-swap-enter-active,
  .content-swap-leave-active {
    transition: opacity var(--dur-base) var(--ease-out);
  }
  .content-swap-enter-from,
  .content-swap-leave-to {
    opacity: 0;
  }

  /* Filter swap: the grid dims as one surface, the set changes behind it, then it
     comes back, so it reads as one substitution. Duration must match
     SWAP_FADE_MS in the script. */
  .works-grid {
    transition: opacity 120ms var(--ease-out);
  }
  .works-grid.is-swapping {
    /* Not 0: keeping a trace of the old set reads as the same grid re-filtered
       rather than a page load. */
    opacity: 0.25;
  }
  @media (prefers-reduced-motion: reduce) {
    .works-grid,
    .works-grid.is-swapping {
      transition: none;
      opacity: 1;
    }
  }

  /* Card reveals are scroll-linked (see useScrollScrub): opacity/Y are written
     inline every frame, so a CSS transition here would lag the scrub. This
     from-state only prevents a flash before JS engages.

     No `will-change` either — it would promote a permanent compositor layer per
     card, and GSAP's force3D already covers them while they move. */
  .reveal {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    /* useScrollScrub reveals scrub targets statically under reduced motion. */
    .reveal { opacity: 1; }
  }

  /* The thumbnail lives inside the LazyImage child, so it needs a descendant /
     :deep selector rather than utilities on the parent. */
  .work-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--dur-slow) var(--ease-out);
  }
  .work-card-img--contain :deep(.lazy-img) {
    object-fit: contain;
    object-position: center bottom;
  }
  /* Gated on a real pointer: on touch, tapping a card fires a phantom :hover that
     sticks after navigation, leaving the card zoomed. */
  @media (hover: hover) and (pointer: fine) {
    .work-card:hover .work-card-img img {
      transform: scale(1.04);
    }
  }
</style>
