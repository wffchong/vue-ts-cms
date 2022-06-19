import type { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: [],
            userCount: 0
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            const { pageUrl, queryInfo } = payload
            const result = await getPageListData(pageUrl, queryInfo)
            const { list, totalCount } = result.data
            commit('changeUserList', list)
            commit('changeUserCount', totalCount)
        }
    },
    mutations: {
        changeUserList(state, list) {
            state.userList = list
        },
        changeUserCount(state, totalCount) {
            state.userCount = totalCount
        }
    },
    getters: {}
}

export default systemModule
