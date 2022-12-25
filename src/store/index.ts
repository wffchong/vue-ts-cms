import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
import { useLoginStore } from './modules/login'

export const useGlobalStore = defineStore({
	id: 'GlobalState'
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
