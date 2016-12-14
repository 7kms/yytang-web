import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.config'
import store from './store'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
new Vue({
  store,
  router
}).$mount('#app')
