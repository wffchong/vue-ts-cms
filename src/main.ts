import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './service/axios_demo'
import wffRequest from './service'

wffRequest.request({
    url: '/home/multidata',
    method: 'GET'
})

wffRequest.request({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
        requestInterceptor: (config) => {
            console.log('这是实例单独的拦截器')
            return config
        }
    }
})

createApp(App).use(store).use(router).mount('#app')
