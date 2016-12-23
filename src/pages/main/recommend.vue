<style lang="less" module>
    @import '../../assets/less/const.less';
    .recommend {
        height: 100%;
    }
    .poster {
        position: relative;
        width: 25%;
        height: 100%;
        background-image:url('../../assets/images/recommend-bg.jpg');
        background-repeat: no-repeat;
        background-position: center;
    }
    .desc{
        position: absolute;
        left: 18%;
        right: 0;
        bottom: 0;
        height: 200px;
        color: #fff;
    }
    .title{
        font-size: 24px;
    }
    .write{
        display: inline-block;
        padding: 6px 12px;
        background-color:@theme-color;
        border-radius:4px;
        opacity: .6;
        filter: ~"alpha(opacity = 60)";
        &:hover{
            opacity: 1;
            filter: ~"alpha(opacity = 100)";
        }
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
            <div :class="[$style.poster,'pull-left']" :style="posterStyle">
                <div :class="$style.desc">
                    <h1 :class="$style.title">Y众笔记</h1>
                    <p :class="$style.detail">你若没有yy，世界将会怎样？</p>
                    <a :class="$style.write" href="javascript:;" @click="goWrite"><y-icon name="coding"></y-icon> <span class="inlne-block">YCoding,Y世界</span></a>
                </div>
            </div>
            <div :class="[$style.article,'pull-left']">
                <div class="search">
                    
                </div>
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
            
        },
        methods:{
            ...mapGetters({
                posterUrl: 'posterUrl'
            }),
            goWrite(){
                this.$router.push('/app/write')
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