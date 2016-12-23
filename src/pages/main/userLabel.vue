<style module>
    .entrance{
        position: fixed;
        top: 10px;
        right: 10px;
    }
</style>
<template>
    <div :class="$style.entrance">
        <router-link to="/entrance/login"><y-icon name="bulb"></y-icon>登录</router-link>
        <router-link to="/entrance/register"><y-icon name="bulb"></y-icon>注册</router-link>
    </div>
</template>
<script>
    export default {

    }
</script>