<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import { t } from "@/locales/i18n";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiApps, mdiCog, mdiAccount, mdiGithub } from "@mdi/js";
import RouterJump from "@/components/router-jump.vue";
import Setting from '@/views/setting/index.vue'
import Account from "./account.vue";

const title = ref("");
const display_account = ref(false);
const display_setting = ref(false);
const mainStore = useMainStore();
const host_name = mainStore.host_name;

function openGithub() {
  window.open("https://github.com/SharpDotNUT/Yun-Han_Opera_Troupe");
}

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
  });

const emits = defineEmits(["changeIsFullWidth"]);

watch(
  () => mainStore.title,
  (newVal, oldVal) => {
    title.value = newVal;
  }
);

</script>

<template>
  <div style="height: var(--app-bar-height);">
    <var-app-bar :title="$t('name') + ' - ' + t(title)" style="position: fixed; top: 0; left: 0; right: 0">
      <template #right>
        <var-button round text color="transparent" @click="openGithub()">
          <svg-icon type="mdi" :path="mdiGithub"></svg-icon>
        </var-button>
        <var-button round text color="transparent" @click="display_account = !display_account">
          <svg-icon type="mdi" :path="mdiAccount"></svg-icon>
        </var-button>
        <var-menu placement="bottom-end">
          <var-button round text @click="display_setting = false">
            <svg-icon type="mdi" :path="mdiApps"></svg-icon>
          </var-button>
          <template #menu>
            <RouterJump/>
          </template>
        </var-menu>
        <var-button round text color="transparent" @click="display_setting = !display_setting">
          <svg-icon type="mdi" :path="mdiCog"></svg-icon>
        </var-button>
        <var-popup v-model:show="display_setting"
          style="position: fixed; top: var(--app-bar-height); right: 0;bottom:0;left:0;padding:5%"
          :overlay="false">
          <Setting />
        </var-popup>
      </template>
      <template #left></template>
    </var-app-bar>
  </div>
  <Account :show="display_account" @update:display_account="display_account = false" />
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
