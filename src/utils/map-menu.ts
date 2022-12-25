import type { Login } from '@/service/interface'
import type { RouteRecordRaw } from 'vue-router'

// 加载全部的路由文件
const loadLocalRoutes = () => {
	const localRoutes: RouteRecordRaw[] = []

	const files: Record<string, any> = import.meta.glob('@/router/modules/dynamicRoutes/main/**/*.ts', {
		eager: true
	})

	for (const key in files) {
		const file = files[key]
		localRoutes.push(file.default)
	}

	return localRoutes
}

export let firstMenu: Login.UserMenu | null = null

// 根据用户菜单返回对应的路由
export const mapMenusToRoutes = (menuList: Login.UserMenu[]) => {
	const routes: RouteRecordRaw[] = []

	const localRoutes = loadLocalRoutes()

	for (const menu of menuList) {
		for (const subMenu of menu.children) {
			const route = localRoutes.find(item => item.path === subMenu.url)
			if (route) {
				routes.push(route)
			}
			if (route && !firstMenu) {
				firstMenu = subMenu
			}
		}
	}
	return routes
}

// 根据当前路由返回id
export const mapPathToMenu = (path: string, userMenus: Login.UserMenu[]) => {
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				return submenu.id
			}
		}
	}
}
