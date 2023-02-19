import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from '@/icons/index' // icon图标
import 'element-plus/dist/index.css' // element-plus css
import '@/styles/index.scss' // 默认样式
import '@/router/permission' // token验证
import * as ELIcon from '@element-plus/icons-vue' // element-plus icons

const app = createApp(App)
for (const iconName in ELIcon) {
  app.component(iconName, ELIcon[iconName])
}
SvgIcon(app)

app.use(store).use(router).mount('#app')
