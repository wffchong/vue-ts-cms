import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { GlobalState } from './interface'
import type { App } from 'vue'
import { useLoginStore } from './modules/login'
import { getDepartmentList, getRoleList } from '@/service/modules/global'
import { getMenuList } from '@/service/modules/login'

export const useGlobalStore = defineStore({
	id: 'GlobalState',
	state: (): GlobalState => ({
		entireRoles: [],
		entireDepartments: [],
		menuList: []
	}),
	actions: {
		async fetchEntireDataAction() {
			const rolesResult = await getRoleList()
			const departmentsResult = await getDepartmentList()
			const menuListResult = await getMenuList()

			// 保存数据
			this.entireRoles = rolesResult.data.list
			this.entireDepartments = departmentsResult.data.list
			this.menuList = menuListResult.data.list
		}
	}
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const registerStore = (app: App<Element>) => {
	app.use(pinia)

	// 加载本地数据
	const loginStore = useLoginStore()

	loginStore.loadLocalCacheAction()
}

export default registerStore
