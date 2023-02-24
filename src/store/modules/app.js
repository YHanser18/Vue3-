import router from '@/router'
import { login as loginApi } from '@/api/login'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '', // 获取token
    siderType: true // 导航栏图标样式
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    // 登录
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo).then(res => {
          console.log(res)
          commit('setToken', res.token)
          setTokenTime()
          // 若token存在跳转至登录页
          router.replace('/')
          resolve()
        }).catch(err => reject(err))
      })
    },
    // 退出
    logout ({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
