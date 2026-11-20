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
              class="absolute z-10 grid w-11 h-11 rounded-full cursor-pointer top-3 right-3 place-content-center bg-light-primary text-dark border border-light-primary dark:bg-dark-primary dark:border-dark-primary transition-[background-color,border-color,transform,scale] duration-200 hover:bg-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:border-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:text-light dark:hover:bg-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:border-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:text-dark hover-fine:hover:scale-105 active:scale-95"
              @click="$emit('close')">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>

    <!-- Sheet stays mounted and slides via transform. -->
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
      :class="['fixed bottom-0 left-0 w-full overflow-auto md:h-[90dvh] h-[80dvh] dark:bg-dark bg-light', !dragging && !settling ? 'sheet-slide' : '', { 'pointer-events-none': !open && !dragging }]"
      @keydown="onKeydown"
      @transitionend="onTransitionEnd">
      <div
        class="sticky top-0 z-50 grid justify-center w-full px-6 py-6 md:py-10 lg:px-28 md:px-12 dark:bg-dark bg-light cursor-grab"
        @mousedown="startDrag"
        @touchstart="startDrag">
        <div class="w-[50vw] h-2 rounded-full dark:bg-white/50 bg-dark/50" aria-hidden="true"></div>
        <!-- Dragging and Esc aren't available to everyone (touch screen readers can't
             do either), so the sheet carries its own close in every state, skeleton included. -->
        <button
          type="button"
          aria-label="Close project details"
          class="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 grid w-11 h-11 rounded-full cursor-pointer place-content-center bg-transparent border border-current/50 text-dark dark:text-light transition-[background-color,border-color,color] duration-200 hover:bg-light-primary hover:border-light-primary hover:text-dark dark:hover:bg-dark-primary dark:hover:border-dark-primary dark:hover:text-dark"
          @mousedown.stop
          @touchstart.stop
          @click="$emit('close')">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
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
        // Keeps `dragOffset` driving the transform while the release spring runs.
        settling: false,
        startY: 0,
        dragOffset: 0,
        lastY: null,
        lastT: null,
        velocity: 0,
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
        if (this.dragging || this.settling) return { ...z, transform: `translateY(${this.dragOffset}px)` }
        // 100%, not 100vh: iOS toolbar drift leaves a gap under the sheet.
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
              // Focus the root so screen readers announce the dialog without a scroll jump.
              try {
                el.focus({ preventScroll: true })
              } catch {
                el.focus()
              }
              // Re-pin to top in case focus still moved it.
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
      // Wheel only; touch stays native so momentum and drag-to-dismiss keep working.
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
        // iOS leaves media mounted mid-transition blank until a repaint; force one.
        const el = this.$refs.dialogEl
        if (!el) return
        el.style.display = 'none'
        void el.offsetHeight
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
        this.lastY = null
        this.lastT = null
        this.velocity = 0
        this.boundDrag = this.onDrag.bind(this)
        this.boundEnd = this.endDrag.bind(this)
        if (e.type === 'touchstart') {
          this.startY = e.touches[0].clientY
          document.addEventListener('touchmove', this.boundDrag, { passive: false })
          document.addEventListener('touchend', this.boundEnd)
        } else {
          this.startY = e.clientY
          // Without capture, a fast drag off the handle silently stops tracking.
          if (e.pointerId != null && e.currentTarget?.setPointerCapture) {
            try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* not fatal */ }
          }
          document.addEventListener('mousemove', this.boundDrag)
          document.addEventListener('mouseup', this.boundEnd)
        }
      },
      onDrag(e) {
        // A second finger must not re-anchor the drag.
        if (e.touches && e.touches.length > 1) return
        const y = e.touches ? e.touches[0].clientY : e.clientY
        if (e.touches) e.preventDefault()

        const raw = y - this.startY
        // Upward over-drag gets rising resistance.
        this.dragOffset = raw >= 0 ? raw : -Math.pow(-raw, 0.7) * 0.5

        // Velocity in px/ms; decides a flick.
        const now = performance.now()
        if (this.lastY != null && now > this.lastT) {
          this.velocity = (y - this.lastY) / (now - this.lastT)
        }
        this.lastY = y
        this.lastT = now
      },
      endDrag() {
        // Dismiss on distance (12% of sheet height, min 64px) or a short fast flick.
        const el = this.$refs.dialogEl
        const threshold = Math.max(64, (el?.offsetHeight || 0) * 0.12)
        const flicked = this.velocity > 0.11 && this.dragOffset > 8
        const shouldClose = this.dragOffset > threshold || flicked

        this.dragging = false
        this.cleanupDrag()

        if (shouldClose) {
          this.dragOffset = 0
          this.$emit('close')
          return
        }
        // GSAP, not CSS: re-enabling the transition mid-release restarts from the wrong value.
        if (el && this.dragOffset !== 0) {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          this.settling = true
          gsap.to(this, {
            dragOffset: 0,
            duration: reduced ? 0.15 : 0.5,
            ease: reduced ? 'power2.out' : 'back.out(1.1)',
            overwrite: true,
            onComplete: () => { this.settling = false }
          })
        } else {
          this.dragOffset = 0
        }
      },
      cleanupDrag() {
        // A close mid-spring must kill the tween, or the sheet freezes on screen.
        gsap.killTweensOf(this)
        this.settling = false
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
  /* Off while dragging or settling, when GSAP owns the transform. */
  .sheet-slide {
    transition: transform var(--dur-drawer) var(--ease-drawer);
  }

  /* Centred origin: a modal belongs to the viewport, not to a trigger. */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: transform var(--dur-base) var(--ease-out),
                opacity var(--dur-base) var(--ease-out);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(12px) scale(0.96);
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity var(--dur-base) var(--ease-out);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
