import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import { Themes, StyleProvider } from '@varlet/ui'
StyleProvider(Themes.md3Light)

const app = createApp(App);
app.use(createPinia());
app.use(router)

app.mount("#app");

import '@varlet/touch-emulator'

import { useMainStore } from './stores/main';
useMainStore().setTitle('')