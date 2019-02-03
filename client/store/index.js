import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            logged: !!localStorage.getItem('token'),
            data: localStorage.getItem('user')?
                JSON.parse(localStorage.getItem('user')) : {
                _id: "",
                username: "undefined",
                name: "Undefined",
                bio: "Undefined"
            }
        },
    },
    mutations: {
        setLogged(state, value) {
            state.user.logged = value
        },
        setUserData(state, value) {
            state.user.data = value
        }
    },
    actions: {
        login(context, args) {
            const {token, data} = args
            localStorage.setItem('user', JSON.stringify(data))
            localStorage.setItem('token', token)
            context.commit('setUserData', data)
            context.commit('setLogged', true)
        },
        logout(context) {
            context.commit('setLogged', false)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})

export default store