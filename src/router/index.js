import { createRouter, createWebHistory } from "vue-router";

import {
  mdiHome,
  mdiTrophy,
  mdiInformation,
  mdiTranslate,
  mdiMusic,
  mdiHistory,
  mdiCog,
  mdiCloseOctagon,
  mdiBookAlphabet,
  mdiBulletinBoard
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
    path: "/setting/about",
    name: "about",
    icon: mdiInformation,
    component: () => import("../views/setting/index.vue"),
  },
  {
    path: "/yunjin",
    name: "yunjin",
    component: () => import("../views/yunjin/index.vue"),
  },
  {
    path: "/notice",
    name: "notice",
    icon: mdiBulletinBoard ,
    component: () => import("../views/notice/index.vue"),
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
    icon: mdiCloseOctagon,
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
    icon: mdiCloseOctagon,
    component: () => import("../views/gacha/simulator/index.vue"),
  },
  {
    name: "miyoushe",
    path: "/miyoushe",
    icon: mdiCloseOctagon,
    component: () => import("../views/miyoushe/index.vue"),
  },,
  {
    name: "dictionary",
    path: "/dictionary",
    icon: mdiBookAlphabet,
    component: () => import("../views/dictionary/index.vue"),
  },
  {
    name: "test",
    path: "/test",
    icon: mdiCloseOctagon,
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
