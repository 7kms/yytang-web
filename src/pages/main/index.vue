<style lang="less" module>
    @import '../../assets/less/const.less';
</style>
<template>
    <div class="y-content">
        <y-slide></y-slide>
        <Recommend></Recommend>
    </div>
</template>
<script>
    import ySlide from './slide.vue';
    import yNav from './nav.vue';
    import Recommend from './recommend.vue';
    export default {
        data(){
            return {

            }
        },
        components:{
            ySlide,
            yNav,
            Recommend
        },
        methods: {

        }
    }
</script>