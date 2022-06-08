import localCache from '@/utils/localCache'
import WFFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const wffRequest = new WFFRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            // 携带token的拦截
            const token = localCache.getCache('token')
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (config) => {
            return config
        },
        responseInterceptorCatch: (err) => {
            return err
        }
    }
})

export default wffRequest
