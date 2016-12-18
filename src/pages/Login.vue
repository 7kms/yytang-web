<style lang="less" module>
   
</style>
<template>  
    <div>
        <div>
            <input type="tel" name="mobil" v-model="user.account">
        </div>
        <div>
            <input type="password" name="mobil" v-model="user.password">
        </div>
        <div>
            <button type="button" @click="login">{{ isLoading ?  'loading' : '登录'}}</button>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                user:{
                    account: 'example@163.com',
                    password: '111111'
                }
            }
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