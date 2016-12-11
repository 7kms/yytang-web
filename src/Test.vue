<template>
    <div>
        <div>
            I'm a test template!        
        </div>
        <div>
            {{param}}
        </div>
        <button @click.prevent="change">change param</button>
    </div>
</template>
<script>
    export default{
        props:['param'],
        methods:{
            change(){
                this.param.a = 12;
            }
        }
    }
</script>