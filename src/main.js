import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from '@/icons/index' // icon图标
import 'element-plus/dist/index.css' // element-plus css
import '@/styles/index.scss' // 默认样式
import '@/router/permission' // token验证

const app = createApp(App)
SvgIcon(app)

app.use(store).use(router).mount('#app')
