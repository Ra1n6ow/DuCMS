import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from '@/store'

import 'normalize.css'
import './assets/css/index.less'

// 全局导入
// import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
