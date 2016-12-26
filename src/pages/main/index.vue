<template>
    <div class="y-content">
        <Slide></Slide>
        <userLabel :userInfo="userInfo" @loginout="loginout"></userLabel>
        <router-view></router-view>
    </div>
</template>
<script>
    import Slide from './slide.vue';
    import userLabel from './userLabel.vue';
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapGetters({
                userInfo:'accountInfo'
            })
        },
        components:{
            Slide,
            userLabel
        },
        methods: {
            loginout() {
                this.$store.dispatch('loginout')
                .then(resData => {
                    this.$router.push('/entrance');
                },resData => {
                    this.$Toast.show({text:resData.msg});
                });
            }
        }
    }
</script>