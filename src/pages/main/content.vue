<template>
    <div>
         <List :dataList="dataList" :loading="loading" @click="click" v-scroll="loadMore" scroll-distance="100" scroll-disabled="isDisabled"></List>
    </div>
</template>
<script>
    import List from './list.vue';
    import $api from 'api';
    export default {
        components:{
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
                $api.get('/public/juejin/discover',this.getParams(), {
                before: (request) => {
                         // abort previous request, if exists
                        if (this.previousRequest) {
                            this.previousRequest.abort();
                        }
                        // set previous request on Vue instance
                        this.previousRequest = request;
                    }
                }).then(dataInfo=>{
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
            },
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