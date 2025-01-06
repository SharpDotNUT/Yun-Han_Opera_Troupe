import { useMainStore } from "@/stores/main";

// const mainStore = useMainStore();

function updateMode() {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
//   mainStore.setTheme(isDarkMode ? "dark" : "light");
console.log(isDarkMode);
}

// 初始检测
updateMode();

// 监听深色模式变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateMode);
