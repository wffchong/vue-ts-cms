import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter, errorRouter, notFoundRouter } from '@/router/modules/staticRouter'

const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRouter, ...errorRouter, notFoundRouter]
})

export default router
