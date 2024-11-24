<script setup>

import { ref } from 'vue'
import { i18n } from '@/locales/i18n';
import { useMainStore } from '@/stores/main';
import { useRoute } from 'vue-router';
import Markdown from '@/components/markdown.vue';

const mainStore = useMainStore();
const route = useRoute();
const API_HOST = mainStore.host_name

const props = defineProps({
    article_name: {
        type: String,
        default: "cors"
    }
})

const articlesImport = import.meta.glob("../../../docs/*/*.md", {
    query: "?raw"
})
console.log(articlesImport)
let articles = ref({})
let article_name = ref(props.article_name)
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
    const article = path.slice(0, -3).split("/")
    const article_name = article[article.length - 2]
    const article_lang = article[article.length - 1]
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

    <br/>
    <var-select v-model="article_name" variant="outlined" placeholder="请选择文章">
        <var-option v-for="(article, article_name) in articles" :key="article_name" :label="article_name"
            @click="readArticle(article_name, article_lang)">
        </var-option>
    </var-select>
    <br/>
    <var-select v-model="article_lang" variant="outlined" placeholder="请选择语言">
        <var-option v-for="(article, article_lang) in articles[article_name]" :key="article_lang" :label="article_lang"
            @click="readArticle(article_name, article_lang)">
        </var-option>
        <template #append-icon></template>
    </var-select>
    <br/>
    <div v-if="is_fallback_lang">
        <var-chip type="warning" size="small" round>当前语言没有找到，已切换到中文</var-chip>
    </div>
    <br/>
    <div>
        <Markdown :content="content"></Markdown>
    </div>

</template>