<script setup>

import { ref } from 'vue'

import { useMainStore } from '@/stores/main.js';
useMainStore().setTitle('首页')

const title_raw = '云翰工具箱'
let title_start = new Date().getTime()
const subtitle_raw = '一个在 Github 开源的米家游戏工具箱'
let subtitle_start = new Date().getTime()
const subtitle = ref('')
const title = ref('')
function typing() {
  const delay = 200
  if (new Date().getTime() - title_start > title_raw.length * delay + 10 * delay) {
    title_start = new Date().getTime()
  }
  if (new Date().getTime() - subtitle_start > subtitle_raw.length * delay + 10 * delay) {
    subtitle_start = new Date().getTime()
  }
  title.value = title_raw.slice(0, Math.floor((new Date().getTime() - title_start) / delay)) + '_'
  subtitle.value = subtitle_raw.slice(0, Math.floor((new Date().getTime() - subtitle_start) / delay)) + '_'
  requestAnimationFrame(typing)
}
requestAnimationFrame(typing)

</script>

<template>
  <div id="main">
    <div id="head">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
    <div>
      <p>新版首页未完成，请使用右上角菜单使用。</p>
      <p>「云婵娟来花婵娟，风流尽在山水间。」</p>
    </div>
  </div>
</template>

<style scoped>
#main {
  padding: 10vmin 0px;

  * {
    text-align: center;
  }
}

#head {
  h1 {
    background: linear-gradient(to bottom,
        #3d3a5b,
        #3d3a5b 20%,
        #72c8d6);
    background-clip: text;
    color: transparent;
    font-size: 5vmin;
    margin-bottom: 10px;
  }
  p{
    font-size: 2vmin;
    font-weight: bold;
  }
}
</style>