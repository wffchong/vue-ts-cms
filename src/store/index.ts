import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login'
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
        login
    }
})

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}
