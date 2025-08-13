<template>
    <div class="homeIndex">
        <div class="con">
          <video ref="homeVideo" class="con_video" autoplay="autoplay" loop="loop" muted>
            <source src="../../../assets/images/home/三峡-开屏页v0.1.2.mp4">
          </video>
          <!-- <img class="con_bg" src="../../../assets/images/home/开屏页.jpg"/> -->
          <div class="con_left">
            <div class="con_left_bg">
              <div class="left_con">
                <div class="left_con_top">
                  <div class="top_line"></div>
                  <span class="top_title">热烈欢迎</span>
                  <span class="top_leader">{{ leaderInfo }}</span>
                </div>
                <div class="left_con_mid">
                  <span>莅临三峡能源参观指导</span>
                </div>
                <img class="left_con_logo" src="../../../assets/images/home/home_logo.png"/>
                <div class="left_con_bo">
                  <div class="bo_com">
                    <img src="../../../assets/images/home/bo_location.png"/>
                    <span style="margin-left: 18px;">北京市</span>
                  </div>
                  <div class="bo_com">
                    <span>{{ currentTime }}</span>
                  </div>
                  <div class="bo_com">
                    <span>{{ currentWeek }}</span>
                  </div>
                  <div class="bo_com">
                    <span>股票代码：</span>
                    <span class="bo_code">600905</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

                     <!-- <div class="con_mid_bg"></div>
                     <div class="con_mid"></div> -->

          <div class="con_right">
            <div class="con_right_bg">
              <img style="width: 2140px; height: 740px; position: absolute;  top: 148px; left: 532px;" src="../../../assets/images/home/right-border.png" />
              <div class="ritht_con" :class="{'right_con_full': videoSizeFlag}" ref="rightVideRef"
                @mouseenter="videoHoverMouseenterEvent()"
                @mouseleave="videoHoverMouseleaveEvent()">
                <!-- <img src="../../../assets/images/home/图片.png"/> -->
                <video class="rightVideo" ref="rightVideo" autoplay loop="loop" :muted="false">
                  <source src="../../../../static/video/视频1.mp4">
                </video>
                <div v-if="videoSizeFlag" class="mask-top"></div>
                <div v-if="videoSizeFlag" class="mask-bto"></div>
                <img
                 @click="resetVideoSize"
                 ref="rightVideoHoverRef"
                 class="right_con_hover"
                 :class="{'right_con_hove2': videoSizeFlag}"
                 :src="videoSizeFlag ? videoZoomOutUrl : videoZoomInUrl"/>

              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
            <div class="bottom_nav" v-for="(item, index) in menuNameList" :key="index">
                <div class="nav_item"
                v-for="(subItem, subIndex) in item" :key="subIndex"
                :class="{'nav_item_check': subItem.checkFlag}"
                @mouseenter="mouseenterEvent(subItem)"
                @mouseleave="mouseleaveEvent(subItem)"
                @click="menuItemClick(subItem)">
                    <span>{{ subItem.menuName }}</span>
                    <div v-if="subItem.checkFlag" class="nav_item_check_bg"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  name: "homeIndex",
  components: {

  },
  data() {
    return {
        menuNameList: [
            [
                {
                name: '',
                menuName: '业务概览',
                path: '',
                checkFlag: false,
                params: {}
                },
                {
                name: '',
                menuName: '智慧工程',
                path: '',
                checkFlag: false,
                params: {}
                },
            ],
            [
                {
                name: 'smartOM',
                menuName: '智慧运维',
                path: '/smartOM',
                checkFlag: false,
                params: {}
                },
                {
                name: '',
                menuName: '智慧安全',
                path: '',
                checkFlag: false,
                params: {}
                },
            ]
        ],
        leaderInfo: conf.leaderInfo,
        currentDate: '2023-06-21',
        currentTime: '16:26:20',
        currentWeek: '星期三',

        videoSizeFlag: false,
        videoHoverShowFlag: false,
        videoZoomInUrl: new URL('../../../assets/images/home/进入全屏.png', import.meta.url).href,
        videoZoomOutUrl: new URL('../../../assets/images/home/退出全屏.png', import.meta.url).href,
    }
  },
  created() {
  },
   mounted() {
    document.querySelector('.homeIndex').addEventListener('click', async() => {
        this.videoPlay()
    });
    const that = this
    that.getTime()
    // const rightVideo = this.$refs.rightVideo
    // rightVideo.muted = false
    // rightVideo.play()
    setInterval(function () {
      that.getTime()
    }, 1000)
    //移动则播放

  },
  beforeDestroy(){
    // document.querySelector('.homeIndex').removeEventListener('click',this.videoPlay())
  },
  computed: {

  },
  watch: {

  },
  methods: {
    ...mapMutations("home", [
      "SET_PROVINCEID",
      "SET_SITETYPE",
      "SET_FJ_TYPE",
      "SET_REGIONBGFLAG"
    ]),
    videoPlay(){
        document.querySelector(".rightVideo").play();
    },
    mouseenterEvent(item) {
        item.checkFlag = true
    },
    mouseleaveEvent(item) {
        item.checkFlag = false
    },
    menuItemClick(item) {
      const list = ['业务概览', '智慧工程', '智慧安全']
      if (list.includes(item.menuName)) {
        this.$message({
          message: '建设中',
          type: 'warning',
          offset: '300'
        });
      }
      this.$router.push(item.path)
        // this.$router.push({
        //     name: item.name,
        //     params: item.params
        // })
      if (item.name === "smartOM") {
        this.SET_PROVINCEID("000000")
        this.SET_REGIONBGFLAG(1)
        // __g.camera.set(-164636.96, 3424354.29, 10000000, -85.999229, -83.505318, 0)
      }
    },
    getTime() {
      const myDate = new Date() //实例一个时间对象；
      const year = myDate.getFullYear() //获取系统的年；
      let month = myDate.getMonth() + 1 //获取系统月份，由于月份是从0开始计算，所以要加1
      let data = myDate.getDate() // 获取系统日，
      let h = myDate.getHours() //获取系统时，
      let m = myDate.getMinutes() //分
      let s = myDate.getSeconds() //秒
      if (month < 10) {
        month = "0" + month
      }
      if (data < 10) {
        data = "0" + data
      }
      if (h < 10) {
        h = "0" + h
      }
      if (m < 10) {
        m = "0" + m
      }
      if (s < 10) {
        s = "0" + s
      }
      this.currentDate = `${year}/${month}/${data}`
      this.currentTime = `${h}:${m}:${s}`

      var x = myDate.getDay();
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      this.currentWeek = weeks[x];

    },

    videoHoverMouseenterEvent() {
      this.videoHoverShowFlag = true
    },
    videoHoverMouseleaveEvent() {
      this.videoHoverShowFlag = false
    },
    resetVideoSize() {
      if(this.videoSizeFlag) {
        this.$refs.rightVideRef.style.position = ''
        this.$refs.rightVideRef.style.width = ''
        this.$refs.rightVideRef.style.height = ''
        this.$refs.rightVideRef.style.top = ''
        this.$refs.rightVideRef.style.left = ''
        this.$refs.rightVideRef.style.right = ''
        this.$refs.rightVideRef.style.margin = ''
      } else {
        this.$refs.rightVideRef.style.position = 'fixed'
        // this.$refs.rightVideRef.style.width = '5640px'
        this.$refs.rightVideRef.style.width = `${1920 * 1.7}px`
        // this.$refs.rightVideRef.style.height = '1890px'
        this.$refs.rightVideRef.style.height = `${1080 * 1.7}px`
        this.$refs.rightVideRef.style.top = '0px'
        this.$refs.rightVideRef.style.left = '0px'
        this.$refs.rightVideRef.style.right = '0px'
        this.$refs.rightVideRef.style.bottom = '0px'
        this.$refs.rightVideRef.style.margin = 'auto'
      }
      this.videoSizeFlag = !this.videoSizeFlag
    }
  },
}
</script>

<style lang="scss" scoped>
.homeIndex{
  width: 100%;
  height: 100%;

  video{
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
.con {
  width: 100%;
  height: 100%;
  //background: url("../../../assets/images/home/大背景.png") center center no-repeat;
  background-size: 100% 100%;
}
.con_video {
  width: 100%;
  height: 100%;
  object-fit: fill;

  // width: 120% !important;
  // position: absolute;
  // left: -700px;
}
.con_bg {
  width: 3840px;
  height: 1280px;
  position: absolute;
  left: 2400px;
  top: 305px;
}
.con_left {
  width: 3065px;
  height: 1248px;
  line-height: 1248px;
  position: absolute;
  top: 325px;
  left: 0;
  background: url("../../../assets/images/home/左侧装饰.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}
.con_left_bg {
  width: 3064px;
  height: 1036px;
  background: url("../../../assets/images/home/左侧黑色底板.png") center center no-repeat;
  background-size: 100% 100%;
}
.left_con {
  width: 1447px;
  height: 644px;
  margin-top: 196px;
  margin-left: 605px;
}
.left_con_top {
  width: 100%;
  height: 141px;
  line-height: 141px;
  display: flex;
  align-items: center;
  float: left;
}
.top_line {
  width: 14px;
  height: 100px;
  background: linear-gradient(90.01deg, #14B0FC -475.91%, #24FFE7 473.93%);
}
.top_title {
  font-family: 'Alibaba PuHuiTi-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 120px;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
  margin: 0 58px;
}
.top_leader {
  font-family: 'Alibaba PuHuiTi-Bold';
  font-style: normal;
  font-weight: 400;
  font-size: 78px;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
}
.left_con_mid {
  width: 100%;
  height: 120px;
  line-height: 120px;
  float: left;
  margin: 60px 0 58px 0;
}
.left_con_mid span {
  font-family: 'Alibaba PuHuiTi-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 120px;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
}
.left_con_logo {
  width: 1373px;
  height: 140px;
  float: left;
}
.left_con_bo {
  width: 100%;
  height: 63px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: left;
  margin-top: 57px;
}
.bo_com {
  font-family: 'Alibaba-PuHuiTi-Medium';
  font-style: normal;
  font-weight: 700;
  font-size: 46px;
  color: #FFFFFF;
  line-height: 63px;
  display: flex;
  align-items: center;
}
.bo_code {
  color: #DE2D4F;
}
.con_mid {
  width: 2196px;
  height: 100%;
  background: url("../../../assets/images/home/卫星.png") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 3222px;
}
.con_mid_bg {
  width: 3504px;
  height: 100%;
  background: url("../../../assets/images/home/地球.png") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 2568px;
}
.con_right {
  width: 3065px;
  height: 1248px;
  line-height: 1248px;
  position: absolute;
  top: 325px;
  right: 0;
  background: url("../../../assets/images/home/右侧装饰.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}
.con_right_bg {
  width: 3064px;
  height: 1036px;
  background: url("../../../assets/images/home/右侧黑色底板.png") center center no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.ritht_con {
  width: 2124px;
  height: 737px;
  position: absolute;
  top: 148px;
  left: 540px;
  //-webkit-mask-image: url("../../../assets/images/home/new_video_bg.png");
  -webkit-mask-image: url("../../../assets/images/home/right-border.png");
  //mask-image: url("../../../assets/images/home/new_video_bg.png");
  mask-image: url("../../../assets/images/home/right-border.png");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
.rightVideo {
  //border-radius: 200px;
}
.ritht_con video {
  width: 100%;
   //height: 100%;
   height: 135%;
  // height: 165%;
   position: absolute;
   top: -120px;
  object-fit: fill;
}
.mask-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
  background: url("../../../assets/images/home/mask-top.png") center no-repeat;
  background-size: 100% 100%;
}
.mask-bto {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 220px;
  background: url("../../../assets/images/home/mask-bto.png") center no-repeat;
  background-size: 100% 100%;
}
.right_con_full {
  -webkit-mask-image: url("../../../assets/images/home/home_full_bg.png");
  mask-image: url("../../../assets/images/home/home_full_bg.png");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  //-webkit-mask-image: none !important;
  //mask-image: none !important;
  //border-radius: 300px;
  z-index: 999;
}
.right_con_full  video{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  object-fit: fill;
}
.right_con_hover {
  position: absolute;
  // top: 35%;
  // left: 43%;
  top: 35px;
  right: 45px;
  cursor: pointer;

}
.right_con_hove2 {
  // top: 45%;
  // left: 47%;
  width: 60px;
  height: 60px;
  top: 100px;
  right: 120px;
}
.bottom {
  position: absolute;
  left: 2772px;
  right: 2772px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.bottom_nav {
  width: 868px;
  height: 106px;
  background: url("../../../assets/images/home/nav_bg.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding: 0 200px;
}
.nav_item {
  margin-top: 34px;
  position: relative;
  cursor: pointer;
}
.nav_item span {
  font-family: 'Alibaba PuHuiTi-Bold';
  font-style: normal;
  font-weight: 400;
  font-size: 44px;
  color: rgba(255, 255, 255, 0.5);
}
.nav_item_check span {
  color: #FFFFFF;
}
.nav_item_check_bg {
  width: 320px;
  height: 160px;
  background: url("../../../assets/images/home/nav_item_check.png") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: -70px;
  top: -90px;
}
</style>
