<style lang="less" module>

</style>
<template>
    <div>
        <h3>精选</h3>
        <ul :class="$style.list"> 
            <item v-for="data in dataList" :key="data.hotIndex" :dataObj="data"></item>
        </ul>
    </div>
</template>
<script>
    import item from './item.vue';
    export default {
        props:{
            dataList: Array
        },
        components:{
            item
        },
        data(){
            return {}
        },
        methods:{
           
        },
        computed:{

        }
    }
</script>