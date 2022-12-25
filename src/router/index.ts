import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter, errorRouter, notFoundRouter } from '@/router/modules/staticRouter'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'
import { firstMenu } from '@/utils/map-menu'

const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRouter, ...errorRouter, notFoundRouter]
})

router.beforeEach(to => {
	const token = localCache.getCache(Constants.LOGIN_TOKEN)
	if (!token && to.path.includes('/main')) {
		return '/login'
	}

	if (to.path === '/main') {
		return firstMenu?.url
	}
})

export default router
