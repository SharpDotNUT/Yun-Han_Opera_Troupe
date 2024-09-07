<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { RouterLink } from "vue-router";
import { routes } from "@/router";

import RouterJump from "@/components/router-jump.vue";
import PackageJSON from "@/../package.json";

import Account from "./account.vue";

import {setLanguage} from '@/locales/i18n.js'

const s_showRouterJump = ref(false);
const title = ref("");
const theme = ref("system");
const display_changeLog = ref(false);
const display_menu = ref(false);
const display_account = ref(true);
const ref_account = ref(null);

const host_name = useMainStore().host_name;

const router = useRouter();
console.log(router);

const mainStore = useMainStore();
watch(
  () => mainStore.title,
  (newVal, oldVal) => {
    title.value = newVal;
  }
);

function openGithub() {
  window.open("https://github.com/SharpDotNUT/yunhan-toolbox/");
}

watch(theme, () => {
  mainStore.setTheme(theme.value);
});

fetch(`${host_name}/api/notice`)
  .then((res) => res.json())
  .then((data) => {
    if (data.show == "true")
      Dialog({
        title: "提示",
        message: data.text,
      });
  })
  .catch((err) => {
    // Dialog({
    //   title: '提示',
    //   message: '连接后端服务器失败'
    // })
  });

  
import { loadAndSetLanguage } from '@/locales/i18n';
loadAndSetLanguage('zh-CN', 'app-bar')
loadAndSetLanguage('en', 'app-bar')

const emits = defineEmits(["changeIsFullWidth"]);
</script>

<template>
  <div style="height: var(--app-bar-height)">
    <var-app-bar
      :title="title"
      style="z-index: 114514; position: fixed; top: 0; left: 0; right: 0"
    >
      <template #right>
        <var-button round text color="transparent" @click="openGithub()">
          <var-icon name="github" :size="24" />
        </var-button>
        <var-button round text color="transparent">
          <var-icon
            name="account-circle"
            @click="ref_account.open()"
            :size="24"
          />
        </var-button>
        <var-button round text color="transparent">
          <var-icon name="menu" @click="display_menu = true" :size="24" />
        </var-button>
      </template>
      <template #left></template>
    </var-app-bar>
  </div>
  <var-popup
    id="menu"
    position="right"
    v-model:show="display_menu"
    :cancel-button="false"
  >
    <div style="display: flex; flex-direction: column; gap: 10px">
      <h1>
        {{ $t("name") }}
        <var-badge
          v-if="false"
          :value="'v ' + PackageJSON.version"
        ></var-badge>
      </h1>
      <p>{{$t('app-bar.subtitle')}}</p>
      <hr />
      <var-select variant="outlined" v-model="theme" :placeholder="$t('app-bar.theme-selector.title')">
        <template #prepend-icon> <var-icon name="palette" /></template>
        <var-option :label="$t('app-bar.theme-selector.light')" value="light"></var-option>
        <var-option :label="$t('app-bar.theme-selector.dark')" value="dark"></var-option>
        <var-option :label="$t('app-bar.theme-selector.system')" value="system"></var-option>
      </var-select>
      <var-button @click="setLanguage('en')">En</var-button>
      <var-button @click="setLanguage('zh-CN')">ZH</var-button>
      <hr />
      <var-collapse v-model="s_showRouterJump">
        <var-collapse-item title="路由跳转（临时）" name="1">
          <RouterJump></RouterJump>
        </var-collapse-item>
      </var-collapse>
      <hr />
      <p>
        作者 :
        <var-link href="https://github.com/SharpDotNUT">#.NUT Studio</var-link>
        | <var-link href="https://github.com/CNChestnut">Chestnut</var-link>
      </p>
      <p>Copyright © 2024 SharpDotNUT. All rights reserved.</p>
    </div>
  </var-popup>
  <Account
    ref="ref_account"
    :show="display_account"
    @update:display_account="display_account = false"
  />
</template>

<style>
#menu {
  width: min(70vw, 600px);
  padding: 10vh 20px;
  top: var(--app-bar-height);
}
.var-popup__overlay {
  top: var(--app-bar-height);
  height: calc(100vh - var(--app-bar-height));
}
</style>
