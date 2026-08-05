<template>
  <div :class="{ 'hide-scrollbar': !urlContainsContent }">
    <Loader v-if="showLoader" @finished="onLoaderFinished" />
    <CustomCursor v-if="!showLoader" />

    <!-- The app renders BEHIND the boot overlay rather than waiting for it. It
         used to sit behind `v-if="!showLoader"`, so nothing existed in the DOM for
         the ~2.6s the intro held: no markup to parse, no images decoding, no fonts
         resolving, no layout to measure. Every bit of that cost landed after the
         overlay left, serialised instead of overlapped.

         The overlay is `position: fixed` at the top of the z scale and owns the
         scroll lock, so it still covers everything. `inert` keeps the hidden app
         out of focus and assistive-tech reach while it does — otherwise a screen
         reader would be reading the portfolio to someone whose screen still says
         LOADING. -->
    <div :inert="showLoader">
      <div v-if="$route.name === 'Works'">
        <web-view></web-view>
      </div>

      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
  import { useThemeStore } from './store'
  import WebView from './components/WebView.vue'
  import Loader from './components/Loader.vue'
  import CustomCursor from './components/CustomCursor.vue'

  export default {
    name: 'App',
    components: {
      WebView,
      Loader,
      CustomCursor
    },
    data() {
      return {
        showLoader: true
      }
    },
    mounted() {
      const themeStore = useThemeStore()
      themeStore.initializeTheme()
    },
    methods: {
      onLoaderFinished() {
        this.showLoader = false
        // The pager built and measured itself while the overlay held
        // `overflow: hidden` on <html>. Now the lock is off, tell it to re-fit and
        // to run any deep-link scroll it deferred (a programmatic scroll cannot
        // move a locked document, so it had to wait).
        requestAnimationFrame(() => window.dispatchEvent(new Event('jrla:booted')))
      }
    },
    computed: {
      urlContainsContent() {
        return this.$route.fullPath.includes('content')
      }
    }
  }
</script>
