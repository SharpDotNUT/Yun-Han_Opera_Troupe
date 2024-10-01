<script setup>
import { routes } from "@/router";
import { t } from "@/locales/i18n";

import SvgIcon from "@jamescoyle/vue-icon";
</script>

<template>
  <div id="container">
    <RouterLink class="app" v-for="route in routes" :to="route.path">
      <var-button class="app-button" block>
        <div>
          <SvgIcon v-if="route.icon" type="mdi" :path="route.icon" />
          <br />
          <span class="app-name">{{t("apps-name."+route.name)}}</span>
        </div>
      </var-button>
    </RouterLink>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  padding: 10px;
  max-width: min(90vh, 340px);
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
