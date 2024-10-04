<script setup>

import Markdown from '@/components/markdown.vue';
import P1 from './p1.md?raw'
import { ref } from 'vue'
import Meta from './meta.json'

const sel_video = ref(-1)
const sel_story = ref('none')

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
                <p>
                    云堇是米哈游研发的游戏《原神》及其衍生作品的登场角色。
                </p>
                <p>
                    既是戏团「云翰社」的当家，也是璃月港内风头正劲的名角。
                </p>
                <p>
                    云堇唱腔甜美，扮相俏丽，以灵动又富有情感的表演闻名。无论是娇柔端庄的闺中千金，还是义薄云天的巾帼女杰，她都能拿捏得恰到好处。
                </p>
                <p>
                    更为难得的是，这位年轻演员还懂得剧本创作。除「神女劈观」外，云翰社近年来另有不少新剧，皆出自云堇之手。
                </p>
                <hr />
                <div>
                    <h2>角色视频</h2>
                    <select v-model="sel_video">
                        <option value="-1">隐藏</option>
                        <option v-for="(video, index) in Meta.videos" :value="index">{{ video.title }}</option>
                    </select>
                    <div id="video" v-if="sel_video != -1">
                        <div>
                            <p>哔哩哔哩外链播放器加载中...</p>
                        </div>
                        <iframe
                            :src="`//player.bilibili.com/player.html?bvid=${Meta.videos[sel_video].bvid}&autoplay=false`"
                            scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
                            width="100%" height="100%">
                        </iframe>
                    </div>
                </div>
                <hr />
                <div>
                    <h2>角色故事</h2>
                    <select v-model="sel_story" onchange="updateSelectedVideo()">
                        <option value="none">隐藏</option>
                        <option v-for="(title, index) in Object.keys(Meta.stories)" :value="title">{{ title }}</option>
                    </select>
                    <div v-if="sel_story != -1">
                        <p>{{ Meta.stories[sel_story] }}</p>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<style scoped>
@import url('./index.css');
</style>