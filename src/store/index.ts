import { createStore } from 'vuex'
import login from './login'

export default createStore({
    state: {
        name: 'wff'
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        login
    }
})
