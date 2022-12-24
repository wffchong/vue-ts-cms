import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useGlobalStore = defineStore({
	id: 'GlobalState'
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
