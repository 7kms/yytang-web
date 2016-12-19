<style lang="less" module>
   .content{
       width: 350px;
       margin: 150px auto;
       & > div{
          height: 38px;
          margin-bottom: 10px;
          input{
              padding: 0 10px;
              margin: 0;
              width: 100%;
              height: 36px;
              color:#777;
              border: 1px solid #ddd;
              border-radius: 4px;
              transition: border .3s;
              &:focus{
                  border-color: #00beff;
              }
          } 
       }
   }
</style>
<template>  
    <div :class="$style.content">
        <div>
            <input type="tel" name="mobil" v-model="user.account">
        </div>
        <div>
            <input type="password" name="mobil" v-model="user.password">
        </div>
        <div>
            <YYTButton @click="login" :block="true" :disabled="false">{{ isLoading ?  'loading' : '登录'}}</YYTButton>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters } from 'vuex';
    import YYTButton from '../components/button'
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
            YYTButton
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