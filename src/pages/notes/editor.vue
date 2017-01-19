<style lang="less" module>
    @import '../../assets/less/const.less';
    .editor{
        flex: 1;
        display: flex;
        flex-direction: column;
        & > div{
            padding: 0 10px;
        }
        .tools{
            height: 40px;
            line-height: 40px;
            background-color: @bg-color-2;
        }
    }
    .article{
         flex: 1;
         display: flex;
         flex-direction: row;
         & > div{
             width: 50%;
             flex: 1;
         }
     }
     .edit{
         flex: 1;
         textarea{
             width: 100%;
             height: 100%;
             outline: none;
             resize: none;
             border: 1px solid @line-color-2
         }
     }
     .view{
         width: 40%;
     }
</style>
<template>
   <div :class="$style.editor">
        <div :class="$style.tools">工具</div>
        <div :class="$style.article">
            <div :class="$style.edit">
                <textarea v-model="markdownText"></textarea>
            </div>
            <div :class="$style.view" v-html="html">

            </div>
        </div>
    </div>
</template>
<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import hlcss from 'highlight.js/styles/atom-one-dark.css';
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight(code){
            return hljs.highlightAuto(code).value;
        }
    });
    export default {
        data(){
            return {
                markdownText: ''
            }
        },
       
        computed: {
            html(){
                return marked(this.markdownText);
            }
        }
    }
</script>