<style lang="less" module>
    @import '../../assets/less/const.less';
    .aside{
        position: fixed;
        top: 64px;
        bottom: 0;
        width: 140px;
        color:#fff;
        background-color: @theme-color;
    }
    .item{
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
         &.on{
            font-weight: 700;
            color: @hint-color;
            background-color: #fff;
        }
    }
    .itemLabel{
        margin-left:10px; 
    }
</style>
<template>
    <div :class="$style.aside">
        <ul :class="$style.list">
            <router-link tag="li" to="/welcom" :class="[$style.item,'link',{[$style.on]:navHighlight('recommend')}]">
                <y-icon name="bulb"></y-icon><span :class="[$style.itemLabel,'inline-block']">推荐</span>
            </router-link>
            <router-link tag="li" to="/welcom/android" :class="[$style.item,'link',{[$style.on]:navHighlight('android')}]">
                <y-icon name="android"></y-icon><span :class="[$style.itemLabel,'inline-block']">Android</span>
            </router-link>
            <router-link tag="li" to="/welcom/frontend" :class="[$style.item,'link',{[$style.on]:navHighlight('frontend')}]">
                <y-icon name="front"></y-icon><span :class="[$style.itemLabel,'inline-block']">前端</span>
            </router-link>
            <router-link tag="li" to="/welcom/ios" :class="[$style.item,'link',{[$style.on]:navHighlight('ios')}]">
                <y-icon name="ios"></y-icon><span :class="[$style.itemLabel,'inline-block']">IOS</span>
            </router-link>
            <router-link tag="li" to="/welcom/backend" :class="[$style.item,'link',{[$style.on]:navHighlight('backend')}]">
                <y-icon name="database"></y-icon><span :class="[$style.itemLabel,'inline-block']">后端</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default {
        methods:{
            navHighlight(navName){
                const { category = 'recommend' } = this.$route.params;
                return category == navName;
            }
        }
    }
</script>