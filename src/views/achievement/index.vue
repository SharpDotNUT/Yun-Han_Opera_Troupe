<script setup>

const _log = console.log

import { ref, watch } from 'vue'

import IntroText from './intro.md?raw'
import Intro from '@/components/intro.vue';

import { useMainStore } from '@/stores/main';
useMainStore().setTitle('成就工具')

import AchievementData from './achievement.json'
const userUIAF = ref({})
const versions = AchievementData.versions

const selectedVersion = ref(versions[0])
const selectedGoal = ref(0)
const finished = ref('所有')

if (localStorage.getItem('userUIAF')) {
    const list = JSON.parse(localStorage.getItem('userUIAF'))
    userUIAF.value = {}
    for (const achievement of list) {
        userUIAF.value[achievement.id] = achievement
    }
}

const renderedAchievementsGoal = ref([])
const searchString = ref('')
function filterAchievements() {
    let _out = []
    function _check(_goal) {
        let _ = true
        if (_goal[0].name.indexOf(searchString.value) == -1) {
            _ = false
        }
        if (_goal[0].description.indexOf(searchString.value) == -1) {
            _ = false
        }
        if (selectedVersion.value != '所有' && _goal[0].version != selectedVersion.value) {
            _ = false
        }
        if (finished.value != '所有') {
            _ = false
        }
        else {
            if (userUIAF.value[_goal[_goal.length - 1].id]) { }
        }
        return _
    }
    if (selectedGoal.value == -1) {
        for (const _goal of AchievementData.data) {
            for (const _group of _goal.achievements) {
                if (_check(_group)) {
                    _out.push(_group)
                }
            }
        }
    } else {
        const _achievementsGoal = AchievementData.data[selectedGoal.value].achievements
        _achievementsGoal.forEach(_goal => {
            _out.push([])
            _goal.forEach((_achievement) => {
                if (_check(_goal)) {
                    _out[_out.length - 1].push(_achievement)
                }
            })
            if (_out[_out.length - 1].length == 0) {
                _out.pop()
            }
        })
    }
    renderedAchievementsGoal.value = _out
}
filterAchievements()
watch(searchString, filterAchievements)
watch(selectedGoal, filterAchievements)
watch(selectedVersion, filterAchievements)

function handleUIAFUpload(file) {
    const reader = new FileReader()
    reader.readAsText(file.file)
    reader.onload = function () {
        const list = JSON.parse(reader.result).list
        localStorage.setItem('userUIAF', JSON.stringify(list))
        userUIAF.value = {}
        for (const achievement of list) {
            userUIAF.value[achievement.id] = achievement
        }
    }
}

function searchAchievement(name, platform) {
    let url
    if (platform == 'bilibili') {
        url = `https://search.bilibili.com/all?keyword=${'原神 成就 ' + name}`
    }
    if (platform == 'miyoushe') {
        url = `https://www.miyoushe.com/ys/search?keyword=${'成就 ' + name}`
    }
    window.open(url)
}

</script>

<template>
    <Intro :content="IntroText" height="50vh" />
    <var-uploader accept="application/json" @after-read="handleUIAFUpload">
        <var-button type="primary" size="large">导入你的 UIAF 数据</var-button>
    </var-uploader>
    <var-input v-model="searchString" placeholder="搜索成就名称" clearable></var-input>
    <var-select v-model="selectedVersion" placeholder="选择版本">
        <var-option v-for="(version, index) in versions" :key="index" :label="version"></var-option>
    </var-select>
    <!-- <var-select v-model="finished" placeholder="是否完成">
        <var-option v-for="(version, index) in ['所有', '已完成', '未完成']" :key="index" :label="version"></var-option>
    </var-select> -->
    <div class="achievement-container">
        <div class="achievement-goal-list var-elevation--3">
            <var-cell border ripple @click="selectedGoal = -1">
                <p style="font-size:120%">所有成就</p>
                <p>{{ AchievementData.numberOfGroup }} 个成就组 | {{ AchievementData.numberOfAchievement }} 个成就</p>
                <p></p>
            </var-cell>
            <var-cell border ripple v-for="(goal, index) in AchievementData.data" :key="index"
                @click="selectedGoal = index">
                <p style="font-size:120%">{{ goal?.name }}</p>
                <p>{{ goal.achievements.length }} 个成就组 | {{ goal.number }} 个成就</p>
            </var-cell>
        </div>
        <div class="achievement-group-list var-elevation--3">
            <div>
                <div v-for="(achievementGroup, index) in renderedAchievementsGoal" :key="index"
                    class="achievement-group-list-item">
                    <div v-for="(achievement, index) in achievementGroup" :key="index">
                        <h3>{{ achievement.name }}</h3>
                        <h5>{{ achievement.description }}</h5>
                        <p style="color:rgb(0,0,0, 0.7)">
                            更新版本 {{ achievement.version }} | 奖励 {{ achievement.rewards }} 原石</p>
                        <div v-if="userUIAF?.[achievement.id]">
                            <p>{{ (userUIAF[achievement.id].status > index) ? '已达成' : '未达成' }}</p>
                            <p v-if="userUIAF[achievement.id].status > index">达成时间 {{ new
                                Date(userUIAF[achievement.id].timestamp * 1000).toLocaleString() }}</p>
                            <var-progress style="margin-top: 5px;" :value="userUIAF[achievement.id].current / achievement.progress * 100 ||
                                userUIAF[achievement.id].status > index ? 100 : 0"></var-progress>
                        <span @click="userUIAF[achievement.id].status = index">
                            标记为{{(userUIAF[achievement.id].status > index) ? '未完成' : '已完成'}}</span>
                        </div>
                        <div v-else>
                            <p>未达成或数据缺失</p>
                        </div>
                        <hr style="margin: 10px 0;color:rgb(0,0,0,0.5)">
                    </div>
                    <var-space justify="flex-end">
                        <span class="achievement-actions"
                            @click="searchAchievement(achievementGroup[0].name, 'bilibili')">
                            在哔哩哔哩搜索
                        </span>
                        <span class="achievement-actions"
                            @click="searchAchievement(achievementGroup[0].name, 'miyoushe')">
                            在米游社搜索
                        </span>
                    </var-space>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('./index.css');
</style>