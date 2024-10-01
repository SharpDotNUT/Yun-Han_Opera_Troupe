<script setup>
import { routes as _routes } from "@/router";
import { t } from "@/locales/i18n";
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
    <div id="yunjin">
      <RouterLink to="/yunjin">
        <div>
          <p>前往云堇</p>
        </div>
      </RouterLink>
    </div>
    <div id="github">
      <var-tooltip style="max-width:600px">
        <a style="width:100%" href="https://github.com/SharpDotNUT/Yun-Han_Opera_Troupe/">
          <img
            src="https://ghc.clait.sh/repo/SharpDotNUT/Yun-Han_Opera_Troupe/?bg_color=ffffff&title_color=0366d6&text_color=333333&icon_color=333333&show_user=true"
            style="width:100%" target="_blank" alt="GitHub Repo Card">
        </a>
        <template #content>
          {{ $t("setting.about.open-in-github") }}
        </template>
      </var-tooltip>
    </div>
  </div>
</template>

<style scoped>
@import url("./router-jump.css");
</style>
