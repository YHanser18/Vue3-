import request from './request'

// 请求用户列表
export const getUser = (params) => request({ url: '/users', params })

// 请求用户状态
export const getUserState = (uid, type) => request.put(`users/${uid}/state/${type}`)

// 新增用户
export const addUser = (data) => request.post('users', data)

// 编辑用户
export const editUser = (data) => request.put(`users/${data.id}`, data)

// 删除用户
export const deleteUser = (id) => request.delete(`users/${id}`)
