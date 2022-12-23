import { httpRequest } from '@/service'
import type { Login } from '../interface'

export const accountLoginRequest = (account: Login.ReqAccountLoginForm) => {
	return httpRequest.post<Login.ResLogin>({
		url: '/login',
		method: 'POST',
		data: account,
		interceptors: {
			requestSuccessFn(config) {
				console.log('接口请求拦截器')
				return config
			},
			responseSuccessFn(res) {
				console.log('接口响应拦截器')
				return res
			}
		}
	})
}
