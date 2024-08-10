<script setup>

import { ref, onMounted } from 'vue'

import { useMainStore } from '@/stores/main.js';
useMainStore().setTitle('首页')

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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

const canvas = ref(null)
onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.value.getBoundingClientRect()
  // 设置 canvas 的实际尺寸
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  // 缩放 canvas 以适应 CSS 样式
  ctx.scale(dpr, dpr)
  const width = canvas.value.width / dpr
  const height = canvas.value.height / dpr
  const _distance = (width ** 2 + height ** 2) ** 0.5 * 0.25;
  class Point {
    constructor(width, height) {
      this.x = randomInt(0, width);
      this.y = randomInt(0, height);
      this.vx = randomInt(-5, 5);
      this.vy = randomInt(-5, 5);
      this.timeFromLastFrame = undefined;
    }
    draw(ctx) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > height) {
        this.vy = -this.vy;
      }
      ctx.beginPath()
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  const points = [];
  for (let i = 0; i < 30; i++) {
    points.push(new Point(width, height));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
      points[i].draw(ctx);
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < _distance) {
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[j].x, points[j].y)
          ctx.closePath()
          ctx.strokeStyle = `rgba(0,0,0,${(1 - distance / _distance)})`;
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})

</script>

<template>
  <div id="main">
    <canvas id="canvas" ref="canvas"></canvas>
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

#canvas {
  width: 100%;
  height: 100%;
  display: fixed;
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

  p {
    font-size: 2vmin;
    font-weight: bold;
  }
}
</style>