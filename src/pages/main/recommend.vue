<style lang="less" moudle>
    .recommend {
        margin-left: 45px;
    }
    .poster {
        width: 25%;
        height: 100%;
        background-position: center;
    }
    .article {

    }
     @media (max-width: 979px){
         .poster {
             display: none;
         }
     }
</style>
<template>
     <div :class="$style.recommend">
            <div :class="[$style.poster,'pull-left']" :style="posterStyle"></div>
            <div :class="[$style.article,'pull-left']">
                <div class="search"></div>
                <div class="list"></div>
            </div>
        </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return {

            }
        },
        props:{
            posterUrl:{
                type: String
            }
        },
        methods:{
            ...mapGetters{
                
            }
        },
        computed:{
            posterStyle(){
                let style = {};
                style['background-color'] = this.posterUrl;
                return style;
            }
        },
        created(){

        }
    }
</script>