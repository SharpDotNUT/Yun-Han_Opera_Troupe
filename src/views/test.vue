
<script setup>

import { ref } from 'vue'

const n = ref('hello')
const fun = (ref) => {
    ref.value = 'changed'
}
fun(n)

</script>

<template>

    {{ n }}

</template>