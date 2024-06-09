<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const title = ref("");

const router = useRouter();
console.log(router)

import { useMainStore } from "@/stores/main";
import { RouterLink } from "vue-router";
const mainStore = useMainStore();
watch(
  () => mainStore.title,
  (newVal, oldVal) => {
    title.value = newVal;
  }
);

const display_menu = ref(false);
</script>

<template>
  <var-app-bar :title="title">
    <template #right>
      <var-icon name="menu" @click="display_menu = true" />
    </template>
  </var-app-bar>
  <var-dialog v-model:show="display_menu" :cancel-button="false">
    <template #title>菜单</template>
    <p>本菜单还在开发中，效果可能不太理想。</p>
    <h3>菜单</h3>
    <RouterLink to="/">
      <var-button>首页</var-button>
    </RouterLink>
    <hr />
    <RouterLink to="/calendar">
      <var-button>活动日程表(0.0.1)</var-button>
    </RouterLink>
    <RouterLink to="/translator">
      <var-button>翻译器(1.1.0)</var-button>
    </RouterLink>
  </var-dialog>
</template>