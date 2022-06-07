import WFFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const wffRequest = new WFFRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            console.log('请求成功拦截器')
            return config
        },
        requestInterceptorCatch: (err) => {
            console.log('请求失败拦截器')
            return err
        },
        responseInterceptor: (config) => {
            console.log('响应请求成功拦截器')
            return config
        },
        responseInterceptorCatch: (err) => {
            console.log('响应请求失败拦截器')
            return err
        }
    }
})

export default wffRequest
