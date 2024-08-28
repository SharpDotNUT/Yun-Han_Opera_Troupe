<script setup>
import { watch, computed, ref } from "vue";

const props = defineProps({
  lyrics_url: String,
  height: {
    type: String,
    default: "50vh",
  },
});

const lyrics = ref();
let isValidLyrics = true;

function timeToMilliseconds(timeStr) {
  const [minutes, seconds] = timeStr.split(":");
  const [secondsPart, milliseconds] = seconds.split(".");
  const minutesInMs = parseInt(minutes) * 60 * 1000;
  const secondsInMs = parseInt(secondsPart) * 1000;
  const millisecondsPart = parseInt(milliseconds);
  return minutesInMs + secondsInMs + millisecondsPart;
}

// 示例使用
const timeStr = "00:01.000";
const milliseconds = timeToMilliseconds(timeStr);
console.log(milliseconds); // 输出 1000

const timeFormat = (time) => {
  return `${Math.floor(time / 60)}:${Math.floor(time % 60)
    .toString()
    .padStart(2, "0")}`;
};

async function fetchLyrics() {
  isValidLyrics = true;
  const response = await fetch(props.lyrics_url);
  let data = await response.text();
  data = data.split("\n");
  data = data.filter((line) => line !== "");
  console.log(data);
  lyrics.value = [];
  data.forEach((line, index) => {
    let timestamp_p = line.indexOf("]");
    let translation_p = line.indexOf(" (");
    let timestamp;
    if (timestamp_p === -1) {
      (isValidLyrics = false), (timestamp = "00:00.000");
    } else {
      timestamp = line.slice(1, timestamp_p);
    }
    let translation;
    if (translation_p === -1) {
      translation = "";
      translation_p = line.length;
    } else {
      translation = line.slice(translation_p + 2, line.length - 1);
    }
    lyrics.value.push({
      timestamp: timeToMilliseconds(timestamp),
      text: line.slice(timestamp_p + 1, translation_p + 1),
      translation,
    });
  });
  console.log(lyrics.value);
}
fetchLyrics();
watch(
  () => props.lyrics_url,
  () => {
    fetchLyrics();
  }
);

const nowPlayingLyrics = ref();
const nowPlayedTime = ref();
let lastRAF;
let isPlaying = 0;
let frame = 0;

function pause() {
  isPlaying = 0;
}

function play(timestamp = 0) {
  pause();
  if (isPlaying) {
    clearInterval(isPlaying);
    console.log("clear interval", isPlaying);
  }
  if (!isValidLyrics) {
    return;
  }
  let starPlayTime = new Date().getTime();
  function getPlayedTime() {
    return new Date().getTime() - starPlayTime + timestamp;
  }
  let i = 0;
  for (let j = 0; j < lyrics.value.length; j++) {
    if (lyrics.value[j].timestamp <= getPlayedTime()) {
      i = j;
    } else {
      break;
    }
  }
  isPlaying = 1;
  cancelAnimationFrame(lastRAF);
  function playNext() {
    nowPlayedTime.value = getPlayedTime();
    if (getPlayedTime() >= lyrics.value[lyrics.value.length - 1].timestamp) {
      clearInterval(isPlaying);
      return;
    }
    // 当前歌词播放完毕时，切换到下一句
    if (lyrics.value[i].timestamp <= getPlayedTime()) {
      nowPlayingLyrics.value = i;
      i++;
    }
    // 如果歌词还没播放完，则继续播放
    if (isPlaying) {
      lastRAF = requestAnimationFrame(playNext);
      frame++;
    }
  }
  lastRAF = requestAnimationFrame(playNext);
}

defineExpose({
  play,
  pause,
});
</script>

<template>
  <audio :src="songURL" ref="audio"></audio>
  <div>
    <!-- <h3>作者：{{ data[0].artist }}</h3> -->
    <div>
      <!-- {{ frame }} | {{ isPlaying }} | {{ nowPlayingLyrics }} | {{ nowPlayedTime }} -->
      <div id="lyrics-container" :style="{ height: props.height }">
        <p
          v-for="(lyric, index) in lyrics"
          :key="index"
          :class="
            nowPlayingLyrics === index && isValidLyrics
              ? 'now-playing lyrics'
              : 'lyrics'
          "
          @click="
            play(lyric.timestamp)
            $emit('play', lyric.timestamp);
          "
        >
          {{ lyric.text }}
          <br v-if="lyric.translation" />
          <span v-if="isValidLyrics" style="font-size: 80%">{{
            lyric.translation
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#lyrics-container {
  overflow-y: auto;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--color-body);
}

.lyrics {
  transition: color 0.5s, font-size 0.5s;
  text-align: center;
  margin: 10px auto;
  padding: 5px 0;
  font-size: 130%;
  border-radius: 10px;
  cursor: pointer;
}

.lyrics:hover {
  outline: 1px solid var(--color-primary);
}

.now-playing {
  color: var(--color-primary);
  font-size: 170%;
}
</style>
