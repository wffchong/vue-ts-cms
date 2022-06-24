import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login'
import system from './main/system/system'
import { IRootState, IStoreType } from './type'
import { getPageListData } from '@/service/main/system/system'

export default createStore<IRootState>({
    state() {
        return {
            entireDepartment: [],
            entireRole: []
        }
    },
    getters: {},
    actions: {
        // 请求部门和角色数据
        async getInitialDataAction({ commit }) {
            const departmentResult = await getPageListData('/department/list', {
                offset: 0,
                size: 1000
            })

            const { list: departmentList } = departmentResult.data

            const roleResult = await getPageListData('/role/list', {
                offset: 0,
                size: 1000
            })

            const { list: roleList } = roleResult.data

            commit('changeEntireDepartment', departmentList)
            commit('changeEntireRole', roleList)
        }
    },
    mutations: {
        changeEntireDepartment(state, list) {
            state.entireDepartment = list
        },
        changeEntireRole(state, list) {
            state.entireRole = list
        }
    },
    modules: {
        login,
        system
    }
})

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}
