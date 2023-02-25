import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'

const message = {
  // 解构出中英文
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language // zh-CN
  const langCode = UAlang.indexOf !== -1 ? 'zh' : 'en' // 判断是否为中文
  localStorage.setItem('lang', langCode) // 存储在localStorage中
  return langCode
}

const i18n = createI18n({
  legacy: false, // 使用composition API模式 需要设置为false
  globalInjection: true, // 全局注入$t函数
  locale: getCurrentLanguage() || 'zh', // 语言
  messages: message
})

export default i18n
