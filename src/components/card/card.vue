<style lang="less" module>
    .card{
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 0 2px 0 rgba(0,0,0,.5);
    }
    .info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
<template>
    <transition name="fade">
        <div v-if="show" :class="[$style.card]" @mouseleave="hide" :style="positionStyle">
            <div>
                <!--<img :src="dataObj.avatar_hd+'?imageView2/1/w/90/h/90/q/85/format/jpg/interlace/1'" alt="" width="45" height="45">-->
            </div>
            <div>
                <!--<p>{{ dataObj.username }}</p>-->
                <!--<p>{{ dataObj.jobTitle }}</p>-->
            </div>
            <div :class="$style.info">
                <div>
                    <p></p>
                    <p>分享</p>
                </div>
                 <div>
                    <p></p>
                    <p>阅读</p>
                </div>
                 <div>
                    <p></p>
                    <p>喜欢</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data(){
            return {
                width: 180,
                height: 180
            }  
        },
        props: {
            dataObj: {
                type: Object
            },
            position: Object,
            show: Boolean
        },
        computed: {
            positionStyle(){
                let { top, left, clientY} = this.position;
                const space = 20;
                if(clientY <= 200){
                    left =left - this.width - space;
                    top = top - .5 * this.height + 12;
                }else {
                    top = top - this.height - space;
                    left = left - .5 * this.width + 12
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