import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface WFFRequestInterceptors {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: any) => any
}

export interface WFFRequestConfig extends AxiosRequestConfig {
    interceptors?: WFFRequestInterceptors
    // showLoading?: boolean
}
