<style lang="less" module>
    @import '../../assets/less/const.less';
    .entrance{
        position: fixed;
        top: 15px;
        right: 20px;
    }
    .login{
        margin-right: 5px;
    }
    .menu{
        @borderW:5px;
        position: relative;
        margin-top: 10px;
        margin-left: -10px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
        &::after{
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -@borderW;
            border: @borderW solid transparent;
            border-bottom-color: #ccc;
        }
    }
    .menuItem{
        height: 28px;
        line-height: 28px;
        transition: margin .3s;
        &:hover{
            margin-left: -10px;
        } 
    }
    .avatar{
        display: inline-block;
        margin-right: 5px;
        border-radius: 50%;
    }
    .username{
        display: inline-block;
        max-width: 68px;
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
                <template v-if="userInfo.avatar_hd">
                    <img :class="$style.avatar" v-bind:src="userInfo.avatar_hd" alt="" width="25" height="25">
                </template>
                <template v-else>
                     <y-icon name="user"></y-icon>
                </template>
                <span :class="[$style.username,'one-line']">{{ userInfo.username }}</span> 
                <y-icon name="down"></y-icon>
            </span>
            <transition name="fade">
                 <div :class="[$style.menu,'text-center']" v-show="menu" @mouseover="showMenu" @mouseleave="hideMenu">
                    <ul>
                        <li :class="[$style.menuItem,'link']">
                            <y-icon name="data"></y-icon>
                            <router-link to="/app/user">个人资料</router-link>
                        </li>
                        <li :class="[$style.menuItem,'link']">
                            <y-icon name="note"></y-icon>
                            <router-link to="/app/notes">笔记管理</router-link>
                        </li>
                        <li :class="[$style.menuItem,'link']">
                            <y-icon name="setting"></y-icon>
                            <router-link to="/app/setting">账号设置</router-link>
                        </li>
                        <li :class="[$style.menuItem,'link']">
                            <y-icon name="loginout"></y-icon>
                            <a href="javascript:;" @click.stop="loginout">退出登录</a>
                        </li>
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
            loginout(){
                this.$emit('loginout');
            },
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
                return this.userInfo.username;
            }
        }
    }
</script>