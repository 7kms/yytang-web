<template>
    <div>
        <h3>笔记管理</h3>
         <div class="markdown">
             <textarea rows="3" cols="30" v-model="markdownText"></textarea>
         </div>
         <div class="html" v-html="markdownHighlight"></div>
    </div>
</template>
<script>
    import marked from 'marked';
    import hljs from 'highlight.js'
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
    export default {
        data(){
            return {
                markdownText: '',
                markdownHighlight : ''
            }
        },
        computed: {
            html(){
                return marked(this.markdownText);
            }
        },
        watch: {
            html(newVal, oldVal){
                if(!newVal) return;
                debugger;
                this.markdownHighlight = hljs.highlightAuto(newVal);
            }
        }
    }
</script>