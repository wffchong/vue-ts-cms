import { httpRequest } from '@/service'
import type { User } from '../interface'

export const getUserList = (info: User.ReqGetUserList) => {
	return httpRequest.post<User.ResGetUserListType>({
		url: '/users/list',
		data: info
	})
}

export const deleteUserById = (id: string) => {
	return httpRequest.delete({
		url: `/users/${id}`
	})
}

export const addUser = (info: User.ReqAddUser) => {
	return httpRequest.post({
		url: '/users',
		data: info
	})
}

export const editUser = (id: string, info: User.ReqAddUser) => {
	return httpRequest.patch({
		url: `/users/${id}`,
		data: info
	})
}
