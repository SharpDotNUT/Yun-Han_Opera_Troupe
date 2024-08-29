<script setup>

import { useMainStore } from '@/stores/main.js';
useMainStore().setTitle('首页')

import RouterJump from '@/components/router-jump.vue'

</script>

<template>
  <div id="main">
    <div>
      <div id="content">
        <div id="title">
          <h1>{{ $t('name') }}</h1>
          <h2>Yun-Han Opera Troupe | <ruby>雲翰社<rt>うんかんしゃ</rt></ruby></h2>
        </div>
        <div>
          <p>「 云婵娟来花婵娟，风流尽在山水间。 」</p>
          <p>云翰社是一个在 <var-link href="https://github.com/SharpDotNUT/yunhan-toolbox">GitHub</var-link> 开源的米哈游游戏工具箱。</p>
          <p>首页未完工，使用请点击右上角菜单</p>
        </div>
      </div>
    </div>
    <div style="height:30vh">
    </div>
    临时路由
    <RouterJump />
  </div>
</template>

<style scoped>
#main {
  top: var(--app-bar-height);
  * {
    text-align: center;
  }
}

#title {

  h1,
  h2 {
    background: linear-gradient(-30deg,
        #f19ebe 0%,
        #f19ebe 30%,
        #72c8d6 70%,
        #72c8d6 100%);
    background-clip: text;
    color: transparent;
  }

  h1 {
    font-size: 8vh;
  }

  h2 {
    font-size: 2vh;
    margin-bottom: 10px;
  }

  margin-bottom: 10vh;
}

#content {
  position: relative;
  margin: 30vh auto 0 auto;
  max-width: 600px;
}
</style>