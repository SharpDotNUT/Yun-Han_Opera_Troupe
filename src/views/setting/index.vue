<script setup>

import { ref, watch } from "vue";

import { useMainStore } from "@/stores/main";
import PackageJSON from "@/../package.json";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBrightness6, mdiTranslate, mdiInformation } from "@mdi/js";
import { setLanguage } from "@/locales/i18n.js";
const language = ref("zh-CN");
const tab = ref(0);

const theme = ref("system");

const mainStore = useMainStore();

watch(theme, () => {
    mainStore.setTheme(theme.value);
});
</script>

<template>
    <div style="display: flex;">
        <var-tabs v-model:active="tab" layout-direction="vertical">
            <var-tab>
                <SvgIcon type="mdi" :path="mdiBrightness6" />主题
            </var-tab>
            <var-tab>
                <SvgIcon type="mdi" :path="mdiTranslate" />语言
            </var-tab>
            <var-tab>
                <SvgIcon type="mdi" :path="mdiInformation" />关于
            </var-tab>
        </var-tabs>

        <div style="display: flex; flex-direction: column; gap: 10px">
            <h1>
                {{ $t("name") }}
                <var-badge v-if="false" :value="'v ' + PackageJSON.version"></var-badge>
            </h1>
            <p>{{ $t("app-bar.subtitle") }}</p>
            <hr />
            <var-select variant="outlined" v-model="theme" :placeholder="$t('setting.theme-selector.title')">
                <template #prepend-icon> <var-icon name="palette" /></template>
                <var-option :label="$t('setting.theme-selector.light')" value="light"></var-option>
                <var-option :label="$t('setting.theme-selector.dark')" value="dark"></var-option>
                <var-option :label="$t('setting.theme-selector.system')" value="system"></var-option>
            </var-select>
            <var-select variant="outlined" v-model="language" :placeholder="$t('setting.language-selector.title')">
                <template #prepend-icon><var-icon name="translate" /></template>
                <var-option label="English" value="en" @click="setLanguage('en')"></var-option>
                <var-option label="中文（简体）" value="zh-CN" @click="setLanguage('zh-CN')"></var-option>
                <var-option label="中文（繁体）" value="zh-TW" @click="setLanguage('zh-TW')"></var-option>
                <var-option label="日本語" value="ja" @click="setLanguage('ja')"></var-option>
            </var-select>
            <hr />
            <p>
                作者 :
                <var-link href="https://github.com/SharpDotNUT">#.NUT Studio</var-link>
                | <var-link href="https://github.com/CNChestnut">Chestnut</var-link>
            </p>
            <p>Copyright © 2024 SharpDotNUT. All rights reserved.</p>
        </div>
    </div>

</template>