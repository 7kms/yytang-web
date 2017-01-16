<style lang="less" module>
    .card{
        position: absolute;
        z-index: 1000;
        background-color: #fff;
        box-shadow: 1px 1px 0 4px rgba(0,0,0,3);
    }
</style>
<template>
    <transition name="fade">
        <div v-if="show" :class="$style.card" @mouseleave="hide" :style="positionStyle">
             user
        </div>
    </transition>
</template>
<script>
    export default {
        data(){
            return {
                width: 130,
                height: 130
            }  
        },
        props: {
            dataObj: Object,
            position: Object,
            show: Boolean
        },
        computed: {
            positionStyle(){
                let top = this.position.referTop;
                let left = this.position.referLeft;
                if(top <= 150){
                    left -= this.width - 30;
                    top -= .5 * this.height + 12;
                }else {
                    top -= this.height - 30;
                    left -= .5 * this.width + 12
                }
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    left: left + 'px',
                    top: top + 'px'
                }
            }
        },
        methods:{
            hide () {
                this.$parent.hide();
            }
        }
    }
</script>