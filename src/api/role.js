import request from '@/utils/request'

// 获取角色列表
export const getRole = () => request.get('roles')

// 新增角色
export const addRole = (data) => request.post('roles', data)

// 编辑角色
export const editRole = (data) => request.put(`roles/${data.id}`, data)

// 删除角色
export const deleteRole = (id) => request.delete(`roles/${id}`)

// 取消角色权限
export const deleteRight = (roleId, rightId) => request.delete(`roles/${roleId}/rights/${rightId}`)

// 分配权限
export const allotRight = (roleId, rids) => request.post(`roles/${roleId}/rights`, { rids })
