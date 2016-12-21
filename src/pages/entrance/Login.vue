<style lang="less" module>
    @import '../../assets/less/const.less';
    @contentW: 350px;
    @item-height: 38px;
    @iconW: 40px;
   .item {
        position: relative;
        height: @item-height;
        margin-bottom: 10px;
   }
   .iconWrap {
       position: absolute;
       left: 0;
       top: 0;
       width: @iconW;
       height: @item-height;
       text-align: center;
       line-height:  @item-height;
   }
   .input {
        padding: 0 10px 0 @iconW;
        margin: 0;
        width: 100%;
        height: @item-height;
        color: @font-color-7;
        background-color: @bg-color-4;
        transition: border .3s, background-color .3s;
        border-radius: 4px;
        border: 1px solid @line-color-3;
        &:focus{
            background-color: #fff;
            border-color: @theme-color;
        }
   }
   .btnSubmit{
       padding-top: 10px;
       padding-bottom: 10px;
   }
 
</style>
<template>  
    <form :class="$style.content" @submit.prevent="login">
        <div :class="$style.item">
            <span :class="$style.iconWrap">
                <y-icon name="mail" size="10" color="#999"></y-icon>
            </span>
            <input :class="$style.input" type="tel" maxlength="30" v-model="user.account" placeholder="邮箱">
        </div>
        <div :class="$style.item">
            <span :class="$style.iconWrap">
                <y-icon name="password" size="10" color="#999"></y-icon>
            </span>
            <input :class="$style.input" type="password" maxlength="30" v-model="user.password" placeholder="密码">
        </div>
        <div>
            <y-button :class="$style.btnSubmit" type="submit" :block="true" :disabled="false">{{ isLoading ?  '正在登录...' : '登录'}}</y-button>
        </div>
    </form>
</template>
<script>
    import { mapGetters } from 'vuex';
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
        computed: {
            ...mapGetters({
                isLoading:'loginLoading'
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