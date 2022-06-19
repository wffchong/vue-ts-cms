import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login'
import system from './main/system/system'
import { IRootState, IStoreType } from './type'

export default createStore<IRootState>({
    state() {
        return {
            name: 'wff',
            age: 16
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        login,
        system
    }
})

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}
