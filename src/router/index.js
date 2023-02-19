import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/Login')
  },
  {
    path: '/',
name: '',
component: () => import('@/layout'),
    redirect: '/users',
    children: [
      { path: 'users', name: 'users', component: () => import('@/views/Users/index.vue') },
      { path: 'categories', name: 'categories', component: () => import('@/views/Categories/index.vue') },
      { path: 'goods', name: 'goods', component: () => import('@/views/Goods/index.vue') },
      { path: 'orders', name: 'orders', component: () => import('@/views/Orders/index.vue') },
      { path: 'params', name: 'params', component: () => import('@/views/Params/index.vue') },
      { path: 'reports', name: 'reports', component: () => import('@/views/Reports/index.vue') },
      { path: 'rights', name: 'rights', component: () => import('@/views/Rights/index.vue') },
      { path: 'roles', name: 'roles', component: () => import('@/views/Roles/index.vue') }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
