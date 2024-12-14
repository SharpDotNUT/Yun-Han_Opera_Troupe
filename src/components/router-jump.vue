<script setup>
import { ref } from "vue";
import Setting from "../components/settings/index.vue";
import About from "../components/about.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCog, mdiGithub, mdiInformation } from "@mdi/js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { routes as _routes } from "@/router";

const routes = _routes
.filter((route) => route.name != "yunjin")
.filter((route) => !(route?.notShow))

const ui_showSettings = ref(false);
const ui_showAbout = ref(false);

function open_in_github() {
  window.open("https://github.com/SharpDotNUT/Yun-Han_Opera_Troupe");
}
</script>

<template>
  <div id="container">
    <div id="apps">
      <var-paper
        elevation="3"
        class="app var-button"
        block
        @click="open_in_github">
        <SvgIcon class="icon" type="mdi" :path="mdiGithub" />
        <span class="app-name">{{ $t("main.github-os-repo") }}</span>
      </var-paper>
      <var-paper
        elevation="3"
        class="app var-button"
        block
        @click="ui_showSettings = true">
        <SvgIcon class="icon" type="mdi" :path="mdiCog" />
        <span class="app-name">{{ $t("main.settings") }}</span>
      </var-paper>
      <var-paper
        elevation="3"
        class="app var-button"
        block
        @click="ui_showAbout = true">
        <SvgIcon class="icon" type="mdi" :path="mdiInformation" />
        <span class="app-name">{{ $t("main.about") }}</span>
      </var-paper>
      <var-divider />
      <var-paper
        elevation="3"
        v-for="route in routes"
        class="app var-button"
        @click="$router.push(route.path)"
        block>
        <SvgIcon class="icon" v-if="route.icon" type="mdi" :path="route.icon" />
        <span class="app-name">{{ t("apps-name." + route.name) }}</span>
      </var-paper>
    </div>
  </div>
  <Setting v-model:show="ui_showSettings" style="border-radius: 20px" />
  <About v-model:show="ui_showAbout" style="border-radius: 20px" />
</template>

<style scoped>
@import url("./router-jump.css");
</style>
