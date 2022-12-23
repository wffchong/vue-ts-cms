import axios, { AxiosResponse } from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import type { HttpRequestConfig } from '../interface'

class HttpRequest {
	instance: AxiosInstance
	constructor(config: HttpRequestConfig) {
		this.instance = axios.create(config)

		// 为每个实例都添加拦截器，也就是全局拦截器
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				console.log('全局请求拦截器')
				return config
			},
			error => {
				console.log(error)
			}
		)

		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				console.log('全局响应拦截器')
				return res.data
			},
			error => {
				console.log(error)
			}
		)

		// 针对实例处理拦截器
		this.instance.interceptors.request.use(
			config.interceptors?.requestSuccessFn,
			config.interceptors?.requestFailureFn
		)

		this.instance.interceptors.response.use(
			config.interceptors?.responseSuccessFn,
			config.interceptors?.responseFailureFn
		)
	}

	request<T = any>(config: HttpRequestConfig<T>) {
		// 对接口的请求拦截
		if (config.interceptors?.requestSuccessFn) {
			config = config.interceptors.requestSuccessFn(config)
		}

		return new Promise<T>((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then(res => {
					// 对接口的响应拦截处理
					if (config.interceptors?.responseSuccessFn) {
						res = config.interceptors.responseSuccessFn(res)
					}
					resolve(res)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	get<T = any>(config: HttpRequestConfig<T>) {
		return this.request<T>({ ...config, method: 'GET' })
	}
	post<T = any>(config: HttpRequestConfig<T>) {
		return this.request<T>({ ...config, method: 'POST' })
	}
	delete<T = any>(config: HttpRequestConfig<T>) {
		return this.request<T>({ ...config, method: 'DELETE' })
	}
	patch<T = any>(config: HttpRequestConfig<T>) {
		return this.request<T>({ ...config, method: 'PATCH' })
	}
}

export default HttpRequest
