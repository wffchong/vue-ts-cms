import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface WFFRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (error: any) => any
}

export interface WFFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: WFFRequestInterceptors<T>
    showLoading?: boolean
}
