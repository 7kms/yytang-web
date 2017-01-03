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
        width: 65%;
        min-width: 600px;
        margin-left: 150px;
        margin-top: 75px;
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
            <div :class="[$style.content,'pull-left']">
                <List :dataList="dataList" :loading="loading" @click="click" v-scroll="loadMore" scroll-distance="100" scroll-disabled="isDisabled"></List>
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
                noMore: false,
                loading: true,
                dataList: [],
                limit: 15,
                page: 0
            }
        },
        computed: {
            isDisabled(){
                return this.loading || this.noMore;
            }
        },
        methods:{
            getParams() {
                var paramObj = {
                    include: 'user',
                    limit: this.limit,
                    skip: this.page * this.limit,
                    order:'-hotIndex'
                };
                var whereObj = {"category":this.category,"createdAt":{"$gte":{"__type":"Date","iso":"2016-12-25T15:12:05.308Z"}}};
                paramObj.where = JSON.stringify(whereObj);
                return paramObj;
            },
            search(){
                this.loading = true;
                $api.get('/public/juejin/discover',this.getParams()).then(dataInfo=>{
                    this.page++;
                    this.dataList = [...this.dataList,...dataInfo.results];
                    if(dataInfo.results.length < this.limit){
                        this.noMore = true;
                    }
                },(err)=>{
                    console.log(err);
                }).then(()=>{
                    this.loading = false;
                });
            },
            loadMore() {
                this.search();
            },
            refresh(category) {
                this.page = 0;
                this.noMore = false;
                this.category = category == 'recommend' ? 'frontend' : category;
                this.dataList = [];
                this.search();
            },
            click(dataObj) {
                // console.log(dataObj.url)
                window.open(dataObj.url,'_blank');
            }
        },
        watch:{
            '$route' (to, from) {
                let {category='recommend'} = to.params;
                this.refresh(category);
            }
        },
        created(){
            let {category='recommend'} = this.$route.params;
            this.refresh(category);
        }
    }
</script>
