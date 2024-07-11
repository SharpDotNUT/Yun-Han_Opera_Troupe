<script setup>

import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Markdown from "@/components/markdown.vue";
import LyricsView from './lyrics-view.vue'
import { copyToClipboard } from "@/script/tools";
import { Snackbar } from "@varlet/ui";
import Data from './d.json'
import intro from './intro.md?raw'

const route = useRoute()
const router = useRouter()

const _log = console.log

const selectedAlbum = ref(0)
watch(selectedAlbum, () => {
    selectedSong.value = 0
    router.push({ query: { album: selectedAlbum.value, song: selectedSong.value } })
})
const selectedSong = ref(0)
watch(selectedSong, () => {
    fetchData()
    route.query.song = selectedSong.value
    router.push({ query: { album: selectedAlbum.value, song: selectedSong.value } })
})

function randomASong() {
    selectedAlbum.value = Math.floor(Math.random() * Data.length)
    selectedSong.value = Math.floor(Math.random() * Data[selectedAlbum.value].songs.length)
    router.push({ query: { album: selectedAlbum.value, song: selectedSong.value } })
    fetchData()
}
function copyLink(){
    copyToClipboard(location.href, () => Snackbar.success('复制成功'))
}

if (route.query.album) {
    selectedAlbum.value = parseInt(route.query.album)
}
if (route.query.song) {
    selectedSong.value = parseInt(route.query.song)
}
router.push({ query: { album: selectedAlbum.value, song: selectedSong.value } })

const data = ref()
const songURL = ref('')

const lyricsView = ref(null)
const audio = ref()

const process = ref(0)
const processMax = ref(0)
const onChangeProcess = ref(false)
const hasChangedProcess = ref(false)
const pause = ref(true)
watch(pause, () => {
    if (pause.value) {
        audio.value.pause()
    } else {
        audio.value.play()
    }
})

const timeFormat = (time) => {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`
}

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
        if (hasChangedProcess.value) {
            lyricsView.value.play(Math.floor(audio.value.currentTime * 1000))
            hasChangedProcess.value = false
        }
    })
})

function fetchData() {
    _log("f:fetchData - ", selectedAlbum.value, selectedSong.value)
    _log(Data[selectedAlbum.value].name, Data[selectedAlbum.value].songs[selectedSong.value].name)
    _log('https://api.injahow.cn/meting/?type=song&&id=' + Data[selectedAlbum.value].songs[selectedSong.value].id)
    fetch('https://api.injahow.cn/meting/?type=song&&id=' + Data[selectedAlbum.value].songs[selectedSong.value].id)
        .then(response => response.json())
        .then(_data => {
            data.value = _data
            _log(_data)
            songURL.value = _data[0].url
        })
        .catch(error => console.error(error))
}

</script>

<template>
    <Markdown :content="intro"></Markdown>
    <br>
    <var-select v-model="selectedAlbum" :placeholder="`请选择专辑，HoYo-Mix 一共发行了${Data.length}张专辑`">
        <var-option v-for="(item, index) in Data" :key="item.id" :value="index" :label="item.name"></var-option>
    </var-select>
    <var-select v-model="selectedSong" :placeholder="`请选择歌曲，该专辑共有${Data[selectedAlbum].songs.length}首歌曲`">
        <var-option v-for="(item, index) in Data[selectedAlbum].songs" :key="item.id" :value="index"
            :label="item.name"></var-option>
    </var-select>
    <br>
    <div style="display: flex;">
        <var-button @click="fetchData()" block>选定</var-button>
        <var-button @click="copyLink()" block>获取分享链接</var-button>
        <var-button @click="randomASong()" block>随机选一首</var-button>
    </div>
    <br>
    <var-slider v-model="process" @start="onChangeProcess = true"
        @end="audio.currentTime = process; onChangeProcess = false; hasChangedProcess = true" min="0"
        :max="Math.ceil(processMax)" :disabled="!data" block label-visible="never" />
    <p>

    </p>
    <var-button @click="pause = !pause" :disabled="!data" block>{{ pause ? '播放' : '暂停' }} - {{ timeFormat(process) }} /
        {{ timeFormat(processMax) }}</var-button>
    <br>
    <audio :src="songURL" ref="audio"></audio>
    <div v-if="data">
        <h3>作者：{{ data[0].artist }}</h3>
        <LyricsView :lyrics_url="data[0].lrc" ref="lyricsView"></LyricsView>
    </div>
</template>

<style scoped></style>