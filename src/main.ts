import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

// 登录持久化
store.dispatch('login/loadLocalLogin')

createApp(App).use(store).use(router).mount('#app')
