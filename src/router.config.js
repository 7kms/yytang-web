export default [
    {
        path: '/',
        component: resolve => require(['./pages/MainPage.vue'], resolve)
    },
    {
        path: '/login',
        component: resolve => require(['./pages/Login.vue'], resolve)
     }
]
