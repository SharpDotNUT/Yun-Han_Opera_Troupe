
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router/index";

import "./style/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);

import LanguageMain from "@/language/main.json";
console.log(LanguageMain);
const i18n = createI18n({
  locale: "zh",
  fallbackLocale: "zh",
  messages: LanguageMain
});
app.use(i18n);
app.mount("#app");

import "@varlet/touch-emulator";

import { useMainStore } from "./stores/main";
useMainStore().setTitle("");
useMainStore().setTheme();
