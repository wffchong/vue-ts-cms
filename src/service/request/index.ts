import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WFFRequestConfig, WFFRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true
class WFFRequest {
    instance: AxiosInstance
    interceptors?: WFFRequestInterceptors
    showLoading: boolean
    loading?: LoadingInstance

    constructor(config: WFFRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors
        this.showLoading = config.showLoading ?? DEFAULT_LOADING

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
                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        lock: true,
                        text: '正在请求数据....',
                        background: 'rgba(0, 0, 0, 0.5)'
                    })
                }
                return config
            },
            (err) => {
                return err
            }
        )

        this.instance.interceptors.response.use(
            (res) => {
                // 将loading移除
                this.loading?.close()
                const data = res.data
                if (data.returnCode === '-1001') {
                    console.log('请求失败~, 错误信息')
                } else {
                    return data
                }
                return res.data
            },
            (err) => {
                // 将loading移除
                this.loading?.close()
                console.log(123)
                // 例子: 判断不同的HttpErrorCode显示不同的错误信息
                if (err.response.status === '404') {
                    console.log('404的错误')
                }
                return err
            }
        )
    }

    request<T>(config: WFFRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 如果请求拦截器存在，则把config加工后的返回
            if (config.interceptors?.requestInterceptor) {
                // 在拦截器里面加工后的config返回
                config = config.interceptors.requestInterceptor(config)
            }
            // 2.判断是否需要显示loading
            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }

            this.instance.request<any, T>(config).then(
                (res) => {
                    // 每次请求完了都把他设为true，不然会影响下一次请求
                    this.showLoading = DEFAULT_LOADING

                    // 如果响应拦截器存在，就把res加工后返回
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    resolve(res)
                },
                (err) => {
                    // 每次请求完了都把他设为true，不然会影响下一次请求
                    this.showLoading = DEFAULT_LOADING
                    reject(err)
                    return err
                }
            )
        })
    }

    get<T>(config: WFFRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T>(config: WFFRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T>(config: WFFRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    patch<T>(config: WFFRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }
}

export default WFFRequest
