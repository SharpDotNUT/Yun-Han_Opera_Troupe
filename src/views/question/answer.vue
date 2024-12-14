<script setup lang="ts">
import Data from "@/data/question/星月银0.json";
import type { Question, QuestionsList } from "@/data/question/types";
import { ref, watch } from "vue";
import { Dialog } from "@varlet/ui";

const data: QuestionsList = Data;

const currentIndex = ref(0);
const point = ref({
  right: 0,
  sp_right: 0,
});
const answered = ref(false);
const isRight = ref(false);
const selected = ref({ A: false, B: false, C: false, D: false } as any);
const result = ref({ A: "", B: "", C: "", D: "" } as any);
watch(currentIndex, () => {
  if (currentIndex.value >= data.questions.length) {
    currentIndex.value = data.questions.length - 1;
    Snackbar.success("全部答完");
    Dialog({
      title: "全部题目已答完",
      message: `你的得分是 ${point.value.right} 分，正确率 ${
        Math.round((point.value.right / data.questions.length * 1000))/10
      }%。`,
      cancelButton: false,
      onConfirm: () => {
        location.reload()
      }
    });
    currentIndex.value = data.questions.length - 1;
  }
  selected.value = { A: false, B: false, C: false, D: false };
  result.value = { A: "", B: "", C: "", D: "" };
  answered.value = false;
});
// 验证答案
function checkAnswer() {
  const rightAnswer = data.questions[currentIndex.value].answer;
  isRight.value = true;
  for (const key in selected.value) {
    if (selected.value[key] && !rightAnswer.includes(key)) {
      isRight.value = false;
      result.value[key] = "warning ";
    }
    if (!selected.value[key] && rightAnswer.includes(key)) {
      isRight.value = false;
      result.value[key] = "success";
    }
  }
  if (isRight.value) {
    point.value.right += 1;
    Snackbar.success("回答正确");
  } else {
    Snackbar.warning("回答错误");
  }
  answered.value = true;
}
</script>

<template>
  <!--题号，题目，ABCD-->
  <div id="container">
    <var-progress :value="(currentIndex / data.questions.length) * 100" />
    <h2>第 {{ data.questions[currentIndex].id }} 题</h2>
    <p>
      <span>{{ data.questions[currentIndex].question }}</span>
      <var-chip v-for="text in data.questions[currentIndex].tag">
        {{ text }}
      </var-chip>
    </p>
    <var-divider />
    <div class="answers">
      <div
        class="answer"
        v-for="(answer, index) in data.questions[currentIndex].answers"
        @click="selected[index] = !selected[index]">
        <var-chip
          block
          style="width: 100%"
          :type="
            result[index]
              ? result[index]
              : selected[index] == true
              ? 'primary'
              : 'default'
          ">
          <p>{{ answer }}</p>
        </var-chip>
      </div>
      <var-button v-if="!answered" type="primary" @click="checkAnswer">
        确定
      </var-button>
      <var-button v-else type="primary" @click="currentIndex++">
        下一题
      </var-button>
    </div>
    <var-button @click="currentIndex=35" type="primary">下一题</var-button>
  </div>
</template>

<style lang="css" scoped>
@import url("./answer.css");
</style>
