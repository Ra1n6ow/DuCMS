let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://codercba.com:4000'
} else {
  // 开发环境
  BASE_URL = 'http://codercba.com:5000'
}

export const TIME_OUT = 10000
export { BASE_URL }
