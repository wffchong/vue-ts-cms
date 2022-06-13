import localCache from '@/utils/localCache'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/not-found/not-found.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = localCache.getCache('token')
        if (!token) {
            return '/login'
        }
    }

    if (to.path === '/main') {
        return firstMenu?.url
    }
})

export default router
