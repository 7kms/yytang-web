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

    .title,
    .category{
        height: 30px;
        line-height: 30px;
    }
    .title{
        padding-left: 20px;
        font-weight: 700;
        font-size: @font-16;
    }
    .category{
        padding-left: 40px;
    }
    .categoryList{
        overflow: hidden;
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
            <li :class="[$style.timeline]" v-for="(nav,index) of navList" :key="index">
                <div :class="[$style.title,'hover']" @click="switchNav(nav)">{{nav.title}}</div>
                <transition name="slide">
                    <ul :class="$style.categoryList" v-show="nav.active" :style="{height: (nav.list.length * 30 + 'px')}">
                        <li :class="[$style.category,'hover',{[$style.on]:item.on}]" v-for="(item,index) in nav.list" @click="switchItem(nav,item)" :key="index">{{item.label}}</li>                            
                    </ul>
               </transition>
            </li>
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
                                label:'我关注的'
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
                    },
                    {
                        title:'专栏',
                        active: false,
                        list:[
                            {
                                label:'全部'
                            },
                            {
                                label:'Android'
                            },
                            {
                                label:'前端'
                            },
                            {
                                label:'IOS'
                            },
                            {
                                label:'后端'
                            },
                            {
                                label:'设计'
                            },
                            {
                                label:'产品'
                            },
                            {
                                label:'工具资源'
                            },
                            {
                                label:'阅读'
                            }
                        ]
                    },
                    {
                        title:'收藏集',
                        list:[
                            {
                                label:'编辑推荐'
                            },
                            {
                                label:'全部'
                            }
                        ]
                    },
                    {
                        title:'发现',
                        active: false,
                        list:[
                            {
                                label:'全部'
                            },
                            {
                                label:'Android'
                            },
                            {
                                label:'前端'
                            },
                            {
                                label:'IOS'
                            },
                            {
                                label:'后端'
                            },
                            {
                                label:'设计'
                            },
                            {
                                label:'产品'
                            },
                            {
                                label:'工具资源'
                            },
                            {
                                label:'阅读'
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
            switchNav(nav) {
                this.navList.map((obj) => {
                    if(obj == nav){
                        obj.active = true;
                        obj.list.map((item,index)=>{
                            if(index == 0){
                                this.$set(item,'on',true);
                            }else {
                                this.$set(item,'on',false);
                            }
                            return item;
                        })
                    }else{
                        obj.active = false;
                    }
                    return obj;
                });
            },
            switchItem(nav,item) {
                nav.list.forEach(obj => {
                    if(obj == item){
                        this.$set(obj,'on',true);
                    }else{
                        this.$set(obj,'on',false);
                    }
                })
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