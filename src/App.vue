<template>
  <div :class="{ 'hide-scrollbar': !urlContainsContent }">
    <Loader v-if="showLoader" @finished="onLoaderFinished" />
    <CustomCursor v-if="!showLoader" />

    <!-- Mounts behind the boot overlay so assets load during the intro.
         `inert` keeps it out of focus and AT reach until the overlay leaves. -->
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
        // Pager measured under the overlay's scroll lock: re-fit and run the deferred deep-link scroll.
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
