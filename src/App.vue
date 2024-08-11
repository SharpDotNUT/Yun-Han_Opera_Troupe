<script setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

import AppBar from '@/components/app-bar.vue'

const isFullWidth = ref(false)

const router = useRouter()
const loading = ref(false)
router.beforeEach((to, from) => {
  loading.value = true
  return true
})
router.afterEach(() => {
  loading.value = false
})

</script>

<template>
  <div id="app-bar">
    <AppBar @changeIsFullWidth="isFullWidth = !isFullWidth" />
  </div>
  <div id="content" class="elevation-12" :style="{ width: isFullWidth ? '100%' : 'min(100%, 1000px)' }">
    <RouterView />
    <div id="router-loading" v-if="loading">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <var-loading type="wave" />
        <p>加载中...</p>
      </div>
    </div>
  </div>
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
  background-color: var(--color-body);
  padding: 20px;
  min-height: calc(100vh - var(--app-bar-height));
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
