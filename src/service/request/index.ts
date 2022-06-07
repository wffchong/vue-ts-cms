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
    }

    request(config: AxiosRequestConfig) {
        this.instance.request(config).then((res) => {
            console.log(res)
        })
    }
}

export default WFFRequest
