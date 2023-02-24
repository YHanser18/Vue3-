import router from '@/router'
import { login as loginApi } from '@/api/login'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '', // 获取token
    lang: localStorage.getItem('lang') || 'zh', // 设置语言
    sideBarType: true // 导航栏图标样式
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeSideBarType (state) {
      state.sideBarType = !state.sideBarType
    },
    changeLang (state, lang) {
      state.lang = lang
    }
  },
  actions: {
    // 登录
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo).then(res => {
          // console.log(res)
          commit('setToken', res.token)

          setTokenTime()
          router.replace('/') // 必须登录后才能访问首页
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
