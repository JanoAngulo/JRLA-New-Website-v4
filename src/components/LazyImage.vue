<template>
  <div class="lazy-img-wrap" :class="{ 'is-loaded': loaded }" :style="aspectStyle">
    <div v-if="!loaded" class="lazy-img-skeleton" aria-hidden="true"></div>
    <img
      v-bind="$attrs"
      :src="src"
      :alt="alt"
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
      aspect: { type: String, default: '' }
    },
    data() {
      return { loaded: false }
    },
    computed: {
      aspectStyle() {
        return this.aspect ? { aspectRatio: this.aspect } : {}
      }
    },
    watch: {
      src() {
        this.loaded = false
      }
    },
    methods: {
      onLoad() {
        this.loaded = true
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
    transition: opacity 0.45s ease;
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
