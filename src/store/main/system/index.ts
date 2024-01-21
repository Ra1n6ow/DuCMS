import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { postUsersListData, createUserData, deleteUserById } from '@/service/main/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },

    async createUserDataAction(userInfo: any) {
      // 创建用户
      const userDataResult = await createUserData(userInfo)
      console.log(userDataResult)
      // 创建后重新请求刷新页面
      this.postUsersListAction({})
    },

    async deleteUserByIDAction(id: number) {
      // 删除用户
      const deleteUserResult = await deleteUserById(id)
      console.log(deleteUserById)
      // 删除后重新请求刷新页面
      this.postUsersListAction({})
    }
  }
})

export default useSystemStore
