import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './routes.config'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
new Vue({
  router
}).$mount('#app')
