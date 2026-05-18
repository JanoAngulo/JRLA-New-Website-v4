import { createRouter, createWebHistory } from 'vue-router'
import Works from '../components/Works.vue'

const WorkDetails = () => import('../components/WorkDetails.vue')

const SITE = 'JRLA Portfolio'

const routes = [
  {
    path: '/',
    name: 'Works',
    component: Works,
    meta: { title: `${SITE} — UI/UX Developer` }
  },
  {
    path: '/content/:id',
    name: 'WorkDetails',
    component: WorkDetails,
    props: true,
    meta: { title: `Project · ${SITE}` }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const id = to.params?.id
  const base = to.meta?.title || SITE
  document.title = id ? `${decodeURIComponent(id).replace(/-/g, ' ')} · ${SITE}` : base
})

export default router
