@ -0,0 +1,73 @@
<script setup>
import { Dialog } from "@varlet/ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
  2: null,
  6: null,
  8: null,
});

const exist_fFetch = ref(false);
if (typeof fFetch != "undefined") {
  exist_fFetch.value = true;
} else {
  Dialog({
    title: "请安装用户脚本",
    message: "检测到您没有安装用户脚本，请安装用户脚本，然后刷新此页面。",
    confirmButtonText: "安装用户脚本",
    onCancel: () => {
      router.push("/");
    },
    onConfirm: () => {
      open("/cors.userts")
      Snackbar.loading("请安装用户脚本，然后刷新此页面。")
    }
  });
}
console.log(exist_fFetch.value);

if (exist_fFetch.value) {
  for (let i in games) {
    fFetch(
      "https://bbs-api.miyoushe.com/post/wapi/getNewsList?gids=" +
      i +
      "&type=1&page_size=50"
    ).then((res) => {
      d.value[i] = JSON.parse(res.response);
    });
    // fetch(
    //   "http://127.0.0.1:52102/https://bbs-api.miyoushe.com/post/wapi/getNewsList?gids=" +
    //   i +
    //   "&type=1&page_size=50"
    // ).then((res) => {
    //   res.json().then((json) => {
    //     d.value[i] = json;
    //   })
    // })
  }
}

function openInMYS(postID) {
  open("https://www.miyoushe.com/ys/article/" + postID);
}

const preview = (images) => {
  ImagePreview.setDefaultOptions({
    closeable: true,
    closeIcon: "close",
    closeIconPosition: "top-right",
  })
  ImagePreview(images[0]);
}

</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 10px">
    <div v-for="game in [d?.[2], d?.[6], d?.[8]]" style="flex: 1; display: flex; flex-direction: column; gap: 10px">
      <var-card v-if="game" v-for="post in game.data.list" :title="post.post.subject"
        :subtitle="new Date(post.post.created_at * 1000).toLocaleString()" fit="cover" image-height="100%">
        <template #image>
          <var-tooltip>
          <img style="width: 100%;cursor: pointer;" :src="post.post.images[0]"
            @click="preview(post.post.images)"></img>
            <template #content>点击预览图片</template>
          </var-tooltip>
          </template>
        <template #extra>
          <var-tooltip>
            <var-button @click="openInMYS(post.post.post_id)">
              浏览
            </var-button>
            <template #content>在米游社打开</template>
          </var-tooltip>
        </template>
      </var-card>
    </div>
  </div>
</template>
