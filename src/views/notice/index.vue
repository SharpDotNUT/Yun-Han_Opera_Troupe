<script setup>

import { ref } from 'vue'
import { i18n } from '@/locales/i18n';
import { useMainStore } from '@/stores/main';
import { useRoute } from 'vue-router';

const mainStore = useMainStore();
const route = useRoute();
const API_HOST = mainStore.host_name

const articlesImport = import.meta.glob("./articles/*/*.md", {
    query: "?raw"
})
let articles = ref({})
let article_name = ref("")
let article_lang = ref(i18n.global.locale)
let is_fallback_lang = ref(false)
let content = ref("")

if (route.query.article_name) {
    article_name.value = route.query.article_name
}
if (route.query.article_lang) {
    article_lang.value = route.query.article_lang
}

for (let path in articlesImport) {
    const article_name = path.split("/")[2]
    const article_lang = path.slice(0, -3).split("/")[3]
    articles.value[article_name] = articles.value[article_name] || {}
    articles.value[article_name][article_lang] = articlesImport[path]
}
console.log(articlesImport)
console.log(articles.value)

const readArticle = async (article_name, article_lang) => {
    if (!articles.value?.[article_name]?.[article_lang]) {
        is_fallback_lang.value = true
        article_lang = "zh-CN"
    }
    articles.value[article_name][article_lang]().then((res) => {
        is_fallback_lang.value = false
        content.value = res.default
        return res.default
    })
}

readArticle("cors", "zh-CN")

</script>

<template>

    <var-select v-model="article_name" variant="outlined" placeholder="请选择文章">
        <var-option v-for="(article, article_name) in articles" :key="article_name" :label="article_name"
            @click="readArticle(article_name, article_lang)">
        </var-option>
    </var-select>
    <var-select v-model="article_lang" variant="outlined" placeholder="请选择语言">
        <var-option v-for="(article, article_lang) in articles[article_name]" :key="article_lang" :label="article_lang"
            @click="readArticle(article_name, article_lang)">
        </var-option>
    </var-select>
    <div v-if="is_fallback_lang">
        <var-chip type="warning" size="small" round>当前语言没有找到，已切换到中文</var-chip>
    </div>
    <div>
        <h1>
            {{ article_name }} - {{ article_lang }}
        </h1>
        <p>
            {{ content }}
        </p>
    </div>

</template>