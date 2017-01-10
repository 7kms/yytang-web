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
        <template v-if="!isLogin">
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
    import $api from 'api';
    let labelArr = ['Android','前端','IOS','设计','产品','工具资源','阅读'];
    export default {
        props:{
            isLogin:{
                type: Boolean,
                default: false
            } 
        },
        data(){
            return{
                navList:[]
            }
        },
        methods:{
            generateNav(subscribeArr){
                let navArr = ['首页','专栏','收藏集','发现'];
                let categoryArr = [
                            {
                                label:'全部'
                            },
                            {
                                label:'Android',
                                category: 'android'
                            },
                            {
                                label:'前端',
                                category: 'frontend'
                            },
                            {
                                label:'IOS',
                                category: 'ios'
                            },
                            {
                                label:'后端',
                                category: 'backend'
                            },
                            {
                                label:'设计',
                                category: 'frontend'
                            },
                            {
                                label:'产品',
                                category: 'frontend'
                            },
                            {
                                label:'工具资源',
                                category: 'frontend'
                            },
                            {
                                label:'阅读',
                                category: 'frontend'
                            }
                        ];
                let subNavObj = {
                    title: '首页',
                    active: true,
                    list:[]
                };
                navArr.map((nav,index) => {
                    var obj = {};
                    obj.title = nav;
                    obj.active = index == 0 ? true : false;
                    obj.list = [];
                    if(nav == '首页'){
                        subscribeArr.map(sub => {
                            if(sub.tag.showOnNav){
                               obj.list.push({
                                   label: sub.tag.title,
                                   category: sub.tag.alias.split(/\s+/)[0]
                               });
                            }
                        })
                    }else if(nav == '专栏' || nav == '发现'){
                        categoryArr.forEach((item) => {
                            obj.list.push(Object.assign({},item));
                        })
                    }else if(nav == '收藏集'){
                        obj.list.push({
                            label: '全部'
                        });
                        obj.list.push({
                            label: '编辑推荐'
                        });
                    }
                    this.navList.push(obj);
                });
            },
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
            },
            getSubscribInfo(){
                const id = this.$store.state.account.accountInfo.objectId;
                var whereObj = {"user":{"__type":"Pointer","className":"_User","objectId": id}};
                $api.get('/user/subscribe',{
                    where: JSON.stringify(whereObj),
                    include: 'tag',
                    limit: 100,
                    order: 'createdAt'
                }).then(resData => {
                    this.generateNav(resData.results);
                },resError => {
                    console.log(resError);
                });
            }
        },
        watch:{
            isLogin(newValue){
                if(newValue){
                     this.getSubscribInfo();
                }
            }
        },
        computed:{
            
        },
        created(){
        },
        destroyed(){
            console.log('destory');
        }
    }
</script>