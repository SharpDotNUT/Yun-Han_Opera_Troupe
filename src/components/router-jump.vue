<script setup>
import { routes as _routes } from "@/router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import SvgIcon from "@jamescoyle/vue-icon";
import { RouterLink } from "vue-router";

console.log(_routes);

const routes = _routes.filter((route) => route.name != "yunjin");
</script>

<template>
  <div id="container">
    <div id="apps">
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
