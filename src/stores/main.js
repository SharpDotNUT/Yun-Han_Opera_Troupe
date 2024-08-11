import { ref } from "vue";
import { defineStore } from "pinia";

import { Themes, StyleProvider } from "@varlet/ui";

export const useMainStore = defineStore("main", () => {
  const host_name = "https://yunhan-api.sharpdotnut.top/";

  const title_text = ref("云翰社");
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
      theme.value = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    }
    else{
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

  return { host_name, title, setTitle, theme, setTheme };
});
