
<script setup>

import Markdown from '@/components/markdown.vue';
import P1 from './p1.md?raw'

</script>

<template>

    <div id="container">

        <div id="content">

            <div id="character">
                <img
                    src="https://uploadstatic.mihoyo.com/ys-obc/2021/12/17/4328207/a5a6bf125405fee31892213ca8a9c101_6679692598059943040.jpg" />
                <h1>云堇</h1>
                <h3>雲菫 | Yun Jin</h3>
            </div>
            <div id="main">
                <div class="special-title">
                    <span class="special-title-side">「</span>
                    <span class="special-title-text">
                        <span>红毹婵娟，庄谐并举</span>
                    </span>
                    <span class="special-title-side">」</span>
                </div>
                <Markdown :content="P1"></Markdown>
            </div>

        </div>

    </div>

</template>

<style scoped>
@import url('./index.css');
</style>