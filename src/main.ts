import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import wffRequest from './service'

interface DataType {
    data: any
    returnCode: string
    success: boolean
}

wffRequest
    .request<DataType>({
        url: '/home/multidata',
        method: 'GET',
        showLoading: false,
        interceptors: {
            requestInterceptor: (config) => {
                console.log('这是实例单独的拦截器')
                return config
            }
        }
    })
    .then((res) => {
        console.log(res.data)
        console.log(res.returnCode)
        console.log(res.success)
    })

createApp(App).use(store).use(router).mount('#app')
