<script setup>
import 'github-markdown-css/github-markdown.css'
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRouter } from 'vue-router'

const md = new MarkdownIt({
    html: true,
})

const router = useRouter();

const props = defineProps({
    content: String
})

const renderedMarkdown = computed(() => {
    if (props.content) {
        let markdownContent = md.render(props.content);
        return markdownContent;
    }
})
</script>

<template>
    <div class="markdown-body" v-html="renderedMarkdown" style="background-color: transparent;"></div>
</template>
