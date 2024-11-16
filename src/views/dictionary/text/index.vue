<script setup>

import { fetchWithProgress } from '@/script/resource';
import SWUrl from './2.js?url'

navigator.serviceWorker.register(SWUrl)
navigator.serviceWorker.getRegistration().then(registration => {
  if (registration) {
    registration.active.postMessage({
        action:'cache',
        url:'https://yunhan-oss.oss-cn-hongkong.aliyuncs.com/TextMapCHS.json'
    })
    registration.active.postMessage({
        action:'read',
        url:'https://yunhan-oss.oss-cn-hongkong.aliyuncs.com/TextMapCHS.json'
    })
    registration.active.postMessage({
        action:'cache',
        url:'https://fonts.font.im/css2?family=Outfit:wght@100..900&display=swap'
    })
  }
});


</script>

<template>


</template>