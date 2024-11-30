<script setup>
import { ref, watch } from "vue";
import Markdown from "../../components/markdown.vue";

const articles = ref({});
const selected = ref("1.3");
const content = ref();

const articlesImport = import.meta.glob("../../../docs/update_log/*.md", {
  query: "?raw",
});
for (let path in articlesImport) {
  const article_name = path.split("/").pop().slice(0, -3);
  articles.value[article_name] = articlesImport[path];
}
function load() {
  articles.value[selected.value]().then((res) => {
    console.log(res.default);
    content.value = res.default;
    console.log(content.value);
  });
}
load();
</script>

<template>
  <div id="container">
    <div id="head">
      <h1>{{ $t("apps-name.update-log") }}</h1>
      <p>{{ $t('update-log.only-chinese-and-english') }}</p>
    </div>
    <div id="main">
      <div id="nav">
        <var-cell
          border
          v-for="(article, version) in articles"
          @click="
            selected = version;
            load();
          "
          :key="version">
          {{ version }}
        </var-cell>
      </div>
      <div id="content">
        <Markdown :content="content"></Markdown>
      </div>
    </div>
  </div>
</template>

<style>
@import url("./index.css");
</style>
