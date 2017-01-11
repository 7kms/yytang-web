<style>

</style>
<template>
    <div>{{test}}</div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        computed: {
            test(){
                return this.$route.params;
            }
        }
    }
</script>