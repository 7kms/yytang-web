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
            <span class="hover" @mouseover="showMenu" @mouseleave="hideMenu">
                <y-icon name="user"></y-icon>
                <span>{{ userInfo.name }}</span> 
                <y-icon name="down"></y-icon>
            </span>
            <transition name="fade">
                 <div :class="$style.menu" v-show="menu" @mouseover="showMenu" @mouseleave="hideMenu">
                    <ul>
                        <li class="link">个人资料</li>
                        <li class="link">笔记管理</li>
                        <li class="link">账号设置</li>
                        <li class="link">退出登录</li>
                    </ul>
                </div>
            </transition>
        </template>
    </div>
</template>
<script>
    export default {
        props:{
            userInfo: Object
        },
        data (){
            return {
                menu: false
            }
        },
        methods: {
            hideMenu(){
                if(this.menuTimmer){
                    clearTimeout(this.menuTimmer);
                    this.menuTImmer = null;
                }
                this.menuTimmer = setTimeout(() => {
                    this.menu = false;
                    this.menuTimmer = null;
                },300);
            },
            showMenu(){
                if(this.menuTimmer){
                    clearTimeout(this.menuTimmer);
                    this.menuTImmer = null;
                }
                this.menu = true;
            }
        },
        computed:{
            isLogin(){
                return this.userInfo.id;
            }
        }
    }
</script>