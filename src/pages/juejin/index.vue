<style lang='less' module>
    @import '../../assets/less/const.less';
    .header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: 64px;
        color: #fff;
        background-color: @theme-color;
    }
    .headerList{
         height: 64px;
         overflow: hidden;
    }
    .item{
        line-height: 64px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
    }
    .logo{
        font-size: 2.2rem;
    }
    .user{
        margin-top: 17px;
        margin-right: 30px;
    }
    .content{
        margin-left: 140px;
        margin-top: 64px;
    }
</style>
<template>
    <div>
        <header :class="$style.header">
            <div class="container clearfix">
                <ul :class="[$style.title,$style.headerList,'pull-left']">
                    <router-link :class="[$style.item,'link']" tag="li" to="/">
                        <img :class="[$style.logo,'inline-block']" src="../../assets/images/logo-white-144.png" width="25" height="25" alt="" title="弹枪">
                        <span :class="[$style.logo,'inline-block']">弹枪</span>
                    </router-link>
                    <li :class="$style.item"><span class="inline-block">悄悄的,打鸟的不要</span></li>
                </ul>
                <User :class="[$style.user,'pull-right']"></User>
            </div>
        </header>
        <div class="wrap">
            <yAside></yAside>
            <div :class="$style.content">
                <List :dataList="dataList"></List>
            </div>
        </div>
    </div>
</template>
<script>
    import yAside from './aside.vue';
    import User from './user.vue';
    import List from './list.vue';
    import $api from 'api';
    export default {
        components:{
            yAside,
            User,
            List
        },
        data(){
            return {
                dataList: []
            }
        },
        methods:{
            search(category){
                var paramObj = {"category":"android","createdAt":{"$gte":{"__type":"Date","iso":"2016-12-25T15:12:05.308Z"}}};
                $api.get('/public/juejin/discover',{
                    where: JSON.stringify(paramObj),
                    include:'user',
                    order:'-hotIndex'
                }).then(dataInfo=>{
                    this.dataList = this.dataList.concat(dataInfo.results);
                },(err)=>{
                    console.log(err);
                });
            },
        },
        watch:{
            '$route' (to, from) {
                const {category='recommend'} = to.params;
                this.search(category);
            }
        },
        created(){
            const {category='recommend'} = this.$route.params;
            this.search(category);
        }
    }
</script>
