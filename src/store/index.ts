import { createPinia } from 'pinia'
import useLoginStore from './login'
import type { App } from 'vue'

const pinia = createPinia()

function regesterStore(app: App) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default regesterStore
