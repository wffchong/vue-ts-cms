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

// 根据用户菜单返回对应的路由
export const mapMenusToRoutes = (menuList: Login.UserMenu[]) => {
	const routes: RouteRecordRaw[] = []

	const localRoutes = loadLocalRoutes()
	console.log(menuList)

	console.log(localRoutes)

	for (const menu of menuList) {
		for (const subMenu of menu.children) {
			const route = localRoutes.find(item => item.path === subMenu.url)
			if (route) {
				routes.push(route)
			}
		}
	}
	return routes
}
