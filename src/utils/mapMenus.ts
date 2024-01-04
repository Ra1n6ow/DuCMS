import { localRoute } from '@/router'
import router from '@/router'

export function addRoute(userMenus: any) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoute.find((item) => item.path === subMenu.url)
      if (route) router.addRoute('main', route)
    }
  }
}
