<script setup>

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { RouterLink } from "vue-router";

import PackageJSON from "@/../package.json";

import { Themes, StyleProvider } from '@varlet/ui'

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
    title.value = newVal
  }
);

const display_menu = ref(false);
</script>

<template>
  <div style="height:var(--app-bar-height);">
    <var-app-bar :title="title" style="position: fixed; top: 0; left: 0; right: 0">
      <template #right>
        <var-icon name="menu" @click="display_menu = true" />
      </template>
      <template #left></template>
    </var-app-bar>
  </div>
  <var-dialog v-model:show="display_menu" :cancel-button="false">
    <template #title>菜单</template>
    <p>版本 : {{PackageJSON.version}}</p>
    <RouterLink to="/">
      <var-button>首页</var-button>
    </RouterLink>
    <var-button @click="is_open_changelog = true">更新日志</var-button><br />
    <var-button @click="$emit('changeIsFullWidth')">界面全宽优化（测试中功能）</var-button>
    <hr>
    <var-button @click="StyleProvider()">切换主题至 Material Design 2</var-button>
    <var-button @click="StyleProvider(Themes.md3Light)">切换主题至 Material You</var-button>
    <var-dialog v-model:show="is_open_changelog" :cancel-button="false"
      style="width: 90vw;max-height: 90vh; overflow-y: auto;">
      <RouterLink to="/change_logs">
        <var-button type="primary" @click="is_open_changelog = false; display_menu = false">跳转到更新日志页面</var-button>
      </RouterLink>
      <br />
      <ComponentChangelogs></ComponentChangelogs>
      <template #title>更新日志</template>
    </var-dialog>
    <hr />
  </var-dialog>

</template>