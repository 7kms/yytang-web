<style lang="less" module>

</style>
<template>
     <li :class="$style.item">
         <div>
             <img :src="generateImgUrl(dataObj.screenshot)" alt="" width="60" height="60">
         </div>
        <div>
            <h3>{{dataObj.title}}</h3>
            <div>
                <span>{{dataObj.collectionCount}}</span>
                <span>{{dataObj.user.username}}</span>
                <span>{{dataObj.createdAt}}</span>
            </div>
        </div>
    </li>
</template>
<script>
    import { articlePictureUrl } from '../../config'
    export default {
        props:{
            dataObj: Object
        },
        methods:{
             generateImgUrl(screenshot){
                 if(!screenshot) return 'https://gold-cdn.xitu.io/images/welcome/entry-default-img@2x.png';
                const query = '?imageView2/1/w/120/h/120/q/85/format/jpg/interlace/1';
                return `${articlePictureUrl}/${screenshot.key}${query}`;
            }
        }

    }
</script>
