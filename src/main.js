import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/i18n' // 中英切换
import filters from '@/utils/filters' // 时间戳转换
import SvgIcon from '@/icons/index' // icon图标
import * as ELIcon from '@element-plus/icons-vue' // element-plus icons
import 'element-plus/dist/index.css' // element-plus css
import '@/styles/index.scss' // 默认样式
import '@/router/permission' // token验证

const app = createApp(App)
for (const iconName in ELIcon) {
  app.component(iconName, ELIcon[iconName])
}
SvgIcon(app)
filters(app)

app.use(i18n)
app.use(store).use(router).mount('#app')
