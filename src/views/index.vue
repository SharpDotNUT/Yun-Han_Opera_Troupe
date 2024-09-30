<script setup>
import { useMainStore } from "@/stores/main.js";
useMainStore().setTitle("首页");

</script>

<template>
  <div id="main">
    <div>
      <div id="content">
        <div id="title">
          <h1>{{ $t("name") }}</h1>
          <h3>
          <i18n-t keypath="index.description">
            <var-link type="primary" href="https://github.com/SharpDotNUT/yunhan-toolbox">{{ $t('index.GitHub') }}</var-link>
          </i18n-t></h3>
        </div>
        <div>
          <p>{{ $t("index.s0") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  top: var(--app-bar-height);
  * {
    text-align: center;
  }
}

#title {
  h1,
  h3 {
    background: linear-gradient(
      -30deg,
      #f19ebe 0%,
      #f19ebe 30%,
      #72c8d6 70%,
      #72c8d6 100%
    );
    background-clip: text;
    color: transparent;
  }

  h1 {
    font-size: 8vh;
  }

  h2 {
    font-size: 2vh;
    margin-bottom: 10px;
  }

  margin-bottom: 10vh;
}

#content {
  position: relative;
  margin: 30vh auto 0 auto;
  max-width: 600px;
}
</style>
