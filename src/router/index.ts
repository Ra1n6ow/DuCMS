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
      /*
      这里是静态路由写法，为所有用户都注册了路由，没有权限的用户可以通过 url 访问到，因此不合适
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('../views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () => import('../views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue')
        }
      ]
      */
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
