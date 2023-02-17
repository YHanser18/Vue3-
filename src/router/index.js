import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/Login')
  },
  {
    path: '/', name: '', component: () => import('@/layout')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
