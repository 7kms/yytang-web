<template>  
    <div>
        <div>
            <input type="tel" name="mobil" v-model="user.mobile">
        </div>
        <div>
            <input type="password" name="mobil" v-model="user.pwd">
        </div>
        <div>
            <button type="button" @click="login(user)"></button>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                user:{}
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