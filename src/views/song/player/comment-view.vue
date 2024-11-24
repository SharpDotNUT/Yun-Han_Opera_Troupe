<script setup>
import { ref } from "vue";
import { watch } from "vue";
import DocsView from "../../notice/perview.vue";
const props = defineProps({
  id: Number,
});
const display_docs = ref(false);
const display_comment = ref(false);
const page = ref(0);
const comments = ref([]);
const loaded = ref(false);
const loading = ref(false);
const finish = ref(false);
function upd(){
  console.log("更新");
}
async function getComments(page = 0) {
  const res = await cors_request(
    `https://music.163.com/api/v1/resource/comments/R_SO_4_${props.id}?offset=${page}&limit=15`
  );
  const data = JSON.parse(res.response);
  comments.value = data;
  loaded.value = true;
  loading.value = true;
  console.log("成功获取评论", data);
  return data;
}
getComments();
watch(
  () => props.id,
  () => {
    getComments();
  }
);
</script>

<template>
  <var-card title="评论区" v-model:floating="display_comment">
    <template #extra>
      <var-button type="primary" @click="display_comment = true">
        开启
      </var-button>
    </template>
    <template #floating-content>
      <var-divider dashed />
      <div style="display: flex; flex-direction: column; align-items: center">
        <div style="width: var(--base-width)">
          <div v-if="loaded">
            <var-list
              :finish="finish"
              v-model:loading="loading"
              @load="upd()">
              <var-cell
                border
                v-for="comment of comments.hotComments"
                class="comment">
                <div class="user">
                  <img :src="comment.user.avatarUrl" class="avatar" />
                  <div>
                    <p style="font-size: 16px; font-weight: bold">
                      {{ comment.user.nickname }}
                    </p>
                    <p style="font-size: 12px">
                      {{ comment.likedCount }}次喜欢 | 发布于
                      {{ comment.ipLocation.location }}
                      {{ new Date(comment.time).toLocaleString() }}
                    </p>
                  </div>
                </div>
                <p style="padding: 6px 0px">{{ comment.content }}</p>
                <template #extra></template>
              </var-cell>
              <template #finished></template>
            </var-list>
          </div>
          <p v-if="!loaded">
            <br />
            <var-alert
              type="warning"
              title="无法显示评论区。"
              message="请查阅文档以获取更多信息。"></var-alert>
            <br />
            <var-button @click="display_docs = true" block>阅读文档</var-button>
            <br />
            <DocsView v-model="display_docs" article_name="cors" />
          </p>
        </div>
      </div>
    </template>
  </var-card>
</template>

<style lang="css" scoped>
.comment {
  margin: 10px;
}

.user {
  display: flex;
  gap: 10px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20%;
  }
}
</style>
