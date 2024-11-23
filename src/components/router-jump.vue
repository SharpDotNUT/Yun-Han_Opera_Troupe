<script setup>
import { routes as _routes } from "@/router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import SvgIcon from "@jamescoyle/vue-icon";

console.log(_routes);

const routes = _routes.filter(route => route.name != 'yunjin');

</script>

<template>
  <div id="container">
    <div id="apps">
      <div class="app" v-for="route in routes">
        <RouterLink :to="route.path">
          <var-button class="app-button" block>
            <div>
              <SvgIcon v-if="route.icon" type="mdi" :path="route.icon" />
              <br />
              <span class="app-name">{{ t("apps-name." + route.name) }}</span>
            </div>
          </var-button>
        </RouterLink>
      </div>
    </div>
    <div v-if="false" id="yunjin">
        <img id="yunjin-img" src="../views/background-small.png"/>
      <RouterLink to="/yunjin">
        <div id="yunjin-text">
          <p>前往云堇</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@import url("./router-jump.css");
</style>
