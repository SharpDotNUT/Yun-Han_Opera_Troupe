<script setup>

import { ref, onMounted } from 'vue'

import { useMainStore } from '@/stores/main.js';
useMainStore().setTitle('首页')

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

const subtitle_raw = '一个在 Github 开源的米家游戏工具箱'
let subtitle_start = new Date().getTime()
const subtitle = ref('')
const title = ref('')
function typing() {
  const delay = 200
  if (new Date().getTime() - subtitle_start > subtitle_raw.length * delay + 10 * delay) {
    subtitle_start = new Date().getTime()
  }
  subtitle.value = subtitle_raw.slice(0, Math.floor((new Date().getTime() - subtitle_start) / delay)) + '_'
  requestAnimationFrame(typing)
}
requestAnimationFrame(typing)

const canvas = ref(null)
let id_rAF = undefined
onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  let rect, width, height, _distance;
  function init() {
    rect = canvas.value.getBoundingClientRect()
    // 设置 canvas 的实际尺寸
    canvas.value.width = rect.width * dpr
    canvas.value.height = rect.height * dpr
    // 缩放 canvas 以适应 CSS 样式
    ctx.scale(dpr, dpr)
    width = canvas.value.width / dpr
    height = canvas.value.height / dpr
    _distance = (width ** 2 + height ** 2) ** 0.5 * 0.25;
  }
  init()
  const numberOfPoints = width * height / 30000;
  console.log(numberOfPoints)
  class Point {
    constructor(width, height) {
      this.x = randomInt(0, width);
      this.y = randomInt(0, height);
      this.r = 2;
      this.vx = randomFloat(-50, 50);
      this.vy = randomFloat(-50, 50);
      this.timeOfLastFrame = Date.now();
    }
    draw(ctx) {
      const theme = useMainStore().theme
      this.x += this.vx * (Date.now() - this.timeOfLastFrame) / 1000;
      this.y += this.vy * (Date.now() - this.timeOfLastFrame) / 1000;
      this.timeOfLastFrame = Date.now();
      if (this.x < this.r || this.x > width - this.r) {
        this.vx = -this.vx;
      }
      if (this.y < this.r || this.y > height - this.r) {
        this.vy = -this.vy;
      }
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.fillStyle = theme === 'dark' ? '#fff' : '#000'
      ctx.fill()
    }
  }
  const points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    points.push(new Point(width, height));
  }
  function draw() {
    init()
    const theme = useMainStore().theme
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
          ctx.strokeStyle = theme === 'dark' ? `rgba(255,255,255,${(1 - distance / _distance)})` : `rgba(0,0,0,${(1 - distance / _distance)})`;
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
      <h1>云翰社</h1>
      <h2>Yun-Han Opera Troupe | <ruby>雲翰社<rt>うんかんしゃ</rt></ruby></h2>
      <p>{{ subtitle }}</p>
    </div>
    <div>
      <p>「云婵娟来花婵娟，风流尽在山水间。」</p>
    </div>
  </div>
</template>

<style scoped>
#main {
  position: fixed;
  top: var(--app-bar-height);
  left: 0;
  right: 0;

  * {
    text-align: center;
  }
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - var(--app-bar-height));
  background-color: var(--color-body);
  filter: blur(0.5px)
}

#head {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  h1 {
    background: linear-gradient(to bottom,
        #3d3a5b,
        #3d3a5b 20%,
        #72c8d6);
    background-clip: text;
    color: transparent;
    font-size: 5vh;
  }

  h2 {
    font-size: 2vh;
    margin-bottom: 10px;
  }

  p {
    font-size: 3vh;
    font-weight: bold;
  }
}
</style>