<style lang="less" module>
    @import '../../assets/less/const.less';
    .entryBox{
        background-color: #fff;
    }
    .boxTitle{
        height: 40px;
        margin: 0;
        padding: 0 20px;
        line-height: 40px;
        font-size: 1.6rem;
        color: @font-color-6;
        border-bottom: 1px solid #f1f1f1;
    }
    .list{
        padding: 10px;
    }
</style>
<template>
    <div :class="$style.entryBox">
        <h3 :class="$style.boxTitle">精选</h3>
        <template v-if="loading">
            <ul :class="$style.list" > 
               <li>数据正在拉取...</li>
            </ul>
        </template>
        <template v-else>
             <ul :class="$style.list" > 
                <item v-for="data in dataList" :key="data.hotIndex" :dataObj="data" @click="click"></item>
             </ul>
        </template>
    </div>
</template>
<script>
    import item from './item.vue';
    export default {
        props:{
            dataList: Array,
            loading: Boolean
        },
        components:{
            item
        },
        data(){
            return {}
        },
        methods:{
           click(dataObj){
               this.$emit('click',dataObj);
           }
        },
        computed:{

        }
    }
</script>