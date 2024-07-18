<script setup>
import 'github-markdown-css/github-markdown-light.css'
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRouter } from 'vue-router'

const md = new MarkdownIt({
    html: true
})

const props = defineProps({
    content: String,
    height:{
        type: String,
        default: '100%'
    }
})

const renderedMarkdown = computed(() => {
    if (props.content) {
        let markdownContent = md.render(props.content);
        return markdownContent;
    }
})

const style = ref({
    backgroundColor: 'transparent',
    maxHeight: props.height,
    overflowY: 'auto'
})

</script>

<template>
    <div class="markdown-body" v-html="renderedMarkdown" :style="style"></div>
</template>
