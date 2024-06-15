import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue')
    },
    {
      path:"/change_logs",
      name:"change logs",
      component: () => import('../views/change_logs/index.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/calendar/index.vue')
    },
    {
      name:'translator',
      path:'/translator',
      component: () => import('../views/translator/index.vue')
    },
    {
      name:'diary',
      path:'/diary',
      component: () => import('../views/diary/index.vue')
    }
  ]
})

export default router
