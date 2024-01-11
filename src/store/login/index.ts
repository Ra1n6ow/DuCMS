import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localStorageCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'
import { addRoute, firstMenu } from '@/utils/mapMenus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('longin', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token

      // 本地缓存
      localStorageCache.setCache(LOGIN_TOKEN, this.token)

      // 获取用户信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 根据用户role id 获取菜单列表
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusRes.data

      // 动态加载路由
      // router.addRoute('main', localRoute[0])
      addRoute(this.userMenus)

      localStorageCache.setCache('userInfo', this.userInfo)
      localStorageCache.setCache('userMenus', this.userMenus)

      // router.push('/main')
      router.push(firstMenu.url)
    },
    // 该方法用于刷新页面时保存 store 以及加载动态路由
    loadLocalCacheAction() {
      const token = localStorageCache.getCache(LOGIN_TOKEN)
      const userInfo = localStorageCache.getCache('userInfo')
      const userMenus = localStorageCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 再次加载路由
        addRoute(this.userMenus)
      }
    }
  }
})

export default useLoginStore
