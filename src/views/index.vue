<script setup>
import Markdown from "@/components/markdown.vue";

import intro from "./intro.md.js";

import { useMainStore } from '@/stores/main.js';
useMainStore().setTitle('首页')

</script>

<template>
  <div id="main">
    <Markdown :content="intro" />
  </div>
</template>

<style scoped>
#main {
    padding: 10vh 0px;
}
</style>