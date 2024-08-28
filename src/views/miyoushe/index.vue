<script setup>
import { ref } from "vue";

const games = {
  2: { name: "原神", sname: "ys" },
  6: {
    name: "崩坏：星穹铁道",
    sname: "sr",
  },
  8: {
    name: "绝区零",
    sname: "zzz",
  },
};

const d = ref({
  loaded: false,
  2: null,
  6: null,
  8: null,
});

const exist_fFetch = ref(false);
if (typeof fFetch != "function") {
  exist_fFetch.value = true;
}

if (exist_fFetch.value) {
  Object.keys(games).forEach((game) => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://bbs-api.miyoushe.com/post/wapi/getNewsList?gids=" +
        game +
        "&type=1"
    )
      .then((res) => res.json())
      .then((res) => {});
  });
}

function openInMYS(postID) {
  open("https://www.miyoushe.com/ys/article/" + postID);
}
</script>

<template>
  <var-link href="/cors.user.js">
    如果不能正常访问请点击我安装用户脚本并刷新（确保你安装了油猴脚本(篡改猴,TamperMonkey)插件
  </var-link>
  <div style="display: flex; flex-direction: row; gap: 10px">
    <div
      v-if="d.loaded"
      v-for="game in [d?.[2], d?.[6], d?.[8]]"
      style="flex: 1; display: flex; flex-direction: column; gap: 10px"
    >
      <var-card
        v-for="post in game.data.list"
        :title="post.post.subject"
        :subtitle="new Date(post.post.created_at * 1000).toLocaleString()"
        :src="post.post.images[0]"
        fit="cover"
        image-height="100%"
      >
        <template #extra>
          <var-button @click="openInMYS(post.post.post_id)"
            >在米游社打开</var-button
          >
        </template>
      </var-card>
    </div>
  </div>
</template>
