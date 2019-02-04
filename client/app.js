import "@babel/polyfill"
import "typeface-staatliches"
import "typeface-cantarell"
import "./master.css"
import "vue-material-design-icons/styles.css"
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import store from "./store"
import App from "./components/App"
import VueMoment from "vue-moment"
import * as vClickOutside from "v-click-outside-x"

Vue.use(vClickOutside)
Vue.use(VueRouter)
Vue.use(VueMoment)

const router = new VueRouter({
    mode: "history",
    routes
})

App.store = store
App.router = router

new Vue(App).$mount("#appMountPoint")
