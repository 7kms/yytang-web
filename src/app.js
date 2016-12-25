import 'babel-polyfill';
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import normalCss from 'normalize.css'
import globalStyle from './assets/less/basic.less'
import App from './app.vue'
import components from './components'
import directives from './directives'
sync(store, router)
Vue.use(components)
Vue.use(directives)
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
