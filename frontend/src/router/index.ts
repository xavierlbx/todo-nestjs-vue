import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import TodoList from '@/pages/TodoList.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/todo', component: TodoList, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(from)
  if (to.meta.requiresAuth && !token) {
    next('/') // Redireciona pro login
  } else {
    next()
  }
})

export default router
