<template>  
    <div>
        <div>
            <input type="tel" name="mobil" v-model="user.account">
        </div>
        <div>
            <input type="password" name="mobil" v-model="user.password">
        </div>
        <div>
            <button type="button" @click="login(user)">{{ isLoading ?  'loading' : '登录'}}</button>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
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
        methods: mapActions(['login'])
    }
</script>
<style scoped>

</style>