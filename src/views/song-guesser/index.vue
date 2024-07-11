<script setup>

import { ref, onMounted, watch } from "vue";
import LyricsView from './lyrics-view.vue'
import Data from './d.json'

const selectedAlbum = ref(0)
watch(selectedAlbum, () => {
    selectedSong.value = 0
})
const selectedSong = ref(0)
watch(selectedSong, () => {
    fetchData()
})

const data = ref()
const songURL = ref('')

const lyricsView = ref(null)
const audio = ref()

const process = ref(0)
const processMax = ref(0)
const onChangeProcess = ref(false)
const pause = ref(true)
watch(pause, () => {
    if (pause.value) {
        audio.value.pause()
    } else {
        audio.value.play()
    }
})

const _log = console.log

onMounted(() => {
    audio.value.addEventListener('loadedmetadata', () => {
        processMax.value = audio.value.duration
        process.value = 0
    })
    audio.value.addEventListener('canplay', () => {
        if (!pause.value) {
            audio.value.play()
        }
    })
    audio.value.addEventListener('play', () => {
        lyricsView.value.play(Math.floor(audio.value.currentTime * 1000))
    })
    audio.value.addEventListener('pause', () => {
        lyricsView.value.pause()
    })
    audio.value.addEventListener('timeupdate', () => {
        if (!onChangeProcess.value) {
            process.value = Math.ceil(audio.value.currentTime)
        }
    })
})

function fetchData() {
    console.log('https://api.injahow.cn/meting/?type=song&&id=' + Data[selectedAlbum.value].songs[selectedSong.value].id)
    fetch('https://api.injahow.cn/meting/?type=song&&id=' + Data[selectedAlbum.value].songs[selectedSong.value].id)
        .then(response => response.json())
        .then(_data => {
            data.value = _data
            console.log(_data)
            songURL.value = _data[0].url
        })
        .catch(error => console.error(error))
}

</script>

<template>
    <h1>
        虽然现在还是一个音乐播放器，但是最终要做的东西不是这个。
    </h1>
    <h1>
        Although this is a music player now, the final thing to do is not this.
    </h1>
    <var-select v-model="selectedAlbum">
        <var-option v-for="(item, index) in Data" :key="item.id" :value="index" :label="item.name"></var-option>
    </var-select>
    <var-select v-model="selectedSong">
        <var-option v-for="(item, index) in Data[selectedAlbum].songs" :key="item.id" :value="index"
            :label="item.name"></var-option>
    </var-select>
    <br>
    <var-button @click="fetchData" block>选定</var-button>
    <br>
    <var-slider v-model="process" @start="onChangeProcess = true" @end="audio.currentTime = process; onChangeProcess = false;
    lyricsView.play(Math.floor(audio.currentTime * 1000))" min="0" :max="Math.ceil(processMax)"
        :disabled="!data" block />
    <p>

    </p>
    <var-button @click="pause = !pause" :disabled="!data" block>{{ pause ? '播放' : '暂停' }}</var-button>
    <br>
    <audio :src="songURL" ref="audio"></audio>
    <div v-if="data">
        <h3>作者：{{ data[0].artist }}</h3>
        <LyricsView :lyrics_url="data[0].lrc" ref="lyricsView"></LyricsView>
    </div>
</template>