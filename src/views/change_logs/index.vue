
<script setup>

import ChangeLogs from '../../../CHANGELOGS.md?raw'

import MarkdownRender from '@/components/markdown.vue'

console.log(ChangeLogs)

</script>

<template>
    <MarkdownRender :content="ChangeLogs" />
</template>