import 'babel-polyfill';
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.config'
import store from './store'
import normalCss from 'normalize.css'
import globalStyle from './assets/less/basic.less'
import App from './app.vue'
import components from './components'
Vue.use(VueRouter)
Vue.use(components)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
