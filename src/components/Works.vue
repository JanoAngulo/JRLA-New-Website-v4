<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'works'"
      ref="worksSection"
      class="relative w-full md:overflow-hidden overflow-y-auto dark:text-light text-dark app-slide">
      <!-- Sticky top header -->
      <div class="relative z-5 px-5 pt-5 md:px-8 md:pt-6 lg:px-12 lg:pt-8 bg-light dark:bg-dark">
        <div class="works-header-meta flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-current/12">
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-80">03 — Selected Works</p>
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">{{ filteredWorks.length }} / {{ works2.length }} Projects</p>
        </div>

        <!-- Filter pills -->
        <div class="no-swipe relative flex gap-[0.4rem] sm:gap-2 pt-4 pb-5 overflow-x-auto snap-x snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-24px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-24px),transparent_100%)] sm:[mask-image:none] sm:[-webkit-mask-image:none]">
          <button
            v-for="(f, i) in filters"
            :key="f.id"
            @click="activeFilter = f.id"
            :aria-pressed="activeFilter === f.id"
            :style="{ '--pd': (i * 0.07) + 's' }"
            class="filter-pill-anim group inline-flex items-center gap-[0.4rem] sm:gap-2 px-3 sm:px-[0.9rem] py-[0.55rem] sm:py-[0.6rem] font-Mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase bg-transparent border rounded-full cursor-pointer transition-[background,border-color,color] duration-200 whitespace-nowrap shrink-0 snap-start"
            :class="activeFilter === f.id ? 'bg-light-primary text-dark border-light-primary dark:bg-dark-primary dark:border-dark-primary' : 'border-current/35 hover:border-current/65'">
            <span>{{ f.label }}</span>
            <span class="font-Mono tabular-nums text-[0.7rem] opacity-70 group-aria-pressed:opacity-80">{{ f.count }}</span>
          </button>
        </div>
      </div>

      <!-- Grid of works -->
      <div class="pt-6 px-5 pb-12 md:pt-8 md:px-8 md:pb-12 md:max-h-[calc(100%-130px)] lg:px-12 lg:pb-16 md:overflow-y-auto">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          <div
            v-for="(item, i) in filteredWorks"
            :key="i + item.id + item.title"
            v-reveal
            class="reveal"
            :style="{ '--rd': (i % 9) * 0.07 + 's' }">
          <button
            type="button"
            class="work-card group relative flex flex-col text-left overflow-hidden w-full h-full p-0 [font:inherit] text-inherit cursor-pointer bg-light-card dark:bg-dark-card border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] transition-[border-color,translate,box-shadow] duration-300 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-10px_rgba(0,0,0,0.5)] hover:border-light-primary hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_32px_-10px_rgba(0,0,0,0.14)] dark:hover:border-dark-primary dark:hover:shadow-[0_2px_4px_rgba(0,0,0,0.5),0_16px_36px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,202,38,0.08)] focus-visible:outline-none focus-visible:border-light-primary focus-visible:-translate-y-[3px] focus-visible:shadow-[0_0_0_2px_var(--color-light-primary),0_16px_32px_-10px_rgba(0,0,0,0.14)] dark:focus-visible:border-dark-primary dark:focus-visible:shadow-[0_0_0_2px_var(--color-dark-primary),0_16px_36px_-12px_rgba(0,0,0,0.7)]"
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
          <p class="font-Mono text-xs tracking-[0.3em] uppercase opacity-60">No projects in this filter yet.</p>
        </div>
      </div>

      <app-dialog variant="sheet" :open="isOffcanvasOpen" :aria-label="content.title || 'Project details'" @close="closeOffCanvas" @after-leave="resetUiuxContent">
        <Suspense v-if="isUiUx">
          <template #default>
            <work-details :work="uiuxContent" @close="closeOffCanvas" />
          </template>
          <template #fallback>
            <skeleton-loader />
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
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">— About</p>
            <p class="font-Gilroy text-base sm:text-lg leading-relaxed opacity-90 whitespace-pre-wrap">{{ content.description }}</p>
          </div>

          <!-- Toolkit -->
          <div v-if="content.tools && content.tools.length" class="flex flex-col gap-[0.85rem]">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">Toolkit · {{ content.tools.length }}</p>
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
              <i class="fa-solid fa-arrow-up-right-from-square transition-transform duration-250 ease-in-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"></i>
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
            <button type="button" class="absolute bottom-4 right-4 inline-flex items-center gap-[0.45rem] px-[0.85rem] py-[0.55rem] font-Mono text-[0.7rem] tracking-[0.25em] uppercase cursor-pointer bg-light-primary text-dark border border-light-primary dark:bg-dark-primary dark:border-dark-primary transition-[background-color,color,translate] duration-250 hover:-translate-y-0.5" @click="downloadImage(content.link)" aria-label="Download artwork">
              <i class="fa-solid fa-arrow-down"></i>
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
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">Toolkit</p>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-[0.55rem] max-w-[360px]">
              <div v-for="(t, idx) in content.tools" :key="idx" class="tool-pill" :title="toolUsed(t)">
                <img :src="toolLogo(t)" :alt="toolUsed(t)" loading="lazy" class="max-w-[65%] max-h-[65%] w-auto h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </app-dialog>
    </div>
  </Transition>
</template>

<script>
  import portfolioData from './PortfolioData'
  import AppDialog from './Dialog.vue'
  import SkeletonLoader from './SkeletonLoader.vue'
  import LazyImage from './LazyImage.vue'
  import { useThemeStore } from '../store'
  import { defineAsyncComponent } from 'vue'

  // Tool logos — match the same imports used in PortfolioData so we can
  // map references → display names (URLs may be hashed or inlined data URIs).
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
    emits: ['close'],
    components: {
      AppDialog,
      WorkDetails: defineAsyncComponent(() => import('./WorkDetails.vue')),
      SkeletonLoader,
      LazyImage
    },
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
            { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
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
        works2: portfolioData.portfolio.myWorks2,
        activeFilter: 'all',
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
    methods: {
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
          video: 'text-[rgb(127,29,29)] bg-[rgb(254,226,226)] dark:text-[rgb(254,202,202)] dark:bg-[rgb(76,5,25)]',
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
  /* Vue <Transition> classes */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Header + filter entrance — keyframes are renamed by Vue scoping, so
     Tailwind's animate-[…] can't reference them; kept as plain CSS. */
  .works-header-meta {
    opacity: 0;
    transform: translateY(-8px);
    animation: hdr-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
  }
  .filter-pill-anim {
    opacity: 0;
    transform: translateY(8px);
    animation: pill-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(0.25s + var(--pd, 0s));
  }
  @keyframes hdr-in {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pill-in {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Scroll reveal — JS directive toggles .is-revealed, so kept as CSS. */
  .reveal {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
    transition:
      opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--rd, 0s);
  }
  .reveal.is-revealed {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { transition-duration: 0.2s; transform: none; }
  }

  /* Card thumbnail lives inside the LazyImage child component, reachable
     only via :deep / descendant selectors — can't be utilities on the parent. */
  .work-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .work-card-img--contain :deep(.lazy-img) {
    object-fit: contain;
    object-position: center bottom;
  }
  .work-card:hover .work-card-img img {
    transform: scale(1.04);
  }
</style>
