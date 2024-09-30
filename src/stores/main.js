import { ref } from "vue";
import { defineStore } from "pinia";
import { _t } from "@/locales/i18n";
import { Themes, StyleProvider } from "@varlet/ui";

export const useMainStore = defineStore("main", () => {
  const host_name = import.meta.env.VITE_API_HOST;

  const title_text = ref(_t("name"));
  const title = ref("");
  function setTitle(text) {
    title_text.value = text;
    title.value = "云翰社";
    title.value += title_text.value ? ` - ${title_text.value}` : "";
    document.title = title.value;
  }
  const theme = ref(document.documentElement.dataset.theme);
  const themeMode = ref(document.documentElement.dataset.theme);
  function setTheme(themeToSet) {
    console.log("setTheme", themeToSet);
    themeMode.value = themeToSet;
    if (!themeMode.value || themeMode.value == "system") {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      theme.value = themeMode.value;
    }
    if (theme.value == "dark") {
      StyleProvider(Themes.md3Dark);
      theme.value = "dark";
      document.documentElement.dataset.theme = "dark";
    }
    if (theme.value == "light") {
      StyleProvider(Themes.md3Light);
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
        })
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
