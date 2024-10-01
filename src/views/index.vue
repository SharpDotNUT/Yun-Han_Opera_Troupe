<script setup>
import { useMainStore } from "@/stores/main.js";

</script>

<template>
  <div id="container">
    <div id="main">
      <p id="title-name">{{ $t("name") }}</p>
      <p id="title-description">
        <i18n-t keypath="index.description">
          <a href="https://github.com/SharpDotNUT/yunhan-toolbox">
            {{ $t('index.GitHub') }}
          </a>
        </i18n-t>
      </p>
      <p>{{ $t("index.s0") }}</p>
    </div>
  </div>
</template>

<style scoped>
#container {
  position: fixed;
  top: var(--app-bar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: url("./background-small.png");
  background-size: cover;
  background-position: 75%;
}

#main {
  height: calc(100vh - var(--app-bar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: white;
  }

  * {
    text-align: center;
  }

  #title-name {
    font-size: 8vh;
    font-weight: bold;
  }

  #title-description {
    font-size: 2vh;
    font-weight: bold;
    margin-bottom: 10vh;
  }
}

a {
  text-decoration: white;
  --c: linear-gradient(-30deg,
      #f19ebe 0%,
      #f19ebe 30%,
      #72c8d6 70%,
      #72c8d6 100%);
}
</style>
