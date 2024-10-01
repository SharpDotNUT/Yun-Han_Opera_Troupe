import { createI18n } from "vue-i18n";
import enMain from "./en/main.json";
import zhCNMain from "./zh-CN/main.json";
import zhTWMain from "./zh-TW/main.json";
import jaMain from "./ja/main.json";

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

function setLanguage(locale) {
  i18n.global.locale = locale;
}

const t = i18n.global.t;
export { i18n, t, loadLanguage as loadAndSetLanguage, setLanguage };
