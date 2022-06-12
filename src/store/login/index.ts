import type { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'
import { IUserInfo, IUserMenus } from '@/service/login/type'
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/index'
import localCache from '@/utils/localCache'
import router from '@/router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state: {
        token: '',
        userInfo: {} as IUserInfo,
        userMenus: [] as IUserMenus[]
    },
    actions: {
        async accountLoginAction({ commit }, payload) {
            try {
                // 登录获取token和id
                const loginResult = await accountLoginRequest({ ...payload })
                const { id, token } = loginResult.data

                commit('changeToken', token)
                localCache.setCache('token', token)

                // 登录过后在获取用户信息
                const userInfoResult = await requestUserInfoById(id)
                const userInfo = userInfoResult.data

                commit('changeUserInfo', userInfo)
                localCache.setCache('userInfo', userInfo)

                // 登录过后获取用户菜单
                const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
                const userMenus = userMenusResult.data
                commit('changeUserMenus', userMenus)
                localCache.setCache('userMenus', userMenus)

                ElMessage({
                    type: 'success',
                    message: '登录成功',
                    center: true
                })
                router.push('/main')
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '登录失败',
                    center: true
                })
            }
        },
        // 登录持久化
        loadLocalLogin({ commit }) {
            const token = localCache.getCache('token')
            if (token) {
                commit('changeToken', token)
            }
            const userInfo = localCache.getCache('userInfo')
            if (userInfo) {
                commit('changeUserInfo', userInfo)
            }
            const userMenus = localCache.getCache('userMenus')
            if (userMenus) {
                commit('changeUserMenus', userMenus)
            }
        }
    },
    mutations: {
        changeToken(state, token) {
            state.token = token
        },
        changeUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        changeUserMenus(state, userMenus) {
            state.userMenus = userMenus

            // 注册动态路由

            const routes = mapMenusToRoutes(state.userMenus)
            routes.forEach((route) => router.addRoute('main', route))
        }
    },
    getters: {}
}

export default loginModule
