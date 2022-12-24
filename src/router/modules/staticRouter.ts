import type { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: LOGIN_URL
	},
	{
		path: LOGIN_URL,
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录页'
		}
	},
	{
		path: HOME_URL,
		name: 'main',
		component: () => import('@/views/main/index.vue'),
		meta: {
			title: '主页'
		}
	}
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
	{
		path: '/403',
		name: '403',
		component: () => import('@/components/ErrorMessage/403.vue'),
		meta: {
			title: '403页面'
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/ErrorMessage/404.vue'),
		meta: {
			title: '404页面'
		}
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/components/ErrorMessage/500.vue'),
		meta: {
			title: '500页面'
		}
	}
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: '/:pathMatch(.*)*',
	name: 'notFound',
	redirect: { name: '404' }
}
