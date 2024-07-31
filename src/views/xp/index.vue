<script setup>

import Tags from './tags.json'
import Intro from '@/components/intro.vue';
import IntroText from './intro.md?raw'

import { ref } from 'vue'

const _log = console.log

const selected = ref(0)
const data = ref({})
function initData(useRandomData = false) {
    for (const characterIndex in Tags) {
        if (useRandomData) {
            data.value[characterIndex] = Math.round(Math.random() * 100) / 100
        }
        else {
            data.value[characterIndex] = 0
        }
    }
}

const saveName = ref('')
const filesName = ref([])
function save() {
    if (saveName.value) {
        localStorage.setItem('yunhan-xp-' + saveName.value, JSON.stringify(data.value))
    }
    else {
        localStorage.setItem('yunhan-xp-' + Math.floor(Math.random() * 16 ** 8).toString(16), JSON.stringify(data.value))
    }
    load()
}
function load(name = undefined) {
    if (name) {
        data.value = JSON.parse(localStorage.getItem('yunhan-xp-' + name))
    }
    else {
        let files = Object.keys(localStorage).filter(key => key.startsWith('yunhan-xp-'))
        for (const file in files) {
            files[file] = files[file].slice(10,files[file].length)
        }
        filesName.value = files
    }
}
load()
function clearSave() {
    if (confirm('确认清除所有保存数据？')) {
        for (const key in localStorage) {
            if (key.startsWith('yunhan-xp-')) {
                localStorage.removeItem(key)
            }
        }
        load()
    }
}

const result = ref({})
function computeResult() {
    for (const characterIndex in data.value) { // 遍历所有角色
        if (data.value[characterIndex] > 0) { // 角色有 XP 值
            const tags = Tags[characterIndex].tags // 角色的标签
            for (const tag of tags) { // 遍历角色的标签
                if (result.value[tag]) { // 标签已存在于结果中
                    result.value[tag] += data.value[characterIndex] // 加上角色的 XP 值
                    result.value[tag] = Math.round(result.value[tag] * 100) / 100 // 保留两位小数
                }
                else {
                    result.value[tag] = Math.round(data.value[characterIndex] * 100) / 100 // 标签不存在于结果中，直接赋值
                }
            }
        }
    }
    // 对result按照value进行排序
    result.value = Object.fromEntries(Object.entries(result.value).sort((a, b) => b[1] - a[1]))
}

</script>

<template>
    <Intro :content="IntroText"></Intro>
    <div class="elevation-2" id="input">
        <var-menu id="character-selector">
            <var-cell border v-ripple v-for="(character, index) in Tags" @click="selected = index">
                {{ character.name }}
                <span v-if="data[index] > 0">
                    - {{ data[index] }}
                </span>
            </var-cell>
        </var-menu>
        <div id="character-panel">
            <h1>{{ Tags[selected].name }} <var-badge type="info" :value="'内部 ID : ' + Tags[selected].id"></var-badge>
            </h1>
            <h3>{{ Tags[selected].description }}</h3>
            <br>
            <var-chip block>元素 - {{ Tags[selected].vision }}</var-chip><br />
            <var-chip block>武器类别 - {{ Tags[selected].weapon }}</var-chip><br />
            <var-chip block>体型 - {{ Tags[selected].body }}</var-chip><br />
            <hr />
            XP 值 : <var-slider style="padding: 20px" v-model="data[selected]" :min="0" :max="1"
                :step="0.01"></var-slider>
            <hr />
            <var-chip class="tags" v-for="(tag, index) in Tags[selected].tags">
                {{ tag }}
            </var-chip>
        </div>
    </div>
    <var-button @click="result = {}; computeResult()">计算</var-button>
    <var-button @click="result = {}; initData(true); computeResult()">随机测试</var-button>
    <var-button @click="initData(); result = {}">清空</var-button>
    <var-button @click="save()" block>{{ saveName ? `保存为 ${saveName}` : '快速保存(随机名)或输入文件名' }}</var-button>
    <var-input type="text" clearable placeholder="输入保存名" v-model="saveName"></var-input>
    <var-button @click="load()">加载</var-button>
    <var-select v-model="saveName" placeholder="选择保存名">
        <var-option v-for="name in filesName" :key="name" :value="name">{{ name }}</var-option>
    </var-select>
    <var-button @click="clearSave()">清除所有保存数据</var-button>
    <div id="result">
        <var-table>
            <table>
                <thead>
                    <tr>
                        <th>萌点</th>
                        <th>系数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(key, value) in result">
                        <td>{{ value }}</td>
                        <td>{{ key }}</td>
                    </tr>
                </tbody>
            </table>
        </var-table>
    </div>
</template>

<style scoped>
#input {
    display: flex;
    flex-direction: row;
}

#character-selector {
    flex: 1;
    max-height: 50vh;
    overflow: auto;
}

#character-panel {
    flex: 2;
    max-height: 50vh;
    overflow: auto;
    padding: 10px
}

.tags {
    margin: 5px;
}
</style>