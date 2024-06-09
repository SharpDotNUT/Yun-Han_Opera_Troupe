<script setup>
import { ref, watch } from "vue";
import { RouterView } from "vue-router";

import AppBar from '@/components/app-bar.vue'

</script>

<template>
  <div id="app-bar">
    <AppBar />
  </div>
  <div id="app" class="elevation-12">
    <RouterView />
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

#app {
  background-color: #f7f7f7;
  padding: 20px;
  width: min(100%, 600px);
  min-height: 100vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
