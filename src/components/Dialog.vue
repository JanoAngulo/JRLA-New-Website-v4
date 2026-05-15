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
    <transition v-if="variant === 'modal'" name="slide-fade" @after-leave="$emit('after-leave')">
      <div
        v-if="open"
        ref="dialogEl"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        tabindex="-1"
        class="fixed inset-0 grid p-4 overflow-y-auto"
        style="z-index: var(--z-modal);"
        @keydown="onKeydown">
        <div class="flex items-center mx-auto">
          <div class="relative p-7 dark:bg-dark-card bg-white shadow max-w-4xl rounded-xl">
            <button
              type="button"
              aria-label="Close dialog"
              class="absolute z-10 grid w-10 h-10 rounded-full shadow-xl cursor-pointer top-3 right-3 place-content-center bg-dark-primary hover:bg-light-primary text-dark"
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
      :class="['fixed bottom-0 left-0 w-full overflow-auto md:h-[90vh] h-[80vh] dark:bg-dark bg-light', { 'sheet-transition': !dragging, 'pointer-events-none': !open && !dragging }]"
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
        boundEnd: null
      }
    },
    computed: {
      sheetStyle() {
        const z = { zIndex: 'var(--z-modal)' }
        if (this.dragging) return { ...z, transform: `translateY(${this.dragOffset}px)` }
        return { ...z, transform: this.open ? 'translateY(0)' : 'translateY(100vh)' }
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
            }
          })
        } else {
          document.documentElement.style.overflow = ''
          if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
            this.previouslyFocused.focus()
          }
        }
      }
    },
    beforeUnmount() {
      document.documentElement.style.overflow = ''
      this.cleanupDrag()
    },
    methods: {
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
      focusFirst(root) {
        const list = this.focusables(root)
        ;(list[0] || root).focus()
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
        if (this.dragOffset > 0) this.$emit('close')
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
  .sheet-transition {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

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

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #d1d1d1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
