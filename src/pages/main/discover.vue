<style lang="less" module>
    .list{
        padding: 0 10px;
    }
    .item{
        border-bottom: 1px solid #ddd;
    }
</style>
<template>
    <div>
        <ul :class="$style.list">
            <li :class="$style.item" v-for="item in list" :key="item.id" @click="goOriginal(item)">
                <h3>{{item.title}}</h3>
                <div>{{item.content}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapGeters } from 'vuex';
    import $api from 'api';
    export default {
        created () {
            this.getDiscoverList(this.skip,this.limit);
        },
        data () {
            return {
                skip: 0,
                limit: 10,
                list: []
            }
        },
        methods: {
            goOriginal(item){
                window.open(item.originalUrl,'_blank');
            },
            getDiscoverList(skip,limit){
                $api.get('/public/juejin/discover',{skip,limit})
                .then(resData => {
                    console.log(resData)
                    this.list = this.list.concat(resData.results)
                    // _this.$set(_this.list,'list')
                    
                }, resData => {
                    console.log(resData);
                })
            }
        }
    }
</script>