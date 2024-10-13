<script setup>

import Words from './words.json'
import { ref, watchEffect } from 'vue'

let searchString = ref('')
let pre_words = ref([])
let words = ref([])

const load = () => {
    words.value = pre_words.value.slice(0, words.value.length + 100)
}

const search = (e) => {
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

</script>

<template>
    <var-input variant="outlined" @input="search" v-model="searchString" :placeholder="$t('dictionary.search')" />
    <var-list @load="load">
        <div v-for="word in words" :key="word.id" style="padding:20px">
            <var-table>
                <tr>
                    <th style="width:25%">简体中文</th>
                    <td class="lang-zh">{{ word.zhCN }}</td>
                </tr>
                <tr>
                    <th>英文</th>
                    <td class="lang-en">{{ word.en }}</td>
                </tr>
                <tr>
                    <th class="lang-ja">日文</th>
                    <td class="lang-ja">
                        <ruby>{{ word.ja }}<rt>{{ word.pronunciationJa }}</rt></ruby>
                    </td>
                </tr>
            </var-table>
        </div>
    </var-list>
</template>