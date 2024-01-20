import duRequest from '@/service'

export function postUsersListData(queryInfo: any) {
  return duRequest.post({
    url: '/users/list',
    // data: {
    //   offset: 0,
    //   size: 10
    // }
    data: queryInfo
  })
}
