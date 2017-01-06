<template>
    <div>
        <h3>笔记管理</h3>
         <div class="markdown">
             <textarea rows="3" cols="30" v-model="markdownText"></textarea>
         </div>
         <div class="html" v-html="html"></div>
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