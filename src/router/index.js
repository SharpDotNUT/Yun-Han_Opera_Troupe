import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: '主页',
    component: () => import('../views/index.vue')
  },
  {
    name:'翻译器',
    path:'/translator',
    component: () => import('../views/translator/index.vue')
  },
  {
    name:'音乐播放器',
    path:'/song/player',
    component: () => import('../views/song/player/index.vue')
  },
  {
    name:"成就工具",
    path:"/achievement",
    component: () => import('../views/achievement/index.vue')
  },
  {
    name:'XP 分析工具',
    path:'/xp',
    component: () => import('../views/xp/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
