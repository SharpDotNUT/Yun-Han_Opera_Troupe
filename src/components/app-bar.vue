<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiApps, mdiCog, mdiAccount, mdiGithub } from "@mdi/js";
import RouterJump from "@/components/router-jump.vue";
import Setting from '@/components/settings/index.vue'
import Account from "./account.vue";

const title = ref("");
const display_account = ref(false);
const display_setting = ref(false);
const mainStore = useMainStore();
const host_name = mainStore.host_name;

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
    <var-app-bar :title="$t('name')" style="position: fixed; top: 0; left: 0; right: 0">
      <template #right>
        <var-menu placement="bottom-end">
          <var-button round text>
            <svg-icon type="mdi" :path="mdiApps"></svg-icon>
          </var-button>
          <template #menu>
            <RouterJump />
          </template>
        </var-menu>
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

</style>
