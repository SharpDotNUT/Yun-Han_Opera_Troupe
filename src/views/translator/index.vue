<script setup>
import { ref, watch, nextTick, onMounted } from "vue";

import Markdown from "../../components/markdown.vue";
import FontSelector from './font-selector.vue'

import { Snackbar } from '@varlet/ui'

import domtoimage from "dom-to-image";

import Text from "./text.md?raw";
import FontData from "./map.json";

import { useMainStore } from "@/stores/main.js";
useMainStore().setTitle("翻译器");

let font_data = [];
let i = 0;
FontData.map((item) => {
  font_data.push({
    id: i,
    name: item.font_name,
    description: item.description.zh,
    class:item.types.otf
  });
  i++;
});

const raw_text = ref("Type your text here");
const isASCII = ref(true);
const result_text = ref("Type your text here");
const result_img_url = ref("");
const translate_order = ref(1)
const display = ref({
  result: true,
  result_img: false,
});
const font_info = ref({
  font: 5,
  class: "hoyo-glyphs-DeshretNeue-Regular-otf",
  raw_class: "hoyo-glyphs-DeshretNeue-Regular-otf",
  result_class: "hoyo-glyphs-DeshretNeue-Regular-otf",
  size: 32,
  auto_wrap: false,
});


function copy_to_clipboard() {
  navigator.clipboard.writeText(result_text.value)
    .then(() => {
      Snackbar("复制成功")
    })
    .catch(err => {
      Snackbar("复制失败:" + err.message)
      new Error(err)
    });
}

const keyboard_key = {
  "keys": [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ],
  "controls": [
    ["Space", "Enter", "Backspace", "Clear"]]
}
const textarea_start = ref(raw_text.value.length);
watch(textarea_start, (new_value, old_value) => {
  console.log('textarea_start', new_value)
})
let dom_textarea
onMounted(() => {
  dom_textarea = document.getElementById("raw-text")
  dom_textarea.addEventListener('keydown', (e) => {
    console.log((/[a-zA-z0-9]{1}/).test(e.key))
    textarea_start.value = e.target.selectionStart;
    if ((/[a-zA-z0-9]/).test(e.key) && e.key.length == 1) {
      e.preventDefault()
      Snackbar('请使用软键盘输入！')
    }
  })
  dom_textarea.addEventListener('click', (e) => {
    textarea_start.value = e.target.selectionStart;
  })
})
function handle_key(key_name) {
  if (key_name == "Space") {
    raw_text.value = raw_text.value.slice(0, textarea_start.value) + " " + raw_text.value.slice(textarea_start.value)
    textarea_start.value += 1;
  } else if (key_name == "Enter") {
    raw_text.value = raw_text.value.slice(0, textarea_start.value) + "\n" + raw_text.value.slice(textarea_start.value)
    textarea_start.value += 1;
  } else if (key_name == "Backspace") {
    if (textarea_start.value > 0) {
      raw_text.value = raw_text.value.slice(0, textarea_start.value - 1) + raw_text.value.slice(textarea_start.value)
      textarea_start.value -= 1;
    }
    else {
      Snackbar('不能再删除了 φ(*￣0￣)')
    }
  } else if (key_name == "Clear") {
    raw_text.value = "";
    textarea_start.value = 0;
  } else {
    raw_text.value = raw_text.value.slice(0, textarea_start.value) + key_name + raw_text.value.slice(textarea_start.value)
    textarea_start.value += 1;
  }
  dom_textarea.focus()
  nextTick(() => {
    dom_textarea.setSelectionRange(textarea_start.value, textarea_start.value);
  });
  console.log('--textarea_start', textarea_start.value)
}

function save_as_image() {
  const result_text = document.getElementById("result-text");
  domtoimage
    .toPng(result_text, { bgcolor: "#fff", quality: 1.0 })
    .then(function (dataUrl) {
      console.log(dataUrl);
      result_img_url.value = dataUrl;
      display.value.result_img = true;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

watch(raw_text, (new_value, old_value) => {
  result_text.value = new_value;

  // 检测是否有非 ASCII 字符
  isASCII.value = /[^\x00-\x7F]/.test(new_value)

});

function handle_font_change() {
  console.log('changing font to', font_info.value.class)

  if (translate_order.value == 1) {
    font_info.value.raw_class = font_info.value.class;
    font_info.value.result_class = "";
  } else if (translate_order.value == 0) {
    font_info.value.raw_class = "";
    font_info.value.result_class = font_info.value.class;
  }
  console.log(font_info.value)
}

let cache__raw_text = "";
watch(translate_order, (new_value, old_value) => {
  handle_font_change();
  if (new_value == 1) {
    cache__raw_text = raw_text.value
    raw_text.value = ''
  }
  else if (new_value == 0) {
    raw_text.value = cache__raw_text
  }
});
handle_font_change(translate_order.value);


watch(
  () => font_info.value.font,
  (new_value, old_value) => {
    console.log('font change', new_value)
    font_info.value.class = FontData[new_value].types.otf;
    handle_font_change();
  }
);

</script>

<template>
  <div style="border: 1px solid #ddd;padding:10px">
    <Markdown :content="Text" height="50vh"></Markdown>
  </div>
  <br />
  <var-tabs v-model:active="translate_order">
    <var-tab>正向翻译</var-tab>
    <var-tab>反向翻译</var-tab>
  </var-tabs>
  <var-tabs-items v-model:active="translate_order">
    <var-tab-item>
      <br />
      <var-input v-model="raw_text" textarea placeholder="请输入要翻译的内容" variant="outlined"
        :class="font_info.raw_class"></var-input>
      <br />
      <var-chip type="warning" block v-if="isASCII">
        请注意：中文或者其他非 ASCII 字符并不能直接翻译。
      </var-chip>
      <br />
    </var-tab-item>

    <var-tab-item>
      <br />
      <div>
        <h3>原文</h3>
        <textarea id="raw-text" v-model="raw_text" @click="handle_textarea_click" :class="font_info.raw_class" style="width: 100%; 
          height: 200px;
          padding: 12px;
          font-size: 24px;"></textarea>
      </div>
      <div id="visual-keyboard">
        <div v-for="row in keyboard_key.keys" :key="row" class="keyboard-row">
          <div v-for="key in row" :key="key" @click="handle_key(key)" :class="'keyboard-key ' + font_info.raw_class"
            v-ripple>
            {{ key }}
          </div>
        </div>
        <div v-for="row in keyboard_key.controls" :key="row" class="keyboard-row">
          <var-chip v-for="key in row" :key="key" @click="handle_key(key)" class="keyboard-key" v-ripple>
            {{ key }}
          </var-chip>
        </div>
        <br />
      </div>
    </var-tab-item>
  </var-tabs-items>
  <FontSelector :fontList="font_data" :fontInfo="font_info"></FontSelector>
  <br />
  <br />
  字体大小：<var-counter v-model="font_info.size" />
  自动换行：<var-switch v-model="font_info.auto_wrap" />
  <var-button type="primary" @click="copy_to_clipboard()" v-if="translate_order">复制结果</var-button>
  <div id="result" v-if="display.result">
    <br />
    <hr />
    <div style="min-height: 30vh;padding-bottom: 10vh">
    <div id="result-text" :class="font_info.result_class" :style="{
      fontSize: font_info.size + 'px',
      overflow: 'auto',
      whiteSpace: font_info.auto_wrap ? 'pre-wrap' : 'pre',
      wordBreak: font_info.auto_wrap ? 'break-all' : 'keep-all',
    }">
      {{ result_text }}
    </div></div>
    <br />
    <var-fab type="primary" inactive-icon="share">
      <var-button @click="save_as_image()">
        <var-icon name="download"></var-icon>
      </var-button>
    </var-fab>
    <var-dialog v-model:show="display.result_img">
      <div id="result-img-dialog">
        <img id="result-img" :src="result_img_url" />
        <var-button id="result-img-close" block @click="display.result_img = false">
          右键或长按保存图片，点击此按钮关闭
        </var-button>
      </div>
    </var-dialog>
  </div>
</template>

<style scoped>
@import url("./index.css");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#result-img-dialog {
  background-color: white;
  overflow: auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10%;
}

#result-img {
  max-height: 70vh;
  width: 100%;
  object-fit: contain;
}

#result-img-close {
  position: relative;
}

#visual-keyboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.keyboard-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;
}

.keyboard-key {
  flex: 1;
  margin: 0 0.2vw;
  text-align: center;
  padding: 0.2vw;
  box-sizing: border-box;
  border-radius: 2vw;
  font-size: 4vw;

  background-color: #ddd;
}

@media screen and (min-width: 600px) {
  .keyboard-key {
    font-size: 24px;
  }
}
</style>
