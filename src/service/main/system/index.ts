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

export function deleteUserById(id: number) {
  return duRequest.delete({
    url: `/users/${id}`
  })
}

export function createUserData(userInfo: any) {
  return duRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return duRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
