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


    .timelineNav{
        padding: 0 10px;
    }
    .title,
    .category{
        height: 30px;
        line-height: 30px;
    }
    .title{
        font-weight: 700;
        font-size: @font-16;
        &.active{
            & + .categoryList{
                display: block;
            }
        }
    }
    .categoryList{
        display: none;
        padding: 0 10px;
        .category{
            &.on{
                font-weight: bold;
                color: @hint-color;
            }
        }
    }
</style>
<template>
    <div :class="$style.aside">
        <template v-if="isLogin">
             <ul>
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
        </template>
        <template v-else>
            <ul :class="$style.timelineNav">
                <li :class="[$style.timeline]" v-for="nav of navList">
                    <div :class="[$style.title,'hover',{[$style.active]:nav.active}]">{{nav.title}}</div>
                    <ul :class="$style.categoryList">
                        <li :class="[$style.category,'hover',{[$style.on]:item.on}]" v-for="item in nav.list">{{item.label}}</li>
                    </ul>
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        props:{

        },
        data(){
            return{
                navList:[
                    {
                        title:'首页',
                        active: true,
                        list:[
                            {
                                label:'我关注的',
                                on: true
                            },
                            {
                                label:'Android'
                            },
                            {
                                label:'IOS'
                            },
                             {
                                label:'前端'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            navHighlight(navName){
                const { category = 'recommend' } = this.$route.params;
                return category == navName;
            },
            switchNav() {

            }
        },
        computed:{
            ...mapGetters(['userInfo']),
            isLogin(){
                return this.userInfo.username;
            }
        }
    }
</script>