import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// * 为实例添加拦截器
export interface HttpInterceptors<T = AxiosResponse> {
	requestSuccessFn: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestFailureFn: (error: any) => any
	responseSuccessFn: (res: T) => T
	responseFailureFn: (error: any) => any
}

// * 拓展 AxiosRequestConfig
export interface HttpRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: Partial<HttpInterceptors<T>>
}

// * 登录模块
export namespace Login {
	export interface ReqAccountLoginForm {
		name: string
		password: string
	}
	export interface ReqPhoneLoginForm {
		phone: string
		verifyCode: string
	}
	export interface ResLogin {
		id: number
		name: string
		token: string
	}
}
