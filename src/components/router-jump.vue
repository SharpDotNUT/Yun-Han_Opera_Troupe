<script setup>
import { routes } from "@/router";
import { t } from "@/locales/i18n";

import SvgIcon from "@jamescoyle/vue-icon";
</script>

<template>
  <div id="container">
    <div id="apps">
    <RouterLink class="app" v-for="route in routes" :to="route.path">
      <var-button class="app-button" block>
        <div>
          <SvgIcon v-if="route.icon" type="mdi" :path="route.icon" />
          <br />
          <span class="app-name">{{t("apps-name."+route.name)}}</span>
        </div>
      </var-button>
    </RouterLink></div>
    <div>
      <var-tooltip style="max-width:600px">
          <a style="width:100%" href="https://github.com/SharpDotNUT/Yun-Han_Opera_Troupe/">
              <img src="https://ghc.clait.sh/repo/SharpDotNUT/Yun-Han_Opera_Troupe/?bg_color=ffffff&title_color=0366d6&text_color=333333&icon_color=333333&show_user=true"
              style="width:100%" target="_blank" alt="GitHub Repo Card">
          </a>
          <template #content>
              {{ $t("setting.about.open-in-github") }}
          </template>
      </var-tooltip></div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  gap:20px;
  padding: 10px;
  max-width: min(90vh, 340px);
}

#apps{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.app {
  width: 100px;
  height: 100px;
  text-decoration: none;
}

.app-button {
  width: 100%;
  height: 100%;
  border-radius: 20%;
}

.app-name {
  display: block;
  text-wrap: wrap;
}
</style>
