import request from './request'

// 获取权限列表
export const getRight = () => request.get('rights/list')

// 获取树型控件列表
export const getTree = () => request.get('rights/tree')
