<style module>
    .entrance{
        position: fixed;
        top: 15px;
        right: 10px;
    }
    .login{
        margin-right: 5px;
    }
</style>
<template>
    <div :class="$style.entrance">
        <template v-if="!isLogin">
             <router-link  :class="[$style.login,'link']" to="/entrance/login"><y-icon name="login"></y-icon>登录</router-link>
             <router-link  class="link" to="/entrance/register"><y-icon name="register"></y-icon>注册</router-link>
        </template>
        <template v-else>
            <span>{{userInfo}} <y-icon name="bulb"></y-icon></span>
            <div :class="$style.menu">
                <ul>
                    <li class="link">个人资料</li>
                    <li class="link">笔记管理</li>
                    <li class="link">账号设置</li>
                    <li class="link">退出登录</li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        props:{
            userInfo: Object,
            isLogin: {
                type:Boolean,
                default: false
            }
        }
    }
</script>