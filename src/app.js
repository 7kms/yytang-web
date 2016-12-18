require('normalize.css')
import 'babel-polyfill';
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.config'
import store from './store'
import globalStyle from './assets/less/common.less'
import App from './app.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
