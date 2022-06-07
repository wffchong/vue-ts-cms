import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import wffRequest from './service'

wffRequest.request({
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

createApp(App).use(store).use(router).mount('#app')
