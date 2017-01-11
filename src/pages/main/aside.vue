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
                let navArr = [
                        {title: '首页', path:'/timeline'},
                        {title: '专栏', path:'/special'},
                        {title: '收藏集', path:'/collection'},
                        {title: '发现', path:'/discover'}
                    ];
                let categoryArr = [
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
                            label:'工具资源',
                            category: 'tool'
                        },
                        {
                            label:'阅读',
                            category: 'read'
                        }
                ];
                let subNavObj = {
                    title: '首页',
                    active: true,
                    list:[]
                };
                navArr.map((nav,index) => {
                    var obj = {};
                    obj.title = nav.title;
                    obj.active = false;
                    obj.list = [];
                    if(nav.title == '首页'){
                        obj.list.push({
                            label: '我关注的',
                            path: `${nav.path}`
                        });
                        subscribeArr.map(sub => {
                            if(sub.tag.showOnNav){
                               obj.list.push({
                                   label: sub.tag.title,
                                   category: sub.tag.alias.split(/\s+/)[0],
                                   path: `${nav.path}/${sub.tag.alias.split(/\s+/)[0]}`
                               });
                            }
                        });
                    }else if(nav.title == '专栏' || nav.title == '发现'){
                        categoryArr.forEach((item,index) => {
                            if(index == 0){
                                obj.list.push({
                                    label: '全部',
                                    path: `${nav.path}`
                                });
                            }else{
                                obj.list.push(Object.assign({path:`${nav.path}/${item.category}`},item));
                            }
                        });
                    }else if(nav.title == '收藏集'){
                        obj.list.push({
                            label: '全部',
                            path: `${nav.path}`
                        });
                        obj.list.push({
                            label: '编辑推荐',
                            path: `${nav.path}/recommend`
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
                this.changeRoute(nav.list[0]);
            },
            switchItem(nav,item) {
                nav.list.forEach(obj => {
                    if(obj == item){
                        this.$set(obj,'on',true);
                    }else{
                        this.$set(obj,'on',false);
                    }
                });
                this.changeRoute(item);
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
                    this.changeRoute(this.navList[0].list[0]);
                },resError => {
                    console.log(resError);
                });
            },
            changeRoute(item){
                this.$router.push(item.path);
            }
        },
        watch:{
            isLogin(newValue){
                if(newValue){
                    this.getSubscribInfo();
                }
            }
        },
        created(){
            if(this.isLogin){
                this.getSubscribInfo();
            }
        }
    }
</script>