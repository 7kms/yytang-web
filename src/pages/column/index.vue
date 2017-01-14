<style lang="less" module>
     @import '../../assets/less/const.less';
     .content{
         
     }
</style>
<template>
    <div :class="$style.content"></div>
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