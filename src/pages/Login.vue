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
    <div :class="$style.content">
        <div :class="$style.item">
            <input :class="$style.input" type="tel" name="mobil" v-model="user.account">
        </div>
        <div :class="$style.item">
            <input :class="$style.input" type="password" name="mobil" v-model="user.password">
        </div>
        <div :class="$style.item">
            <y-button @click="login" :block="true" :disabled="false">{{ isLoading ?  'loading' : '登录'}}</y-button>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters } from 'vuex';
    import yButton from '../components/button'
    export default {
        data() {
            return {
                user:{
                    account: 'example@163.com',
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
                this.$store.dispatch('login',this.user)
                .then(res=>{
                    this.$router.replace(this.$route.query.redirect || '/')
                },res=>{
                    this.$store.dispatch('toast','登录失败')
                })
            }
        }
    }
</script>