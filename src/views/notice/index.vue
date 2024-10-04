<script setup>

import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
const API_HOST = mainStore.host_name

let d

fetch(`${API_HOST}/api/notice/`)
    .then(res => res.json())
    .then(
        data => {
            d = data
            console.log(d)
        }
    )


</script>

<template>



</template>