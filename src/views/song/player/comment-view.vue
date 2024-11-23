<script setup>
const props = defineProps({
  comments: Object,
});
</script>

<template>
  <var-paper>
      <div v-for="comment of comments.hotComments" class="comment">
        <div class="user">
          <img
            :src="comment.user.avatarUrl" class="avatar" />
          <div>
            <p style="font-size: 16px;font-weight: bold;">{{ comment.user.nickname }}</p>
            <p style="font-size: 12px;">
              {{ comment.likedCount }}次喜欢 | 发布于 {{comment.ipLocation.location }} {{new Date(comment.time).toLocaleString()}}
            </p>
          </div>
        </div>
        <p style="padding:6px 0px;">{{ comment.content }}</p>
        <hr/>
      </div>
  </var-paper>
</template>

<style lang="css" scoped>
.comment {
  margin: 10px;
}

.user {
  display: flex;
    gap:10px;
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 20%;
  }
}
</style>
