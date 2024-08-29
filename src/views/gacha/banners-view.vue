<script setup>
import { ref,watch } from "vue";
import Data from "./data.json";
import Banner from "./banner-view.vue";

const props = defineProps({
  isNeedSelect: {
    type: Boolean,
    default: false,
  },
});

const dom_audio = ref(null);
const s_playBGM = ref(false);
const s_version = ref(
  Object.keys(Data.data)[Object.keys(Data.data).length - 1]
);
const s_bannerIndex = ref("1");

watch(s_version, () => {
  s_bannerIndex.value = "1";
});

Dialog({
  title: "提示",
  message: "需要播放背景音乐吗",
  confirmButtonText: "播放",
  cancelButtonText: "不播放",
  onConfirm: () => {
    s_playBGM.value = true;
    dom_audio.value.play()
  }
})

</script>

<template>
  <audio ref="dom_audio" src="https://api.injahow.cn/meting/?type=url&&id=1481390644" :muted="!s_playBGM" loop></audio>
  <var-tabs v-model:active="s_version">
    <var-tab v-for="(value, version) in Data.data" :name="version">
      {{ version }}
    </var-tab>
  </var-tabs>
  <var-tabs v-model:active="s_bannerIndex">
    <var-tab v-for="(banners, index) in Data.data[s_version]" :name="index">
      第{{ ["", "一", "二", "三"][index] }}期活动祈愿
    </var-tab>
  </var-tabs>
  <!-- v-for="banner in Data.data[s_version][s_bannerIndex]"-->
  <Banner
    v-for="banner in Data.data[s_version][s_bannerIndex]"
    :banner="banner"
    :isNeedSelect="props.isNeedSelect"
  ></Banner>
</template>

<style scoped>
@import url("./banners-view.css");
</style>
