import { createRouter, createWebHistory } from 'vue-router'
import Works from '../components/Works.vue'
import NotFound from '../components/NotFound.vue'

const SITE = 'JRLA Portfolio'
const SITE_DESC = 'John Russel Angulo — front-end developer & UI/UX designer building fast, polished websites, mobile apps, and motion-driven brand experiences.'

export const VALID_SLIDE_HASHES = ['#home', '#features', '#works', '#about', '#contact']

const routes = [
  {
    path: '/',
    name: 'Works',
    component: Works,
    meta: {
      title: `${SITE} — UI/UX Developer`,
      description: SITE_DESC,
      robots: 'index, follow, max-image-preview:large'
    },
    beforeEnter: (to) => {
      if (to.hash && !VALID_SLIDE_HASHES.includes(to.hash)) {
        return { path: '/404', replace: true }
      }
    }
  },
  // Legacy /content/:id route — project detail is rendered as a modal inside Works,
  // not a standalone page. Redirect any inbound link back to the works index.
  {
    path: '/content/:id',
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: `Page not found · ${SITE}`,
      description: 'The page you are looking for does not exist on this portfolio.',
      robots: 'noindex, follow'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

router.afterEach((to) => {
  const base = to.meta?.title || SITE
  document.title = base
  setMeta('description', to.meta?.description || SITE_DESC)
  setMeta('robots', to.meta?.robots || 'index, follow, max-image-preview:large')
})

export default router
