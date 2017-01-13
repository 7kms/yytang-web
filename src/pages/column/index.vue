<style lang="less" module>
     @import '../../assets/less/const.less';
</style>
<template>
    <div>{{test}}</div>
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
            }),
            test(){
                return this.$route.params
            }
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
                var { column , category } = this.$route.params;
                var paramObj = {
                    include: 'user',
                    limit: this.limit,
                    skip: this.skip,
                    order: '-rankIndex'
                }
                var where = {};
                if(column == 'timeline'){
                    if(!category){
                        where["$or"] = [{"hot": true},{"tags":{"$in": this.getSubscribeArr()}}];
                    }
                }
                paramObj.where = JSON.stringify(where); 
                return paramObj;
            },
            search(){
               var paramObj = this.composeParams();
               $api.get('/public/column',paramObj)
               .then(resData=>{
                   console.log(resData)
               },resError=>{
                   console.log(resError)
               })
               console.log(paramObj)
            }
        },
        watch: {
            $route (to, from){
                this.search();
            }
        },
        created(){
            // this.search();
        }
    }
</script>