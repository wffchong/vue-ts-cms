import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { LoginState } from '../interface'
import type { Login } from '@/service/interface'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menu'

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

			localCache.setCache(Constants.USER_INFO, userInfoResultData)
			localCache.setCache(Constants.USER_MENUS, userMenuResultData)

			const routes = mapMenusToRoutes(this.userMenus)

			routes.forEach(route => {
				router.addRoute(route)
			})

			router.push('/main')
		},

		// 用户刷新加载默认数据
		loadLocalCacheAction() {
			const token = localCache.getCache(Constants.LOGIN_TOKEN)
			const userInfo = localCache.getCache(Constants.USER_INFO)
			const userMenus = localCache.getCache(Constants.USER_MENUS)

			if (token && userInfo && userMenus) {
				this.token = token
				this.userInfo = userInfo
				this.userMenus = userMenus

				// 3.动态添加路由

				const routes = mapMenusToRoutes(userMenus)
				routes.forEach(route => router.addRoute(route))
			}
		}
	},
	persist: piniaPersistConfig('LoginState')
})
