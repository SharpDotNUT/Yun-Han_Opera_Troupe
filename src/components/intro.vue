<script setup>

import Markdown from './markdown.vue'

const props = defineProps({
    content: String,
    height:{
        type: String,
        default: '50vh'
    }
})

</script>

<template>
    <var-paper :elevation="1" style="padding:20px;margin-bottom:10px">
        <Markdown :content="props.content" :height="props.height"></Markdown>
    </var-paper>
</template>