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
