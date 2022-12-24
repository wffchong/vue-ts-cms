import { httpRequest } from '@/service'
import type { Login } from '../interface'

export const accountLoginRequest = (account: Login.ReqAccountLoginForm) => {
	return httpRequest.post<Login.ResLoginType>({
		url: '/login',
		data: account
	})
}

export const getUserInfoById = (id: number) => {
	return httpRequest.get<Login.ResGetUserInfoType>({
		url: `/users/${id}`
	})
}
/**
 * @description 根据角色id获取菜单列表
 */
export const getUserMenusByRoleId = (id: number) => {
	return httpRequest.get<Login.ResGetUserMenuByRoleIdType>({
		url: `role/${id}/menu`
	})
}

export const getMenuList = () => {
	return httpRequest.post<Login.ResGetUserMenuType>({
		url: 'menu/list'
	})
}
