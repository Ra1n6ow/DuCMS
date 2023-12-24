import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localStorageCache } from '@/utils/cache'

const useLoginStore = defineStore('longin', {
  state: () => ({
    id: '',
    token: localStorageCache.getCache('token') ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token

      localStorageCache.setCache('token', this.token)
    }
  }
})

export default useLoginStore
