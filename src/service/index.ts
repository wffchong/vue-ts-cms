import HttpRequest from '@/service/request'
import { ResultEnum } from '@/enums/httpEnum'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'

export const httpRequest = new HttpRequest({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: ResultEnum.TIMEOUT as number,
	interceptors: {
		requestSuccessFn(config) {
			const token = localCache.getCache(Constants.LOGIN_TOKEN)
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		}
	}
})
