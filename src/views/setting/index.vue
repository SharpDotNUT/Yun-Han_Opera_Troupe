<script setup>

import { ref, watch, onMounted } from "vue";
import { i18n } from "@/locales/i18n.ts";
import { useMainStore } from "@/stores/main";
import { useRoute, useRouter } from "vue-router";
import PackageJSON from "@/../package.json";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBrightness6, mdiTranslate, mdiInformation } from "@mdi/js";
import { setLanguage as _setLanguage } from "@/locales/i18n.ts";
const language = ref(i18n.global.locale);
const tab = ref("language");
const theme = ref("system");
const mainStore = useMainStore();

const props = defineProps({
    isAsComponent: {
        type: Boolean,
        default: false
    }
})

watch(theme, () => {
    mainStore.setTheme(theme.value);
});

const BuildTime = BUILD_TIME
const route = useRoute()
const router = useRouter();
const setLanguage = (locale) => {
    _setLanguage(locale);
    router.push({ query: { lang: locale } });
}
onMounted(() => {
    console.log(route.name)
    if (route.name == 'about') {
        tab.value = 'about'
        router.push('/setting')
    }
})

console.log(import.meta.env)

</script>

<template>
    <div id="container" style="display: flex;">
        <var-tabs id="tabs" v-model:active="tab" scrollable="always" item-direction="vertical"
            style="height:calc(var(--tabs-item-vertical-height) + 20px)">
            <var-tab name="theme">
                <SvgIcon type="mdi" :path="mdiBrightness6" />
                {{ $t("setting.theme.title") }}
            </var-tab>
            <var-tab name="language">
                <SvgIcon type="mdi" :path="mdiTranslate" />
                {{ $t("setting.language.title") }}
            </var-tab>
            <var-tab name="about">
                <SvgIcon type="mdi" :path="mdiInformation" />
                {{ $t("setting.about.title") }}
            </var-tab>
        </var-tabs>
        <div id="views">
            <div v-if="tab === 'theme'">
                <var-select variant="outlined" v-model="theme" :placeholder="$t('setting.theme.selector.title')">
                    <template #prepend-icon> <var-icon name="palette" /></template>
                    <var-option :label="$t('setting.theme.selector.light')" value="light"></var-option>
                    <var-option :label="$t('setting.theme.selector.light-m2')" value="light-md2"></var-option>
                    <var-option :label="$t('setting.theme.selector.dark')" value="dark"></var-option>
                    <var-option :label="$t('setting.theme.selector.dark-m2')" value="dark-md2"></var-option>
                    <var-option :label="$t('setting.theme.selector.system')" value="system"></var-option>
                    <var-option :label="$t('setting.theme.selector.system-md2')" value="system-md2"></var-option>
                </var-select>
            </div>
            <div v-if="tab === 'language'">
                <var-select variant="outlined" v-model="language" :placeholder="$t('setting.language.selector.title')">
                    <template #prepend-icon><var-icon name="translate" /></template>
                    <var-option label="English" value="en" @click="setLanguage('en')"></var-option>
                    <var-option label="中文（简体）" value="zh-CN" @click="setLanguage('zh-CN')"></var-option>
                    <var-option label="中文（繁体）" value="zh-TW" @click="setLanguage('zh-TW')"></var-option>
                    <var-option label="日本語" value="ja" @click="setLanguage('ja')"></var-option>
                </var-select>
            </div>
            <div v-if="tab === 'about'">
                <div style="display: flex; flex-direction: column; gap: 10px">
                    <p style="font-size:32px;text-align: center">
                        {{ $t("name") }}
                        <var-badge :value="'v ' + PackageJSON.version"></var-badge>
                    </p>
                    <p style="text-align: center">
                        <var-link href="https://github.com/SharpDotNUT">#.NUT Studio</var-link>
                        | <var-link href="https://github.com/CNChestnut">Chestnut</var-link>
                    </p>
                    <hr />
                    <p>{{ $t('setting.about.build-time', [new Date(BuildTime).toLocaleString()]) }}</p>
                    <p>Copyright © 2024 SharpDotNUT. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
@import url("./index.css");
</style>