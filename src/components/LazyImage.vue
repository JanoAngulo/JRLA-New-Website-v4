<template>
  <div class="lazy-img-wrap" :class="{ 'is-loaded': loaded }" :style="aspectStyle">
    <div v-if="!loaded" class="lazy-img-skeleton" aria-hidden="true"></div>
    <img
      ref="img"
      v-bind="$attrs"
      :src="src"
      :alt="alt"
      :width="width || undefined"
      :height="height || undefined"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @load="onLoad"
      @error="onLoad"
      class="lazy-img"
    />
  </div>
</template>

<script>
  export default {
    name: 'LazyImage',
    inheritAttrs: false,
    props: {
      src: { type: String, required: true },
      alt: { type: String, default: '' },
      eager: { type: Boolean, default: false },
      aspect: { type: String, default: '' },
      width: { type: [Number, String], default: 0 },
      height: { type: [Number, String], default: 0 }
    },
    data() {
      return { loaded: false }
    },
    computed: {
      aspectStyle() {
        return this.aspect ? { aspectRatio: this.aspect } : {}
      }
    },
    mounted() {
      this.checkComplete()
    },
    watch: {
      src() {
        this.loaded = false
        this.$nextTick(this.checkComplete)
      }
    },
    methods: {
      onLoad() {
        this.loaded = true
      },
      checkComplete() {
        const img = this.$refs.img
        if (img && img.complete && img.naturalWidth > 0) this.onLoad()
      }
    }
  }
</script>

<style scoped>
  .lazy-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .lazy-img-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, currentColor 6%, transparent) 0%,
      color-mix(in srgb, currentColor 12%, transparent) 50%,
      color-mix(in srgb, currentColor 6%, transparent) 100%
    );
    background-size: 200% 100%;
    animation: lazy-shimmer 1.4s ease-in-out infinite;
    z-index: 1;
  }
  .lazy-img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    /* Include transform + the individual `scale`/`translate`/`rotate` props so
       hover-scale eases smoothly. Tailwind v4's `scale-*` sets the standalone
       CSS `scale:` property (NOT `transform: scale()`), and this unlayered
       scoped rule outranks Tailwind's `transition-transform`, so `scale` must be
       named here explicitly or the hover would snap instantly. */
    transition: opacity 0.45s ease,
                transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                scale 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                translate 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 2;
  }
  .lazy-img-wrap.is-loaded .lazy-img {
    opacity: 1;
  }
  @keyframes lazy-shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lazy-img-skeleton { animation: none; }
    .lazy-img { transition: none; }
  }
</style>
