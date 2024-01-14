import duRequest from '@/service'

export function postUsersListData() {
  return duRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
