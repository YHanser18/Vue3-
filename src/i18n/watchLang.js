import { watch } from 'vue'
import store from '@/store'

export const watchLang = (...cbs) => {
  watch(() => store.getters.lang, () => {
    cbs.forEach((cb) => cb(store.getters.lang)) // 循环多余的内容
  }, { deep: true })
}
