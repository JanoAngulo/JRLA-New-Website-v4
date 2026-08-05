import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// The `v-reveal` directive that used to live here has been removed. It was
// superseded by the `sectionReveal` mixin (which replays on every panel entry
// rather than firing once) and by `useScrollScrub`, and nothing had referenced it
// for a while — it was shipping an IntersectionObserver factory nobody called.

app.use(pinia)
app.use(router)
app.mount('#app')
