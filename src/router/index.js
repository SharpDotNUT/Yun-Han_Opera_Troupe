import { createRouter, createWebHistory } from 'vue-router'

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
  },
  {
    name:"卡池(测试)",
    path:"/gacha/view",
    component: () => import('../views/gacha/view/index.vue')
  },{
    name:"米游社",
    path:"/miyoushe",
    component: () => import('../views/miyoushe/index.vue')
  },{
    name:"",
    path:"/test",
    component: () => import('../views/test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
