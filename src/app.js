import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routers from './router.config'
console.log(routers)
Vue.use(VueRouter)
Vue.use(Vuex)
const router = new VueRouter({
  mode: 'history',
  routers
})
console.log(router)
new Vue({
  router
}).$mount('#app')
