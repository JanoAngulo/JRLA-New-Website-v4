import { createRouter, createWebHistory } from 'vue-router'
import Works from '../components/Works.vue'
import WorkDetails from '../components/WorkDetails.vue'

const SITE = 'JRLA Portfolio'

const routes = [
  {
    path: '/',
    name: 'Works',
    component: Works,
    meta: { title: `${SITE} — John Russel Angulo, Front-End & UI/UX` }
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
