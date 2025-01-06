
import { createApp } from "vue";
import { createPinia } from "pinia";
import {i18n} from "./locales/i18n";
import App from "./App.vue";
import router from "./router/index.js";

import "./style/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");

import "@varlet/touch-emulator"
import '@varlet/ui/es/style'

import { useMainStore } from "./stores/main";
import '@/script/global.js'
useMainStore().setTheme('system');