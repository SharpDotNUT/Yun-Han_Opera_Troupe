import { createRouter, createWebHistory } from "vue-router";

import {
  mdiHome,
  mdiTranslate,
  mdiMusic,
  mdiTrophy,
  mdiHistory,
  mdiCog,
} from "@mdi/js";
export const routes = [
  {
    path: "/",
    name: "home",
    icon: mdiHome,
    component: () => import("../views/index.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    icon: mdiCog,
    component: () => import("../views/setting/index.vue"),
  },
  {
    name: "translator",
    path: "/translator",
    icon: mdiTranslate,
    component: () => import("../views/translator/index.vue"),
  },
  {
    name: "song-player",
    path: "/song/player",
    icon: mdiMusic,
    component: () => import("../views/song/player/index.vue"),
  },
  {
    name: "achievement",
    path: "/achievement",
    icon: mdiTrophy,
    component: () => import("../views/achievement/index.vue"),
  },
  {
    name: "XP",
    path: "/xp",
    component: () => import("../views/xp/index.vue"),
  },
  {
    name: "gacha-view",
    path: "/gacha/view",
    icon: mdiHistory,
    component: () => import("../views/gacha/view/index.vue"),
  },
  {
    name: "gacha-simulator",
    path: "/gacha/simulator",
    component: () => import("../views/gacha/simulator/index.vue"),
  },
  {
    name: "miyoushe",
    path: "/miyoushe",
    component: () => import("../views/miyoushe/index.vue"),
  },
  {
    name: "test",
    path: "/test",
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
