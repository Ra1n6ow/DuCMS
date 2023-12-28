import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localStorageCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('longin', {
  state: (): ILoginState => ({
    token: localStorageCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localStorageCache.getCache('userInfo'),
    userMenus: localStorageCache.getCache('userMenus')
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

      localStorageCache.setCache('userInfo', this.userInfo)
      localStorageCache.setCache('userMenus', this.userMenus)

      router.push('/main')
    }
  }
})

export default useLoginStore
