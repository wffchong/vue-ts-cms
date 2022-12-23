import HttpRequest from '@/service/request'
import { ResultEnum } from '@/enums/httpEnum'

export const httpRequest = new HttpRequest({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: ResultEnum.TIMEOUT as number,
	interceptors: {
		requestSuccessFn(res) {
			console.log('实例请求拦截器')
			console.log(res)
			return res
		},
		responseSuccessFn(res) {
			console.log('实例相应拦截器')
			console.log(res)
			return res
		}
	}
})
