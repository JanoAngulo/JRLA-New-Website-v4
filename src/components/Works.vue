<template>
  <Transition name="fade">
    <div
      v-if="activeSlide === 'works'"
      ref="worksSection"
      class="relative w-full md:overflow-hidden overflow-y-auto dark:text-light text-dark"
      :style="{ height: windowWidth >= 768 ? `${desktopHeight}px` : `${mobileHeight}px` }">
      <!-- Sticky top header -->
      <div class="works-header">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-current-faint">
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-80">03 — Selected Works</p>
          <p class="font-Mono text-[10px] tracking-[0.3em] uppercase opacity-70">{{ filteredWorks.length }} / {{ works2.length }} Projects</p>
        </div>

        <!-- Filter pills -->
        <div class="works-filter no-swipe">
          <button
            v-for="f in filters"
            :key="f.id"
            @click="activeFilter = f.id"
            :aria-pressed="activeFilter === f.id"
            :class="['filter-pill', { 'filter-pill--active': activeFilter === f.id }]">
            <span>{{ f.label }}</span>
            <span class="filter-pill-count font-Mono tabular-nums">{{ f.count }}</span>
          </button>
        </div>
      </div>

      <!-- Grid of works -->
      <div class="works-scroll md:overflow-y-auto">
        <div class="works-grid">
          <button
            type="button"
            v-for="(item, i) in filteredWorks"
            :key="i + item.id + item.title"
            class="work-card"
            :aria-label="`Open ${item.title} project details`"
            @click="openWork(item)">
            <!-- Image area -->
            <div class="work-card-img" :class="{ 'work-card-img--contain': item.work === 'uiux' }">
              <img :src="item.thumbnail" :alt="item.title + ' thumbnail'" :loading="i < 3 ? 'eager' : 'lazy'" :fetchpriority="i < 3 ? 'high' : 'auto'" />
              <div class="work-card-overlay">
                <span class="work-card-cta">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  View Project
                </span>
              </div>
            </div>

            <!-- Meta -->
            <div class="work-card-meta">
              <div class="flex items-center justify-between gap-3 work-card-toprow">
                <span class="work-card-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <span :class="['work-card-tag', `work-card-tag--${item.work}`]">
                  <i :class="typeIcon(item.work)"></i>
                  {{ workTypeLabel(item.work) }}
                </span>
              </div>
              <h3 class="work-card-title font-Gilroy-extra-bold uppercase">{{ item.title }}</h3>
              <div class="work-card-bottom">
                <span class="work-card-bottom-item">{{ item.role }}</span>
                <span class="work-card-bottom-sep">·</span>
                <span class="work-card-bottom-item tabular-nums">{{ item.year }}</span>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="filteredWorks.length === 0" class="works-empty">
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
        <div v-else class="sheet-detail">
          <!-- Header -->
          <div class="sheet-header">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-70">— Project · {{ workTypeLabel(content.type) }}</p>
            <h2 class="sheet-title font-Gilroy-extra-bold uppercase">{{ content.title }}</h2>
            <div class="hairline"></div>
          </div>

          <!-- Preview area -->
          <div v-if="content.link" class="sheet-preview">
            <iframe :src="content.link" :title="content.title" frameborder="0" class="sheet-preview-iframe" loading="lazy"></iframe>
          </div>

          <!-- Meta grid -->
          <div class="sheet-meta">
            <div v-if="content.role" class="sheet-meta-row">
              <span class="sheet-meta-label">Role</span>
              <span class="sheet-meta-value">{{ content.role }}</span>
            </div>
            <div v-if="content.year" class="sheet-meta-row">
              <span class="sheet-meta-label">Year</span>
              <span class="sheet-meta-value tabular-nums">{{ content.year }}</span>
            </div>
            <div v-if="content.projectType" class="sheet-meta-row">
              <span class="sheet-meta-label">Type</span>
              <span class="sheet-meta-value">{{ content.projectType }}</span>
            </div>
            <div v-if="content.status" class="sheet-meta-row">
              <span class="sheet-meta-label">Status</span>
              <span class="sheet-meta-value">{{ content.status }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="sheet-body">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">— About</p>
            <p class="font-Gilroy text-base sm:text-lg leading-relaxed opacity-90 whitespace-pre-wrap">{{ content.description }}</p>
          </div>

          <!-- Toolkit -->
          <div v-if="content.tools && content.tools.length" class="sheet-toolkit">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">Toolkit · {{ content.tools.length }}</p>
            <div class="sheet-tool-grid">
              <div v-for="(t, idx) in content.tools" :key="idx" class="sheet-tool-pill" :title="toolUsed(t)">
                <img :src="toolLogo(t)" :alt="toolUsed(t)" loading="lazy" />
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div v-if="content.link" class="sheet-cta-row">
            <button type="button" class="sheet-btn-primary" @click="openLink(content.link)">
              <span>{{ content.btnText || 'Visit Live' }}</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type="button" class="sheet-btn-ghost" @click="closeOffCanvas">
              <span>Close</span>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </app-dialog>

      <app-dialog variant="modal" :open="isModalOpen" :aria-label="content.title || 'Project'" @close="isModalOpen = false">
        <div class="modal-detail">
          <!-- Media -->
          <iframe
            v-if="content.type === 'video'"
            :src="content.link"
            :title="content.title"
            class="modal-media-iframe"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>

          <div v-else-if="content.type === 'vector'" class="modal-vector">
            <img :src="content.link" :alt="content.title" />
            <button type="button" class="modal-vector-dl" @click="downloadImage(content.link)" aria-label="Download artwork">
              <i class="fa-solid fa-arrow-down"></i>
              <span>Download</span>
            </button>
          </div>

          <!-- Header -->
          <div class="modal-header">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-70">— {{ workTypeLabel(content.type) }}</p>
            <h2 class="modal-title font-Gilroy-extra-bold uppercase">{{ content.title }}</h2>
            <div class="hairline"></div>
          </div>

          <!-- Description -->
          <p class="font-Gilroy text-base leading-relaxed opacity-90 whitespace-pre-wrap">{{ content.description }}</p>

          <!-- Tools -->
          <div v-if="content.tools && content.tools.length" class="modal-tools">
            <p class="font-Mono text-[10px] tracking-[0.35em] uppercase opacity-60">Toolkit</p>
            <div class="modal-tool-grid">
              <div v-for="(t, idx) in content.tools" :key="idx" class="sheet-tool-pill" :title="toolUsed(t)">
                <img :src="toolLogo(t)" :alt="toolUsed(t)" loading="lazy" />
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
  import { useThemeStore } from '../store'
  import { defineAsyncComponent } from 'vue'

  // Light-mode-friendly logos (used in dark mode for visibility)
  import htmlLight from '@/assets/img/features/frontend/html-light.svg'
  import cssLight from '@/assets/img/features/frontend/css-light.svg'
  import jsLight from '@/assets/img/features/frontend/js-light.svg'
  import lightNextJs from '@/assets/img/features/frontend/light-nextjs.svg'
  import claude from '@/assets/img/features/frontend/claude.svg'
  import lightwacom from '@/assets/img/features/vector/light-wacom.svg'

  export default {
    name: 'Works',
    emits: ['close'],
    components: {
      AppDialog,
      WorkDetails: defineAsyncComponent(() => import('./WorkDetails.vue')),
      SkeletonLoader
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
      toolUsed(tool) {
        if (!tool) return ''
        const filename = String(tool).split('/').pop().split('?')[0]
        const stripped = filename.replace(/\.[a-z0-9]+$/i, '').replace(/^light-/, '')
        const map = {
          xd: 'Adobe XD',
          illustrator: 'Adobe Illustrator',
          photoshop: 'Adobe Photoshop',
          premiere: 'Adobe Premiere Pro',
          'after-effects': 'Adobe After Effects',
          'media-encoder': 'Adobe Media Encoder',
          html: 'HTML5',
          css: 'CSS3',
          js: 'JavaScript',
          nextjs: 'Next.js',
          tailwind: 'Tailwind CSS',
          vue: 'Vue.js',
          react: 'React',
          reactjs: 'React',
          sass: 'Sass',
          bootstrap: 'Bootstrap',
          laravel: 'Laravel',
          git: 'Git',
          docker: 'Docker',
          claude: 'Claude',
          figma: 'Figma',
          wacom: 'Wacom',
          'swiper-logo': 'Swiper',
          frontend: 'Front-end',
          uiux: 'UI/UX'
        }
        // Longest-first prefix match — hash-agnostic
        const keys = Object.keys(map).sort((a, b) => b.length - a.length)
        for (const k of keys) {
          if (stripped === k || stripped.startsWith(k + '-') || stripped.startsWith(k + '.')) {
            return map[k]
          }
        }
        return stripped.split('-')[0].replace(/\b\w/g, (c) => c.toUpperCase())
      },
      toolLogo(path) {
        if (!this.isDark || !path) return path
        const filename = String(path).split('/').pop().split('?')[0]
        // Skip already-light variants
        if (filename.startsWith('light-') || filename.includes('-light')) return path
        // Match by filename prefix — works in both dev (name.svg) and build (name-HASH.svg)
        const prefixMap = [
          ['html', htmlLight],
          ['css', cssLight],
          ['js', jsLight],
          ['nextjs', lightNextJs],
          ['claude-dark', claude],
          ['claude', claude],
          ['wacom', lightwacom]
        ]
        for (const [name, light] of prefixMap) {
          if (filename.startsWith(name + '.') || filename.startsWith(name + '-')) {
            return light
          }
        }
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .border-current-faint {
    border-color: color-mix(in oklab, currentcolor 12%, transparent);
  }

  /* Sticky header */
  .works-header {
    position: relative;
    z-index: 5;
    padding: 1.25rem 1.25rem 0;
    background: var(--color-light);
  }

  :is(.dark) .works-header {
    background: var(--color-dark);
  }

  @media (min-width: 768px) {
    .works-header {
      padding: 1.5rem 2rem 0;
    }
  }

  @media (min-width: 1024px) {
    .works-header {
      padding: 2rem 3rem 0;
    }
  }

  /* Filter pills */
  .works-filter {
    position: relative;
    display: flex;
    gap: 0.4rem;
    padding: 1rem 0 1.25rem;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
    /* Right-edge fade hint that more pills exist */
    -webkit-mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%);
    mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%);
  }

  .works-filter::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    .works-filter {
      gap: 0.5rem;
      -webkit-mask-image: none;
      mask-image: none;
    }
  }

  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.75rem;
    font-family: var(--font-Mono);
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: currentColor;
    background: transparent;
    border: 1px solid color-mix(in oklab, currentcolor 35%, transparent);
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    white-space: nowrap;
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  @media (min-width: 640px) {
    .filter-pill {
      gap: 0.5rem;
      padding: 0.6rem 0.9rem;
      font-size: 0.7rem;
      letter-spacing: 0.22em;
    }
  }

  .filter-pill:hover {
    border-color: color-mix(in oklab, currentcolor 65%, transparent);
  }

  .filter-pill--active {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
  }

  :is(.dark) .filter-pill--active {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .filter-pill-count {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  .filter-pill--active .filter-pill-count {
    opacity: 0.8;
  }

  /* Grid wrapper */
  .works-scroll {
    padding: 1.5rem 1.25rem 3rem;
  }

  @media (min-width: 768px) {
    .works-scroll {
      padding: 2rem 2rem 3rem;
      max-height: calc(100% - 130px);
    }
  }

  @media (min-width: 1024px) {
    .works-scroll {
      padding: 2rem 3rem 4rem;
    }
  }

  .works-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 640px) {
    .works-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .works-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;
    }
  }

  /* Work card */
  .work-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--color-light-card);
    border: 1px solid rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
    overflow: hidden;
    /* Reset button defaults */
    font: inherit;
    color: inherit;
    width: 100%;
    padding: 0;
    /* Layered elevation — light mode */
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.04),
      0 8px 20px -8px rgba(0, 0, 0, 0.08);
  }

  :is(.dark) .work-card {
    background: var(--color-dark-card);
    border-color: rgba(255, 255, 255, 0.06);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.4),
      0 8px 24px -10px rgba(0, 0, 0, 0.5);
  }

  .work-card:hover,
  .work-card:focus-visible {
    border-color: var(--color-light-primary);
    transform: translateY(-3px);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.06),
      0 16px 32px -10px rgba(0, 0, 0, 0.14);
  }

  :is(.dark) .work-card:hover,
  :is(.dark) .work-card:focus-visible {
    border-color: var(--color-dark-primary);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.5),
      0 16px 36px -12px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(255, 202, 38, 0.08);
  }

  .work-card:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-light-primary),
      0 16px 32px -10px rgba(0, 0, 0, 0.14);
  }

  :is(.dark) .work-card:focus-visible {
    box-shadow:
      0 0 0 2px var(--color-dark-primary),
      0 16px 36px -12px rgba(0, 0, 0, 0.7);
  }

  .work-card-img {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in oklab, currentcolor 5%, transparent);
  }

  .work-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .work-card-img--contain img {
    object-fit: contain;
    object-position: center bottom;
  }

  .work-card:hover .work-card-img img {
    transform: scale(1.04);
  }

  /* Hover overlay */
  .work-card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--color-dark) 78%, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .work-card:hover .work-card-overlay,
  .work-card:focus-visible .work-card-overlay {
    opacity: 1;
  }

  .work-card-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.2rem;
    font-family: var(--font-Mono);
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-light);
    border: 1px solid var(--color-light);
  }

  /* Meta block */
  .work-card-meta {
    padding: 1rem 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 1px solid color-mix(in oklab, currentcolor 10%, transparent);
  }

  .work-card-toprow {
    margin-bottom: 0.25rem;
  }

  .work-card-index {
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    opacity: 0.75;
  }

  /* Type tags — WCAG-compliant */
  .work-card-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.6rem;
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .work-card-tag--uiux {
    color: var(--color-uiux-fg);
    background: var(--color-uiux-bg);
  }
  :is(.dark) .work-card-tag--uiux {
    color: var(--color-uiux-fg-dark);
    background: var(--color-uiux-bg-dark);
  }

  .work-card-tag--website {
    color: var(--color-web-fg);
    background: var(--color-web-bg);
  }
  :is(.dark) .work-card-tag--website {
    color: var(--color-web-fg-dark);
    background: var(--color-web-bg-dark);
  }

  .work-card-tag--video {
    color: rgb(127, 29, 29);
    background: rgb(254, 226, 226);
  }
  :is(.dark) .work-card-tag--video {
    color: rgb(254, 202, 202);
    background: rgb(76, 5, 25);
  }

  .work-card-tag--vector {
    color: var(--color-vector-fg);
    background: var(--color-vector-bg);
  }
  :is(.dark) .work-card-tag--vector {
    color: var(--color-vector-fg-dark);
    background: var(--color-vector-bg-dark);
  }

  .work-card-title {
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  .work-card-bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-Mono);
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.8;
    padding-top: 0.25rem;
  }

  .work-card-bottom-sep {
    opacity: 0.65;
  }

  .works-empty {
    padding: 4rem 2rem;
    text-align: center;
  }

  /* ============================================ */
  /* Sheet (offcanvas) — website project detail   */
  /* ============================================ */
  .sheet-detail {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    padding-bottom: 3rem;
    color: var(--color-dark);
  }

  :is(.dark) .sheet-detail {
    color: var(--color-light);
  }

  .sheet-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sheet-title {
    font-size: clamp(1.75rem, 4vw, 3rem);
    letter-spacing: -0.025em;
    line-height: 0.95;
    margin-top: 0.25rem;
  }

  .hairline {
    height: 1px;
    width: 4rem;
    background: currentColor;
    opacity: 0.3;
    margin-top: 0.75rem;
  }

  .sheet-preview {
    position: relative;
    width: 100%;
  }

  .sheet-preview-iframe {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: white;
    border: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
  }

  .sheet-meta {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
  }

  @media (min-width: 640px) {
    .sheet-meta {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .sheet-meta {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .sheet-meta-row {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 0;
    border-bottom: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
  }

  @media (min-width: 640px) {
    .sheet-meta-row + .sheet-meta-row {
      border-left: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
      padding-left: 1rem;
    }

    .sheet-meta-row:nth-child(odd) {
      border-left: none;
      padding-left: 0;
    }
  }

  @media (min-width: 1024px) {
    .sheet-meta-row + .sheet-meta-row {
      border-left: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
      padding-left: 1rem;
    }

    .sheet-meta-row:nth-child(odd) {
      border-left: 1px solid color-mix(in oklab, currentcolor 12%, transparent);
      padding-left: 1rem;
    }

    .sheet-meta-row:first-child {
      border-left: none;
      padding-left: 0;
    }
  }

  .sheet-meta-label {
    font-family: var(--font-Mono);
    font-size: 0.625rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0.65;
  }

  .sheet-meta-value {
    font-family: var(--font-Gilroy);
    font-size: 0.95rem;
    letter-spacing: -0.005em;
  }

  .sheet-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .sheet-toolkit {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .sheet-tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 0.65rem;
  }

  .sheet-tool-pill {
    aspect-ratio: 1 / 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem;
    border: 1px solid color-mix(in oklab, currentcolor 14%, transparent);
    border-radius: 0.5rem;
    transition: border-color 0.25s ease, transform 0.25s ease;
  }

  .sheet-tool-pill:hover {
    border-color: var(--color-light-primary);
    transform: translateY(-2px);
  }

  :is(.dark) .sheet-tool-pill:hover {
    border-color: var(--color-dark-primary);
  }

  .sheet-tool-pill img {
    max-width: 65%;
    max-height: 65%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .sheet-cta-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.75rem;
  }

  @media (min-width: 640px) {
    .sheet-cta-row {
      flex-direction: row;
    }
  }

  .sheet-btn-primary,
  .sheet-btn-ghost {
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
  }

  .sheet-btn-primary {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
  }

  :is(.dark) .sheet-btn-primary {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .sheet-btn-primary:hover {
    background: var(--color-dark);
    color: var(--color-light-primary);
    border-color: var(--color-dark);
  }

  :is(.dark) .sheet-btn-primary:hover {
    background: var(--color-dark-card);
    color: var(--color-dark-primary);
    border-color: var(--color-dark-card);
  }

  .sheet-btn-ghost {
    background: transparent;
    color: currentColor;
    border: 1px solid currentColor;
  }

  .sheet-btn-ghost:hover {
    background: var(--color-light-primary);
    color: var(--color-dark);
    border-color: var(--color-light-primary);
  }

  :is(.dark) .sheet-btn-ghost:hover {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .sheet-btn-primary :deep(i),
  .sheet-btn-ghost :deep(i) {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sheet-btn-primary:hover :deep(i.fa-arrow-up-right-from-square) {
    transform: translate(2px, -2px);
  }

  /* ============================================ */
  /* Modal — video / vector                       */
  /* ============================================ */
  .modal-detail {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    color: var(--color-dark);
    min-width: min(80vw, 720px);
  }

  :is(.dark) .modal-detail {
    color: var(--color-light);
  }

  .modal-media-iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: black;
  }

  .modal-vector {
    position: relative;
    overflow: hidden;
    background: color-mix(in oklab, currentcolor 5%, transparent);
  }

  .modal-vector img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .modal-vector-dl {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 0.85rem;
    background: var(--color-light-primary);
    color: var(--color-dark);
    border: 1px solid var(--color-light-primary);
    font-family: var(--font-Mono);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  :is(.dark) .modal-vector-dl {
    background: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
  }

  .modal-vector-dl:hover {
    transform: translateY(-2px);
  }

  .modal-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .modal-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    letter-spacing: -0.025em;
    line-height: 1;
  }

  .modal-tools {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .modal-tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
    gap: 0.55rem;
    max-width: 360px;
  }
</style>
