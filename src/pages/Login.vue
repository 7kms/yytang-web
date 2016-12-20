<style lang="less" module>
    @import '../assets/less/const.less';
    @item-height: 38px;
   .content{
       width: 350px;
       margin: 150px auto;
   }
   .item {
        height: @item-height;
        margin-bottom: 10px;
   }
   .input {
        padding: 0 10px;
        margin: 0;
        width: 100%;
        height: @item-height;
        color: @font-color-7;
        border: 1px solid @line-color-1;
        border-radius: 4px;
        transition: border .3s;
        &:focus{
            border-color: @theme-color;
        }
   }
</style>
<template>  
    <form :class="$style.content" @submit.prevent="login">
        <div :class="$style.item">
            <input :class="$style.input" type="tel" name="mobil" v-model="user.account">
        </div>
        <div :class="$style.item">
            <input :class="$style.input" type="password" name="mobil" v-model="user.password">
        </div>
        <div :class="$style.item">
            <y-button type="submit" :block="true" :disabled="false">{{ isLoading ?  '正在登录...' : '登录'}}</y-button>
        </div>
    </form>
    
</template>
<script>
    import { mapGetters } from 'vuex';
    import yButton from '../components/button'
    export default {
        data() {
            return {
                count:1,
                user:{
                    account: 'example@16.com',
                    password: '111111'
                }
            }
        },
        components:{
            yButton
        },
        computed: {
            ...mapGetters({
                isLoading:'isLoading'
            })
        },
        methods: {
            login(){
                // this.$Toast.show({text: `${this.count++}登录成功` , duration: 2000});
                this.$store.dispatch('login',this.user)
                .then(res=>{
                    this.$router.replace(this.$route.query.redirect || '/')
                },res=>{
                    console.log(res);
                    this.$Toast.show({text: res.msg , duration: 3000});
                })
            }
        }
    }
</script>