import { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosRequestConfig } from 'axios'

interface DuInterceptors<T = AxiosResponse> {
  // AxiosRequestConfig 用于 request 请求方法
  requestSuccessFunc?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailFunc?: (err: any) => any
  // 在改造完 Promise 的返回值后，res 已经不是 AxiosResponse 了，而是 request 传递的类型（IHomeData)
  // 因此在这里需要改造成泛型
  responseSuccessFunc?: (res: T) => T
  responseFailFunc?: (err: any) => any
}

interface DuInternalInterceptors<T = AxiosResponse> {
  // InternalAxiosRequestConfig 用于初始化(constructors)
  requestSuccessFunc?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailFunc?: (err: any) => any
  responseSuccessFunc?: (res: T) => T
  responseFailFunc?: (err: any) => any
}

// 原AxiosRequestConfig是没有这个属性，因此需要扩展
// 该属性用于在原有的 config 新增拦截器属性，用于在初始化实例的时候传递
export interface DuRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DuInterceptors<T>
}

export interface DuInternalRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DuInternalInterceptors<T>
}
