<script setup>
import { ref, watch, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBrightness6, mdiTranslate, mdiInformation } from "@mdi/js";
import { i18n } from "@/locales/i18n.ts";
const language = ref(i18n.global.locale);
const ui_isTeyvatFont = ref(mainStore.isUsingTeyvatFont);
const tab = ref("language");
const theme = ref("system");

const props = defineProps({
  isAsComponent: {
    type: Boolean,
    default: false,
  },
});
const show = defineModel("show", { type: Boolean, default: true });

watch(theme, () => {
  mainStore.setTheme(theme.value);
});
watch(ui_isTeyvatFont, () => {
  if (ui_isTeyvatFont.value) {
    language.value = "en";
    mainStore.isUsingTeyvatFont = true;
    router.push({ query: { lang: language.value } });
    document.body.classList.add("teyvat");
  } else {
    mainStore.isUsingTeyvatFont = false;
    document.body.classList.remove("teyvat");
  }
});

const route = useRoute();
const router = useRouter();
onMounted(() => {
  console.log(route.name);
  if (route.name == "about") {
    tab.value = "about";
    router.push("/setting");
  }
});
</script>

<template>
  <var-popup v-model:show="show" position="center">
      <div id="container">
        <var-tabs
          id="tabs"
          v-model:active="tab"
          scrollable="always"
          item-direction="vertical"
          style="height: calc(var(--tabs-item-vertical-height) + 20px)">
          <var-tab name="theme">
            <SvgIcon type="mdi" :path="mdiBrightness6" />
            {{ $t("setting.theme.title") }}
          </var-tab>
          <var-tab name="language">
            <SvgIcon type="mdi" :path="mdiTranslate" />
            {{ $t("setting.language.title") }}
          </var-tab>
        </var-tabs>
        <div id="views">
          <div v-if="tab === 'theme'">
            <var-select
              variant="outlined"
              v-model="theme"
              :placeholder="$t('setting.theme.selector.title')">
              <template #prepend-icon><var-icon name="palette" /></template>
              <var-option
                :label="$t('setting.theme.selector.light')"
                value="light"></var-option>
              <var-option
                :label="$t('setting.theme.selector.light-m2')"
                value="light-md2"></var-option>
              <var-option
                :label="$t('setting.theme.selector.dark')"
                value="dark"></var-option>
              <var-option
                :label="$t('setting.theme.selector.dark-m2')"
                value="dark-md2"></var-option>
              <var-option
                :label="$t('setting.theme.selector.system')"
                value="system"></var-option>
              <var-option
                :label="$t('setting.theme.selector.system-md2')"
                value="system-md2"></var-option>
            </var-select>
          </div>
          <div v-if="tab === 'language'">
            <var-select
              :disabled="ui_isTeyvatFont"
              variant="outlined"
              v-model="language"
              :placeholder="$t('setting.language.selector.title')">
              <template #prepend-icon><var-icon name="translate" /></template>
              <var-option label="English" value="en"></var-option>
              <var-option label="中文（简体）" value="zh-CN"></var-option>
              <var-option label="中文（繁体）" value="zh-TW"></var-option>
              <var-option label="日本語" value="ja"></var-option>
            </var-select>
            <br />
            <p
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
              <span>使用提瓦特语言字体</span>
              <var-switch v-model="ui_isTeyvatFont" :variant="true" />
            </p>
          </div>
          <div v-if="tab === 'about'"></div>
        </div>
      </div>
  </var-popup>
</template>

<style scoped>
@import url("./index.css");
</style>
