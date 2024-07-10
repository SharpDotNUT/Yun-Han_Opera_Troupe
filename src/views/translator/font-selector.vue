<script setup>

import { ref } from 'vue'

import { Snackbar } from '@varlet/ui';

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

    <var-button @click="isOpen_dialog = true">{{ placeholder + ' 当前选择:' + prop.fontList.find(font => font.id == prop.fontInfo.font).name }}</var-button>

    <var-dialog v-model:show="isOpen_dialog" title="字体选择">
        <div id="font-selector-dialog">
            <div v-for="font in prop.fontList" :key="font.id"
                @click="prop.fontInfo.font = font.id; Snackbar.success('字体已选择' + font.name)"
                :class="'font-item ' + ((font.id == prop.fontInfo.font) ? 'font-selected' : '')">
                <h3>{{ font.name }}</h3>
                <h3 :class="font.class">{{font.name}}</h3>
                <p>{{ font.description }}</p>
            </div>
        </div>
    </var-dialog>

</template>

<style scoped>

@import url("./index.css");

#font-selector-dialog {
    height: 50vh;
    overflow-y: auto;
    box-sizing: content-box;
}

.font-item {
    border: 1px solid var(--color-primary	);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
}

.font-item:hover {
    cursor: pointer;
}

.font-selected {
    background-color: var(--color-primary);
    color: #eee;
}
</style>