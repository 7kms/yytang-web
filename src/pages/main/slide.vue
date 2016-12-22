<style lang="less" module>
    @import '../../assets/less/const.less';
    @width: 45px;
    .nav{
        position: fixed;
        left: 0;
        top: 0;
        width: @width;
        height: 100%;
        z-index: 1049;
        color: @font-color-9;
        background-color: @bg-color-1;
        -webkit-backface-visibility: hidden;
    }
    .label {
        width: @width;
        height: @width;
        line-height: @width;
        font-size: 20px;
        cursor: pointer;
        &:hover{
            color:#fff;
            background-color: @hint-color;
        }
    }
    .logo{
        background: url('../../assets/images/logo-48.png') no-repeat center;
        background-size: contain;
        opacity: .8;
        filter: alpha(opacity=80);
        &:hover{
            opacity: 1;
            filter: alpha(opacity=100);
            background-color: transparent;
        }
    }
</style>
<template>
    <div :class="[$style.nav,'text-center']">
        <div :class="[$style.label,$style.logo]"></div>
        <div :class="[$style.label]">
            <y-icon name="bulb"></y-icon>
        </div>
         <div :class="[$style.label]">
            <y-icon name="bulb"></y-icon>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>