import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: '/',
    component: () => import('@/layout'),
    redirect: '/users',
    children: [
      { path: 'users', name: 'users', component: () => import('@/views/Users') },
      { path: 'categories', name: 'categories', component: () => import('@/views/Categories') },
      { path: 'goods', name: 'goods', component: () => import('@/views/Goods') },
      { path: 'orders', name: 'orders', component: () => import('@/views/Orders') },
      { path: 'params', name: 'params', component: () => import('@/views/Params') },
      { path: 'reports', name: 'reports', component: () => import('@/views/Reports') },
      { path: 'rights', name: 'rights', component: () => import('@/views/Rights') },
      { path: 'roles', name: 'roles', component: () => import('@/views/Roles') }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
