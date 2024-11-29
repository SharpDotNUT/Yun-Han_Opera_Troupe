<script setup lang="ts">
import { ref } from "vue";

//@ts-ignore
const articlesImport = import.meta.glob("../../../docs/update_log/*.md", {
  query: "?raw",
});
const articles = ref<{ [key: string]: Function }>({});
for (let path in articlesImport) {
    const article_name = path.split("/").pop()!.slice(0, -3);
    articles.value[article_name] = await articlesImport[path]().default;
}
console.log(articles.value);


const ui_showTips = ref(true);

</script>

<template>
  <h1>{{ $t("apps-name.update-log") }}</h1>
  <var-alert
    title="关于翻译"
    message="本页面只以简体中文和英文展示。"
    closeable
    @close="ui_showTips = false" />
  <div>
    <p v-for="article in articles">
        {{ article }}
    </p>
  </div>
</template>
