import type { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './type'
import { getPageListData, deletePageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
            menuList: []
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            // 动态派发action
            const { pageName, queryInfo } = payload
            const pageUrl = `/${pageName}/list`
            const result = await getPageListData(pageUrl, queryInfo)
            const { list, totalCount } = result.data
            const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
            commit(`change${changePageName}List`, list)
            commit(`change${changePageName}Count`, totalCount)
        },
        async deletePageListAction({ dispatch }, payload: any) {
            const { pageName, id } = payload
            await deletePageListData(pageName, id)
            // 重新请求数据
            dispatch('getPageListAction', {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        }
    },
    mutations: {
        changeUsersList(state, list) {
            state.usersList = list
        },
        changeUsersCount(state, totalCount) {
            state.usersCount = totalCount
        },
        changeRoleList(state, list) {
            state.roleList = list
        },
        changeRoleCount(state, totalCount) {
            state.roleCount = totalCount
        },
        changeGoodsList(state, list) {
            state.goodsList = list
        },
        changeGoodsCount(state, totalCount) {
            state.goodsCount = totalCount
        },
        changeMenuList(state, list) {
            state.menuList = list
        }
    },
    getters: {
        pageListData(state: ISystemState) {
            // 这里直接返回一个函数，这样可以动态传pageName
            return (pageName: string) => {
                return state[`${pageName}List` as keyof ISystemState]
            }
        },
        pageListCount(state: ISystemState) {
            // 这里直接返回一个函数，这样可以动态传pageName
            return (pageName: string) => {
                return state[`${pageName}Count` as keyof ISystemState]
            }
        }
    }
}

export default systemModule
