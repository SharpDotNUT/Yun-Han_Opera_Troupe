<template>
  <var-popup v-model:show="show" position="center">
    <div style="padding: 20px">
    <div style="display: flex; flex-direction: column; gap: 10px">
        <div style="display: flex;flex-direction: column;align-items: center">
          <br/>
          <img src="/src/img/sdn_logo.svg" alt="#.NUT Logo"></img>
          <p style="font-size: 32px;text-align: center">
            {{ $t("name") }}
            <var-badge :value="'v ' + PackageJSON.version"></var-badge>
          </p>
        </div>
        <p style="text-align: center">
          <var-link href="https://github.com/SharpDotNUT">
            #.NUT Studio
          </var-link>
          |
          <var-link href="https://github.com/CNChestnut">Chestnut</var-link>
        </p>
        <hr />
        <p>
          {{
            $t("about.build-time", [
              new Date(BuildTime).toLocaleString(),
            ])
          }}
        </p>
        <p>Copyright © 2024 SharpDotNUT. All rights reserved.</p>
      </div></div>
  </var-popup>
</template>

<script setup lang="ts">

import PackageJSON from '../../package.json'

//@ts-ignore
const BuildTime = window.BUILD_TIME
const show = defineModel("show", 
{ type: Boolean, default: true }
);

</script>
