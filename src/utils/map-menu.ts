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
				// 添加一级路由,重定向到二级路由,但是只需要添加一次，每个menu
				if (!routes.find(item => item.path === menu.url)) {
					routes.push({
						path: menu.url,
						redirect: subMenu.url
					})
				}

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

interface Breadcrumbs {
	name: string
	path: string
}

// 根据当前路由返回面包屑
export const mapPathToBreadcrumbs = (path: string, userMenus: Login.UserMenu[]): Breadcrumbs[] => {
	const breadcrumbs: Breadcrumbs[] = []

	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				// 第一级菜单
				breadcrumbs.push({
					path: menu.url,
					name: menu.name
				})
				// 第二级菜单
				breadcrumbs.push({
					path,
					name: submenu.name
				})
			}
		}
	}

	return breadcrumbs
}

// 根据用户的菜单隐射出id的菜单树
export const mapMenuListToIds = (menuList: any[]) => {
	const ids: number[] = []
	const recurseGetId = (menuList: any[]) => {
		for (const menu of menuList) {
			if (menu.children) {
				recurseGetId(menu.children ?? [])
			} else {
				ids.push(menu.id)
			}
		}
	}
	recurseGetId(menuList)
	return ids
}
