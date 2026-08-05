import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// Scroll-reveal directive — toggles `.is-revealed` when the element enters the
// viewport (works for horizontal panel entry too, since IO reads rendered
// position). Options via `v-reveal="{ threshold, rootMargin, once }"`.
app.directive('reveal', {
  mounted(el, binding) {
    const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = binding.value || {}
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            if (once) io.unobserve(el)
          } else if (!once) {
            el.classList.remove('is-revealed')
          }
        })
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    el._revealIO = io
  },
  unmounted(el) {
    if (el._revealIO) el._revealIO.disconnect()
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')
