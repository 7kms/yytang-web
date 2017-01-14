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
                <User :class="[$style.user,'pull-right']" :userInfo="userInfo"></User>
            </div>
        </header>
        <div class="wrap">
            <yAside :isLogin="isLogin" :navList="navList" :isInitialize="isInitialize"></yAside>
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
                var {objectId} = this.userInfo;
                if(!objectId){
                    this.$store.dispatch('user/GET_USERINFO')
                    .then(resData => {
                        if (resData.objectId) {
                            this.getSubscribeInfo();
                        } else {
                            this.$store.dispatch('user/SET_INITIAL_STATUS');
                            this.$router.push('/welcom');
                        }
                    }, resErr => {
                        console.log(resErr);
                        this.$store.dispatch('user/SET_INITIAL_STATUS');
                        this.$router.push('/welcom');
                    });                    
                }else{
                    this.getSubscribeInfo();
                }
            },
            getSubscribeInfo(){
                 this.$store.dispatch('user/GET_SUBSCRIBE')
                 .then(resData => {
                     this.$router.push('/timeline');
                 },resError => {
                     this.$router.push('/welcom');
                 });
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.isLogin){
                   vm.$router.push('/timeline')
                }
            })
        },
        computed:{
            ...mapGetters({
                userInfo: 'user/GET_USERINFO',
                navList: 'user/GET_ASIDENAV',
                isInitialize: 'user/GET_INITIAL_STATUS'
            }),
            isLogin(){
               const {objectId = ''} = this.userInfo;
               return objectId.length > 0;
            }
        },
        created(){
            console.log('index----created')
            this.getUserInfo();
        }
    }
</script>
