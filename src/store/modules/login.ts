import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { LoginState } from '../interface'
import type { Login } from '@/service/interface'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menu'
import { useGlobalStore } from '..'

export const useLoginStore = defineStore({
	id: 'LoginState',
	state: (): LoginState => ({
		token: '',
		userInfo: null,
		userMenus: [],
		userPermissions: []
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

			const userPermissions = mapMenusToPermissions(userMenuResultData)
			this.userPermissions = userPermissions

			localCache.setCache(Constants.USER_INFO, userInfoResultData)
			localCache.setCache(Constants.USER_MENUS, userMenuResultData)
			localCache.setCache(Constants.USER_PERMISSIONS, userPermissions)

			const globalStore = useGlobalStore()
			globalStore.fetchEntireDataAction()

			const routes = mapMenusToRoutes(this.userMenus)

			routes.forEach(route => {
				router.addRoute('main', route)
			})

			router.push('/main')
		},

		// 用户刷新加载默认数据
		loadLocalCacheAction() {
			const token = localCache.getCache(Constants.LOGIN_TOKEN)
			const userInfo = localCache.getCache(Constants.USER_INFO)
			const userMenus = localCache.getCache(Constants.USER_MENUS)
			const userPermissions = localCache.getCache(Constants.USER_PERMISSIONS)

			if (token && userInfo && userMenus) {
				this.token = token
				this.userInfo = userInfo
				this.userMenus = userMenus
				this.userPermissions = userPermissions

				const globalStore = useGlobalStore()
				globalStore.fetchEntireDataAction()

				const routes = mapMenusToRoutes(userMenus)
				routes.forEach(route => router.addRoute('main', route))
			}
		}
	},
	persist: piniaPersistConfig('LoginState')
})
