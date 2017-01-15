<style lang="less" module>
    @import '../../assets/less/const.less';
</style>
<template>
    <div class="itemBox">
        {{ dataObj.title }}
    </div>
</template>
<script>
    export default {
        props: {
            dataObj: Object
        }
    }
</script>