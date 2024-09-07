import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 备用语言
  messages: {}, // 初始时为空，将通过异步加载填充
  warnHtmlMessage: true,
  globalInjection: true,
})

let loadedLanguages = {}

// 加载时设置默认语言
loadAndSetLanguage('zh-CN', 'main')
loadAndSetLanguage('en', 'main')

// 异步加载语言模块
async function loadAndSetLanguage(locale, namespace) {

  if (loadedLanguages[locale] && loadedLanguages[locale].includes(namespace)) {
    setLanguage(locale)
    return
  }
  if (!loadedLanguages[locale]) {
    loadedLanguages[locale] = [];
  }
  loadedLanguages[locale].push(namespace);

  const messages = await import(`./${locale}/${namespace}.json`);
  i18n.global.setLocaleMessage(locale,{
    ...i18n.global.getLocaleMessage(locale),
    ...messages.default
  });
  console.log(loadedLanguages,' ',i18n.global.messages)
  i18n.global.locale = locale; // 设置当前语言
  return locale;

}

function setLanguage(locale) {
  i18n.global.locale = locale
}


export {
  i18n,
  loadAndSetLanguage,
  setLanguage
}
