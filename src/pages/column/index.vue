<style lang="less" module>
     @import '../../assets/less/const.less';
     .content{
        height: 100px;
        background-color: #00beff 
     }
     .header{
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 46px;
         padding: 0 20px;
         color: #777;
         background-color: #fff;
     }
</style>
<template>
    <div :class="$style.content">
        <div :class="$style.header">
            <div :class="$style.tabLeft">
                <span>热门</span>
                <span>最新</span>
                <span>评论</span>
            </div>
            <div :class="$style.tabRight">
                <span>本周最热</span>
                <span>本月最热</span>
                <span>历史最热</span>
            </div>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return {
                limit: 20,
                skip: 0
            }
        },
        computed: {
            ...mapGetters({
                subscribeInfo:'user/GET_SUBSCRIBE'
            })
        },
        methods: {
            getSubscribeArr(){
                var subscribeList = [];
               
                for(var {tag: {objectId, __type, className} } of this.subscribeInfo){
                    subscribeList.push({objectId,__type,className}) ;
                }
                return subscribeList;
            },
            composeParams(){
              return new Promise((resolve, reject) => {
                  this.$store.dispatch('user/GET_SUBSCRIBE')
                    .then( () => {
                        var { column , category } = this.$route.params;
                        var paramObj = {
                                include: 'user',
                                limit: this.limit,
                                skip: this.skip,
                                order: '-rankIndex'
                            };
                        var where = {};
                        if(column == 'timeline'){
                                if(!category){
                                    where['$or'] = [{'hot': true},{'tags':{'$in': this.getSubscribeArr()}}];
                                }else{
                                    where['category'] = category;
                                }
                        }
                        paramObj.where = JSON.stringify(where);
                        resolve(paramObj);
                    }, (error) => {
                        reject(error);
                    });
                });
            },
            search(){
               this.composeParams()
               .then(paramObj => {
                   return  $api.get('/public/column',paramObj)
               }).then(resData => {
                   console.log(resData)
               },resError => {
                   console.log(resError)
               });
            }
        },
        watch: {
            $route (to, from){
                console.log('route has changed')
                this.search();
            }
        },
        created(){
            console.log('column----created')
            this.search();
        }
    }
</script>