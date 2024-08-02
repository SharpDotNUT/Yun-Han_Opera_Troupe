import { ref } from "vue";
import { defineStore } from "pinia";

import { Themes, StyleProvider } from "@varlet/ui";

export const useMainStore = defineStore("main", () => {
  const host_name = "http://localhost:62801";

  const title_text = ref("云翰工具箱");
  const title = ref("");
  function setTitle(text) {
    title_text.value = text;
    title.value = "云翰工具箱";
    title.value += title_text.value ? ` - ${title_text.value}` : "";
    document.title = title.value;
  }

  const theme = ref(document.documentElement.dataset.theme);
  function setTheme(themeToSet) {
    console.log("setTheme", themeToSet)
    if (!themeToSet || themeToSet == "system") {
      themeToSet = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if ((themeToSet == "dark")) {
      StyleProvider(Themes.md3Dark);
      theme.value = "dark";
      document.documentElement.dataset.theme = "dark";
    }
    if ((themeToSet == "light")) {
      StyleProvider(Themes.md3Light);
      theme.value = "light";
      document.documentElement.dataset.theme = "light";
    }
  }

  return { host_name, title, setTitle, theme, setTheme };
});
