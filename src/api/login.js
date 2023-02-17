import request from './request'

// 校验登录页面状态
export const login = (data) => request.post('/login', data)
