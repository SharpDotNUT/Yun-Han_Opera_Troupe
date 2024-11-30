//@ts-ignore
import { createI18n } from "vue-i18n";
//@ts-ignore
import enMain from "./en/main.json";
//@ts-ignore
import zhCNMain from "./zh-CN/main.json";
//@ts-ignore
import zhTWMain from "./zh-TW/main.json";
//@ts-ignore
import jaMain from "./ja/main.json";

const language_font_class = {
  "zh-CN": "lang-zh",
  "zh-TW": "lang-zht",
  en: "lang-en",
  ja: "lang-jp",
};

const i18n = createI18n({
  locale: "zh-CN", // 默认语言
  fallbackLocale: "zh-CN", // 备用语言
  messages: {
    "zh-CN": {
      ...zhCNMain,
    },
    "zh-TW": {
      ...zhTWMain,
    },
    en: {
      ...enMain,
    },
    ja: {
      ...jaMain,
    },
  },
  warnHtmlMessage: true,
  globalInjection: true,
  legacy: false
});

let loadedLanguages = {};

// 异步加载语言模块
async function loadLanguage(locale, namespace) {
  if (!loadedLanguages[locale]) {
    loadedLanguages[locale] = [];
  }
  loadedLanguages[locale].push(namespace);

  const messages = await import(`./${locale}/${namespace}.json`);
  i18n.global.setLocaleMessage(locale, {
    ...i18n.global.getLocaleMessage(locale),
    ...messages.default,
  });
  console.log(loadedLanguages, " ", i18n.global.messages);
  return locale;
}

function setLanguage(locale:string) {
  document.documentElement.classList.remove(
    ...Object.values(language_font_class)
  );
  document.documentElement.classList.add(language_font_class[locale]);
  window.onload = () => {
    document.documentElement.classList.remove(
      ...Object.values(language_font_class)
    );
    document.documentElement.classList.add(language_font_class[locale]);
  };
}

export { i18n, loadLanguage as loadAndSetLanguage, setLanguage };
