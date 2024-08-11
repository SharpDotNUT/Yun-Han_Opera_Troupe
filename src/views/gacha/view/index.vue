<script setup>

import Data from '../data.json'

</script>

<template>
    <div v-for="(value, key) in Data">
        <h1>{{ key }}</h1>
        <div v-for="Banner in value">
            <h3>
                {{ Banner.name }}
            </h3>
            <img :src="Banner.img" :alt="Banner.name" style="width:50vw">
            <p>{{ key }} 版本 · 第 {{ Banner.order }} 期活动祈愿</p>
            <p>开始时间 ： {{ Date(Banner.from).toLocaleString() }}</p>
            <p>结束时间 ： {{ Date(Banner.to).toLocaleString() }}</p>
            <hr />
        </div>
        <hr />
    </div>
</template>