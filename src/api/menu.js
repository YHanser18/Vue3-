import request from './request'

// 获取菜单列表
export const menuList = () => request.get('/menus')
