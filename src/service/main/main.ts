import duRequest from '..'

export function getEntireRoles() {
  return duRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return duRequest.post({
    url: '/department/list'
  })
}
