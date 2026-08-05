<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/30 dark:bg-black/60"
        style="z-index: var(--z-overlay);"
        @click="$emit('close')"
        aria-hidden="true">
      </div>
    </transition>

    <!-- Modal variant: enter/leave via transition -->
    <transition v-if="variant === 'modal'" name="slide-fade" @after-enter="onModalShown" @after-leave="$emit('after-leave')">
      <div
        v-if="open"
        ref="dialogEl"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        tabindex="-1"
        class="fixed inset-0 grid p-4 overflow-y-auto"
        style="z-index: var(--z-modal);"
        @click.self="$emit('close')"
        @keydown="onKeydown">
        <div class="flex items-center mx-auto" @click.self="$emit('close')">
          <div class="relative p-7 dark:bg-dark-card bg-light-card surface-lifted max-w-4xl">
            <button
              type="button"
              aria-label="Close dialog"
              class="absolute z-10 grid w-11 h-11 rounded-full cursor-pointer top-3 right-3 place-content-center bg-light-primary text-dark border border-light-primary dark:bg-dark-primary dark:border-dark-primary transition-[background-color,border-color,transform] duration-200 hover:bg-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:border-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:text-light dark:hover:bg-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:border-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:text-dark hover:scale-105 active:scale-95"
              @click="$emit('close')">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>

    <!-- Sheet variant: always mounted, slide via transform -->
    <div
      v-else
      ref="dialogEl"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel"
      :aria-hidden="!open"
      :inert="!open"
      tabindex="-1"
      :style="sheetStyle"
      :class="['fixed bottom-0 left-0 w-full overflow-auto md:h-[90dvh] h-[80dvh] dark:bg-dark bg-light', !dragging ? 'transition-transform duration-400 ease-in-out' : '', { 'pointer-events-none': !open && !dragging }]"
      @keydown="onKeydown"
      @transitionend="onTransitionEnd">
      <div
        class="sticky top-0 z-50 grid justify-center w-full px-6 py-6 md:py-10 lg:px-28 md:px-12 dark:bg-dark bg-light cursor-grab"
        @mousedown="startDrag"
        @touchstart="startDrag"
        aria-hidden="true">
        <div class="w-[50vw] h-2 rounded-full dark:bg-white/50 bg-dark/50"></div>
      </div>
      <div class="px-6 md:px-10 lg:px-14 xl:px-20 pb-12">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
  import { gsap } from 'gsap'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

  gsap.registerPlugin(ScrollToPlugin)

  export default {
    name: 'Dialog',
    props: {
      open: { type: Boolean, default: false },
      variant: { type: String, default: 'modal', validator: (v) => ['modal', 'sheet'].includes(v) },
      ariaLabel: { type: String, default: 'Dialog' }
    },
    emits: ['close', 'after-leave'],
    data() {
      return {
        dragging: false,
        startY: 0,
        dragOffset: 0,
        previouslyFocused: null,
        boundDrag: null,
        boundEnd: null,
        boundWheel: null,
        smoothTarget: 0,
        reducedMotion: false
      }
    },
    computed: {
      sheetStyle() {
        const z = { zIndex: 'var(--z-modal)' }
        if (this.dragging) return { ...z, transform: `translateY(${this.dragOffset}px)` }
        // Close by the sheet's OWN height (100%), not 100vh — on iOS the dynamic
        // toolbar makes vh drift, which left a background gap under the sheet.
        return { ...z, transform: this.open ? 'translateY(0)' : 'translateY(100%)' }
      }
    },
    watch: {
      open(val) {
        if (val) {
          this.previouslyFocused = document.activeElement
          document.documentElement.style.overflow = 'hidden'
          this.$nextTick(() => {
            const el = this.$refs.dialogEl
            if (el) {
              el.scrollTop = 0
              // Focus the dialog root (not a descendant) with preventScroll
              // so screen readers announce the dialog without the browser
              // scroll-jumping to the first focusable button.
              try {
                el.focus({ preventScroll: true })
              } catch {
                el.focus()
              }
              // Belt-and-braces: re-pin to top after focus
              el.scrollTop = 0
              this.enableSmooth(el)
            }
          })
        } else {
          document.documentElement.style.overflow = ''
          this.disableSmooth()
          if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
            this.previouslyFocused.focus()
          }
        }
      }
    },
    mounted() {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    beforeUnmount() {
      document.documentElement.style.overflow = ''
      this.disableSmooth()
      this.cleanupDrag()
    },
    methods: {
      // GSAP-driven smooth wheel scroll for the sheet (desktop). Touch stays
      // native so momentum + drag-to-dismiss keep working. No Lenis needed.
      enableSmooth(el) {
        if (this.reducedMotion || !el) return
        this.smoothTarget = el.scrollTop
        this.boundWheel = this.onWheel.bind(this)
        el.addEventListener('wheel', this.boundWheel, { passive: false })
      },
      disableSmooth() {
        const el = this.$refs.dialogEl
        if (el && this.boundWheel) el.removeEventListener('wheel', this.boundWheel, { passive: false })
        if (el) gsap.killTweensOf(el)
        this.boundWheel = null
      },
      onWheel(e) {
        const el = this.$refs.dialogEl
        if (!el) return
        e.preventDefault()
        const max = el.scrollHeight - el.clientHeight
        if (max <= 0) return
        const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * el.clientHeight : e.deltaY
        this.smoothTarget = gsap.utils.clamp(0, max, this.smoothTarget + dy)
        gsap.to(el, { scrollTo: { y: this.smoothTarget }, duration: 0.6, ease: 'power3.out', overwrite: true })
      },
      onModalShown() {
        // iOS: an iframe/image whose src is set as it mounts inside an
        // opacity/transform transition loads but isn't composited until a later
        // repaint — so it's blank on first open, fine on reopen. Force one repaint
        // now that the enter transition has settled.
        const el = this.$refs.dialogEl
        if (!el) return
        el.style.display = 'none'
        void el.offsetHeight // reflow
        el.style.display = ''
      },
      onTransitionEnd(e) {
        if (this.variant !== 'sheet') return
        if (e.propertyName !== 'transform') return
        if (!this.open) this.$emit('after-leave')
      },
      onKeydown(e) {
        if (e.key === 'Escape') {
          e.stopPropagation()
          this.$emit('close')
          return
        }
        if (e.key === 'Tab') this.trapFocus(e)
      },
      focusables(root) {
        return Array.from(
          root.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
      },
      trapFocus(e) {
        const root = this.$refs.dialogEl
        if (!root) return
        const list = this.focusables(root)
        if (!list.length) {
          e.preventDefault()
          root.focus()
          return
        }
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      },
      startDrag(e) {
        this.dragging = true
        this.boundDrag = this.onDrag.bind(this)
        this.boundEnd = this.endDrag.bind(this)
        if (e.type === 'touchstart') {
          this.startY = e.touches[0].clientY
          document.addEventListener('touchmove', this.boundDrag, { passive: false })
          document.addEventListener('touchend', this.boundEnd)
        } else {
          this.startY = e.clientY
          document.addEventListener('mousemove', this.boundDrag)
          document.addEventListener('mouseup', this.boundEnd)
        }
      },
      onDrag(e) {
        if (e.touches) {
          e.preventDefault()
          const y = e.touches[0].clientY
          this.dragOffset = Math.max(0, y - this.startY)
        } else {
          this.dragOffset = Math.max(0, e.clientY - this.startY)
        }
      },
      endDrag() {
        // Dismiss only past a real threshold — 12% of the sheet's own height,
        // floored at 64px. Any movement used to close it, so a 1px twitch while
        // grabbing the handle threw the case study away.
        const el = this.$refs.dialogEl
        const threshold = Math.max(64, (el?.offsetHeight || 0) * 0.12)
        if (this.dragOffset > threshold) this.$emit('close')
        this.dragging = false
        this.dragOffset = 0
        this.cleanupDrag()
      },
      cleanupDrag() {
        if (!this.boundDrag) return
        document.removeEventListener('mousemove', this.boundDrag)
        document.removeEventListener('mouseup', this.boundEnd)
        document.removeEventListener('touchmove', this.boundDrag, { passive: false })
        document.removeEventListener('touchend', this.boundEnd)
        this.boundDrag = null
        this.boundEnd = null
      }
    }
  }
</script>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
