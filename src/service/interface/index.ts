import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// * 为实例添加拦截器
export interface HttpInterceptors {
	requestSuccessFn: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestFailureFn: (error: any) => any
	responseSuccessFn: (res: AxiosResponse) => AxiosResponse
	responseFailureFn: (error: any) => any
}

// * 拓展 AxiosRequestConfig
export interface HttpRequestConfig extends AxiosRequestConfig {
	interceptors?: Partial<HttpInterceptors>
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
