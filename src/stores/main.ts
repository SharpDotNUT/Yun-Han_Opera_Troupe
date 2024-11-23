//@ts-ignore
import { ref } from "vue";
//@ts-ignore
import { defineStore } from "pinia";
import { i18n } from "@/locales/i18n";
const t = i18n.global.t;
//@ts-ignore
import { Themes, StyleProvider } from "@varlet/ui";

export const useMainStore = defineStore("main", () => {
  // @ts-ignore
  const host_name = import.meta.env.VITE_API_HOST as string;

  const title = ref("");
  function setTitle(i18n_id:string) {
    title.value = "apps-name." + i18n_id;
    console.log(title.value);
    document.title = t("name") + " - " + t(title.value);
  }
  const theme = ref(document.documentElement.dataset.theme);
  const themeMode = ref(document.documentElement.dataset.theme);
  function setTheme(themeToSet) {
    console.log(themeToSet);
    themeMode.value = themeToSet;
    const is_md2 = themeMode.value.endsWith("md2");
    if (
      !themeMode.value ||
      themeMode.value == "system" ||
      themeMode.value == "system-md2"
    ) {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      if (is_md2) {
        theme.value = theme.value + "-md2";
      }
      console.log(theme.value);
    } else {
      theme.value = themeMode.value;
    }
    if (theme.value.startsWith("dark")) {
      if (is_md2) {
        StyleProvider(Themes.dark);
      } else {
        StyleProvider(Themes.md3Dark);
      }
      theme.value = "dark";
      document.documentElement.dataset.theme = "dark";
    }
    if (theme.value.startsWith("light")) {
      if (is_md2) {
        StyleProvider(undefined);
      } else {
        StyleProvider(Themes.md3Light);
      }
      theme.value = "light";
      document.documentElement.dataset.theme = "light";
    }
  }

  const logged = ref(false);
  const user_info = ref({});
  const token = ref("");
  function initUserInfo() {
    try {
      if (
        localStorage.getItem("yunhan-meta-user") &&
        localStorage.getItem("yunhan-meta-user")
      ) {
        user_info.value = JSON.parse(localStorage.getItem("yunhan-meta-user"));
        token.value = localStorage.getItem("yunhan-meta-token");
        logged.value = true;
      }
    } catch (e) {
      console.log(e);
      Dialog({
        title: "提示",
        message: "登录信息有误，请重新登录。",
      });
    }
  }

  return {
    host_name,
    title,
    setTitle,
    theme,
    setTheme,
    logged,
    user_info,
    token,
    initUserInfo,
  };
});
