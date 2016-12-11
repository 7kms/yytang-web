<template>
  <div>
    <h2>{{ msg }}</h2>
    <h2>{{ msg }}</h2>
    <p>I am lazy-loaded. (check out the Networks tab in Chrome devtools)I am lazy-loaded. (check out the Networks tab in Chrome devtools)</p>
    <Test :param="testData"></Test>
    <div>
      {{testData}}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Test from './Test.vue'
export default {
  data () {
    return { 
      msg: 'This is Bar!' ,
      testData:{a:1,b:2}
    }
  },
  components:{
    Test:Test
  }
}
</script>
