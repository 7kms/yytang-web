export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: resolve => require(['./pages/MainPage.vue'], resolve)
    },
    {
        path: '/entrance',
        component: resolve => require(['./pages/entrance/index.vue'], resolve),
        redirect: '/entrance/login',
        children: [
            // { path: '', component: resolve => require(['./pages/entrance/Login.vue'], resolve) },
            { path: 'login', component: resolve => require(['./pages/entrance/Login.vue'], resolve) },
            { path: 'register', component: resolve => require(['./pages/entrance/Register.vue'], resolve) },
            { path: '*', redirect: 'login' }
        ]
    },
     {
        path: '*',
        component: resolve => require(['./pages/404.vue'], resolve)
     }
]
