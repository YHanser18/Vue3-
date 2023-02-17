import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from '@/icons/index' // icon图标
// import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/dist/index.css' // element-plus css
import '@/styles/index.scss' // 默认样式

const app = createApp(App)
// app.use(ElementPlus)
SvgIcon(app)

app.use(store).use(router).mount('#app')
