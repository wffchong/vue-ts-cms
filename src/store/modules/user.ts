import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { UserState } from '../interface'
import { addUser, deleteUserById, editUser, getUserList } from '@/service/modules/user'
import type { User } from '@/service/interface'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore({
	id: 'UserStore',
	state: (): UserState => ({
		userList: [],
		totalCount: 0
	}),
	actions: {
		async getUserListAction(queryInfo: User.ReqGetUserList) {
			const { data: userListResult } = await getUserList(queryInfo)
			this.userList = userListResult.list
			this.totalCount = userListResult.totalCount
		},
		async deleteUserByIdAction(id: string) {
			const res = await deleteUserById(id)
			if (res.code === -1002) {
				ElMessage.error(res.data)
			} else {
				ElMessage.success(res.data)
				this.getUserListAction({ offset: 0, size: 10 })
			}
		},
		async newUserDataAction(userInfo: User.ReqAddUser) {
			const newResult = await addUser(userInfo)
			if (newResult.code === 400) {
				ElMessage.error(newResult.data)
			} else {
				ElMessage.success(newResult.data)
				this.getUserListAction({ offset: 0, size: 10 })
			}
		},
		async editUserDataAction(id: string, info: any) {
			const editResult = await editUser(id, info)
			if (editResult.code === -1003) {
				ElMessage.error(editResult.data)
			} else {
				ElMessage.success(editResult.data)
				this.getUserListAction({ offset: 0, size: 10 })
			}
		}
	},
	persist: piniaPersistConfig('UserState')
})
