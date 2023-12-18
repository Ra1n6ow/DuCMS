import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { DuRequestConfig, DuInternalRequestConfig } from './type'

/*
 * 1 拦截器有三种情况
 *   - 全局拦截器，用于在创建所有实例时生效
 *   - 实例拦截器，用于针对每个实例初始化的拦截器
 *   - 请求拦截器，对于同一实例的不同请求，做出不同的拦截行为
 */

class DuRequest {
  instance: AxiosInstance

  // request 实例 => axios 实例
  constructor(config: DuInternalRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 修改全局拦截，直接返回data
        return res.data
      },
      (err) => {
        return err
      }
    )

    /*
    // 原写法
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSucessFunc,
        config.interceptors.requestFailFunc
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSucessFunc,
        config.interceptors.responseFailFunc
      )
    }
    */

    // 简写，使用可选链操作符?.
    // 和上面的全局拦截器相比
    // 请求：后定义的先执行, 响应：后定义的后执行
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFunc,
      config.interceptors?.requestFailFunc
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFunc,
      config.interceptors?.responseFailFunc
    )
  }

  // 对于同一实例的不同请求，不能直接加在 request config 里的 interceptors 属性中
  // 因为同一实例的 interceptors 属性是共享的,会存在干扰
  // 只能在这里主动调用函数
  request<T = any>(config: DuRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFunc) {
      // 手动执行该次请求的 requestSuccessFunc
      config = config.interceptors.requestSuccessFunc(config)
    }

    // return this.instance.request(config)
    // 对于单次响应的拦截处理，应该在返回 promise 之前处理，所以需要手动构造一个promise，在里面插入逻辑
    //
    // 新增 Promise 类型(原AxiosResponse),让 res.data 有效
    // return new Promise<AxiosResponse>((resolve, reject)=>{
    //
    // 这里的 T 由 request 传递类型进来
    return new Promise<T>((resolve, reject) => {
      // 默认 request 返回的是 axiosResponse 类型，但这次需要改成由 request 传进来的类型，默认 request 已在第二个泛型参数实现
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 在 res 返回之前执行 responeSucessFunc
          if (config.interceptors?.responseSuccessFunc) {
            res = config.interceptors.responseSuccessFunc(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: DuRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: DuRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  patch<T = any>(config: DuRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  delete<T = any>(config: DuRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default DuRequest
