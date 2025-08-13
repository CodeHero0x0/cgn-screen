<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import Echarts from './utils/Echarts'
import "./utils/rem"
import Vue from "vue";
export default {
  name: 'MainPage',
  components: {

  },
  data() {
    return {
    }
  },
  created () {
    Echarts.around = true
    Vue.prototype.Echarts = Echarts
  },
  mounted () {
  },
  methods: {
    onEvent () {
    }
  }
}
</script>

<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'SiYuan_Regular', serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

