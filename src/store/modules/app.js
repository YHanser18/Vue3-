import { login as loginApi } from '@/api/login'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '' // 获取token
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo).then(res => {
          console.log(res)
          commit('setToken', res.token)
          // 若token存在跳转至登录页
          router.replace('/')
          resolve()
        }).catch(err => reject(err))
      })
    }

  }
}
