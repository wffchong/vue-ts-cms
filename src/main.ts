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

createApp(App).use(store).use(router).mount('#app')
