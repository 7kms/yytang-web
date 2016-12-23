<template>
    <div class="y-content">
        <Slide></Slide>
        <userLabel></userLabel>
        <router-view></router-view>
    </div>
</template>
<script>
    import Slide from './slide.vue';
    import userLabel from './userLabel.vue';
    export default {
        data(){
            return {

            }
        },
        components:{
            Slide,
            userLabel
        },
        methods: {

        }
    }
</script>