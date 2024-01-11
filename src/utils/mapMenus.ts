import { localRoute } from '@/router'
import router from '@/router'

export let firstMenu: any = null

export function addRoute(userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoute.find((item) => item.path === subMenu.url)
      if (route) router.addRoute('main', route)
      // 将匹配到的第一个路由赋值给 firstMenu
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
}

export function mapPathToMenu(path: string, userMenus: any[]): [any, any] {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        return [menu, subMenu]
      }
    }
  }
  return [undefined, undefined]
}
