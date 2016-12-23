import 'babel-polyfill';
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import normalCss from 'normalize.css'
import globalStyle from './assets/less/basic.less'
import App from './app.vue'
import components from './components'
sync(store, router)
Vue.use(components)
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
