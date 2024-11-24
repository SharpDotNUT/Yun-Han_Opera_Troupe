<script setup>
import Comp from "./index.vue";

const props = defineProps({
  article_name: {
    type: String,
    default: "cors",
  },
});

const model = defineModel();
</script>

<template>
  <var-popup
    v-model:show="model"
    position="center"
    style="
      position: fixed;
      top: 10vh;
      bottom: 10vh;
      left: 10vw;
      right: 10vw;
      border-radius: 10px;
    ">
    <div style="margin: 20px; overflow: scroll" >
    <Comp :article_name="article_name"/></div>
  </var-popup>
</template>
