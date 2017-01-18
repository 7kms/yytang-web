<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        min-height: 500px;
        margin-right: 10px;
        background-color: #fff;
    }
    .header{
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 46px;
         padding: 0 20px;
         border-bottom: 1px solid @line-color-3;
         color: #fff;
         background-color: @theme-color;
         .on{
             font-weight: bold;
             color: @hint-color;
         }
     }
     .list{
         display: flex;
         flex-direction: row;
         justify-content: flex-start;
         flex-wrap: wrap;
         align-content: flex-start;
         padding:20px;
         min-height: 500px;
     }
     .note{
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         width: 200px;
         height: 80px;
         padding: 10px;
         margin: 0 25px 20px 0;
         background-color: #ebebeb;
         border-radius: 5px;
         cursor: pointer;
          &:hover{
             .title,.count{
                 color: @highlight;
             }
         }
     }
     .title,.count{
         margin: 0;
         padding: 0;
     }
     .count{
        font-size: 2rem;
        color: @theme-color;
     }
     .time{
         align-self: flex-end;
         font-size: 1.2rem;
     }
</style>

<template>
    <div :class="$style.content">
        <div :class="$style.header">弹枪云笔记</div>
        <ul :class="$style.list">
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
            <li :class="[$style.note,'text-center']">
                <h3 :class="[$style.title,'one-line']">前端小咸鱼</h3>
                <p :class="$style.count">9</p>
                <time :class="$style.time">2017-01-18</time>
            </li>
        </ul>
    </div>
</template>