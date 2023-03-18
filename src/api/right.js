import request from '@/utils/request'

// 获取权限列表
export const getRights = () => request.get('rights/list')

// 获取角色列表
export const getRoles = () => request.get('roles')

// 新增角色
export const addRole = (data) => request.post('roles', data)

// 新增角色
export const editRole = (data) => request.put(`roles/${data.id}`, data)

// 删除角色
export const deleteRole = (id) => request.delete(`roles/${id}`)
