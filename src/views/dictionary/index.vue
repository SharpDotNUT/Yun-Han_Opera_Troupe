<script setup>

// import Words from './words.json'
import { ref, watchEffect } from 'vue'
import LoadFileProgress from '@/components/load-file-progress.vue'
import WordsPath from './words.json?url'
import { fetchWithProgress } from '@/script/resource';
import domtoimage from 'dom-to-image';

let progress = ref([
    { name: 'words.json', loaded: 0, total: 0, done: false }
])
let Words = []
let Words_loaded = false
let searchString = ref('')
let pre_words = ref([])
let words = ref([])
let ref_words = ref({})

async function fetchWords() {
    Words = await fetchWithProgress(WordsPath, null, (data) => {
        progress.value = [{
            name: 'words.json',
            ...data
        }]
    })
    Words_loaded = true
    search()
}
fetchWords()

const load = () => {
    words.value = pre_words.value.slice(0, words.value.length + 100)
}

const search = (e) => {
    if (!Words_loaded) {
        return
    }
    pre_words.value = Words.filter(word => {
        let _ = false
        if (word.zhCN) {
            _ = word.zhCN.includes(searchString.value)
        }
        if (word.en) {
            _ = _ || word.en.includes(searchString.value)
        }
        if (word.ja) {
            _ = _ || word.ja.includes(searchString.value)
        }
        return _
    })
    words.value = []
    load()
}
search('')

function share(id) {
    const dom = ref_words.value[id]
    domtoimage
        .toPng(dom, { bgcolor: "#fff", quality: 1.0 })
        .then(function (dataUrl) {
            fetch(dataUrl).then(res => res.blob()).then(blob => {
                window.open(URL.createObjectURL(blob))
            })
        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
}

</script>

<template>
    <var-input variant="outlined" @input="search" v-model="searchString" :placeholder="$t('dictionary.search')" />
    <LoadFileProgress :progress="progress">
    </LoadFileProgress>
    <var-list @load="load">
        <div v-for="word in words" :key="word.id" style="padding:10px;display: flex;flex-direction: column;gap:10px">
            <div class="word" :ref="el => ref_words[word.id] = el">
                <h5>简体中文</h5>
                <p class="lang-zh">{{ word.zhCN }}</p>
                <h5>英文</h5>
                <p class="lang-en">{{ word.en }}</p>
                <h5 class="lang-ja">日文</h5>
                <p class="lang-ja">
                    <ruby>{{ word.ja }}<rt>{{ word.pronunciationJa }}</rt></ruby>
                </p>
            </div>
            <var-button @click="share(word.id)">分享</var-button>
            <hr />
        </div>
    </var-list>
</template>

<style scoped>
.word {
    padding:20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>