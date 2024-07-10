<script setup>

import { computed, ref } from 'vue'

const props = defineProps({
    lyrics_url: String
})

const lyrics = ref()

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
    const response = await fetch(props.lyrics_url)
    let data = await response.text()
    data = data.split('\n')
    data = data.filter(line => line!== '')
    console.log(data)
    lyrics.value = []
    data.forEach((line, index) => {
        let timestamp_p = line.indexOf(']'), text
        lyrics.value.push({
            timestamp: timeToMilliseconds(line.slice(1, timestamp_p)),
            text: line.slice(timestamp_p+1, line.length)
        })
    })
}
fetchLyrics()

const nowPlayingLyrics = ref()
const nowPlayedTime = ref()
let intervalId = 0

function pause(){
    clearInterval(intervalId)
}

function play(timestamp = 0) {
    let starPlayTime = new Date().getTime()
    function getPlayedTime(){
        return new Date().getTime() - starPlayTime + timestamp
    }
    let i = 0
    for(let j = 0; j < lyrics.value.length; j++){
        if(lyrics.value[j].timestamp <= getPlayedTime()){
            i = j
        }
        else{
            break
        }
    }
    if (intervalId) {
        clearInterval(intervalId)
        console.log('clear interval', intervalId)
    }
    intervalId = setInterval(() => {
        nowPlayedTime.value = getPlayedTime()
        if (getPlayedTime() >= lyrics.value[lyrics.value.length-1].timestamp) {
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
        <p>Index of lyrics: {{ nowPlayingLyrics }}</p>
        <p>Timestamp of lyrics: {{ nowPlayedTime }} ms</p>
        <div style="height:80vh; overflow-y:scroll">
        <p v-for="(lyric, index) in lyrics" :key="index" :class="nowPlayingLyrics === index ?'now-playing-lyrics':''">
            [{{ lyric.timestamp/1000 }}] - {{ lyric.text }}
        </p>
    </div>
    </div>
</template>

<style scoped>
.now-playing-lyrics {
    color: red;
}
</style>