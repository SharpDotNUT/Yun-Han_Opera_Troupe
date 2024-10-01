<script setup>
import { ref, watch } from "vue";

import IntroText from "./intro.md?raw";
import Intro from "@/components/intro.vue";
import TextFileInput from "@/components/text-file-input/index.vue";
import { useMainStore } from "@/stores/main";

import AchievementData from "./achievement.json";
console.log(AchievementData);
import {
  filterAchievements,
  searchAchievement,
  UIAF_to_userUIAF,
} from "./index";

const userUIAF = ref({});
const versions = AchievementData.versions;
const display_import = ref(false);
const selectedVersion = ref(versions[0]);
const selectedGoal = ref(0);
const finished = ref("所有");

if (localStorage.getItem("userUIAF")) {
  const data = JSON.parse(localStorage.getItem("userUIAF"));
  userUIAF.value = UIAF_to_userUIAF(data);
}

const filteredAchievementsGoal = ref([]);
const searchString = ref("");

function _filterAchievements() {
  filteredAchievementsGoal.value = filterAchievements(
    AchievementData,
    userUIAF.value,
    selectedVersion.value,
    selectedGoal.value,
    finished.value,
    searchString.value
  );
}
_filterAchievements();
watch(searchString, _filterAchievements);
watch(selectedGoal, _filterAchievements);
watch(selectedVersion, _filterAchievements);
watch(finished, _filterAchievements);

function _searchAchievement(name, platform) {
  searchAchievement(name, platform);
}

console.log(userUIAF.value);
</script>

<template>
  <Intro :content="IntroText" height="50vh" />
  <var-button @click="display_import = true">导入UIAF文件</var-button>
  <var-dialog v-model:show="display_import" style="width:90vw;height:auto;">
    <TextFileInput
      @load="userUIAF = UIAF_to_userUIAF(JSON.parse($event))"
    ></TextFileInput
  ></var-dialog>
  <var-input
    v-model="searchString"
    placeholder="搜索成就名称"
    clearable
  ></var-input>
  <var-select v-model="selectedVersion" placeholder="选择版本">
    <var-option
      v-for="(version, index) in versions"
      :key="index"
      :label="version"
    ></var-option>
  </var-select>
  <var-select v-model="finished" placeholder="是否完成">
    <var-option
      v-for="(version, index) in ['所有', '已完成', '未完成']"
      :key="index"
      :label="version"
    ></var-option>
  </var-select>
  <div class="achievement-container">
    <div class="achievement-goal-list var-elevation--3">
      <var-cell border ripple @click="selectedGoal = -1">
        <p style="font-size: 120%">所有成就</p>
        <p>
          {{ AchievementData.numberOfGroup }} 个成就组 |
          {{ AchievementData.numberOfAchievement }} 个成就
        </p>
        <p></p>
      </var-cell>
      <var-cell
        border
        ripple
        v-for="(goal, index) in AchievementData.data"
        :key="index"
        @click="selectedGoal = index"
      >
        <p style="font-size: 120%">{{ goal?.name }}</p>
        <p>
          {{ goal.achievements.length }} 个成就组 | {{ goal.number }} 个成就
        </p>
      </var-cell>
    </div>
    <div class="achievement-group-list">
      <!-- <var-pagination
        :total="AchievementData.data[selectedGoal].achievements.length"
      ></var-pagination> -->
      <var-card
        v-for="(achievementGroup, index) in filteredAchievementsGoal"
        :key="index"
      >
        <template #title>
          <div class="var-card__title" style="font-size: 150%">
            {{ achievementGroup[0].name }}
          </div>
        </template>
        <template #description>
          <div class="var-card__description">
            <var-cell
              border
              v-for="(achievement, index) in achievementGroup"
              :key="index"
            >
              <p>{{ achievement.description }}</p>
              <p style="color: rgb(0, 0, 0, 0.7)">
                更新版本 {{ achievement.version }} | 奖励
                {{ achievement.rewards }}
                <img
                  src="./img/Primo.webp"
                  style="height: 16px"
                />
              </p>
              <div v-if="userUIAF?.[achievement.id]">
                <p>
                  {{
                    userUIAF[achievement.id].status > index
                      ? "已达成"
                      : "未达成"
                  }}
                </p>
                <p v-if="userUIAF[achievement.id].status > index">
                  达成时间
                  {{
                    new Date(
                      userUIAF[achievement.id].timestamp * 1000
                    ).toLocaleString()
                  }}
                </p>
                <var-progress
                  style="margin-top: 5px"
                  :value="
                    userUIAF[achievement.id].status > index
                      ? 100
                      : (userUIAF[achievement.id].current /
                          achievement.progress) *
                        100
                  "
                ></var-progress>
                <span @click="userUIAF[achievement.id].status = index">
                  标记为{{
                    userUIAF[achievement.id].status > index
                      ? "未完成"
                      : "已完成"
                  }}</span
                >
              </div>
              <div v-else>
                <p>未达成或数据缺失</p>
              </div>
              <hr style="margin: 10px 0; color: rgb(0, 0, 0, 0.5)" />
            </var-cell>
          </div>
        </template>
        <template #extra>
          <var-space justify="flex-end">
            <var-button
              @click="_searchAchievement(achievementGroup[0].name, 'bilibili')"
            >
              在哔哩哔哩搜索
            </var-button>
            <var-button
              @click="_searchAchievement(achievementGroup[0].name, 'miyoushe')"
            >
              在米游社搜索
            </var-button>
          </var-space></template
        >
      </var-card>
    </div>
  </div>
</template>

<style scoped>
@import url("./index.css");
</style>
