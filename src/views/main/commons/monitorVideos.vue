<template>
  <!--监控视频页面-->
  <div class="monitorVideos">
    <div class="left_area">
      <!--左侧树形控件-->
      <div class="module_01">
        <sysTitle :title-data="titleData[0]"></sysTitle>
        <div class="tree-node-box">
          <el-tree
            :props="defaultProps"
            lazy
            :load="iccTree"
            @node-click="nodeClic">
          </el-tree>
        </div>
      </div>
      <!--监控-->
      <div class="module_02">
        <div class="video-item" v-for="(item,index) in videosData" :key="index">
          <sysTitle :title-data="item"></sysTitle>
          <div class="video-box-body">
            <!-- <img :src="item.url" alt=""> -->
            <DHPlayer :videoId="'video_id_' + index" ref="video_1" ></DHPlayer>
          </div>
        </div>
        <!-- <DHPlayer videoId="video_id_1" ref="video_1" :num="divisionNum" :pathList="pathList" @getCurrentWindow="getCurrentWindow" @changeDivision="getDivisionNum" @picCap="picCap" @getError="getError"></DHPlayer> -->
      </div>
    </div>

    <div class="reback" @click="rebackClick"><span>返回</span></div>
  </div>
</template>

<script>
import sysTitle from "@COM/smartOM/SysTitle.vue";
import http from "@/service/interface.js"
import DHPlayer from "@/components/DHPlayer"
export default {
  name: "monitorVideos",
  components:{sysTitle, DHPlayer},
  data(){
    return{
      titleData:[
        {name:'装机容量',unit:'',bgIndex:0},
      ],//各标题数组
      treeNodeData: [
        {
          label: '河北康保明太风电场升压站',
          children: [
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
            {
              label: '73塔基外'
            },
          ]
        },
        {
          label: '河北康保明太风电场',
          children: [
            {
              label: '73塔基外'
            },
            {
              label: '75塔基外'
            },
            {
              label: '77塔基外'
            },
            {
              label: '59塔基外'
            },
            {
              label: '65塔基外'
            },
            {
              label: '71塔基外'
            },
            {
              label: '68塔基外'
            },
            {
              label: '62塔基外'
            },
            {
              label: '67塔基外'
            },
            {
              label: '74塔基外'
            },
            {
              label: '78塔基外'
            },
            {
              label: 'svg室'
            },
            {
              label: '60塔基外'
            },
            {
              label: '69塔基外'
            },
            {
              label: '56塔基外'
            },
            {
              label: '63塔基外'
            },
            {
              label: '58塔基外'
            },
            {
              label: '61塔基外'
            },
            {
              label: '55塔基外'
            },
            {
              label: '70塔基外'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf'
      },
      videosData:[
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png01.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png02.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png03.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png04.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png05.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png06.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png07.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png08.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png09.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png10.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png11.png', import.meta.url).href
        },
        {
          name:"监控",
          url:new URL('../../../assets/images/monitorVideos/video-png12.png', import.meta.url).href
        }
      ],//摄像头数据
      iccTreeId: '001001e54001_001001e54001a08001,001001e54001a09001',

      pathList: [],
      currentNum: 0,
      divisionNum: 1, // 当前窗口的分割数量
      errorTip: '',
      videoType: 'video_1',
      channel1: "",
      isRedirect: false, // true 是代表重定向(拼接的)  false 表示取消重定向(接口返回)
      videoIndex: 0
    }
  },
  mounted() {
    this.initInfo()
  },
  methods: {
    initInfo() {

    },
    // 视频设备树
    iccTree(node, resolve) {
      http.sx.iccTree({
        iccTreeId: node.data ? node.data.id : (this.$store.state.home.siteInfo.hk_tree_id ? this.$store.state.home.siteInfo.hk_tree_id : this.iccTreeId)
      }).then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            item.label = item.name
            item.children = []
            item.isLeaf = item.isparent !== "true"
            item.disabled = item.isparent === "false" && item.isonline === '0'
          })
          resolve(res.data)
        }
      })
    },

    rebackClick() {
      // 返回上一步路由
      this.$router.go(-1)
    },

    nodeClic(d, n, s) {
      if (d.isLeaf && d.channelcode) {
        this.getIccVideInfo(d.channelcode, this.videoIndex)

        this.videosData[this.videoIndex].name = d.name

        this.videoIndex++
        if (this.videoIndex === 12) {
          this.videoIndex = 0
        }
        // if (this.videoIndex === 3) {
        //   this.videoIndex = 0
        // }

      }
    },

    // 获取视频流
    getIccVideInfo(cId, index) {
      http.sx.iccVideoInfo({
        channelId: cId
      }).then(res => {
        if (res.data && res.data.length > 0 && res.data[0].data && res.data[0].data.url) {
          let arr = res.data[0].data.url.split('|')
          let url = arr[3] + '?token='+ res.data[0].data.token +'&trackID=701'
          setTimeout(() => {
            this.$refs[this.videoType][index].setRealTime({ channelId: this.channel1, path: url, snum: this.currentNum, redirect: this.isRedirect})
          }, 1000)
        }
      })
    },

    //获取当前选中的窗口
    getCurrentWindow(num) {
      this.currentNum = num
    },
    // 控件切换窗口数量时返回前端告知当前多少窗口
    getDivisionNum(v) {
      this.divisionNum = v
    },
    picCap({ path }) {
      this.downloadFile(path, 'image_' + new Date().valueOf())
    },
    getError(error) {
      this.errorTip = error
    },
    downloadFile(url, name = new Date().valueOf()) {
      var a = document.createElement("a")
      a.setAttribute("href", url)
      a.setAttribute("download", name)
      a.setAttribute("target", "_blank")
      let clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent("click", true, true);
      a.dispatchEvent(clickEvent);
    },
    //销毁窗口
    destroy() {
        this.$refs[this.videoType].destroy()
    },
    //重建
    init() {
        this.$refs[this.videoType].initVideo()
    },
    //关闭视频
    closeVideo(flag) {
        this.$refs[this.videoType].videoPlayer.closeVideo({
            snum: this.currentNum,
            isAll: !!flag
        })
    },

  }
}
</script>

<style lang="scss">
.monitorVideos{
  position: relative;
  .left_area{
    .module_01{
      .tree-node-box{
        .el-tree{
          background: none;
          color: rgba(255, 255, 255, 0.8);
          //选中的颜色
          .el-tree-node:focus>.el-tree-node__content{
            background-color: rgba(0, 0, 0, 0.3);
          }
          //所有节点
          .el-tree-node__content{
            height: 44px;
            margin-bottom: 20px;
            &:hover{
              background-color: rgba(0, 0, 0, 0.3);
            }
            //父节点前的图标
            .el-tree-node__expand-icon{
              padding: 0;
              font-size: 32px;
              color: white;
            }
            //子节点前面的图标
            .el-tree-node__expand-icon.is-leaf{
              padding: 0;
              color: transparent;
              position: relative;
            }
          }
          //子节点
          .el-tree-node__children{
            //子节点的文本
            .el-tree-node__label{
              margin-left: 125px;
              //子节点文本前的伪元素
              &:before{
                top: 10px;
                width: 26px;
                height: 24px;
                background: url("@ASS/images/monitorVideos/node-tree-son.png");
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
              }
            }
          }
          //所有节点的文本
          .el-tree-node__label{
            margin-left: 90px;
            font-family: 'Alibaba-PuHuiTi-Medium';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 44px;
            color: rgba(255, 255, 255, 0.8);
            position: relative;

            &:before{
              position: absolute;
              left: -50px;
              top: 14px;
              content: '';
              width: 30px;
              height: 15px;
              background: url("@ASS/images/monitorVideos/node-tree-father.png");
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
              transform: none;
            }
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.monitorVideos{
  position: absolute;
  top: 0;
  left: 0;
  .left_area{
    display: flex;

    .module_01{
      width: 1096px;
      flex-shrink: 0;
      flex-grow: 0;

      .tree-node-box{
        margin-top: 30px;
        padding: 30px 0 30px 30px;
        width: 1066px;
        height: 1385px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        overflow-y: auto;
        &::-webkit-scrollbar{
          display: none;
        }
      }
    }

    .module_02{
      display: flex;
      flex-shrink: 0;
      flex-grow: 0;
      margin-left: 40px;
      width: 7343px;
      height: 100%;
      flex-wrap: wrap;
      flex-direction: column;

      .video-item{
        margin-bottom: 40px;
        margin-right: 40px;
        &:nth-child(2n+2){
          margin-bottom: 0;
        }

        .video-box-body{
          margin-top: 30px;
          width: 1190px;
          height: 657px;
        //   width: 2413px;
        //   height: 1410px;
          background: rgba(0, 0, 0, 0.1);
          border: 4px solid #2FA5F7;
          box-shadow: 0 0 20px rgba(45, 255, 242, 0.2);
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 1130px;
            height: 597px;
          }
        }
      }
    }
  }
  .reback {
    width: 159px;
    height: 68px;
    line-height: 68px;
    position: absolute;
    left: 8278px;
    top: 92px;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid #27FFFF;
    border-radius: 73px;
    text-align: center;
    cursor: pointer;
    z-index: 3;

    span {
      font-family: 'Alibaba-PuHuiTi-Medium';
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      color: #27FFFF;
    }
  }
}
#video_id_0 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_1 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_2 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_3 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_4 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_5 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_6 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_7 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_8 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_9 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_10 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
#video_id_11 {
  width: 100%;
  height: 100%;
  border: 3px solid #2db7f4;
  background-color: #161a1e;
  margin-bottom: 20px;
}
</style>
