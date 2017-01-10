<style lang='less' module>
    @import '../../assets/less/const.less';
    .header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: 64px;
        min-width: 760px;
        color: #fff;
        background-color: @theme-color;
    }
    .headerList{
         height: 64px;
         overflow: hidden;
    }
    .item{
        line-height: 64px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
    }
    .logo{
        font-size: 2.2rem;
    }
    .user{
        margin-top: 17px;
        margin-right: 30px;
    }
    .content{
        width: 65%;
        min-width: 600px;
        margin-left: 150px;
        margin-top: 75px;
    }
</style>
<template>
    <div>
        <header :class="$style.header">
            <div class="container clearfix">
                <ul :class="[$style.title,$style.headerList,'pull-left']">
                    <router-link :class="[$style.item,'link']" tag="li" to="/">
                        <img :class="[$style.logo,'inline-block']" src="../../assets/images/logo-white-144.png" width="25" height="25" alt="" title="弹枪">
                        <span :class="[$style.logo,'inline-block']">弹枪</span>
                    </router-link>
                    <li :class="$style.item"><span class="inline-block">悄悄的,打鸟的不要</span></li>
                </ul>
                <User :class="[$style.user,'pull-right']" :userInfo="accountInfo"></User>
            </div>
        </header>
        <div class="wrap">
            <yAside :isLogin="isLogin"></yAside>
            <div :class="[$style.content,'pull-left']">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import yAside from './aside.vue';
    import User from './user.vue';
    import $api from 'api';
    export default {
        components:{
            yAside,
            User,
        },
        methods:{
            getUserInfo(){
                $api.get('/user/info')
                .then(resData=>{
                    this.$store.dispatch('setAccountInfo',resData);
                },resErr=>{
                    console.log(resErr);
                })
            }
        },
        computed:{
            ...mapGetters(['accountInfo']),
            isLogin(){
               const {username = ''} = this.accountInfo;
               return username.length > 0;
            }
        },
        created(){
            this.getUserInfo();
        }
    }
</script>
