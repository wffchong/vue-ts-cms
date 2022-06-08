import localCache from '@/utils/localCache'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
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
})

export default router
