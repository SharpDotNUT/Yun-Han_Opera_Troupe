
<script setup>

import { ref } from 'vue'

const locales = import.meta.glob('../locales/**/*.json')
console.log(locales)
Promise.all(Object.values(locales).map((loader) => loader())).then((modules) => {
    console.log(modules);
});

</script>

<template>

    

</template>