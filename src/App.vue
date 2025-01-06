<script setup>
import { ref, onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useMainStore } from "./stores/main";
import AppBar from '@/components/app-bar.vue'
import { useI18n } from "vue-i18n";

const locale = useI18n().locale
const mainStore = useMainStore()
mainStore.initUserInfo()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
router.beforeEach((to, from) => {
  loading.value = true
  return true
})
router.afterEach(() => {
  loading.value = false
})

onMounted(() => {
  const lang = route.query.lang || 'request'
  if (lang !== 'request') {
    locale.value = lang
  }
})

</script>

<template>
  <div id="app">
  <div id="app-bar">
    <AppBar/>
  </div>
  <div id="content" class="elevation-12">
    <RouterView />
    <div id="router-loading" v-if="loading">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <var-loading type="wave" />
        <p>加载中...</p>
      </div>
    </div>
  </div></div>
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
#content {
  box-shadow: 0 0 10px var(--color-body);
  padding: 20px;
  height: calc(100vh - var(--app-bar-height));
  overflow: scroll;
  margin: 0 auto;
}

#router-loading {
  position: fixed;
  top: var(--app-bar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

html[data-theme="dark"] #router-loading {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
