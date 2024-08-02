<script setup>

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { RouterLink } from "vue-router";
import { routes } from "@/router";

import PackageJSON from "@/../package.json";
import ChangeLog from '../../CHANGELOGS.md?raw';
import Markdown from '@/components/markdown.vue';

const title = ref("");
const theme = ref("light");
const display_changeLog = ref(false);
const display_menu = ref(false);

const router = useRouter();
console.log(router)

const mainStore = useMainStore();
watch(
  () => mainStore.title,
  (newVal, oldVal) => {
    title.value = newVal
  }
);

function openGithub() {
  window.open("https://github.com/SharpDotNUT/yunhan-toolbox/");
}

watch(theme,()=>{
  mainStore.setTheme(theme.value);
})
function changeTheme(theme){
  if(theme === 'light'){
    mainStore.setTheme('light');
  }else{
    mainStore.setTheme('dark');
  }
}

</script>

<template>
  <div style="height:var(--app-bar-height);">
    <var-app-bar :title="title" style="position: fixed; top: 0; left: 0; right: 0">
      <template #right>
        <var-button round text color="transparent" @click="openGithub()">
          <var-icon name="github" :size="24" />
        </var-button>
        <var-button round text color="transparent">
          <var-icon name="menu" @click="display_menu = true" :size="24" />
        </var-button>
      </template>
      <template #left></template>
    </var-app-bar>
  </div>
  <var-popup position="right" style="width:min(70vw,600px);padding:10vh 20px;" v-model:show="display_menu"
    :cancel-button="false">
    <div style="display:flex;flex-direction:column;gap:10px">
      <h1>菜单<var-badge :value="'v ' + PackageJSON.version"></var-badge></h1>
      <p>「红毹婵娟，庄谐并举」</p>
      <p>作者 :
        <var-link href="https://github.com/SharpDotNUT">#.NUT Studio - OpenSource 团队</var-link>
        |
        <var-link href="https://github.com/CNChestnut">Chestnut</var-link>
      </p>
      <p>Copyright © 2024 SharpDotNUT. All rights reserved.</p>
      <hr />
      <RouterLink to="/">
        <var-button block>首页</var-button>
      </RouterLink>
      <var-button block @click="openGithub()">Github 仓库</var-button>
      <var-button block @click="$emit('changeIsFullWidth')">界面全宽优化（测试中功能）</var-button>
      <var-select variant="outlined" v-model="theme" placeholder="选择主题">
        <template #prepend-icon>
          <var-icon name="palette" /></template>
        <var-option label="浅色模式" value="light"></var-option>
        <var-option label="深色模式" value="dark"></var-option>
        <var-option label="跟随系统" value="system"></var-option>
      </var-select>
      <hr />
      <RouterLink v-for="route in routes" :to="route.path">
        <var-button block>{{ route.name }}</var-button>
      </RouterLink>
      <hr />
      <var-collapse v-model="display_changeLog">
        <var-collapse-item title="更新日志">
          <Markdown :content="ChangeLog" />
        </var-collapse-item>
      </var-collapse>
    </div>
  </var-popup>

</template>