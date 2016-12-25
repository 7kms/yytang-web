<style lang="less" module>
    @import '../../assets/less/const.less';
    .nav{
        position: fixed;
        left: 0;
        top: 0;
        width: @slideW;
        height: 100%;
        z-index: 1049;
        color: @font-color-9;
        background-color: @bg-color-1;
        -webkit-backface-visibility: hidden;
    }
    .label {
        display: block;
        width: @slideW;
        height: @slideW;
        line-height: @slideW;
        font-size: 20px;
        cursor: pointer;
        transition: all .3s;
        &.on,&:hover{
            color:#fff;
            background-color: @hint-color;
        }
        &.on{
            opacity: .8;
            filter: alpha(opacity=80);
        }
        &:hover{
            opacity: 1;
            filter: alpha(opacity=100);
        }
    }
    .logo{
        background: url('../../assets/images/logo-white-144.png') no-repeat center;
        background-size: 24px 24px;
        opacity: .8;
        filter: alpha(opacity=80);
        &.on,&:hover{
            background-image: url('../../assets/images/logo-48.png');
            opacity: 1;
            filter: alpha(opacity=100);
            background-color: #fff;
        }
    }
</style>
<template>
    <div :class="[$style.nav,'text-center']">
        <router-link  v-toolTip.right="'主页'" :class="[$style.label,$style.logo,{[$style.on]:isMainPage}]" to="/app"></router-link>
        <div :class="[$style.label]" v-toolTip.right="'目录'">
            <y-icon name="mulu"></y-icon>
        </div>
         <div :class="[$style.label]" v-toolTip.right="'下载app'">
            <y-icon name="mobile"></y-icon>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            isMainPage(){
                return this.$router.path = '/app';
            }
        },
        methods: {

        }
    }
</script>