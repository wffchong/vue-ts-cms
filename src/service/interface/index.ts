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

// * 请求响应参数(不包含data)
export interface Result {
	code: string
	// msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T
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
	export interface ReqGetUserInfo {
		id: string
	}
	export interface Role {
		id: number
		name: string
		intro: string
		createAt: string
		updateAt: string
	}
	export interface Department {
		id: number
		name: string
		parentId: any
		createAt: string
		updateAt: string
		leader: string
	}
	export interface ResGetUserInfo {
		id: number
		name: string
		realname: string
		cellphone: number
		enable: number
		createAt: string
		updateAt: string
		role: Role
		department: Department
	}
	export interface ReqGetUserMenu {
		id: string
	}
	export interface UserMenu {
		id: number
		name: string
		type: number
		url: string
		icon: string
		sort: number
		createAt: string
		updateAt: string
		children: (UserMenu & { parentId: number })[]
	}
	export interface ResGetUserMenu {
		list: UserMenu[]
	}
	export type ResLoginType = ResultData<ResLogin>
	export type ResGetUserInfoType = ResultData<ResGetUserInfo>
	export type ResGetUserMenuByRoleIdType = ResultData<UserMenu[]>
	export type ResGetUserMenuType = ResultData<ResGetUserMenu>
}
