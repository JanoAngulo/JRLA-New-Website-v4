<template>
  <template v-if="supported">
    <div
      class="cursor-dot"
      aria-hidden="true"
      :style="{ transform: `translate(${dot.x}px, ${dot.y}px)` }"
    ></div>
    <div
      class="cursor-ring"
      aria-hidden="true"
      :class="{ 'is-hover': hovering, 'is-click': clicking }"
      :style="{ transform: `translate(${ring.x}px, ${ring.y}px)` }"
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
        rafId: null
      }
    },
    mounted() {
      if (!window.matchMedia('(pointer: fine)').matches) return
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
        return !!el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"], .social-pill, .tag, .btn-primary, .btn-ghost, .coreproc-chip, .focus-item, swiper-slide, .nav-arrow')
      },
      loop() {
        const ease = 0.18
        this.ring.x += (this.target.x - this.ring.x) * ease
        this.ring.y += (this.target.y - this.ring.y) * ease
        this.rafId = requestAnimationFrame(this.loop)
      }
    }
  }
</script>

<style>
  /* Global — hide native cursor on fine-pointer devices */
  html.has-custom-cursor,
  html.has-custom-cursor * {
    cursor: none !important;
  }

  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    will-change: transform;
    z-index: 99998;
  }

  .cursor-dot {
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    border-radius: 50%;
    background: #000;
    transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease;
  }
  html.dark .cursor-dot {
    background: #fff;
  }

  .cursor-ring {
    width: 36px;
    height: 36px;
    margin: -18px 0 0 -18px;
    border-radius: 50%;
    border: 1.5px solid #000;
    transition:
      width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      height 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      margin 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.25s ease,
      border-color 0.25s ease,
      opacity 0.2s ease;
    opacity: 1;
  }
  html.dark .cursor-ring {
    border-color: #fff;
  }

  .cursor-ring.is-hover {
    width: 56px;
    height: 56px;
    margin: -28px 0 0 -28px;
    background: color-mix(in srgb, #000 18%, transparent);
    border-color: #000;
  }
  html.dark .cursor-ring.is-hover {
    background: color-mix(in srgb, #fff 18%, transparent);
    border-color: #fff;
  }

  .cursor-ring.is-click {
    width: 24px;
    height: 24px;
    margin: -12px 0 0 -12px;
    opacity: 0.5;
  }

  /* Hide on touch / coarse-pointer / small screens */
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
