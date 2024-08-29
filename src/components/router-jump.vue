<script setup>
import { routes } from "@/router";
</script>

<template>
  <div id="container">
    <div class="card" v-for="route in routes">
      <RouterLink :to="route.path">
        <var-button block @click="display_menu = false">
          {{ route.name }}
        </var-button>
      </RouterLink>
      <div class="card" v-if="route.children">
        <RouterLink v-for="child in route.children" :to="child.path">
          <var-button block>{{ child.name }}</var-button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  background-color: var(--color-body);
}
.card {
  margin: 5px 0;
  padding: 5px 5px;
  border-radius: 10px;
  border: 1px solid var(--color-primary);
}
</style>
