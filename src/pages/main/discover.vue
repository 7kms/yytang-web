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
            <li :class="$style.item" v-for="item in list" :key="item.id">
                <div>{{item.text}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapGeters } from 'vuex';
    import $api from 'api';
    export default {
        created () {
            this.getDiscoverList(this.start,this.count);
        },
        data () {
            return {
                start: 0,
                count: 10,
                list: [{text:'你好'}]
            }
        },
        methods: {
            getDiscoverList(start,count){
                $api.get('/public/discover',{start,count})
                .then(resData => {
                    debugger
                    this.list = this.list.concat(resData)
                    // _this.$set(_this.list,'list')
                    
                }, resData => {
                    console.log(resData);
                })
            }
        }
    }
</script>