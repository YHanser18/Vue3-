import router from './index'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // 禁用进度环

const whiteList = ['/login'] // 登录白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  // token存在跳转至登录页面
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 存在白名单直接进入 否则跳转登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 在路由跳转后用NProgress.done()标记下结束
router.afterEach(() => {
  NProgress.done()
})
