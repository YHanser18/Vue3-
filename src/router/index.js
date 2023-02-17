import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/Login')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
