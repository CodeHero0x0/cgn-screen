<template>
  <!--设备详情页面-->
  <div class="equipmentDetails">
    <div class="left_area">
      <!--模块01，风机总体运行情况-->
      <div class="module_01">
        <div class="equ-title">
          <!-- <div class="icon"></div> -->
          <div class="content">
            <div class="name" :style="titleStyle">{{equInfo.equNumber}}</div>
            <div class="btn">
              <!-- <span :class="{'btn-check': equInfo.equCheckFlag === 1}" style="margin-right: 20px;" @click="equChangeClick(1)">{{equInfo.equInside}}</span> -->
<!--              v1风机监控-->
<!--              <span :class="{'btn-check': equInfo.equCheckFlag === 2}" @click="equChangeClick(2)">{{equInfo.equBtnName}}</span>-->
<!--              <div class="btn-icon"></div>-->
            </div>
            <div class="reback" @click="rebackClick()">
              <span>{{ equInfo.equBack }}</span>
            </div>
          </div>
        </div>
        <div class="overall-situation">
          <div class="total">
            <div class="total-item" v-for="(item,index) in overallSituationData" :key="index" :style="item.color">
              <span>{{item.label}}</span>
              <span>{{item.data}}</span>
            </div>
          </div>
          <div class="items">
            <div class="item"
             :class="{'item_check': item.checkFlag}"
             v-for="(item, index) in fjDataList"
             :key="index"
             :style="item.color"
             @click="fjCodeClick(item)"
             >
              {{item.fjNum}}
            </div>
          </div>
        </div>
      </div>

      <!--模块03，实时出力-->
      <div class="module_03">
        <sysTitle :title-data=titleData[1]></sysTitle>
        <div class="real-time-output">
          <LineChart2 ref="realTimeOutputDataRef" :chartData="realtimeOutputData"></LineChart2>
        </div>
      </div>
    </div>
    <div class="right_area">

      <!--实时运行数据-->
      <div class="module_06">
        <sysTitle :title-data=titleData[4]></sysTitle>
        <div class="real-time-run-data">
          <div class="table-title-box">
            <div class="title-item" v-for="index in 2" :key="index">
              <span>名称</span>
              <div class="split-line"></div>
              <span>数据-</span>
            </div>
          </div>
          <div class="table-body-box">
            <div class="body-item" v-for="(item,index) in realTimeRunData" :key="index">
              <div class="label">{{item.label}}</div>
              <div class="data">{{item.data}}<span>{{item.unit}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <!--模块02，实时监控-->
      <div class="module_02">
        <sysTitle :title-data="titleData[0]"></sysTitle>
        <div class="real-time-monitor">
          <div class="left-data-box">
            <div class="item" v-for="(item,index) in realTimeMonitorData.fst" :key="index">
              <div class="data-box">
                <div class="label">
                  <div class="icon" :class="['icon'+index]"></div>
                  <span>{{item.label}}</span>
                </div>
                <div class="data">
                  {{item.data}}
                  <span>{{item.unit}}</span>
                </div>
              </div>
<!--              <div class="process-box">-->
<!--                <div class="process-bg">-->
<!--                  <div class="process-line"></div>-->
<!--                  <div class="process-dot"></div>-->
<!--                </div>-->
<!--                <div class="process-number">-->
<!--                  <span>0</span>-->
<!--                  <span>50</span>-->
<!--                  <span>100</span>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
          <div class="right-data-box">
            <div class="item" v-for="(item,index) in realTimeMonitorData.sec" :key="index">
              <div class="label">{{item.label}}</div>
              <div class="data-box">
<!--                <div class="split-line"></div>-->
                <div class="data">{{item.data}}{{item.unit}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--告警信息-->
      <div class="module_07">
        <sysTitle :title-data=titleData[5]></sysTitle>
        <div class="fault-alarm">
          <div class="table-title">
            <div class="title t1">最新变化时间</div>
            <div class="title t2">名称</div>
            <div class="title t3">告警SI码</div>
            <!-- <div class="title t4">当前值</div> -->
          </div>
          <div class="table-body">
            <div class="item" v-for="(item,index) in faultAlarmData" :key="index">
              <div class="item-text-time">{{item.dataInsertStart}}</div>
              <div class="item-text-name">{{item.warnName}}</div>
              <div class="item-text-siNumber">{{item.gdCode}}</div>
              <!-- <div class="item-data">{{item.data}}</div> -->
            </div>
          </div>
        </div>
      </div>

      <!--工单-->
      <div class="module_04">
        <sysTitle :title-data=titleData[2]></sysTitle>
        <div class="work-tickets">
          <div class="ticket" v-for="(item,index) in workTicketsData" :key="index">
            <div class="p1">
              <span>工单编号：{{item.gdCode}}</span>
              <div
                class="status"
                :class="{'status_undo':item.status==='ENTERING','status_done':item.status==='ENTERED'}"
              >
                {{item.statusDesc}}
              </div>
            </div>
            <div class="p2">
              <span>派单人：{{item.perInsert}}</span>
              <span>工单类型：{{item.workTypeDesc}}</span>
              <span>场站名称：{{item.siteidDesc}}</span>
            </div>
            <div class="p3">
              <span>派单时间：{{item.tmInsert}}</span>
              <span>检修截止时间：{{item.lastFinishedTm}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--操作票-->
      <!-- <div class="module_05">
        <sysTitle :title-data=titleData[3]></sysTitle>
        <div class="action-tickets-box">
          <div class="action-tickets" v-for="(item,index) in actionTickets" :key="index">
            <div class="p1">
              <div class="title">{{item.title}}</div>
              <div class="btn">查看全部</div>
            </div>
            <div class="p2">
              <span>发令人：{{item.creator}}</span>
              <span>受令人：{{item.gettor}}</span>
            </div>
            <div class="p3">
              <span>操作开始时间：{{item.createdTime}}</span>
              <span>操作结束时间：{{item.endTime}}</span>
            </div>
          </div>
        </div>
      </div> -->

    </div>

    <!--风机视频-->
    <FjVedioLayer ref="fjVideoLayerRef" v-if="equInfo.equCheckFlag === 2"></FjVedioLayer>

    <!--风机内部结构选择-->
<!--    <div class="fj-tag" v-if="equInfo.equCheckFlag === 2">-->
    <div class="fj-tag" v-if="isShowEquPanel">
      <div class="fj-item" :class="{'fj-item-check': item.checkFlag}" v-for="(item, index) in fjTagList" :key="index" @click="fjInsideChangeV2(item)">
        <span>{{ item.name }}</span>
      </div>
    </div>

    <!--风机监控弹窗-->
    <InfoPopup :isShow="fanMonitorIsShow" :title="fanMonitorPopTitle" @popupClose="fanMonitorPopClose" :msgPositionStyle="fanMonitorPopStyle">
      <DHPlayer :videoId="'player_v2'" ref="video_v2" ></DHPlayer>
    </InfoPopup>

    <!--风机内部结构弹窗-->
    <InfoPopup :isShow="fjPopShowFlag" :title="fjPopTitle" @popupClose="fjPopClose" :msgPositionStyle="msgPositionStyle">
      <div class="fj_div" v-for="(item, index) in fjTagList" :key="index" v-if="item.checkFlag">
<!--        <img :src="item.img" />-->
        <div class="fj_div_con">
          <div class="fj_div_list" :class="{'fj_div_list_line': groupIndex !== Math.ceil(item.dataList.length / item.moc)}" v-for="(groupIndex) in Math.ceil(item.dataList.length / item.moc)" :key="groupIndex">
            <div class="fj_div_list_con">
              <div class="fj_div_item" v-for="(subItem, subIndex) in item.dataList.slice((groupIndex-1) * item.moc, groupIndex * item.moc)" :key="subIndex">
                <div class="item_name">{{ subItem.name }}：</div>
                <div class="item_value">{{ subItem.value }} {{ subItem.unit }}</div>
              </div>
            </div>
            <!-- <div v-if="groupIndex !== Math.ceil(item.dataList.length / item.moc)" class="fj_line"></div> -->
          </div>
        </div>
      </div>
    </InfoPopup>
  </div>
</template>

<script>
import sysTitle from "@COM/smartOM/SysTitle.vue";
import lineChart2 from "@COM/charts/LineChart2.vue";

import http from "@/service/interface.js"
import { mapState, mapMutations } from "vuex";
import FjVedioLayer from "@/components/FjVedioLayer.vue";

import InfoPopup from "@/components/InfoPopup.vue";
import DHPlayer from "@COM/DHPlayer";
import FunBtnList from "@COM/funBtnList";
import airCityUtil from "@/utils/AirCityUtil";
export default {
  name: "equipmentDetails",
  components:{
    FunBtnList,
    DHPlayer,
    sysTitle,
    lineChart2,
    FjVedioLayer,
    InfoPopup
  },
  //此页面需要接受设备的编号等相关信息查询展示
  props:{
    equInfo:{
      type: Object,
      default:()=>{
        return {
          equNumber:'18号风机 金风GW171-6450',
          equBtnName:"风机监控",
          equInside: "内部结构",
          equBack: "返回",
          // 0 默认，1内部结构 2 风机监控
          equCheckFlag: 0
        }
      }
    }
  },
  computed: {
    ...mapState("home", [
      "provinceid",
      "sitetype",
      "fj_type",
      "siteInfo",
      "attr_oid",
      "attr_info",
      "groupSite"
    ]),
  },
  data(){
    return{
      btnList: [
        {
          name: '升压站F1',
          floor: 'f1',
          isCheck: false
        },
        {
          name: '升压站F2',
          floor: 'f2',
          isCheck: false
        },
        {
          name: '升压站F3',
          floor: 'f3',
          isCheck: false
        }
      ],
      isShowEquPanel: false,
      // 视频监控弹框显隐
      fanMonitorIsShow: false,
      fanMonitorPopTitle: '风机监控',
      fanMonitorPopStyle: {
        width: "1453px",
        height: "950px",
        left: '2405px',
        top: '512px',
      },
      currentNum: 0,
      channel1: "",
      isRedirect: false, // true 是代表重定向(拼接的)  false 表示取消重定向(接口返回)
      fjPopShowFlag: false,
      fjPopTitle: '实时运行数据',
      msgPositionStyle: {
        width: "1453px",
        height: "450px",
        // height: "950px",
        left: "4603px",
        top: "800px"
      },
      fjTagList: [
        {
          name: "发电机",
          camera: [1164999.48875, 3670336.196797, 126.845117, -19.801428, 156.047684, 0],
          checkFlag: false,
          img: new URL("../../../assets/images/home/fj/fj_fdj.png", import.meta.url).href,
          dataList: [
            // {
            //   name: "发电机绕组温度",
            //   value: "51.20",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机转子温度",
            //   value: "0.00",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机后轴承内圈温度",
            //   value: "43.00",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机后轴承外圈温度",
            //   value: "40.30",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机前轴承内圈温度",
            //   value: "47.25",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机前轴承外圈温度",
            //   value: "48.85",
            //   unit: "℃"
            // },
            // {
            //   name: "发电机转速瞬时值",
            //   value: "7.01",
            //   unit: "RPM"
            // },
          ],
          moc: 4,
        },
        {
          name: "机舱/塔筒",
          camera: [1165003.394844, 3670341.149453, 123.67252, -19.801428, 156.047684, 0],
          checkFlag: false,
          img: new URL("../../../assets/images/home/fj/fj_jc.png", import.meta.url).href,
          dataList: [
            // {
            //   name: "环境温度",
            //   value: "18.4",
            //   unit: "℃"
            // },
            // {
            //   name: "塔底环境温度",
            //   value: "23.9",
            //   unit: "℃"
            // },
            // {
            //   name: "环境湿度",
            //   value: "0.00",
            //   unit: "%"
            // },
            // {
            //   name: "机舱控制柜湿度",
            //   value: "0.00",
            //   unit: "%"
            // },
            // {
            //   name: "机舱控制柜温度",
            //   value: "35.80",
            //   unit: "℃"
            // },
            // {
            //   name: "机舱内平台温度",
            //   value: "32.10",
            //   unit: "℃"
            // },
            // {
            //   name: "机舱内湿度",
            //   value: "0.00",
            //   unit: "%"
            // },
            // {
            //   name: "机舱湿度",
            //   value: "40.83",
            //   unit: "%"
            // },
            // {
            //   name: "机舱温度",
            //   value: "24.40",
            //   unit: "℃"
            // },
          ],
          moc: 3,
        },
        {
          name: "轮毂/偏航",
          camera: [1164947.010781, 3670240.417422, 126.857168, -19.801455, -71.88781, 0.000001],
          checkFlag: false,
          img: new URL("../../../assets/images/home/fj/fj_yl.png", import.meta.url).href,
          dataList: [
            // {
            //   name: "1#变桨浆距角",
            //   value: "-1.53",
            //   unit: "度"
            // },
            // {
            //   name: "2#变桨浆距角",
            //   value: "-1.52",
            //   unit: "度"
            // },
            // {
            //   name: "3#变桨浆距角",
            //   value: "-1.49",
            //   unit: "度"
            // },

            // {
            //   name: "控制层湿度",
            //   value: "23.90",
            //   unit: "%"
            // },
            // {
            //   name: "控制层温度",
            //   value: "43.68",
            //   unit: "℃"
            // },
            // {
            //   name: "轮毂湿度",
            //   value: "0.00",
            //   unit: "%"
            // },
            // {
            //   name: "轮毂温度",
            //   value: "37.60",
            //   unit: "℃"
            // },

            // {
            //   name: "1#变桨浆速度",
            //   value: "0.01",
            //   unit: ""
            // },
            // {
            //   name: "2#变桨浆速度",
            //   value: "-0.01",
            //   unit: ""
            // },
            // {
            //   name: "3#变桨浆速度",
            //   value: "-0.01",
            //   unit: ""
            // },
            // {
            //   name: "变桨液压站压力",
            //   value: "232.83",
            //   unit: ""
            // },


          ],
          moc: 3,
        },
        {
          name: "变流器",
          camera: [1164988.032344, 3670316.854219, 112.60335, -11.378418, 168.004593, 0],
          checkFlag: false,
          img: new URL("../../../assets/images/home/fj/fj_blq.png", import.meta.url).href,
          dataList: [
            // {
            //   name: "理论有功功率",
            //   value: "62.02",
            //   unit: "KW"
            // },
            // {
            //   name: "网侧有功功率",
            //   value: "21.34",
            //   unit: "KW"
            // },
            // {
            //   name: "网侧无功功率",
            //   value: "-126.34",
            //   unit: "kvar"
            // },
            // {
            //   name: "网侧A相电压",
            //   value: "396.89",
            //   unit: "V"
            // },
            // {
            //   name: "网侧B相电压",
            //   value: "396.29",
            //   unit: "V"
            // },
            // {
            //   name: "网侧C相电压",
            //   value: "396.39",
            //   unit: "V"
            // },
            // {
            //   name: "网侧A相电流",
            //   value: "215.60",
            //   unit: "A"
            // },
            // {
            //   name: "网侧B相电流",
            //   value: "228.00",
            //   unit: "A"
            // },
            // {
            //   name: "网侧C相电流",
            //   value: "164.40",
            //   unit: "A"
            // },
            // {
            //   name: "网侧频率",
            //   value: "50.00",
            //   unit: "Hz"
            // },
            // {
            //   name: "变流层温度",
            //   value: "23.90",
            //   unit: "℃"
            // },
          ],
          moc: 3,
        },
        // {
        //   name: "其他事件",
        //   checkFlag: false,
        //   img: new URL("../../../assets/images/home/fj/fj_qt.png", import.meta.url).href,
        //   dataList: [
        //     // {
        //     //   name: "风速",
        //     //   value: "3.50",
        //     //   unit: "m/s"
        //     // },
        //     // {
        //     //   name: "风向角",
        //     //   value: "207.00",
        //     //   unit: "度"
        //     // },
        //     // {
        //     //   name: "环境温度",
        //     //   value: "18.5",
        //     //   unit: "℃"
        //     // },
        //     // {
        //     //   name: "绝对风向",
        //     //   value: "207.00",
        //     //   unit: "度"
        //     // },
        //     // {
        //     //   name: "风机发电量",
        //     //   value: "2461.97",
        //     //   unit: "万kWh"
        //     // },
        //   ],
        //   moc: 2,
        // },
      ],

      titleData:[
        {name:'实时监控',unit:'',bgIndex:0},
        {name:'实时出力',unit:'',bgIndex:1},
        {name:'工单',unit:'',bgIndex:0},
        {name:'操作票',unit:'（台）',bgIndex:0},
        {name:'实时运行数',unit:'',bgIndex:0},
        {name:'告警信息',unit:'',bgIndex:0}
      ],//各标题数组
      overallSituationData:[
        {
          label:"正常运行",
          state: [1,6,9,10],
          data: 0,
          color:"background: #2FD72F1A;color:#2FD72F;",
          color2: "color:#2FD72F;",
        },
        {
          label:"告警运行",
          state: [2],
          data: 0,
          color:"background: #F3E9001A;color:#F3E900;",
          color2: "color:#F3E900;",
        },
        {
          label:"限电",
          state: [3,8],
          data: 0,
          color:"background: #F36CFF1A;color:#F36CFF;",
          color2: "color:#F36CFF;",
        },
        {
          label:"待机",
          state: [4,5],
          data: 0,
          color:"background: #00AAF31A;color:#00AAF3;",
          color2: "color:#00AAF3;",
        },
        {
          label:"故障停机",
          state: [7],
          data: 0,
          color:"background: #F31D001A;color:#F31D00;",
          color2: "color:#F31D00;",
        },
        {
          label:"维修停机",
          state: [11],
          data: 0,
          color:"background: #F357001A;color:#F35700;",
          color2: "color:#F35700;",
        },
        {
          label:"维保停机",
          state: [12],
          data: 0,
          color:"background: #FF8ECB1A;color:#FF8ECB;",
          color2: "color:#FF8ECB;",
        },
        {
          label:"通讯中断",
          state: [0],
          data: 0,
          color:"background: #7E8F961A;color:#7E8F96;",
          color2: "color:#7E8F96;",
        },
      ],//风机总体运行情况模块数据
      realTimeMonitorData:{
        fst:[
          {
            label:"风速",
            data:"3.9",
            unit:"m/s"
          },
          {
            label:"有功功率",
            data:"323.0",
            unit:"kw"
          },
          {
            label:"转速",
            data:"6.3",
            unit:"m/s"
          }
        ],
        sec:[
          // {
          //   label:"额定功率",
          //   data:"23",
          //   unit:"kw"
          // },
          {
            label:"机舱温度",
            data:"38",
            unit:"℃"
          },
          {
            label:"桨叶电机温度",
            data:"54",
            unit:"℃"
          },
          {
            label:"齿轮油温",
            data:"50",
            unit:"℃"
          }
        ]
      },//实时监控模块数据
      realtimeOutputData:{
        xData: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22",],
        xType: "category",
        yData: {
          lineTilte01: '实时功率(KW)',
          lineTilte02: '平均风速(m/s)'
        },
        seriesData: [
          {
            name: "实时功率(MW)",
            type: "line",
            smooth: false, // true为曲线
            symbol: 'none',
            yAxisIndex: 0,
            lineStyle:{
              width: '5',
              color: '#28c0fa'
            },
            data: [ 5000, 5500, 4000, 5500, 4300, 3500, 3800, 4200, 5500, 6000, 4800, 3600]
          },
          {
            name: "平均风速(m/s)",
            type: "line",
            smooth: false, // true为曲线
            symbol: 'none',
            yAxisIndex: 1,
            lineStyle:{
              width: '5',
              color: '#ffffff'
            },
            data: [ 2.6, 2.7, 2.5, 3.1, 5.4, 5.0, 5.4, 4.5, 4.1, 3.7, 3.9, 5.1]
          },
        ],
        grid: {
          top: "25%",
          bottom: "13%",
          left: "7%",
          right: "5%"
        },
      },//实时出力模块数据
      workTicketsData:[
        // {
        //   "lastFinishedTm":"2022-06-1711:15:00",//工单截止时间
        //   "dataInsertEnd":"2022-06-1700:00:00",//数据接入结束时间
        //   "components":"变流器（变频器）",//零部件
        //   "statusDesc":"处理中",//工单状态描述
        //   "workTaskId":550,//主键
        //   "warnLevel":"中",//预警级别
        //   "handleResult":"预警信息准确，已完成处理。",//处理结果
        //   "siteidDesc":"内蒙古都荣风电场",//站点名称
        //   "remark":"数据计算周期：2022-06-1600:00:00到2022-06-1700:00:00，异常值：报警原因：网侧控制器温度异常，报警描述：网侧控制器与机侧控制器温差过大。与1#机侧控制器温差为11.22℃，与2#机侧控制器温差为3.17℃。报警部位：网侧控制器，异常时间：2022-06-1600:00:00至2022-06-1700:00:00",//备注
        //   "receiveDesc":"向星辰",//接单人
        //   "gdCode":"NMBYDR-GD-202206004",//工单编号
        //   "warnName":"网侧控制器温度异常",//预警名称
        //   "task":"内蒙古都荣风电场03-F032风机变流系统网侧控制器温度异常",//任务内容
        //   "workTypeDesc":"预警工单",//工单类型
        //   "systemName":"变流系统",//系统名称
        //   "perInsert":"系统派发",//工单派发人
        //   "tmInsert":"2022-06-1702:34:00",//派单时间
        //   "dataInsertStart":"2022-06-1600:00:00",//数据接入开始时间
        //   "tmReceive":"2022-06-1711:15:05",//接单时间
        //   "locationDesc":"测试",//逻辑设备名称
        //   "assetName":"03-F032风机",//设备名称
        //   "warnProgram":"1.请查看机组预警发布前1日的实时数据中网侧、机侧控制器温度数据异常情况@2.请检查变流器内部循环散热风扇运行是否异常@3.请检查网侧或机侧控制器温度传感器的接线是否异常@4.请检查水冷散热系统是否异常",//预警方案
        //   "warnAccuracy":"是",//预警是否准确
        //   "status":"HANDING" //状态值
        // }
      ],//工单模块数据
      actionTickets:[
        {
          title:"海上风电场-操作票",
          creator:"王帅凯",
          gettor:"石宇鹏",
          createdTime:"2023-02-09 12:36:54",
          endTime:"2023-02-25 12:36:54"
        },
        {
          title:"海上风电场-操作票",
          creator:"王帅凯",
          gettor:"石宇鹏",
          createdTime:"2023-02-09 12:36:54",
          endTime:"2023-02-25 12:36:54"
        },
        {
          title:"海上风电场-操作票",
          creator:"王帅凯",
          gettor:"石宇鹏",
          createdTime:"2023-02-09 12:36:54",
          endTime:"2023-02-25 12:36:54"
        },
        {
          title:"海上风电场-操作票",
          creator:"王帅凯",
          gettor:"石宇鹏",
          createdTime:"2023-02-09 12:36:54",
          endTime:"2023-02-25 12:36:54"
        },
        {
          title:"海上风电场-操作票",
          creator:"王帅凯",
          gettor:"石宇鹏",
          createdTime:"2023-02-09 12:36:54",
          endTime:"2023-02-25 12:36:54"
        }
      ],//操作票模块数据
      realTimeRunData:[
        {
          label:"额定功率",
          data:"4500",
          unit:"kw"
        },
        {
          label:"功率因数",
          data:"1.00",
          unit:""
        },
        {
          label:"轮毂温度",
          data:"101",
          unit:"℃"
        },
        {
          label:"风向角",
          data:"1810.56",
          unit:"Deg"
        },
        {
          label:"轮毂高度",
          data:"155",
          unit:"m"
        }
      ],//实时运行模块数据
      faultAlarmData:[
        {
          "lastFinishedTm":"2022-06-1711:15:00",//工单截止时间
          "dataInsertEnd":"2022-06-1700:00:00",//数据接入结束时间
          "components":"变流器（变频器）",//零部件
          "statusDesc":"处理中",//工单状态描述
          "workTaskId":550,//主键
          "warnLevel":"中",//预警级别
          "handleResult":"预警信息准确，已完成处理。",//处理结果
          "siteidDesc":"内蒙古都荣风电场",//站点名称
          "remark":"数据计算周期：2022-06-1600:00:00到2022-06-1700:00:00，异常值：报警原因：网侧控制器温度异常，报警描述：网侧控制器与机侧控制器温差过大。与1#机侧控制器温差为11.22℃，与2#机侧控制器温差为3.17℃。报警部位：网侧控制器，异常时间：2022-06-1600:00:00至2022-06-1700:00:00",//备注
          "receiveDesc":"向星辰",//接单人
          "gdCode":"NMBYDR-GD-202206004",//工单编号
          "warnName":"网侧控制器温度异常",//预警名称
          "task":"内蒙古都荣风电场03-F032风机变流系统网侧控制器温度异常",//任务内容
          "workTypeDesc":"预警工单",//工单类型
          "systemName":"变流系统",//系统名称
          "perInsert":"系统派发",//工单派发人
          "tmInsert":"2022-06-1702:34:00",//派单时间
          "dataInsertStart":"2022-06-1600:00:00",//数据接入开始时间
          "tmReceive":"2022-06-1711:15:05",//接单时间
          "locationDesc":"测试",//逻辑设备名称
          "assetName":"03-F032风机",//设备名称
          "warnProgram":"1.请查看机组预警发布前1日的实时数据中网侧、机侧控制器温度数据异常情况@2.请检查变流器内部循环散热风扇运行是否异常@3.请检查网侧或机侧控制器温度传感器的接线是否异常@4.请检查水冷散热系统是否异常",//预警方案
          "warnAccuracy":"是",//预警是否准确
          "status":"HANDING" //状态值
        }
      ],//告警信息模块数据
      fjDataList: [],

      // 风机数据
      swturInfo: {},

      //
      stopList: [3,8,4,5,7,11,12,0],

      titleStyle: "",
    }
  },
  watch: {

  },
  mounted() {
    if (this.$store.state.home.regionBgFlag === 3) {
      this.equInfo.equCheckFlag = 2
    }
    this.initSiteInfo()

    this.getSwturRealtimeOutput(this.attr_oid)
    this.getSwturInfo(this.attr_oid)

    this.$bus.$on("showFanMonitor", (e) => {
      this.fanMonitorPopTitle = `${e.markerData.type}风机监控`
      this.fanMonitorIsShow = true
      this.getIccVideInfo(e.markerData.channelId)
    });
    // this.queryYjWorktask()
  },
  methods: {
    ...mapMutations("home", [
        "SET_PROVINCEID",
        "SET_PROVINCENAME",
        "SET_SITETYPE",
        "SET_FJ_TYPE",
        "SET_REGIONBGFLAG",
        "SET_SITEINFO",
        "SET_ATTR_OID",
        "SET_ATTR_INFO"
    ]),

    // 获取视频流
    getIccVideInfo(cId, index) {
      http.sx.iccVideoInfo({
        channelId: cId
      }).then(res => {
        if (res.data && res.data.length > 0 && res.data[0].data && res.data[0].data.url) {
          let arr = res.data[0].data.url.split('|')
          let url = arr[3] + '?token='+ res.data[0].data.token +'&trackID=701'
          setTimeout(() => {
            this.$refs.video_v2.setRealTime({ channelId: this.channel1, path: url, snum: this.currentNum, redirect: this.isRedirect})
          }, 1000)
        }
      })
    },

    initSiteInfo() {

      if (this.siteInfo.jk_oid) {
        const arr = this.siteInfo.groupSiteStr ? this.siteInfo.groupSiteStr.split(",") : []
        http.sx.getSWTURDataByStanid({
          stnid: this.siteInfo.jk_oid,
          groupSite: arr.length > 1 ? this.groupSite : ""
        }).then(res => {
          if (res.status === 200) {
            res.data.forEach(item => {
              item.fjNum = item.name.replace('H10-', '').replace('H6-', '').replace('F', '').replace('号风机', '').replace('风机', '')
              if (item.attr_oid === this.attr_oid) {
                item.checkFlag = true
                this.equInfo.equNumber = item.fjNum + "号风机 " + item.model.split("-")[1]

                if (this.$refs.fjVideoLayerRef) {
                  if (this.stopList.includes(item.uswturstatus)) {
                    this.$refs.fjVideoLayerRef.stopVideoBg()
                  } else {
                    this.$refs.fjVideoLayerRef.startVideoBg()
                  }
                }

                this.queryYjWorktask(item.fjNum)

              } else {
                item.checkFlag = false
              }

              this.overallSituationData.forEach(it => {
                if (it.state.includes(item.uswturstatus)) {
                  it.data++
                  item.color = it.color2
                  if (item.attr_oid === this.attr_oid) {
                    this.titleStyle = it.color2
                  }
                }
              })

            })
            this.fjDataList = res.data.sort(function (a, b) {
              return a.fjNum - b.fjNum
            })
          }
        })
      }

    },
    fjCodeClick(item) {
      this.overallSituationData.forEach(it => {
        if (it.state.includes(item.uswturstatus)) {
          this.titleStyle = it.color2
        }
      })

      this.fjDataList.forEach(it => {
        if (it.attr_oid === item.attr_oid) {
          it.checkFlag = true
          this.equInfo.equNumber = it.fjNum + "号风机 "  + item.model

          this.SET_ATTR_INFO(it)

          this.getSwturRealtimeOutput(it.attr_oid)
          this.getSwturInfo(it.attr_oid)

          if (this.$refs.fjVideoLayerRef) {
            if (this.stopList.includes(it.uswturstatus)) {
              this.$refs.fjVideoLayerRef.stopVideoBg()
            } else {
              this.$refs.fjVideoLayerRef.startVideoBg()
            }
          }
          // 48号风机为示例，看内部结构
          if (it.fjNum === '48') {
            this.isShowEquPanel = true
            airCityUtil.layerChange(['48号风机内部结构'], true)
            airCityUtil.layerChange(['明阳风机摆放'], false)
          } else {
            this.isShowEquPanel = false
            airCityUtil.layerChange(['48号风机内部结构'], false)
            airCityUtil.layerChange(['明阳风机摆放'], true)
          }

          this.queryYjWorktask(it.fjNum)

        } else {
          it.checkFlag = false
        }
      })

      if (this.$store.state.home.siteInfo.thirdType === 1) {
        // 三维，定位到风机视角
        let obj = JSON.parse(item.camera_location)
        __g.camera.set(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5])
      }
    },
    rebackClick () {
      // 返回上一步路由
      this.$router.go(-1)
      if (this.$store.state.home.siteInfo && this.$store.state.home.siteInfo.thirdType === 1) {
          this.SET_REGIONBGFLAG(2)
      }
    },
    equChangeClick(val) {
      if (this.equInfo.equCheckFlag !== val) {
        this.equInfo.equCheckFlag = val
        this.SET_REGIONBGFLAG(3)
      } else {
        this.equInfo.equCheckFlag = 0
        this.SET_REGIONBGFLAG(2)
      }

    },
    fjInsideChange(item) {
      // this.fjPopShowFlag = true
      this.fjTagList.forEach(it => {
        // it.checkFlag = it.name === item.name
        if (it.name === item.name) {
          it.checkFlag = !it.checkFlag

          this.fjPopShowFlag = it.checkFlag

          this.$refs.fjVideoLayerRef.butList.forEach(it2 => {
            it2.showFlag = false
          })

        } else {
          it.checkFlag = false
        }
      })
    },

    // 风机内部结构按钮change   V2
    fjInsideChangeV2 (item) {
      this.fjTagList.forEach((it, idx) => {
        if (it.name === item.name) {
          this.fjPopShowFlag = false
          __g.camera.set(it.camera)
          __g.misc.callBPFunction({
            // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认
            actorTag: 'FengJi',
            // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取
            objectName: 'ShowManger_2',
            // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在
            functionName: 'ShowState',
            // 传入参数类型  参考BPFuncParamType枚举
            paramType: BPFuncParamType.Int32,
            // 根据传入参数类型设置对应参数值
            paramValue: 5
          });
          __g.misc.callBPFunction({
            // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认
            actorTag: 'FengJi',
            // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取
            objectName: 'ShowManger_2',
            // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在
            functionName: 'ShowState',
            // 传入参数类型  参考BPFuncParamType枚举
            paramType: BPFuncParamType.Int32,
            // 根据传入参数类型设置对应参数值
            paramValue: idx + 1
          });
          it.checkFlag = !it.checkFlag

          setTimeout(() => {
            this.fjPopShowFlag = it.checkFlag
          }, 2000)
          // this.$refs.fjVideoLayerRef.butList.forEach(it2 => {
          //   it2.showFlag = false
          // })
        } else {
          it.checkFlag = false
        }
      })
    },
    fjPopClose() {
      __g.misc.callBPFunction({
        // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认
        actorTag: 'FengJi',
        // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取
        objectName: 'ShowManger_2',
        // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在
        functionName: 'ShowState',
        // 传入参数类型  参考BPFuncParamType枚举
        paramType: BPFuncParamType.Int32,
        // 根据传入参数类型设置对应参数值
        paramValue: 5
      });
      this.fjPopShowFlag = false
      this.fjTagList.forEach(item => {
        item.checkFlag = false
      })
    },
    fanMonitorPopClose() {
      this.fanMonitorIsShow = false
    },
    // 获取风机的实时出力数据（有功功率，风速）
    getSwturRealtimeOutput(attr_oid) {
      http.sx.getSwturRealtimeOutput({
        swturId: attr_oid
      }).then(res => {
        if (res.status === 200) {
          this.realtimeOutputData.xData = []
          this.realtimeOutputData.xType = "time"

          let d1 = [], d3 = []
          res.data.forEach(item => {
            // this.realtimeOutputData.xData.push(item.create_time)
            // d1.push(item.fcurp)
            // d3.push(item.fcurwindspeed)
            d1.push({
              name: item.create_time,
              value: [item.create_time, item.fcurp]
            })
            d3.push({
              name: item.create_time,
              value: [item.create_time, item.fcurwindspeed]
            })
          })
          this.realtimeOutputData.seriesData[0].data = d1
          this.realtimeOutputData.seriesData[1].data = d3

          this.$refs.realTimeOutputDataRef.initChart()
        }
      })
    },

    // 获取风机的数据
    getSwturInfo(attr_oid) {
      http.sx.getSwturInfo({
        swturId: attr_oid
      }).then(res => {
        if (res.status === 200) {
          this.swturInfo = res.data

          // 风速
          this.realTimeMonitorData.fst[0].data = res.data.fcurwindspeed ? res.data.fcurwindspeed.toFixed(2) : 0
          // 有功功率
          this.realTimeMonitorData.fst[1].data = res.data.fcurp ? res.data.fcurp.toFixed(2) : 0


          // 额定功率
          this.realTimeMonitorData.sec[0].data = res.data.fnrp ? res.data.fnrp.toFixed(2) : 0

          // 额定功率
          this.realTimeRunData[0].data = res.data.fnrp ? res.data.fnrp.toFixed(2) : 0


          // 风向角
          this.realTimeRunData[3].data = res.data.fcurwinddirection ? res.data.fcurwinddirection.toFixed(2) : 0


          res.data.kafkaData.forEach(item => {
            if (item.index_type === '发电机转速瞬时值') {
              // 转速
              this.realTimeMonitorData.fst[2].data = item.value ? item.value.toFixed(2) : 0
            }
            if (item.index_type === '机舱温度') {
              // 机舱温度
              this.realTimeMonitorData.sec[0].data = item.value ? item.value.toFixed(2) : 0
            }
            if (item.index_type === '变桨轮毂温度') {
              // 桨叶电机温度
              this.realTimeMonitorData.sec[1].data = item.value ? item.value.toFixed(2) : 0
            }
            if (item.index_type === '轮毂温度') {
              // 齿轮油温
              this.realTimeMonitorData.sec[2].data = item.value ? item.value.toFixed(2) : 0
            }

            if (item.index_type === '功率因数') {
              // 功率因数
              this.realTimeRunData[1].data = item.value ? item.value.toFixed(2) : 0
            }
            if (item.index_type === '轮毂温度') {
              // 轮毂温度
              this.realTimeRunData[2].data = item.value ? item.value.toFixed(2) : 0
            }
            if (item.index_type === '轮毂湿度') {
              // 轮毂湿度
              this.realTimeRunData[4].data = item.value ? item.value.toFixed(2) : 0
            }

          })

          this.fjTagList.forEach(it => {
            it.dataList = []
            res.data.kafkaData.forEach(item => {
              if (it.name === item.equip_group) {
                it.dataList.push({
                    name: item.index_type,
                    value: item.value ? item.value.toFixed(2) : 0,
                    unit: item.index_type_unit
                })
              }
            })
            it.moc = it.dataList.length > 4 ? Math.ceil(it.dataList.length / 3) : 4
          })

        }
      })
    },


    // 获取预警工单接口
    queryYjWorktask(fjNum) {
      http.sx.commonQuery({
        // 三峡接口路径
        "apiUrl":"/sxxny/dpInfo/queryYjWorktask",
        // 请求方式：GET，POST
        "method":"GET",
        // 类型 1 一体化平台  2 集控 3 一体化平台请求IP地址标志
        "type":"1",
        // 接口请求参数，具体参数，根据接口而定
        "params":{
          // 状态 ENTERING 待接单 HANDING 处理中 ENTERED 已处理
          // "status": "",r
          // 风机名称，模糊查询
          "assetName": fjNum,
          // 一体化平台-场站编码，
          "siteid": this.siteInfo.siteid
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data && res.data.data) {
            this.workTicketsData = res.data.data
            this.faultAlarmData = res.data.data
          }
        }
      })
    },

  },
  beforeDestroy() {
    this.$bus.$off('showFanMonitor')
  }
}
</script>

<style scoped lang="scss">
.equipmentDetails{
  .left_area{
    //风机总体运行情况
    .module_01{

      .equ-title{
        display: flex;
        width: 100%;
        height: 58px;
        align-items: center;
        .icon{
          width: 39px;
          height: 58px;
          background: url("@ASS/images/components/title_icon.png") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
        .content{
          width: calc(100% - 59px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 20px;
          background: url("@ASS/images/components/title_bg_lang.webp") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          font-family: 'Alibaba-PuHuiTi-Medium';
          font-style: normal;
          font-weight: 400;
          color: #FFFFFF;
          position: relative;

          .name{
            font-size: 54px;
            line-height: 74px;
            margin-left: 105px;
          }
          .btn{
            display: flex;
            font-size: 38px;
            line-height: 38px;
            padding: 11px 20px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 86px;
            letter-spacing: 0.06rem;
            &:hover{
              cursor: pointer;
            }
            .btn-check {
              color: #23FFF2;
            }
            .btn-icon{
              margin-left: 20px;
              width: 40px;
              height: 40px;
              background: url("@ASS/images/components/title_btn_icon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .reback {
            width: 159px;
            height: 68px;
            line-height: 68px;
            position: absolute;
            right: -260px;
            top: 0px;
            background: rgba(0, 0, 0, 0.6);
            border: 2px solid #27FFFF;
            border-radius: 73px;
            text-align: center;
            cursor: pointer;

            span {
              font-family: 'Alibaba-PuHuiTi-Medium';
              font-style: normal;
              font-weight: 400;
              font-size: 40px;
              color: #27FFFF;
            }
          }
        }
      }

      .overall-situation{
        margin-top: 30px;
        padding: 30px 0 30px 30px;
        height: 490px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-button {
          display: none;
        }
        &::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        &::-webkit-scrollbar-thumb {
          border: 1px solid #27FFFF;
          box-sizing: border-box;
        }
        .total{
          display: flex;
          font-family: 'Alibaba-PuHuiTi-Medium';
          font-style: normal;
          font-weight: 400;
          font-size: 32px;
          line-height: 32px;

          .total-item{
            margin-right: 20px;
            padding: 10px;
            text-align: center;
          }
        }

        .items{
          display: flex;
          flex-wrap: wrap;

          .item{
            margin-top: 20px;
            margin-right: 20px;
            width: 126px;
            height: 56px;
            background: rgba(47, 215, 47, 0.1);
            border-radius: 73px;
            font-family: 'Alibaba-PuHuiTi-Medium';
            font-style: normal;
            font-weight: 400;
            font-size: 48px;
            line-height: 48px;
            text-align: center;
            color: #2FD72F;
            &:nth-child(15n+15){
              margin-right: 0;
            }
          }
          .item_check {
            background: rgba(0, 0, 0, 0.6);
            border: 2px solid #27FFFF;
            color: #27FFFF !important;
          }
        }
      }
    }

    //实时出力
    .module_03{
      margin-top: 40px;
      width: 100%;

      .real-time-output{
        margin-top: 30px;
        height: 762px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
      }
    }
  }
  .right_area{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    //工单
    .module_04{
      width: 1096px;
      margin-bottom: 40px;
      flex-shrink: 0;
      flex-grow: 0;

      .work-tickets{
        margin-top: 30px;
        padding: 0 40px;
        // height: 660px;
        // height: 394px;
        height: 1444px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        font-family: 'Alibaba-PuHuiTi-Medium';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #FFFFFF;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }

        .ticket{
          margin-top: 50px;

          .p1{
            height: 44px;
            display: flex;
            justify-content: space-between;
            .status{
              text-align: center;
              width: 121px;
              height: 44px;
              line-height: 44px;
              background: rgba(255, 151, 29, 0.05);
              box-shadow: inset 0 0 4px #FF971D;
              border-radius: 6px;
            }
            .status_undo{
              background: rgba(255, 29, 108, 0.05);
              box-shadow: inset 0 0 4px #ef0933;
            }
            .status_done{
              background: rgba(29, 101, 255, 0.05);
              box-shadow: inset 0 0 4px #0974ef;
            }
          }
          .p2{
            display: flex;
            height: 44px;
            margin-top: 30px;
            span{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-left: 40px;
              &:first-child{
                margin-left: 0;
              }
            }
          }
          .p3{
            display: flex;
            height: 44px;
            margin-top: 30px;
            span{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:last-child{
                margin-left: 40px;
              }
            }
          }
        }
      }
    }

    //实时监控
    .module_02{
      width: 1096px;
      // margin-top: 47px;

      .real-time-monitor{
        margin-top: 30px;
        // display: flex;
        height: 446px;

        .left-data-box{
          display: flex;
          justify-content: space-between;

          .item{
            // margin-right: 30px;
            width: 347px;
            height: 208px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 30px;

            .data-box{
              padding: 0 20px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 32px;
              line-height: 39px;
              color: #FFFFFF;
              .label{
                display: flex;
                align-items: center;
                .icon{
                  display: inline-block;
                  margin-right: 10px;
                }
                .icon0{
                  width: 30px;
                  height: 25px;
                  background: url("@ASS/images/equipmentDetails/icon0.png") no-repeat;
                  background-size: 100% 100%;
                }
                .icon1{
                  width: 26px;
                  height: 24px;
                  background: url("@ASS/images/equipmentDetails/icon1.png") no-repeat;
                  background-size: 100% 100%;
                }
                .icon2{
                  width: 27px;
                  height: 25px;
                  background: url("@ASS/images/equipmentDetails/icon2.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              .data{
                font-size: 48px;
                line-height: 48px;
                color: #2CD7FF;
                text-align: center;
                display: flex;
              }
            }

            .process-box{
              padding: 0 20px;
              height: 110px;
              overflow: hidden;
              background: rgba(0, 0, 0, 0.1);
              border-radius: 30px;

              .process-bg{
                margin-top: 30px;
                height: 2px;
                background-color: rgba(255, 255, 255, 0.3);
                display: flex;
                align-items: center;

                .process-line{
                  width: 210px;
                  height: 4px;
                  background: linear-gradient(90deg, #29BCFB 0%, #25FFF7 100%);
                  border-radius: 27px;
                }
                .process-dot{
                  width: 10px;
                  height: 10px;
                  background: #FFFFFF;
                  box-shadow: 0 0 16px #37FFFF;
                }
              }

              .process-number{
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                font-family: 'Alibaba-PuHuiTi-Medium';
                font-style: normal;
                font-weight: 400;
                font-size: 30px;
                line-height: 36px;
                color: rgba(255, 255, 255, 0.8);
              }
            }
          }
        }

        .right-data-box{
          display: flex;
          justify-content: space-between;
          margin-top: 30px;

          .item{
            width: 347px;
            height: 208px;
            // margin-right: 30px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .label{
              padding: 0 20px;
              height: 98px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 32px;
              line-height: 98px;
              color: #FFFFFF;
            }
            .data-box{
              //padding: 0 20px;
              width: 100%;
              height: 110px;
              background: rgba(0, 0, 0, 0.1);
              border-radius: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Alibaba-PuHuiTi-Medium';
              font-style: normal;
              font-weight: 400;
              font-size: 48px;
              line-height: 48px;
              color: #F7CA69;
              .split-line{
                width: 78px;
                height: 12px;
                background: url("@ASS/images/equipmentDetails/split-line-arrow.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }

    //操作票
    .module_05{
      width: 1096px;
      flex-shrink: 0;
      flex-grow: 0;

      .action-tickets-box{
        margin-top: 30px;
        // height: 660px;
        height: 920px;
        overflow: auto;
        &::-webkit-scrollbar{
          display: none;
        }

        .action-tickets{
          padding: 0 40px;
          height: 258px;
          margin-bottom: 30px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 30px;
          font-family: 'Alibaba-PuHuiTi-Medium';
          font-style: normal;
          font-weight: 400;
          font-size: 32px;
          line-height: 44px;
          color: #FFFFFF;
          overflow: hidden;
          &:last-child{
            margin-bottom: 0;
          }

          .p1{
            margin-top: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 44px;
            .btn{
              color: #2CD7FF;
            }
          }
          .p2{
            display: flex;
            height: 44px;
            margin-top: 30px;
            span{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-left: 40px;
              &:first-child{
                margin-left: 0;
              }
            }
          }

          .p3{
            display: flex;
            height: 44px;
            margin-top: 30px;
            span{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:last-child{
                margin-left: 40px;
              }
            }
          }
        }
      }
    }
    //实时运行数据
    .module_06{
      width: 1096px;
      margin-bottom: 40px;
      flex-shrink: 0;
      flex-grow: 0;

      .real-time-run-data{
        margin-top: 30px;
        height: 394px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;

        .table-title-box{
          padding: 0 30px;
          height: 99px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Alibaba-PuHuiTi-Medium';
          font-style: normal;
          font-weight: 400;
          font-size: 32px;
          color: rgba(255, 255, 255, 0.6);

          .title-item{
            display: flex;
            justify-content: space-between;
            width: 503px;
            align-items: center;
            .split-line{
              width: 326px;
              height: 4px;
              background-color: rgba(255, 255, 255, 0.3);
            }
          }
        }

        .table-body-box{
          padding: 30px;
          height: 235px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 30px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;

          .body-item{
            margin-bottom: 20px;
            width: 503px;
            height: 66px;
            background: rgba(0, 0, 0, 0.08);
            border-radius: 3px 30px 30px 15px;
            font-family: 'Alibaba-PuHuiTi-Medium';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 44px;
            color: #FFFFFF;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:last-child{
              width: 1036px;
              margin-bottom: 0;
            }
            .label{
              margin-left: 30px;
            }
            .data{
              margin-right: 20px;
              font-size: 48px;
              background: linear-gradient(90deg, #29BCFB 0%, #25FFF7 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              span{
                font-size: 30px;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    //告警信息
    .module_07{
      width: 1096px;
      flex-shrink: 0;
      flex-grow: 0;
      margin-top: 40px;

      .fault-alarm{
        margin-top: 30px;
        height: 343px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;

        .table-title{
          display: flex;
          align-items: center;
          // justify-content: flex-start;
          padding: 30px 30px 0;
          justify-content: space-around;

          .title{
            flex-shrink: 0;
            font-family: 'Alibaba-PuHuiTi-Medium';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 44px;
            color: rgba(255, 255, 255, 0.6);
          }
          .t2{
            margin-left: 267px;
          }
          .t3{
            margin-left: 249px;
          }
          .t4{
            margin-left: 14px;
          }
        }

        .table-body{
          height: 250px;
          margin-top: 10px;
          padding: 0 30px;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }

          .item{
            margin-top: 26px;
            width: 1036px;
            height: 64px;
            background: rgba(0, 0, 0, 0.08);
            border-radius: 3px 30px 30px 15px;
            display: flex;
            align-items: center;
            font-family: 'Alibaba-PuHuiTi-Medium';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 44px;
            color: #FFFFFF;
            justify-content: space-around;
            &:first-child{
              margin-top: 0;
            }
            .item-text-time{
              // flex: 2;
              flex-shrink: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .item-text-name{
              // flex: 5;
              flex-shrink: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .item-text-siNumber{
              // flex: 1.5;
              flex-shrink: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .item-data{
              flex: 0.5;
              flex-shrink: 0;
              color: #2CD7FF;
            }
          }
        }
      }
    }
  }
  #player_v2 {
    width: 100%;
    height: 100%;
    border: 3px solid #2db7f4;
    background-color: #161a1e;
    margin-bottom: 20px;
  }
}

.fj-tag {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  position: absolute;
  // width: 243px;
  height: 260px;
  left: 5985px;
  top: 1419px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 1.4593px 1.4593px rgba(39, 255, 255, 0.8);
  border-radius: 26px;
  z-index: 1;
  cursor: pointer;

  .fj-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 3px 49px;
    gap: 14px;
    width: 203px;
    height: 51px;
    background: #6D7D8A;
    border-radius: 179.494px;
    flex: none;
    order: 0;
    flex-grow: 0;
    justify-content: space-around;
    box-sizing: border-box;

    span {
      font-family: 'Alibaba-PuHuiTi-Bold';
      font-style: normal;
      font-weight: 900;
      font-size: 32px;
      line-height: 45px;
      letter-spacing: 0.1em;
      color: #2A2E39;
      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }
  .fj-item-check {
    background: rgba(1, 13, 25, 0.3);
    border: 2.9186px solid #27FFFF;

    span {
      color: #27FFFF;
    }
  }
}

.fj_div {
  padding: 25px;
  text-align: center;
  img {
    // width: 1376px;
    height: 548px;
    border-radius: 15px;
  }
  .fj_div_con {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    .fj_div_list {
      display: flex;
      justify-content: center;
      position: relative;
      min-width: 33.3%;
      .fj_div_list_con {
        // width: 340px;
        // display: grid;
        .fj_div_item {

          width: 100%;
          height: 56px;
          line-height: 56px;
          font-family: 'Alibaba-PuHuiTi-Medium';
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          color: #E3E3E3;
          display: flex;
          float: left;
          justify-content: center;
          .item_name {
            // width: 270px;
          }
          .item_value {

          }
        }
      }

      .fj_line {
        position: absolute;
        right: 25px;
        top: 0;

        width: 0px;
        height: 162px;
        opacity: 1;
        border: 1px solid;
        border-image: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
      }
    }
    .fj_div_list_line {
      border-right: 1px solid;
      border-image: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
    }
  }

}
</style>
