<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import Markdown from "@/components/markdown.vue";
import LyricsView from "./lyrics-view.vue";
import { copyToClipboard } from "@/script/tools";
import { Snackbar } from "@varlet/ui";
import Data from "./d.json";
import intro from "./intro.md?raw";

import { open, fetchData as _fetchData, isNeedToTip } from "./index";

const route = useRoute();
const router = useRouter();
const _log = console.log;

import { useMainStore } from "@/stores/main";
useMainStore().setTitle("音乐播放器");

const display_tip = ref(isNeedToTip());
const display_moreActions = ref(false);
const songMetaData = Data.data;
const selectedAlbum = ref(songMetaData.length - 74); // 空气蛹
const selectedSong = ref(0);

function randomASong() {
  selectedAlbum.value = Math.floor(Math.random() * songMetaData.length);
  selectedSong.value = Math.floor(
    Math.random() * songMetaData[selectedAlbum.value].songs.length
  );
  fetchData();
}
function copyLink() {
  let url = new URL(window.location.href);
  url.searchParams.set("album", songMetaData.length - selectedAlbum.value);
  url.searchParams.set("song", selectedSong.value);
  copyToClipboard(url, () => Snackbar.success("复制成功"));
}
watch(selectedSong, () => {
  if (selectedSong.value >= songMetaData[selectedAlbum.value].songs.length) {
    selectedSong.value = 0;
  }
});
if (route.query.album) {
  selectedAlbum.value = songMetaData.length - parseInt(route.query.album);
  _log("selectedAlbum: ", route.query.album);
}
if (route.query.song) {
  selectedSong.value = parseInt(route.query.song);
  _log("selectedSong: ", route.query.song);
}
router.push({ query: { album: undefined } });
router.push({ query: { song: undefined } });

const data = ref();
const songURL = ref(undefined);

const lyricsView = ref(null);
const audio = ref();
const isMuted = ref(false);
const process = ref(0);
const processMax = ref(0);
const onChangeProcess = ref(false);
const hasChangedProcess = ref(false);
const pause = ref(true);
watch(pause, () => {
  if (pause.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
});

const timeFormat = (time) => {
  return `${Math.floor(time / 60)}:${Math.floor(time % 60)
    .toString()
    .padStart(2, "0")}`;
};

onMounted(() => {
  audio.value.addEventListener("loadedmetadata", () => {
    processMax.value = audio.value.duration;
    process.value = 0;
  });
  audio.value.addEventListener("canplay", () => {
    if (!pause.value) {
      audio.value.play();
    }
  });
  audio.value.addEventListener("play", () => {
    lyricsView.value.play(Math.floor(audio.value.currentTime * 1000));
  });
  audio.value.addEventListener("pause", () => {
    lyricsView.value.pause();
  });
  audio.value.addEventListener("timeupdate", () => {
    if (!onChangeProcess.value) {
      process.value = Math.ceil(audio.value.currentTime);
    }
    if (hasChangedProcess.value) {
      lyricsView.value.play(Math.floor(audio.value.currentTime * 1000));
      hasChangedProcess.value = false;
    }
  });
});

function download() {
  Snackbar.loading("正在下载");
  fetch(songURL.value)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none"; // 隐藏 <a> 标签
      document.body.appendChild(a); // 将 <a> 标签添加到 body 中
      a.href = url;
      a.download = `${songMetaData[selectedAlbum.value].name} - ${
        songMetaData[selectedAlbum.value].songs[selectedSong.value].name
      }.mp3`;
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Snackbar.success("下载成功");
    })
    .catch((error) => {
      Snackbar.error("下载失败：" + error.message);
    });
}

function fetchData() {
  _fetchData(songMetaData, data, songURL, selectedAlbum, selectedSong);
}
fetchData();


import { loadAndSetLanguage } from "@/locales/i18n";
loadAndSetLanguage("zh-CN", "song-player");
loadAndSetLanguage("en", "song-player");

</script>

<template>
  <var-popup
    position="bottom"
    style="height: 70vh; padding: 20px"
    v-model:show="display_tip"
  >
    <Markdown :content="intro">
      <template v-slot:footer>
        <var-button @click="display_tip = false" block>{{ $t('song-player.intro.ok') }}</var-button>
      </template>
    </Markdown>
  </var-popup>
  <br />
  <p>数据更新时间 : {{ new Date(Data.update).toLocaleString() }}</p>
  <br />
  <var-select
    v-model="selectedAlbum"
    :placeholder="`请选择专辑，HOYO-MiX 一共发行了${
      songMetaData.length
    }张专辑 专辑ID:${songMetaData.length - selectedAlbum}`"
  >
    <var-option
      v-for="(item, index) in songMetaData"
      :key="item.id"
      :value="index"
      :label="item.name"
    ></var-option>
  </var-select>
  <var-select
    v-model="selectedSong"
    :placeholder="`请选择歌曲，该专辑共有${songMetaData[selectedAlbum].songs.length}首歌曲 歌曲ID:${selectedSong}`"
  >
    <var-option
      v-for="(item, index) in songMetaData[selectedAlbum].songs"
      :key="item.id"
      :value="index"
      :label="item.name"
    ></var-option>
  </var-select>
  <br />
  <div style="display: flex">
    <var-button @click="fetchData()" block>选定</var-button>
    <var-button @click="selectedSong++;fetchData()" block>下一首</var-button>
    <var-button @click="display_moreActions = true" block>更多选项</var-button>
    <var-dialog v-model:show="display_moreActions" :cancel-button="false">
      <template #title>更多选项</template>
      <div style="display: flex;flex-direction: column;gap: 10px">
        <var-button @click="isMuted = !isMuted" block>切换播放{{ isMuted ? "正常" : "静音" }}</var-button>
        <var-button @click="display_tip = true" block>查看使用说明</var-button>
        <var-button @click="copyLink()" block>{{ $t('song-player.actions.share') }}</var-button>
        <var-button @click="randomASong()" block>随机选择一首</var-button>
        <var-button @click="download()" block> {{ $t('song-player.actions.download') }} </var-button>
        <var-button @click="copyToClipboard(songURL)" block>歌曲文件链接</var-button>
        <var-button
          @click="
            open(
              'https://music.163.com/#/song?id=' +
                songMetaData[selectedAlbum].songs[selectedSong].id
            )
          "
          block
        >
          {{ $t('song-player.actions.open-in-wyy') }} </var-button>
      </div>
    </var-dialog>
  </div>
  <br />
  <var-slider
    v-model="process"
    @start="onChangeProcess = true"
    @end="
      audio.currentTime = process;
      onChangeProcess = false;
      hasChangedProcess = true;
    "
    min="0"
    :max="Math.ceil(processMax)"
    :disabled="!data"
    block
    label-visible="never"
  />
  <p></p>
  <var-button @click="pause = !pause" :disabled="!data" block
    >{{ pause ? "播放" : "暂停" }} - {{ timeFormat(process) }} /
    {{ timeFormat(processMax) }}</var-button
  >
  <br />
  <audio :src="songURL" :muted="isMuted" ref="audio"></audio>
  <div v-if="data">
    <LyricsView
      :lyrics_url="data[0].lrc"
      ref="lyricsView"
      @play="
        audio.currentTime = $event / 1000;
        audio.play();
        pause = false;
      "
    >
    </LyricsView>
  </div>
</template>

<style scoped></style>
