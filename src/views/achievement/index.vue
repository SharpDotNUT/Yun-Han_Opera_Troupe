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
console.log(userData.value)

const selectedGoal = ref(0)

function searchAchievement(name,platform){
    let url
    if(platform == 'bilibili'){
        url = `https://search.bilibili.com/all?keyword=${'成就 '+name}`
    }
    if(platform == 'miyoushe'){
        url = `https://www.miyoushe.com/ys/search?keyword=${'成就 '+name}`
    }
    window.open(url)
}

</script>

<template>
    <div class="achievement-container">
        <div class="achievement-goal-list">
            <div v-for="(goal, index) in Data.data" :key="index" @click="selectedGoal = index">
                {{ goal?.name }}
            </div>
        </div>
        <div class="achievement-list">
            <div v-if="Data.data[selectedGoal]">
                <div v-for="(achievementGroup, index) in Data.data[selectedGoal].achievements" :key="index"
                    class="achievement-group-list">
                    <div v-for="(achievement, index) in achievementGroup" :key="index"
                        class="achievement-item">
                        <h3>{{ achievement.name }}</h3>
                        <h4>{{ achievement.description }}</h4>
                        <p>版本 : {{ achievement.version }} ； 奖励 : {{ achievement.rewards }} 原石</p>
                        <div class="achievement-actions">
                            <button @click="searchAchievement(achievement.name,'bilibili')">
                                在哔哩哔哩搜索
                            </button>
                            <button @click="searchAchievement(achievement.name,'miyoushe')">
                                在米游社搜索
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('./index.css');
</style>