import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { UserState } from '../interface'
import { getUserList } from '@/service/modules/user'
import type { User } from '@/service/interface'

export const useUserStore = defineStore({
	id: 'UserStore',
	state: (): UserState => ({
		userList: [],
		totalCount: 0
	}),
	actions: {
		async getUserListAction(queryInfo: User.ReqGetUserList) {
			const { data: userListResult } = await getUserList(queryInfo)
			console.log(userListResult)
			this.userList = userListResult.list
			this.totalCount = userListResult.totalCount
		}
	},
	persist: piniaPersistConfig('UserState')
})
