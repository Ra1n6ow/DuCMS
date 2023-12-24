import duRequest from '..'

import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return duRequest.post({
    url: '/login',
    data: account
  })
}
