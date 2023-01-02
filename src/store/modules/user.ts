import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { UserState } from '../interface'
import { addUser, deleteUserById, getUserList } from '@/service/modules/user'
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
			// 1.创建新的用户
			const newResult = await addUser(userInfo)
			console.log(newResult)

			// 2.重新请求新的数据
			this.getUserListAction({ offset: 0, size: 10 })
		}
	},
	persist: piniaPersistConfig('UserState')
})
