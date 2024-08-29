<script setup>
import IdToName from "@/data/id_to_name.CHS.json";
const props = defineProps({
  banner: Object,
  isNeedSelect: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="banner" style="display: flex; flex-direction: column; gap: 10px">
    <img :src="banner.img" :alt="banner.name" style="width: 100%" />
    <div>
      {{ new Date(banner.from).toLocaleString() }} -
      {{ new Date(banner.to).toLocaleString() }}
    </div>
    <div
      v-if="
        new Date(banner.from) < new Date() && new Date(banner.to) > new Date()
      "
      style="display: flex; align-items: center"
    >
      <div style="width: 30%">（进行中）</div>
      <div style="width: 70%">
        <var-progress
          :value="
            ((new Date() - new Date(banner.from)) /
              (new Date(banner.to) - new Date(banner.from))) *
            100
          "
        />
      </div>
    </div>
    <div>
      UP :
      <var-chip type="primary" v-for="star5 in banner.star5">
        {{ IdToName[star5] }}
      </var-chip>
      <var-chip v-for="star4 in banner.star4">
        {{ IdToName[star4] }}
      </var-chip>
    </div>
    <var-button v-if="props.isNeedSelect" @click="" block>
      选择该卡池
    </var-button>
    <hr />
  </div>
</template>
