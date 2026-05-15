<template>
  <div :class="{ 'hide-scrollbar': !urlContainsContent }">
    <div v-if="$route.name !== 'WorkDetails'">
      <web-view></web-view>
    </div>

    <!-- Render router-view only when navigating to WorkDetails -->
    <router-view v-if="$route.name === 'WorkDetails'"></router-view>
  </div>
</template>

<script>
  import { useThemeStore } from './store'
  import WebView from './components/WebView.vue'

  export default {
    name: 'App',
    components: {
      WebView
    },
    mounted() {
      const themeStore = useThemeStore()
      themeStore.initializeTheme()
    },
    computed: {
      urlContainsContent() {
        return this.$route.fullPath.includes('content')
      }
    }
  }
</script>
