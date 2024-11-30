<script setup>
import { computed, ref, watch } from "vue";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
});

import mdit_anchor from "markdown-it-anchor";
md.use(mdit_anchor, {
  level: [1, 2, 3],
  slugify: (s) => {
    return s;
  },
});
let markdown_toc = "";
import mdit_toc from "markdown-it-toc-done-right";
md.use(mdit_toc, {
  callback: (tocMarkdown, tocArray) => {
    markdown_toc = tocMarkdown;
  },
});

const props = defineProps({
  content: String,
  height: {
    type: String,
    default: "100%",
  },
});

const renderedMarkdown = computed(() => {
  if (props.content) {
    let markdownContent = md.render(props.content);
    return markdownContent;
  }
});

const style = ref({
  backgroundColor: "transparent",
  maxHeight: props.height,
  overflowY: "auto",
});

import GithubMarkdownCSSLight from "github-markdown-css/github-markdown-light.css?url";
import GithubMarkdownCSSDark from "github-markdown-css/github-markdown-dark.css?url";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
const CssHref = ref("");
function updateCss() {
  if (mainStore.theme === "dark") {
    CssHref.value = GithubMarkdownCSSDark;
  } else {
    CssHref.value = GithubMarkdownCSSLight;
  }
}
updateCss();
watch(() => mainStore.theme, updateCss);
</script>

<template>
  <link :href="CssHref" rel="stylesheet" />
  <div>
    <div
      class="markdown-body g-font"
      :style="style"
      v-html="renderedMarkdown"></div>
    <slot name="footer"></slot>
  </div>
</template>
