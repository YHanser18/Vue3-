import router from './index'
import store from '@/store'

const whiteList = ['/login'] // 登录白名单
router.beforeEach((to, from, next) => {
  // token存在跳转至登录页面
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 存在白名单直接进入 否则跳转登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
