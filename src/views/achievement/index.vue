<script setup>

const _log = console.log

import { ref } from 'vue'

import Data from './achievement.json'
const userData = ref([])
Data.data.forEach(achievementGoal => {
    if (achievementGoal != null) {
        achievementGoal.achievements.forEach(achievementGroup => {
            if (achievementGroup != null) {
                achievementGroup.forEach(achievement => {
                    userData.value.push({
                        id: achievement.id,
                        current: achievement.current,
                    })
                });
            }
        });
    }
});

const userUIAF = ref()
function handleUIAFUpload(file) {
    const reader = new FileReader()
    reader.readAsText(file.file)
    reader.onload = function () {
        const list = JSON.parse(reader.result).list
        userUIAF.value = {}
        for (const achievement of list) {
            userUIAF.value[achievement.id] = achievement
        }

        _log(userUIAF.value)

    }
}

const selectedGoal = ref(0)

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
    <var-uploader accept="application/json" @after-read="handleUIAFUpload">
        <var-button type="primary" size="large">导入你的 UIAF 数据</var-button>
    </var-uploader>
    <div class="achievement-container">
        <div class="achievement-goal-list var-elevation--3">
            <var-cell border ripple v-for="(goal, index) in Data.data" :key="index" @click="selectedGoal = index">
                <p style="font-size:120%">{{ goal?.name }}</p>
                <p>{{ goal.achievements.length }} 个成就组 | {{ goal.number }} 个成就</p>
            </var-cell>
        </div>
        <div class="achievement-group-list var-elevation--3">
            <div v-if="Data.data[selectedGoal]">
                <div v-for="(achievementGroup, index) in Data.data[selectedGoal].achievements" :key="index"
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
                        </span><span class="achievement-actions"
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