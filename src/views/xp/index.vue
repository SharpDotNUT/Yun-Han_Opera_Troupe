<script setup>

import Tags from './tags.json'
import Intro from '@/components/intro.vue';
import IntroText from './intro.md?raw'

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { copyToClipboard } from '@/script/tools';
import { Dialog, Snackbar } from '@varlet/ui';
import { useMainStore } from '@/stores/main';

const _log = console.log

useMainStore().setTitle('XP 分析工具')
const data = ref({})
const route = useRoute()
const router = useRouter()
const display_achiever = ref(false)

if (route.query?.data) {
    try {
        _log(route.query.data)
        // _log(atob(JSON.parse(route.query.data)))
        // data.value = atob(JSON.parse(route.query.data))
        Snackbar.success('成功读取分享数据')
    } catch (e) {
        Dialog('分享数据解析失败')
    }
}
else {
    if (!localStorage['yunhan-xp-default'] && JSON.parse(localStorage.getItem('yunhan-xp-default'))) {
        data.value = JSON.parse(localStorage.getItem('yunhan-xp-default'))
    } else {
        initData()
    }
}
function copyShareLink() {
    let url = new URL(window.location.href)
    url.searchParams.set('data', btoa(JSON.stringify(data.value)))
    copyToClipboard(url.href)
}

const selected = ref(0)
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


const input_savedFileName = ref('')
const input_LoadedFileIndex = ref()
const filesName = ref([])
function save() {
    let name = ''
    if (input_savedFileName.value) {
        name = 'yunhan-xp-' + input_savedFileName.value
    }
    else {
        name = Math.floor(Math.random() * 16 ** 8).toString(16)
    }
    localStorage.setItem('yunhan-xp-' + name, JSON.stringify(data.value))
    Snackbar.success('成功在 localStorage 中保存键为 \'' + name + '\' 的数据')
    load()
}
function load(name = undefined) {
    if (name) {
        data.value = JSON.parse(localStorage.getItem('yunhan-xp-' + name))
        Snackbar.success('成功从 localStorage 中加载键为 \'' + name + '\' 的数据')
    }
    else {
        let files = Object.keys(localStorage).filter(key => key.startsWith('yunhan-xp-'))
        for (const file in files) {
            files[file] = files[file].slice(10, files[file].length)
        }
        filesName.value = files
    }
}
load()
function clearSave() {
    Dialog({
        message: '确定要清除所有保存数据吗？',
        onConfirm: () => {
            let names = ''
            for (const key in localStorage) {
                if (key.startsWith('yunhan-xp-')) {
                    localStorage.removeItem(key)
                    names += '\'' + key + '\' '
                }
            }
            if (names) { Snackbar.success('成功从 localStorage 中清除键为 ' + names + '的数据') }
            load()
        }
    })

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
    <var-divider />
    <var-paper class="paper" id="input">
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
    </var-paper>
    <var-divider />
    <var-paper class="paper">
        <div style="display: flex;gap: 10px;flex-direction: column;">
            <var-button block @click="result = {}; computeResult()">计算</var-button>
            <var-button block @click="initData(); result = {}">清空</var-button>
            <var-button block @click="copyShareLink();">复制分享连接</var-button>
            <var-button block @click="display_achiever = true;">保存/读取数据</var-button>
            <var-dialog position="bottom" v-model:show="display_achiever" :cancel-button="false">
                <div style="display: flex;gap: 10px;flex-direction: column;">
                    <var-input type="text" clearable placeholder="输入标签名(不输入则以随机名保存)"
                        v-model="input_savedFileName"></var-input>
                    <var-button @click="save()">{{ input_savedFileName ? `保存为 ${input_savedFileName}` :
                        '快速保存(随机名)或输入文件名' }}</var-button>
                    <var-select v-model="input_LoadedFileIndex" placeholder="选择存档">
                        <var-option v-for="(name, index) in filesName" :key="index" :value="name" :label="name">{{ name
                            }}</var-option>
                        <template #extra-message>
                            <var-button @click="save()">{{ input_savedFileName ? `保存为 ${input_savedFileName}` :
                                '快速保存(随机名)或输入文件名' }}</var-button></template>
                    </var-select>
                    <var-button @click="load(input_LoadedFileIndex)">加载</var-button>
                    <var-button @click="clearSave()">清除所有保存数据</var-button>
                </div>
            </var-dialog>
        </div>
    </var-paper>
    <var-divider />
    <var-paper class="paper" id="result" v-if="Object.keys(result).length > 0">
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
    </var-paper>
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
    padding: 20px;
}

#character-panel {
    flex: 2;
    max-height: 50vh;
    overflow: auto;
    padding: 20px
}

.tags {
    margin: 5px;
}
</style>