<template>
  <div :class="{ 'hide-scrollbar': !urlContainsContent }">
    <Loader v-if="showLoader" @finished="onLoaderFinished" />
    <CustomCursor v-if="!showLoader" />

    <template v-if="!showLoader">
      <div v-if="$route.name !== 'WorkDetails'">
        <web-view></web-view>
      </div>

      <router-view v-if="$route.name === 'WorkDetails'"></router-view>
    </template>
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
      }
    },
    computed: {
      urlContainsContent() {
        return this.$route.fullPath.includes('content')
      }
    }
  }
</script>
