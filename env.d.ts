/// <reference types="vite/client" />

declare module '*.vue' {
  // DefineComponent 是 defineComponent 函数的返回类型，该函数的作用就是处理逻辑后 export 组件对象
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component

  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
  }
}
