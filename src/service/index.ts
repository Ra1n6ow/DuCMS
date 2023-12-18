import { BASE_URL, TIME_OUT } from './config/index'
import DuRequest from './request'

const duRequest = new DuRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
export default duRequest
