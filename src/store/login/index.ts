import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localStorageCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'

const useLoginStore = defineStore('longin', {
  state: () => ({
    id: '',
    token: localStorageCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token

      localStorageCache.setCache(LOGIN_TOKEN, this.token)

      router.push('/main')
    }
  }
})

export default useLoginStore
