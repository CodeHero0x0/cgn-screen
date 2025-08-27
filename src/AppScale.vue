<template>
  <div id="app">
    <div class="container-main">
      <div
        class="container-wrapper"
        :class="[scale.type]"
        :style="{
        width: `${containerSize.width}px`,
        height: `${containerSize.height}px`,
        transform: `scale(${scale.value}) translate3d(${ scale.type === 'xcenter' ? '-50%,0,0' : '0,-50%,0' })`
      }"
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Echarts from './utils/Echarts'
import {mapMutations} from "vuex";

export default {
  name: 'MainPage',
  provide () {
    return {
      reload: this.reload,
      getScale: () => 1/this.scale.value
    }
  },
  components: {

  },
  data() {
    return {
      containerSize: {
      //  width: 2640,
        width: 8640,
        height: 2160
      },
      scale: {
        type: 'xcenter',
        value: 1
      }
    }
  },
  created () {
    Echarts.around = false
    Vue.prototype.Echarts = Echarts
  },
  mounted () {
    this.initContainerSize()
    window.addEventListener('resize', () => {
      this.initContainerSize()
    }, false)

    this.keyDown()

    this.windowMethodApi()
  },
  methods: {
    ...mapMutations("home", [
      "SET_REGIONBGFLAG"
    ]),
    initContainerSize () {
      const docRect = document.querySelector('.container-main').getBoundingClientRect()
      if (docRect.width/docRect.height > this.containerSize.width/this.containerSize.height) {
        this.scale.type = 'xcenter'
        this.scale.value = docRect.height/this.containerSize.height
      } else {
        this.scale.type = 'ycenter'
        this.scale.value = docRect.width/this.containerSize.width
      }
    },

    keyDown() {
      document.onkeydown =  (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        // 0-48;  1-49;   2-50;     3-51;   4-52;      5-53;     6-54;      7-55;      8-56;        9-57;
                 //集团   //公司    //发展   //战略规划  //业务   // 产业链  //社会  // 党建      //企业文化
                 console.log(1111111,e1.keyCode)
        if (e1 && e1.keyCode === 49) {
          this.$router.push({
            name: "homeIndex",
            params: {}
          })
        } else if (e1 && e1.keyCode === 50) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 51) {
          this.$router.push({
            name: "ResourceEndowment",
            params: {}
          })
        } else if (e1 && e1.keyCode === 52) {
          this.$router.push({
            name: "equipmentManagement",
            params: {}
          })
        } else if (e1 && e1.keyCode === 53) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 54) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 55) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 56) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 57) {
          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 48) {

          this.$router.push({
            name: "index",
            params: {}
          })
        } else if (e1 && e1.keyCode === 81) {// 键盘q
          this.SET_REGIONBGFLAG(1)
          this.$router.push({
            name: "country",
            params: {}
          })
        }
      }
    },
    getScreentPoint() {
      document.addEventListener('click', function (e) {
        // page 定义js中的全局属性。
        let x = e.offsetX;
        let y = e.offsetY;
        // 在控制台打印出鼠标移动的位置。
        console.log([x, y]);

      });
    },
    getRegionLine() {
      let _this = this
      document.addEventListener('dblclick', function (e) {
        if (!_this.dblclickFlag) {
          _this.dblclickFlag = true
          _this.recordList = []
          document.addEventListener('mousemove', function (e) {
              // page 定义js中的全局属性。
              let x = e.offsetX;
              let y = e.offsetY;
              // 在控制台打印出鼠标移动的位置。
              // console.log(x, y);
              // 这里如果没有后面"px"不会显示特效。
              _this.recordList.push([x, y])
          });
        } else {
          _this.dblclickFlag = false
          console.log(JSON.stringify(_this.recordList));
          _this.recordList = []
          document.removeEventListener('mousemove', function (e) {

          })
        }

      });
    },

    windowMethodApi () {
      window.getScreentPoint = () => {
        return this.getScreentPoint()
      }

      window.getRegionLine = () => {
        return this.getRegionLine()
      }
    },

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

.container-wrapper{
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-direction: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  transform-origin: top left;
  //background-color: #000A14;
  background-color: rgb(13, 42, 68);
  &.xcenter{
    left: 50%;
    top: 0;
  }
  &.ycenter{
    top: 50%;
    left: 0;
  }
}
.container-main{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: hidden;
  background-color: #1e2329;
  // overflow: auto;
}

</style>
