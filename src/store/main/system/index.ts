import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { postUsersListData } from '@/service/main/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const usersListResult = await postUsersListData()
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
