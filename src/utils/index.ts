import type { Login } from '@/service/interface'

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Login.UserMenu[]) {
	return menuList.reduce((pre: Login.UserMenu[], current: Login.UserMenu) => {
		let flatArr = [...pre, current]
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
		return flatArr
	}, [])
}
