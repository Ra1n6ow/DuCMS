import duRequest from '..'

import type { IAccount } from '@/types'
// import { localStorageCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constans'

export function accountLoginRequest(account: IAccount) {
  return duRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return duRequest.get({
    url: `/users/${id}`
    // 将携带token的请求加到实例的拦截器中
    // headers: {
    //   Authorization: 'Bearer ' + localStorageCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return duRequest.get({
    url: `/role/${id}/menu`
  })
}
