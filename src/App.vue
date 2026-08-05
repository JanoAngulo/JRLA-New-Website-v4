<template>
  <div :class="{ 'hide-scrollbar': !urlContainsContent }">
    <Loader v-if="showLoader" @finished="onLoaderFinished" />
    <CustomCursor v-if="!showLoader" />

    <!-- The app mounts behind the boot overlay rather than waiting for it, so
         markup, images, fonts and layout resolve while the intro plays instead of
         serialising after it. The overlay is `position: fixed` at the top of the z
         scale and owns the scroll lock, so it still covers everything; `inert`
         keeps the app underneath out of focus and assistive-tech reach until the
         overlay leaves. -->
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
        // The pager measured itself while the overlay held `overflow: hidden` on
        // <html>. With the lock off, tell it to re-fit and run any deep-link
        // scroll it deferred — a programmatic scroll can't move a locked document.
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
