<template>
  <template v-if="supported">
    <!-- Position uses the standalone `translate` property, not `transform`. The
         individual properties compose in a fixed order (translate → rotate →
         scale → transform), so `transform: translate()` would apply inside
         `scale` and multiply the position by the scale factor, throwing the ring
         across the screen on hover. -->
    <div
      class="cursor-dot"
      aria-hidden="true"
      :style="{ translate: `${dot.x}px ${dot.y}px` }"
    ></div>
    <div
      class="cursor-ring"
      aria-hidden="true"
      :class="{ 'is-hover': hovering, 'is-click': clicking }"
      :style="{ translate: `${ring.x}px ${ring.y}px` }"
    ></div>
  </template>
</template>

<script>
  export default {
    name: 'CustomCursor',
    data() {
      return {
        supported: false,
        dot: { x: -100, y: -100 },
        ring: { x: -100, y: -100 },
        target: { x: -100, y: -100 },
        hovering: false,
        clicking: false,
        rafId: null,
        reducedMotion: false
      }
    },
    mounted() {
      if (!window.matchMedia('(pointer: fine)').matches) return
      // Someone who has asked the OS for a bigger or higher-contrast pointer wants
      // that pointer; replacing it with a 6px dot overrides an accessibility
      // setting, so this component sits out entirely there.
      if (window.matchMedia('(forced-colors: active)').matches) return
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      this.supported = true
      document.documentElement.classList.add('has-custom-cursor')

      window.addEventListener('mousemove', this.onMove, { passive: true })
      window.addEventListener('mousedown', this.onDown)
      window.addEventListener('mouseup', this.onUp)
      window.addEventListener('mouseover', this.onOver)
      window.addEventListener('mouseout', this.onOut)

      this.loop()
    },
    beforeUnmount() {
      cancelAnimationFrame(this.rafId)
      window.removeEventListener('mousemove', this.onMove)
      window.removeEventListener('mousedown', this.onDown)
      window.removeEventListener('mouseup', this.onUp)
      window.removeEventListener('mouseover', this.onOver)
      window.removeEventListener('mouseout', this.onOut)
      document.documentElement.classList.remove('has-custom-cursor')
    },
    methods: {
      onMove(e) {
        this.target.x = e.clientX
        this.target.y = e.clientY
        this.dot.x = e.clientX
        this.dot.y = e.clientY
      },
      onDown() { this.clicking = true },
      onUp() { this.clicking = false },
      onOver(e) {
        if (this.isInteractive(e.target)) this.hovering = true
      },
      onOut(e) {
        if (this.isInteractive(e.target)) this.hovering = false
      },
      isInteractive(el) {
        if (!(el instanceof Element)) return false
        return !!el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"], .social-pill, .tag, .btn-primary, .btn-ghost, .coreproc-chip, .focus-item, .nav-arrow')
      },
      // A lerp never actually arrives, so without the epsilon check below this
      // writes `translate` on the ring every frame forever — including with the
      // mouse parked, patching a style that differs in the sixth decimal.
      loop() {
        this.rafId = requestAnimationFrame(this.loop)
        const dx = this.target.x - this.ring.x
        const dy = this.target.y - this.ring.y
        // Sub-pixel: nothing left to show, so stop writing.
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
          if (this.ring.x !== this.target.x || this.ring.y !== this.target.y) {
            this.ring.x = this.target.x
            this.ring.y = this.target.y
          }
          return
        }
        // Reduced motion keeps the ring (it's a pointer) but drops the trail,
        // which is the part that moves.
        const ease = this.reducedMotion ? 1 : 0.18
        this.ring.x += dx * ease
        this.ring.y += dy * ease
      }
    }
  }
</script>

<style>
  /* Not scoped: hides the native cursor on fine-pointer devices. */
  html.has-custom-cursor,
  html.has-custom-cursor * {
    cursor: none !important;
  }

  /* …except where the cursor is the affordance: a text field with no I-beam stops
     announcing that you can type in it. The ring keeps trailing over the top and
     the native caret cursor rides inside it. */
  html.has-custom-cursor :is(input, textarea, select, [contenteditable]),
  html.has-custom-cursor :is(input, textarea, select, [contenteditable]) * {
    cursor: auto !important;
  }
  html.has-custom-cursor :is(input[type='text'], input[type='email'], textarea, [contenteditable]) {
    cursor: text !important;
  }

  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    will-change: translate, scale;
    z-index: var(--z-grain);
  }

  .cursor-dot {
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    border-radius: 50%;
    background: var(--color-dark);
  }
  html.dark .cursor-dot {
    background: var(--color-light);
  }

  /* The ring resizes via the standalone `scale` property, never width/height/margin
     — those are layout properties, and animating them on an element that already
     repaints every pointer frame forces layout each tick. The box stays 36px and
     scales about its own centre, so the margin offset stays valid. Pairs with
     `translate` for position; see the template note. */
  .cursor-ring {
    width: 36px;
    height: 36px;
    margin: -18px 0 0 -18px;
    border-radius: 50%;
    border: 1.5px solid var(--color-dark);
    scale: 1;
    transition:
      scale 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.25s ease,
      border-color 0.25s ease,
      opacity 0.2s ease;
    opacity: 1;
  }
  html.dark .cursor-ring {
    border-color: var(--color-light);
  }

  .cursor-ring.is-hover {
    scale: 1.5556;
    background: color-mix(in oklab, var(--color-dark) 18%, transparent);
    border-color: var(--color-dark);
  }
  html.dark .cursor-ring.is-hover {
    background: color-mix(in oklab, var(--color-light) 18%, transparent);
    border-color: var(--color-light);
  }

  .cursor-ring.is-click {
    scale: 0.6667;
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor-ring {
      transition-duration: 0.01ms;
    }
  }

  /* Hide on touch, coarse-pointer and small screens. */
  @media (pointer: coarse), (max-width: 768px), (hover: none) {
    .cursor-dot,
    .cursor-ring {
      display: none !important;
    }
    html.has-custom-cursor,
    html.has-custom-cursor * {
      cursor: auto !important;
    }
  }
</style>
