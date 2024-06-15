<script setup>

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { RouterLink } from "vue-router";

//const ComponentChangelogs = import("@/views/change_logs/index.vue")
import ComponentChangelogs from "@/views/change_logs/index.vue"
const is_open_changelog = ref(false)

const title = ref("");

const router = useRouter();
console.log(router)


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
    <var-button @click="is_open_changelog = true">更新日志</var-button>
    <var-dialog v-model:show="is_open_changelog" :cancel-button="false" style="width: 90vw;max-height: 90vh; overflow-y: auto;">
      <RouterLink to="/change_logs">
        <var-button type="primary" @click="is_open_changelog = false;display_menu = false">跳转到更新日志页面</var-button>
      </RouterLink>
      <br />
      <ComponentChangelogs></ComponentChangelogs>
      <template #title>更新日志</template>
    </var-dialog>
    <hr />
    <RouterLink to="/calendar">
      <var-button>活动日程表(0.0.1)</var-button>
    </RouterLink>
    <RouterLink to="/translator">
      <var-button>翻译器(1.1.0)</var-button>
    </RouterLink>
    <p>
      作者&反馈: <a href="https://space.bilibili.com/650631530">SDN_Chestnut</a>
      <br />
      目前代码比较垃圾，暂时不开源，后续会开源。
    </p>
  </var-dialog>
</template>