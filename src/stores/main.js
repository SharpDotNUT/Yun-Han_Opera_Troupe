import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const host_name = "http://localhost:62801";

  const title_text = ref("云翰工具箱");
  const title = ref("");
  function setTitle(text) {
    title_text.value = text;
    title.value = "云翰工具箱"
    title.value += title_text.value ? ` - ${title_text.value}` : ""
    document.title = title.value;
  }

  return { host_name, title, setTitle };
});
