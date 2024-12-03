<script setup>
import { routes as _routes } from "@/router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiGithub } from "@mdi/js";

console.log(_routes);

const routes = _routes.filter((route) => route.name != "yunjin");

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
        <span class="app-name">{{ $t('main.github-os-repo') }}</span>
      </var-paper>
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
</template>

<style scoped>
@import url("./router-jump.css");
</style>
