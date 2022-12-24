import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { LoginState } from '../interface'
import type { Login } from '@/service/interface'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'
import router from '@/router'

export const useLoginStore = defineStore({
	id: 'LoginState',
	state: (): LoginState => ({
		token: '',
		userInfo: null,
		userMenus: []
	}),
	actions: {
		async loginAccountAction(account: Login.ReqAccountLoginForm) {
			const { data: loginResultData } = await accountLoginRequest(account)
			const { id, token } = loginResultData
			this.token = token

			localCache.setCache(Constants.LOGIN_TOKEN, token)

			const { data: userInfoResultData } = await getUserInfoById(id)
			this.userInfo = userInfoResultData

			const { data: userMenuResultData } = await getUserMenusByRoleId(userInfoResultData.role.id)

			this.userMenus = userMenuResultData

			router.push('/main')
		}
	},
	persist: piniaPersistConfig('LoginState')
})
