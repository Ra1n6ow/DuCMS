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

interface ICurrentMenus {
  id: number // id 用于绑定默认菜单
  name: string // 用于展示面包屑
  path: string // 用于展示面包屑，暂时没用上这个参数
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  const currentMenus: ICurrentMenus[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        currentMenus.push(
          { id: menu.id, name: menu.name, path: menu.url },
          { id: subMenu.id, name: subMenu.name, path: subMenu.url }
        )
        return currentMenus
      }
    }
  }
}
