import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import icons from '@/global/registerIcons'
import router from '@/router'
import App from './App.vue'

const app = createApp(App)
app.use(icons)
app.use(router)

app.mount('#app')
