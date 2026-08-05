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
              class="absolute z-10 grid w-11 h-11 rounded-full cursor-pointer top-3 right-3 place-content-center bg-light-primary text-dark border border-light-primary dark:bg-dark-primary dark:border-dark-primary transition-[background-color,border-color,transform,scale] duration-200 hover:bg-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:border-[color-mix(in_oklab,var(--color-light-primary)_82%,#000)] hover:text-light dark:hover:bg-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:border-[color-mix(in_oklab,var(--color-dark-primary)_85%,#000)] dark:hover:text-dark hover-fine:hover:scale-105 active:scale-95"
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
      :class="['fixed bottom-0 left-0 w-full overflow-auto md:h-[90dvh] h-[80dvh] dark:bg-dark bg-light', !dragging && !settling ? 'sheet-slide' : '', { 'pointer-events-none': !open && !dragging }]"
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
        // `settling` keeps the sheet driven by `dragOffset` after the finger
        // lifts, while the spring runs. Without it the transform would snap back
        // to the resting rule the instant `dragging` flipped false and the
        // release animation would never be seen.
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
          // Pointer capture keeps the drag alive when the cursor leaves the
          // handle mid-gesture; without it a fast drag silently stops tracking.
          if (e.pointerId != null && e.currentTarget?.setPointerCapture) {
            try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* not fatal */ }
          }
          document.addEventListener('mousemove', this.boundDrag)
          document.addEventListener('mouseup', this.boundEnd)
        }
      },
      onDrag(e) {
        // Multi-touch guard: once a drag owns the sheet, a second finger landing
        // mid-gesture must not re-anchor it and make the sheet jump.
        if (e.touches && e.touches.length > 1) return
        const y = e.touches ? e.touches[0].clientY : e.clientY
        if (e.touches) e.preventDefault()

        const raw = y - this.startY
        // Downward is free travel. Upward past the top is over-drag: allow it,
        // but with rising resistance, so the boundary feels like friction rather
        // than an invisible wall.
        this.dragOffset = raw >= 0 ? raw : -Math.pow(-raw, 0.7) * 0.5

        // Instantaneous velocity in px/ms, sampled between moves — this is what
        // decides a flick, not the distance travelled.
        const now = performance.now()
        if (this.lastY != null && now > this.lastT) {
          this.velocity = (y - this.lastY) / (now - this.lastT)
        }
        this.lastY = y
        this.lastT = now
      },
      endDrag() {
        // Two independent ways to dismiss:
        //  - distance: past 12% of the sheet's own height (floored at 64px), and
        //  - velocity: a downward flick over 0.11 px/ms, however short.
        // Distance alone meant a fast, small flick — the way people actually
        // dismiss sheets on a phone — did nothing and the sheet sprang back.
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
        // Settling back is the sheet losing a tug-of-war, so it overshoots
        // slightly instead of easing to a dead stop. GSAP drives it because the
        // CSS transition is disabled while `dragging` is true and re-enabling it
        // mid-release would restart from the wrong value.
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
        // A close arriving mid-spring must win: leave the tween running and it
        // would keep writing `dragOffset` while `settling` pins the transform,
        // freezing the sheet on screen.
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
  /* Sheet open/close. `--ease-drawer` is the iOS-style curve: almost all of the
     travel happens up front, then it glides into place — the reason a native
     sheet feels attached to your thumb rather than played back at you.
     Suppressed while dragging or settling, when GSAP owns the transform. */
  .sheet-slide {
    transition: transform var(--dur-drawer) var(--ease-drawer);
  }

  /* Modal enter/leave. Enumerated instead of `all`, and eased out rather than
     in-out so the panel is fastest at the moment it appears. It also scales in
     from 0.96 now: a pure vertical nudge gave the modal no sense of arriving
     toward the viewer. Origin stays centred — this is a modal, not a popover, so
     it genuinely belongs to the viewport rather than to a trigger. */
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
