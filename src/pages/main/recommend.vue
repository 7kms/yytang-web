<style lang="less" module>
    @import '../../assets/less/const.less';
    .recommend {
        height: 100%;
        background-color: #fff;
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
        min-width: 600px;
        width: 60%;
    }
    .header {
        height: @slideW;
        background-color : #fff;
        border-bottom: 1px solid #d9d9d9;
    }
    .tabItem{
        display: inline-block;
        padding: 0 20px;
        line-height: @slideW - 1;
        &:hover{
            background-color: @body-color;
            border-bottom: 1px solid @theme-color;
        }
        &.on{
            color: @theme-color;
            border-bottom: 1px solid @theme-color;
        }
    }
    .search{
        position: relative;
    }
    .seBtn{
        position: absolute;
        right: 5px;
        top: 14px;
    }
    .input{
        width: 160px;
        height: 28px;
        margin-top: 8px;
        padding: 0 6px;
        color: #999;
        border-radius: 2px;
        transition: border-color ease-in .3s;
        border: 1px solid #ccc;        
        &:focus{
            border-color:@theme-color;
        }
    }
     @media (max-width: 979px){
         .poster {
             display: none;
         }
         .header {
            border-left: 1px solid #d9d9d9;
        }   
         .article {
            min-width: 600px;
            width: 80%;
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
                <div :class="$style.header">
                    <ul :class="[$style.tab,'pull-left']">
                        <li :class="[$style.tabItem,'hover',{[$style.on]:true}]">发现</li><!--
                        --><li :class="[$style.tabItem,'hover']">精选</li>
                    </ul>
                    <div :class="[$style.search,'pull-right']">
                        <input :class="$style.input" type="search" value="" placeholder="搜索" @keyup.enter="search">
                        <a href="javascript:;" :class="[$style.seBtn,'hover']" @click="search">
                            <y-icon name="search"></y-icon>
                        </a>
                    </div>
                </div>
                <div :class="$style.list"></div>
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
            search(){
                alert(11)
            },
            goWrite(){
                this.$router.push('/app/notes')
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