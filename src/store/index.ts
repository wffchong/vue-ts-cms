import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import login from './login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootState, IStoreType } from './type'
import { getPageListData } from '@/service/main/system/system'

export default createStore<IRootState>({
    state() {
        return {
            entireDepartment: [],
            entireRole: [],
            entireMenu: []
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

            const menuResult = await getPageListData('/menu/list', {})
            const { list: menuList } = menuResult.data

            commit('changeEntireDepartment', departmentList)
            commit('changeEntireRole', roleList)
            commit('changeEntireMenu', menuList)
        }
    },
    mutations: {
        changeEntireDepartment(state, list) {
            state.entireDepartment = list
        },
        changeEntireRole(state, list) {
            state.entireRole = list
        },
        changeEntireMenu(state, list) {
            state.entireMenu = list
        }
    },
    modules: {
        login,
        system,
        dashboard
    }
})

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}
