import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { WFFRequestConfig, WFFRequestInterceptors } from './type'

class WFFRequest {
    instance: AxiosInstance
    interceptors?: WFFRequestInterceptors

    constructor(config: WFFRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors

        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )

        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 添加所有实例都有的拦截器
        this.instance.interceptors.request.use(
            (config) => {
                console.log('所有实例都有的请求成功拦截器')
                return config
            },
            (err) => {
                console.log('所有实例都有的请求失败拦截器')
                return err
            }
        )

        this.instance.interceptors.response.use(
            (config) => {
                console.log('所有实例都有的响应成功拦截器')
                return config
            },
            (err) => {
                console.log('所有实例都有的响应失败拦截器')
                return err
            }
        )
    }

    request(config: AxiosRequestConfig) {
        this.instance.request(config).then((res) => {
            console.log(res)
        })
    }
}

export default WFFRequest
