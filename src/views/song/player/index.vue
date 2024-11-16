<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import Intro from "@/components/intro.vue";
import LyricsView from "./lyrics-view.vue";
import { copyToClipboard } from "@/script/tools";
import { Dialog, ImagePreview, Snackbar } from "@varlet/ui";
import Data from "./d.json";
import intro from "./intro.md?raw";

import { open, fetchData as _fetchData, isNeedToTip, download } from "./index";

const route = useRoute();
const router = useRouter();
const _log = console.log;

import { mdiMusicOff } from "@mdi/js";
import { mdiMusic } from "@mdi/js";
import { mdiShareVariant } from "@mdi/js";
import { mdiDownload } from "@mdi/js";
import { mdiLink } from "@mdi/js";
import { mdiSkipNext } from "@mdi/js";
import { mdiSkipPrevious } from "@mdi/js";
import { mdiPlay } from "@mdi/js";
import { mdiPause } from "@mdi/js";

if(window.innerWidth<800){
  Dialog({
    title: "提示",
    message: "新版页面仅适用于宽屏设备，是否切换成旧版。",
    onConfirm: () => {
      router.push("/song/player/old");
    }
  })
}

const display_moreActions = ref(false);
const songMetaData = Data.data;
const selectedAlbum = ref(songMetaData.length - 74); // 空气蛹
const selectedSong = ref(0);

function copyLink() {
  let url = new URL(window.location.href);
  url.searchParams.set("album", songMetaData.length - selectedAlbum.value);
  url.searchParams.set("song", selectedSong.value);
  copyToClipboard(url, () => Snackbar.success("复制成功"));
}
function randomASong() {
  selectedAlbum.value = Math.floor(Math.random() * songMetaData.length);
  selectedSong.value = Math.floor(
    Math.random() * songMetaData[selectedAlbum.value].songs.length
  );
  fetchData();
}
watch(selectedAlbum, () => {
  selectedSong.value = 0;
  fetchData()
});
watch(selectedSong, () => {
  fetchData()
  if (selectedSong.value >= songMetaData[selectedAlbum.value].songs.length) {
    selectedSong.value = 0;
  } else if (selectedSong.value < 0) {
    selectedSong.value = songMetaData[selectedAlbum.value].songs.length - 1
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
const isAutoScroll = ref(true);
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
    processMax.value = Math.ceil(audio.value.duration);
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

function fetchData() {
  _fetchData(songMetaData, data, songURL, selectedAlbum, selectedSong);
}
fetchData();

</script>

<template>
  <div id="container">
    <div id="bar">
      <h2>{{ songMetaData[selectedAlbum].songs[selectedSong].name }}</h2>
      <h4>
        <span v-for="artist in songMetaData[selectedAlbum].songs[selectedSong].artist" :key="artist.id">
          <span> · </span>
          <var-link :href="'https://music.163.com/#/artist?id=' + artist.id" target="_blank">
            {{ artist.name }}
          </var-link>
        </span>
      </h4>
      <p style="color:#999">{{ songMetaData[selectedAlbum].songs[selectedSong].alias[0] }}</p>
      <br />
      <img :src="songMetaData[selectedAlbum].picUrl" width="100%" style="border-radius: 20px" />
      <!-- <Intro :content="intro" /> -->
      <!-- <br /> -->
      <!-- <p>数据更新时间 : {{ new Date(Data.update).toLocaleString() }}</p> -->
      <!-- <br /> -->
      <var-select v-model="selectedAlbum" :placeholder="`请选择专辑 专辑ID:${songMetaData.length - selectedAlbum}`">
        <var-option class="option-style" v-for="(item, index) in songMetaData" :key="item.id" :value="index"
          :label="item.name">
          <p>
            <span>{{ item.name }} </span>
            <span v-if="item.alias[0]" style="color:#999">
              ({{ item.alias[0] }})
            </span>
          </p>
        </var-option>
      </var-select>
      <var-select v-model="selectedSong" :placeholder="`请选择歌曲 歌曲ID:${selectedSong}`">
        <var-option class="option-style" v-for="(item, index) in songMetaData[selectedAlbum].songs" :key="item.id"
          :value="index" :label="item.name">
          <p>
            <span>{{ item.name }} </span>
            <span v-if="item.alias[0]" style="color:#999">
              ({{ item.alias[0] }})
            </span>
          </p>
        </var-option>
      </var-select>
      <br />
      <var-button-group style="width: 100%">
        <var-dialog v-model:show="display_moreActions" :cancel-button="false">
          <template #title>更多选项</template>
          <div style="display: flex;flex-direction: column;gap: 10px">
            <var-button @click="copyLink()" block>
              <SvgIcon type="mdi" :path="mdiShareVariant" />{{ $t('song-player.actions.share') }}
            </var-button>
            <var-button @click="randomASong()" block>随机选择一首</var-button>
            <var-button @click="download()" block>
              <SvgIcon type="mdi" :path="mdiDownload" />
              {{ $t('song-player.actions.download') }}
            </var-button>
            <var-button @click="copyToClipboard(songURL)" block>
              <SvgIcon type="mdi" :path="mdiLink" />
              歌曲文件链接
            </var-button>
            <var-button @click="
              open(
                'https://music.163.com/#/song?id=' +
                songMetaData[selectedAlbum].songs[selectedSong].id
              )
              " block>
              {{ $t('song-player.actions.open-in-wyy') }} </var-button>
          </div>
        </var-dialog>
      </var-button-group>
      <div style="display: flex;align-items: center;">
        <span>{{ timeFormat(process) }}</span>
        <var-slider v-model="process" @start="onChangeProcess = true" @end="
          audio.currentTime = process;
        onChangeProcess = false;
        hasChangedProcess = true;
        " min="0" :max="Math.ceil(processMax)" :disabled="!data" block label-visible="never" style="padding:0px 6px" />
        <span>{{ timeFormat(processMax) }}</span>
      </div>
      <p></p>
      <var-button-group style="width: 100%">
        <var-button @click="selectedSong--; fetchData()" block>
          <SvgIcon type="mdi" :path="mdiSkipPrevious" />
        </var-button>

        <var-button @click="pause = !pause" :disabled="!data" block>
          <SvgIcon v-if="pause" type="mdi" :path="mdiPlay" />
          <SvgIcon v-else type="mdi" :path="mdiPause" />

        </var-button>
        <var-button @click="selectedSong++; fetchData()" block>
          <SvgIcon type="mdi" :path="mdiSkipNext" />
        </var-button>
      </var-button-group>
      <br />
      <br />
      <var-button-group style="width: 100%">
        <var-button @click="isMuted = !isMuted" block>
          <SvgIcon v-if="isMuted" type="mdi" :path="mdiMusicOff" />
          <SvgIcon v-else type="mdi" :path="mdiMusic" />
        </var-button>
        <var-button @click="isAutoScroll = !isAutoScroll" block>
          <span style="color:var(--button-default-text-color)" v-if="isAutoScroll">停止</span>
          <span style="color:var(--button-default-text-color)" v-else>开启</span>
          自动滚动
        </var-button>
        <var-button @click="display_moreActions = true" block>更多选项</var-button>
      </var-button-group>
      <br />
      <br />
      <audio :src="songURL" :muted="isMuted" ref="audio"></audio>
    </div>
    <LyricsView v-if="data" id="lyrics" :lyrics_url="data[0].lrc" :autoScroll="isAutoScroll" ref="lyricsView" @play="
      audio.currentTime = $event / 1000;
    audio.play();
    pause = false;
    ">
    </LyricsView>
  </div>
</template>

<style scoped>
#container {
  position: absolute;
  top: var(--app-bar-height);
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
}

#bar {
  min-width: min(40vw, 400px);
  width: min(40vw, 400px);
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--color-body);
}

#lyrics {
  height: 100%;
  flex-grow: 1;
}
</style>