import { LOGIN_TOKEN } from '@/global/constans'
import { localStorageCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue'),
      name: 'aa'
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/error/notFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorageCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
