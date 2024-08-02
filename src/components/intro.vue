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
    <var-paper class="paper">
        <Markdown :content="props.content" :height="props.height"></Markdown>
    </var-paper>
</template>