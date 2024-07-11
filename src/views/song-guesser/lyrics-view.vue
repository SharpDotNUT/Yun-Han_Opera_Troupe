<script setup>

import { watch, computed, ref } from 'vue'

const props = defineProps({
    lyrics_url: String,
    height: {
        type: String,
        default: '50vh'
    }
})

const lyrics = ref()
let isValidLyrics = true

function timeToMilliseconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':');
    const [secondsPart, milliseconds] = seconds.split('.');
    const minutesInMs = parseInt(minutes) * 60 * 1000;
    const secondsInMs = parseInt(secondsPart) * 1000;
    const millisecondsPart = parseInt(milliseconds);
    return minutesInMs + secondsInMs + millisecondsPart;
}

// 示例使用
const timeStr = '00:01.000';
const milliseconds = timeToMilliseconds(timeStr);
console.log(milliseconds); // 输出 1000


async function fetchLyrics() {
    isValidLyrics = true
    const response = await fetch(props.lyrics_url)
    let data = await response.text()
    data = data.split('\n')
    data = data.filter(line => line !== '')
    console.log(data)
    lyrics.value = []
    data.forEach((line, index) => {
        let timestamp_p = line.indexOf(']')
        let translation_p = line.indexOf(' (')
        let timestamp
        if (timestamp_p === -1) {
            isValidLyrics = false,
                timestamp = '00:00.000'
        }
        else {
            timestamp = line.slice(1, timestamp_p)
        }
        let translation
        if (translation_p === -1) {
            translation = ''
            translation_p = line.length
        }
        else {
            translation = line.slice(translation_p + 2, line.length -1)
        }
        lyrics.value.push({
            timestamp: timeToMilliseconds(timestamp),
            text: line.slice(timestamp_p + 1, translation_p + 1),
            translation
        })
    })
    console.log(lyrics.value)
}
fetchLyrics()
watch(() => props.lyrics_url, () => {
    fetchLyrics()
})

const nowPlayingLyrics = ref()
const nowPlayedTime = ref()
let intervalId = 0

function pause() {
    clearInterval(intervalId)
}

function play(timestamp = 0) {
    if (intervalId) {
        clearInterval(intervalId)
        console.log('clear interval', intervalId)
    }
    if (!isValidLyrics) {
        return
    }
    let starPlayTime = new Date().getTime()
    function getPlayedTime() {
        return new Date().getTime() - starPlayTime + timestamp
    }
    let i = 0
    for (let j = 0; j < lyrics.value.length; j++) {
        if (lyrics.value[j].timestamp <= getPlayedTime()) {
            i = j
        }
        else {
            break
        }
    }
    intervalId = setInterval(() => {
        nowPlayedTime.value = getPlayedTime()
        if (getPlayedTime() >= lyrics.value[lyrics.value.length - 1].timestamp) {
            clearInterval(intervalId)
            return
        }
        if (lyrics.value[i].timestamp <= getPlayedTime()) {
            nowPlayingLyrics.value = i
            i++
        }
    }, 100)
    console.log('create interval', intervalId)
}

defineExpose({
    play,
    pause,
})

</script>

<template>
    <div>
        <div id="lyrics-container" :style="{ height: props.height }">
            <p v-for="(lyric, index) in lyrics" :key="index"
                :class="(nowPlayingLyrics === index && isValidLyrics) ? 'now-playing lyrics' : 'lyrics'">
                {{ lyric.text }}
                <br v-if="lyric.translation">
                <span v-if="isValidLyrics" style="font-size: 80%;">{{ lyric.translation }}</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
#lyrics-container {
    overflow-y: auto;
    margin-top: 10px;
    padding: 20px;
    border-radius: 20px;
    background-color: #eee;
}

.lyrics {
    transition: color 0.5s, font-size 0.5s;
    text-align: center;
    margin-bottom: 10px;
    font-size: 130%;
}

.now-playing {
    color: red;
    font-size: 170%
}
</style>