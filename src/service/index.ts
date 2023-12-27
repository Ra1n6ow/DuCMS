import { localStorageCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config/index'
import DuRequest from './request'
import { LOGIN_TOKEN } from '@/global/constans'

const duRequest = new DuRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFunc: (config) => {
      const token = localStorageCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + localStorageCache.getCache(LOGIN_TOKEN)
      }
      return config
    }
  }
})
export default duRequest
