import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	routes: [
        {
            path: '/',
            component: resolve => require(['./pages/main/index.vue'], resolve)
        },
        {
            path: '/welcom/:category?',
            component: resolve => require(['./pages/main/index.vue'], resolve)
        },
        {
            path: '/entrance',
            component: resolve => require(['./pages/entrance/index.vue'], resolve),
            redirect: '/entrance/login',
            children: [
                { path: 'login', component: resolve => require(['./pages/entrance/Login.vue'], resolve) },
                { path: 'register', component: resolve => require(['./pages/entrance/Register.vue'], resolve) },
                { path: '*', redirect: 'login' }
            ]
        },
        {
            path: '*',
            component: resolve => require(['./pages/error/404.vue'], resolve)
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
};
const router = new VueRouter(ROUTER_SETTING)

export default router;
