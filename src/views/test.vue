<script lang="ts" setup>

import PATH from './dictionary/words.json?url'
import { fetchWithProgress } from '@/script/resource';
import { ref } from 'vue';

const r = ref()

function g() {
    fetchWithProgress(PATH, {}, (a) => {
        console.log(a)
        r.value = a
    })
}

</script>

<template>

    <button @click="r = 0">reset</button>
    <button @click="g()">set</button>
    <p>{{ r }}</p>

</template>