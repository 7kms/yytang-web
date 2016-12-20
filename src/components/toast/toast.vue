<style lang="less" module>
     @import '../../assets/less/const.less';
    .content{
        position: absolute;
        display: table;
        width: 160px;
        height: 60px;
        top: 50%;
        left: 50%;
        margin: -80px -30px 0 0;
        background-color: rgba(0,0,0,.6);
    }
    .message{
        display: table-cell;
        color: #fff;
        font-size: @font-14;
        vertical-align: middle;
    }
</style>
<template>
    <div class="y-mask text-center">
        <div :class="$style.content">
            <div :class="$style.message"><slot></slot></div>
        </div>
    </div>
</template>
