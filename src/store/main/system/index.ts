import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import {
  postUsersListData,
  createUserData,
  deleteUserById,
  editUserData
} from '@/service/main/system'

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
      this.postUsersListAction({ offset: 0, size: 5 })
    },

    async deleteUserByIDAction(id: number) {
      // 删除用户
      await deleteUserById(id)
      // 删除后重新请求刷新页面
      this.postUsersListAction({ offset: 0, size: 5 })
    },

    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      await editUserData(id, userInfo)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 5 })
    }
  }
})

export default useSystemStore
