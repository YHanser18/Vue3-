import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求URL公共部分
  timeout: 5000 // 超时
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      // 当token失效 跳转到登录页面
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 过期'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)

export default service
