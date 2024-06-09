import { useMainStore } from "../../stores/main";
const store = useMainStore();

export async function Translator(text, from, to) {
  return await fetch(`${store.host_name}/translate?text=${text}&from=${from}&to=${to}`)
}
