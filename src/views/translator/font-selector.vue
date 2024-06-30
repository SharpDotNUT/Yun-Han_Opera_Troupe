<script setup>

import { ref } from 'vue'

const isOpen_dialog = ref(false)

const prop = defineProps({
    fontList: Array,
    fontInfo: Object,
    placeholder: {
        type: String,
        default: '请选择字体'
    }
})

</script>

<template>

    <var-button @click="isOpen_dialog = true">{{ placeholder }}</var-button>

    <var-dialog width="80vw" v-model:show="isOpen_dialog" title="字体选择">
        <div id="font-selector-dialog">
            <var-card v-for="font in fontList" :key="font" :title="font.name" :subtitle="font.description">
            </var-card>
        </div>
    </var-dialog>

</template>

<style scoped>
#font-selector-dialog {
    height: 50vh;
    overflow-y: auto;
}
</style>