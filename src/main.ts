import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from '@/global'
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App)

Object.keys(ElIcons).forEach((key) => {
    app.component(key, ElIcons[key as keyof typeof ElIcons])
})

app.use(globalRegister)

// 登录持久化
store.dispatch('login/loadLocalLogin')

app.use(store).use(router).mount('#app')
