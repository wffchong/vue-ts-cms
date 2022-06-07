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

    request(config: WFFRequestConfig) {
        // 如果请求拦截器存在，则把config加工后的返回
        if (config.interceptors?.requestInterceptor) {
            // 在拦截器里面加工后的config返回
            config = config.interceptors.requestInterceptor(config)
        }

        this.instance.request(config).then((res) => {
            // 如果响应拦截器存在，就把res加工后返回
            if (config.interceptors?.responseInterceptor) {
                res = config.interceptors.responseInterceptor(res)
            }
            console.log(res)
        })
    }
}

export default WFFRequest
