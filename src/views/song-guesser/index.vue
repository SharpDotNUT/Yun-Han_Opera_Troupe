<script setup>

import { ref, onMounted } from "vue";
import LyricsView from './lyrics-view.vue'

const data = ref()
const id = ref('2155423468')
const type = ref('歌曲')
const platform = ref('网易')
const order = ref(0)
const songURL = ref('')

const lyricsView = ref(null)
const audio = ref()

onMounted(() => {
    audio.value.addEventListener('play', () => {
        lyricsView.value.play(audio.value.currentTime * 1000)
    })
    audio.value.addEventListener('pause', () => {
        lyricsView.value.pause()
    })
})

function fetchData() {
    let _type = {
        "歌曲": "song",
        "歌单": "playlist"
    }[type.value]
    let _platform = {
        "网易": "netease",
        "QQ": "tencent"
    }[platform.value]
    console.log('fetching data...','https://api.injahow.cn/meting/?platform=' + _platform + '&type=' + _type + '&id=' + id.value)
    fetch('https://api.injahow.cn/meting/?platform=' + _platform + '&type=' + _type + '&id=' + id.value)
        .then(response => response.json())
        .then(_data => {
            data.value = _data
            console.log(_data)
            songURL.value = _data[order.value].url
        })
        .catch(error => console.error(error))
}

</script>

<template>
    <h1>
        Hey, this page is in development. If you enter here by mistake, please go back.
    </h1>
    <h1>
        嘿，这个页面正在开发中。如果您误入这里，请返回。
    </h1>
    <h3>
        Default Song : <i>Hope Is the Thing With Feathers</i> - Robin/HOYO-Mix/Chevy<br>
        Playlist Example : 8767835440
    </h3>
    <h3>
        默认歌曲：《希望有羽毛和翅膀》- 知更鸟/HOYO-MiX/Chevy<br/>
        歌单示例：8767835440
    </h3>

    <var-select v-model="platform">
        <var-option label="网易"></var-option>
        <var-option label="QQ"></var-option>
    </var-select>
    <var-select v-model="type">
        <var-option label="歌曲"></var-option>
        <var-option label="歌单"></var-option>
    </var-select>
    <var-input placeholder="输入网易云音乐歌曲/歌单ID" v-model="id"></var-input>
    <var-input placeholder="输入歌曲顺序" v-model="order"></var-input>
    <var-button @click="fetchData">Fetch</var-button>

    <audio :src="songURL" controls ref="audio"></audio>

    <div v-if="data">
        <pre>{{ data }}</pre>
        <LyricsView :lyrics_url="data[Number(order)].lrc" ref="lyricsView"></LyricsView>
    </div>
</template>