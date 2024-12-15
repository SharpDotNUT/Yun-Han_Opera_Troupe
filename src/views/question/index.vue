
<script setup>

import { RouterView } from 'vue-router';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
mainStore.setTitle('question')

</script>

<template>sad
    <RouterView />
</template>