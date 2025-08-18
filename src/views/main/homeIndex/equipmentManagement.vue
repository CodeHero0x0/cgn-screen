<template>
    <div class="homeIndex">
        <div class="con">
			<div class="homeIndexHead">
				<WeatherWidget class="weather"></WeatherWidget>
				<div class="time">
					<Time></Time>
				</div>
			</div>
			<div class="conLeft">
                <h2></h2>
				<div class="PowerGeneration">
                    <div class="PowerGeneration-left">
                        <div class="state-realTime">
                            <div class="state">
								<h2></h2>
								<div>
									<p v-for="value in statedata">
										<span class="state-span1">{{ value.name }}</span>
										<span class="state-span2"></span>
										<span class="state-span3">
											<i style="color: rgba(255, 255, 255, 0.60);opacity: 0.8;">正常</i>
											<i style="color: #00F2FF;">{{ value.speed }}</i>
										</span>
										<span class="state-span4">
											<i style="color: rgba(255, 255, 255, 0.60);opacity: 0.8;">异常</i>
											<i style="color: #FF990B;">{{ value.abnormal }}</i>
										</span>
										<span class="state-span5">
											<i style="color: rgba(255, 255, 255, 0.60);opacity: 0.8;">维护</i>
											<i style="color: #FEFF30;">{{ value.maintenance }}</i>
										</span>
									</p>
								</div>
							</div>
                            <div class="realTime">
								<h2><span>(万kWh)</span></h2>
								<RealTimeOutput  
								:yearbefore="yearbefore"
								:lastyear="lastyear"
								:thisyear="thisyear">
							</RealTimeOutput>
							</div>
                        </div>
                        <div class="Alarm-prompt">
							<h2></h2>
							<monitorEarlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></monitorEarlyWarning>
						</div>
                        <div class="statistical-analysis">
                            <div class="statistical">
								<h2></h2>
								<div>
									<p v-for="value in statisticaldata">
										<span class="statistical-span1">{{ value.name }} : </span>
										<span style="color: #fff;">{{ value.quantity }}</span>
										条
									</p>
								</div>
							</div>
                            <div class="analysis">
								<h2></h2>
								<EarlywarningAnalysis class="EarlywarningAnalysis" :echartsData="echartsData" :predictionData="chartData"></EarlywarningAnalysis>
							</div>
                        </div>
                    </div>
                    <div class="PowerGeneration-right">
                       <div class="monitor">
                            <div class="grid-item-div2">
								<div class="grid-item-div2-div1" v-for="item in monitor">
									<p>
										<img :src="item.img"/>
										
										<span>{{ item.name }}</span>
												
									</p>
									<p v-if="item.id == 1 || item.id == 3 || item.id == 4">
										<span>正常: <i style="color: #00F2FF;"> {{ item.normal }}</i></span>
										<span>故障: <i style="color: #FF230B;"> {{ item.fault }}</i></span>
										<span >告警: <i style="color: #FF990B;"> {{ item.Warning }}	</i></span>
									</p>
									<p v-if="item.id == 2">
										<span>正常: <i style="color: #00F2FF;"> {{ item.normal }}</i></span>
										<span>故障: <i style="color: #FF230B;"> {{ item.fault }}</i></span>
										<span >无法连接: <i style="color: #ACACAC;"> {{ item.Warning }}	</i></span>
									</p>
									<p v-if="item.id == 5">
										<span>功能推出: <i style="color: #FF230B;"> {{ item.normal }}</i></span>
										<span>功能闭锁: <i style="color: #FF990B;"> {{ item.fault }}</i></span>
									</p>
									<p v-if="item.id == 6 || item.id == 8 ">
										<span>正常: <i style="color: #00F2FF;"> {{ item.normal }}</i></span>
										<span>异常: <i style="color: #FF230B;"> {{ item.fault }}</i></span>
									</p>
									<p v-if="item.id == 7">
										<span>正常: <i style="color: #00F2FF;"> {{ item.normal }}</i></span>
										<span>无法越限: <i style="color: #FF230B;"> {{ item.fault }}</i></span>
										<span >表计异常: <i style="color: #FF990B;"> {{ item.Warning }}	</i></span>
									</p>
									<p v-if="item.id == 9">
										<span>正常: <i style="color: #00F2FF;"> {{ item.normal }}</i></span>
										<span>故障: <i style="color: #FF230B;"> {{ item.fault }}</i></span>
										<span >报警: <i style="color: #FF990B;"> {{ item.Warning }}	</i></span>
									</p>
								</div>
							</div>
                       </div>
                       <div class="early-warning">
							<h2></h2>
							<monitorEarlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></monitorEarlyWarning>
					   </div>
					</div>
				</div>
			</div>
			<div class="conmiddle">
                <div class="conmiddle-right">
					<h2></h2>
					<div>
						<button>全部</button>
						<button>风电</button>
						<button>光伏</button>
						<button>储能</button>
						<button>源网荷储</button>
					</div>
					
				</div>
				<div class="conmiddle-div">
					<button>公司总览</button>
					<button>业务运营</button>
					<button>资源禀赋</button>
					<button>设备管控</button>
				</div>
			</div>
			<div class="conRight">
				<div class="Intelligent-patrol">
					<h2></h2>
					<div class="Inspection-statistics">
						<h2></h2>
					</div>
					<div class="reliability-index">
						<h2></h2>
						<div class="reliability-index-div">
							<div>
								<p>0%</p>
								<p>巡视点位漏检率</p>
							</div>
							<div>
								<p>0%</p>
								<p>巡视点位漏检率</p>
							</div>
							<div>
								<p>0%</p>
								<p>巡视点位漏检率</p>
							</div>
							<div>
								<p>0%</p>
								<p>巡视点位漏检率</p>
							</div>
						</div>
					</div>
					<div class="Alarm-Statistics">
						<h2></h2>
						<monitorEarlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></monitorEarlyWarning>
					</div>
					<div class="UAV">
						<h2></h2>
						<div class="UAV-div">
							<div class="UAV-left">
								<p>
									<span>摄像头<i></i></span>
									<span>60</span>
									<span>(台)</span>
								</p>
								<p>
									<span>摄像头<i></i></span>
									<span>60</span>
									<span>(台)</span>

								</p>
								<p>
									<span>摄像头<i></i></span>
									<span>60</span>
									<span>(台)</span>

								</p>
								<p>
									<span>摄像头<i></i></span>
									<span>60</span>
									<span>(台)</span>

								</p>
								<p>
									<span>摄像头<i></i></span>
									<span>60</span>
									<span>(台)</span>

								</p>
							</div>
							<div class="UAV-right">
								<div class="Intelligent-inspection-right">
									<div class="Inspection-details">
										<p>
											<span class="xj-guangfu"></span>
											<span>光伏累计巡检</span>
											<span>10753<i> (GW)</i></span>
										</p>
										<p>
											<span class="xj-fengdian"></span>
											<span>风电累计巡检</span>
											<span>28696<i> (MW)</i></span>
										</p>
										<p>
											<span class="xj-jidian"></span>
											<span>集电线路累计巡检</span>
											<span>458<i> (KW)</i></span>
										</p>
										<p>
											<span class="lj-guangfu"></span>
											<span>累计巡检组件<i> </i></span>
											<span>10753<i> (万块)</i></span>
										</p>
										<p>
											<span class="lj-fengdian"></span>
											<span>累计巡检台数<i> </i></span>
											<span>10753<i> (台)</i></span>
										</p>
										<p>
											<span class="lj-jidian"></span>
											<span>累计巡检杆塔<i> </i></span>
											<span>28696<i> (座)</i></span>
										</p>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<div class="Station-warning">
						<monitorEarlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></monitorEarlyWarning>
					</div>
				</div>
				<div class="IOM">
					<h2></h2>
					<div class="Personnel-and-vehicles">
						<div class="staff-vehicle">
							<div class="staff">
								<p class="staff-p1">人员</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
										<span class="staff-span1">内部人员-专工
                                            <i></i>
                                            <span>8.28</span>
                                        </span>
										<span class="staff-span2">内部人员-技术
                                             <i></i>
                                            <span>5.51</span>
                                        </span>
										<span class="staff-span3">内部人员-运维
                                             <i></i>
                                            <span>6.3</span>
                                        </span>
									</p>
									<p  class="staff-div-Divider"></p>
									<p class="staff-div-p2">
										<span class="staff-span1">外来人员-总数
                                             <i></i>
                                            <span>42</span>
                                        </span>
										<span class="staff-span2">外来人员-入场数
                                             <i></i>
                                            <span>29.13</span>
                                        </span>
										<span class="staff-span3">外来人员-在场数
                                             <i></i>
                                            <span>42</span>
                                        </span>
									</p>
								</div>
							</div>
							<div class="vehicle">
								<p class="staff-p1">车辆</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
                                        <span class="staff-span1">运营车辆总数
                                            <i></i>
                                            <span>42.34</span>
                                        </span>
										<span class="staff-span2">工作车辆
                                            <i></i>
                                            <span>6.89</span>
                                        </span>
										<span class="staff-span3">外来车辆
                                            <i></i>
                                            <span>42.34</span>
                                        </span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="Maintenance-tasks">
						<h2></h2>
						<MaintenanceTasks class="MaintenanceTasks" :StackedBarChartData="StackedBarChartData1"></MaintenanceTasks>
						<div class="bottom"></div>
					</div>
					<div class="Work-OrderList">
						<monitorEarlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></monitorEarlyWarning>
					</div>
					<div class="Work-order-content">
						<div class="Work-order-content-left">
							<h2></h2>
							<div>
								<button>接收</button>
								<p>
									<span>工作票票号</span>
									<i></i>
									<span>DT12545555234487112</span>
								</p>
								<p class="stationname">
									<span class="stationname-p1">
										<span>场站名称</span>
										<i></i>
										<span>场站名称场场站名称场站名称场站名称站名称场站名称</span>
									</span>
									<span class="stationname-p2">
										<span>工作负责人</span>
										<i></i>
										<span>2</span>
									</span>
								</p>
								<p>
									<span>工作类型</span>
									<i></i>
									<span>风机式交专用工作票</span>
								</p>
								<p>
									<span>工作票内容</span>
									<i></i>
									<span>X03号风机hfuiwehf告警处理</span>
								</p>
							</div>
						</div>
						<div class="Work-order-content-right">
							<h2></h2>
							<div>
								<button>接收</button>
								<p>
									<span>工作票票号</span>
									<i></i>
									<span>DT12545555234487112</span>
								</p>
								<p class="stationname">
									<span class="stationname-p1">
										<span>场站名称</span>
										<i></i>
										<span>场站名称场场站名称场站名称场站名称站名称场站名称</span>
									</span>
									<span class="stationname-p2">
										<span>工作负责人</span>
										<i></i>
										<span>2</span>
									</span>
								</p>
								<p>
									<span>工作类型</span>
									<i></i>
									<span>风机式交专用工作票</span>
								</p>
								<p>
									<span>工作票内容</span>
									<i></i>
									<span>X03号风机hfuiwehf告警处理</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { mapState, mapMutations } from "vuex"
import Time from "@COM/StyleComponent/time.vue";
import WeatherWidget from "@COM/StyleComponent/WeatherWidget.vue";
import SiteStatus from "@COM/StyleComponent/SiteStatus.vue";
import monitorEarlyWarning from "@COM/StyleComponent/monitorEarlyWarning.vue";
import WeatherWarning from "@COM/StyleComponent/WeatherWarning.vue";
import RiskChart from "@COM/echarts/RiskChart.vue";
import HourlyRanking from "@COM/echarts/HourlyRanking.vue";
import HourBenchmarking from "@COM/echarts/HourBenchmarking.vue";
export default {
  	name: "homeIndex",
  	components: {
		Time,
		WeatherWidget,
		SiteStatus,
		monitorEarlyWarning,
		WeatherWarning,
		RiskChart,
		HourlyRanking,
		HourBenchmarking,
  	},
	data() {
		return {
			leaderInfo: conf.leaderInfo,
			currentDate: '2023-06-21',
			currentTime: '16:26:20',
			currentWeek: '星期三',
			currentSource: 'wind',
			timeInterval: 'monthly',
			echartsData:{'name': '','all':'全部','wind':'风电','solar':'光伏','IconCurve':'','unitOfMeasurement':''},
			echartsData1:{'name': '计划发电情况','all':'全部','wind':'风电','solar':'光伏','IconCurve':'平均辐照度','unitOfMeasurement':'(W/s2)'},
			yearbefore : [19, 29, 39, 49, 59, 69, 79, 89, 99, 109, 119, 129],
			lastyear : [15, 25, 1, 45, 25, 65, 33, 85, 95, 35, 45, 55],
			thisyear : [11, 22, 33, 41, 51, 28, 61, 72, 82, 93, 102, 112],
            chartData: [644.557, 879.606, 874.198, 956.398, 770.51, 949.894, 1107.971],
            chartData1: [174.27, 171.39, 181.66, 232.54, 232.26, 208.54, 242.44],
			statsContentDate:[
				{'name':'合计','year':'490717','month':'666528','daily':'46.12%',"YoY":'20.43%','MoM':'21.79%'},
				{'name':'风电','year':'430666','month':'523308','daily':'30.71%',"YoY":'6.27%','MoM':'14.12%'},
				{'name':'光伏','year':'60050','month':'71610','daily':'39.62%',"YoY":'-11.24%','MoM':'14%'},
				{'name':'储能','year':'22108','month':'36008','daily':'61.40%',"YoY":'','MoM':''},
				{'name':'源网荷储','year':'63639','month':'67690','daily':'94.02%',"YoY":'','MoM':''},
			],
			StackedBarChartData1:{'name': '场外受累','all':'月度','wind':'年累计','solar':'计划','IconCurve':'完成','unitOfMeasurement':'未完成'},
			monitor: [
				{ id: 1, name: '升压站设备', quantity: 54 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/shengyazhan.png'},
				{ id: 2, name: '风电设备', normal: 1295 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/fengdianshebei.png'},
				{ id: 3, name: '光伏设备',  normal: 4026 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/guangfushebei.png'},
				{ id: 4, name: '储能设备',  normal: 4026 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/chunengshebei.png'},
				{ id: 5, name: '能量管理',  normal: 0 ,fault:0,img:'../../../src/assets/images/equipmentManagement/nengliangguanli.png'},
				{ id: 6, name: '功率预测',  normal: 40 ,fault:0,img:'../../../src/assets/images/equipmentManagement/gonglvyuce.png'},
				{ id: 7, name: '电能计量',  normal: 1180 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/diannengjiliang.png'},
				{ id: 8, name: '保信录波',  normal: 114 ,fault:0,img:'../../../src/assets/images/equipmentManagement/baoxinlubo.png'},
				{ id: 9, name: '火灾报警',  normal: 40 ,fault:0,Warning:0,img:'../../../src/assets/images/equipmentManagement/huozaibaojing.png'},
			],
			statedata: [
            	{ id: 1, name: '风电机组', speed: 6.75 ,abnormal:5,maintenance:57},
				{ id: 2, name: '风电机组', speed: 6.75 ,abnormal:5,maintenance:57},
				{ id: 3, name: '风电机组', speed: 6.75 ,abnormal:5,maintenance:57},
				{ id: 4, name: '风电机组', speed: 6.75 ,abnormal:5,maintenance:57},
			],
			statisticaldata:[
			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },

			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },
			{ id: 1, name: '预警总数', quantity: 42 },
			],
			events: [
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 1,
				priority: 1,
				content: '问题某一',
				content1: '问题某一',
				content2: '问题某一',
				content3: '问题某一',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				// ... 更多数据
			],
			// 列配置
			eventColumns: [
				{ 
				key: 'priority', 
				title: '场站', 
				flex: '0 0 15%', 
				type: 'priority' 
				},
				{ 
				key: 'content', 
				title: '是否超期', 
				flex: '15%' 
				},
				{ 
				key: 'content1', 
				title: '设备型号', 
				flex: '20%' 
				},
				{ 
				key: 'content2', 
				title: '机型编号', 
				flex: '15%' 
				},
				{ 
				key: 'content3', 
				title: '风机名称', 
				flex: '15%' 
				},
				{ 
				key: 'time', 
				title: '预警时间', 
				flex: '0 0 30%',
				formatter: (value) => {
					// 自定义时间格式化
					return new Date(value).toLocaleString();
				}
				}
			],
			// 自定义优先级配置
			customPriorityConfig: {
				1: { text: '问题某一明', color: '#ff4757' },
				2: { text: '问题某一明', color: '#ffa726' },
				3: { text: '问题某一明', color: '#2ed573' },
			}
		}
	},
	created() {
	},
  	mounted() {
	},
	beforeDestroy(){
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
	},
}
</script>

<style lang="scss" scoped>
.homeIndex{
  width: 100%;
  height: 100%;
	.homeIndexHead{
		width:100%;
		height:273px;
		background: url("../../../assets/images/homepage/Headbackground.png") no-repeat;
		.time{
			width:242px;
			height:70px;
			position:absolute;
			right:70px;
			top:14px;
		}
		.weather{
			width:220px;
			height:70px;
			position:absolute;
			right:262px;
			top:20px;
			font-size:45px;
		}
	}
  	.conLeft {
		width: 2778px;
		height: 1862px;
		position: absolute;
		top: 238px;
		left:120px;
		background-size: 100% 100%;
        h2{
			width:100%;
			height:100px;
			background: url("../../../assets/images/equipmentManagement/zhihuijiankong.png") 0% center no-repeat;
		}
		.bottom{
			width: 1374px;
			height: 10px;
			background: url("../../../assets/images/homepage/Rectangle 330.png") center center no-repeat;
		}
		.PowerGeneration{
			width: 2778px;
			height: 1733px;
            margin-top: 30px;
            display: flex;
            gap: 30px;
			.PowerGeneration-right{
				width: 1374px;
				height: 1733px;
                .monitor{
                    width: 1374px;
                    height: 968px;
                    .grid-item-div2{
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						width: 1374px;
						align-items: center;
						gap: 20px;
						div{
                            height: 303px;
							width: 438px;
							color: #A3C5FF;
							text-align: center;
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 34px;
							font-style: normal;
							font-weight: 500;
                            background: url("../../../assets/images/CompanyOverview/di.png") no-repeat;
							display: flex;
							p:first-child{
								width: 200px;
                                img{
                                    display: block;
									border: 0px solid #fff;
                                }
                                span:nth-child(2){
                                    color: #DDF0FF;
                                    text-align: center;
                                    text-shadow: 0 0 10px rgba(48, 165, 255, 0.60);
                                    font-family: "Alibaba PuHuiTi 2.0";
                                    font-size: 26px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: 36px; /* 138.462% */
                                    margin-left: -10px;
									display: inline-block;
									position: relative;
									top: -40px;
									left: 10px;
                                }
                            }
                           p:nth-child(2){
								display: flex;
								gap:20px;
								flex-direction: column;
                                width: 264px;
								padding-top:40px;
								span{
									display: block;
									height: 42px;
									width: 169px;
									line-height: 42px;
									padding-left: 40px;
									text-align: left;
									font-size: 26px;
									background: url("../../../assets/images/CompanyOverview/Frame 1705.png") no-repeat;
									color: #AFAFAF;
								}
								
							}
						}
					}
                }
                .early-warning{
                    width: 1374px;
                    height: 735px;
                    margin-top: 30px;
					h2{
						width: 100%;
						height: 52px;
						background: url("../../../assets/images/equipmentManagement/yujingmingxi.png") 0% center no-repeat;
					}
					.earlyWarning{
						width: 100%;
						height: 663px;
						margin-top: 20px;
					}
                }
				
			}
			.PowerGeneration-left{
				width: 1374px;
				height: 1733px;
                .state-realTime{
                    display: flex;
                    width: 1374px;
                    height: 557px;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 30px;
                    flex-shrink: 0;
                    .state{
                        width: 672px;
                        height: 557px;
                        h2{
							height: 52px;
							background: url("../../../assets/images/equipmentManagement/shebeizhuangtai.png") 0% center no-repeat;
						}
						div{
							display: flex;
							width: 672px;
							height: 485px;
							padding-bottom: 1px;
							flex-direction: column;
							justify-content: center;
							align-items: flex-start;
							gap: 20px;
							flex-shrink: 0;
							p{
								width: 612px;
								padding: 30px;
								flex-shrink: 0;
								background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
								background-size: 100% 100%;
								border-radius: 8px;
								display: flex;
								gap: 20px;
								span{
									font-size: 26px;
									font-family: "Alibaba PuHuiTi 2.0";
									font-size: 26px;
									font-style: normal;
									font-weight: 500;
									height: 46px;
									line-height: 42px; /* 161.538% */
									display: inline-block;
								}
								.state-span1{
									color: #A3C5FF;
								}
								.state-span2{
									width: 16px;
									height: 100%;
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") center center no-repeat;
									background: size 100% 100%;
								}
								.state-span3{
									width: 25%
								}
								.state-span4{
									width: 18%
								}
								.state-span5{
									width: 18%
								}
							}
						}
                    }
                    .realTime{
                        width: 672px;
                        height: 557px;
                        flex-shrink: 0;
						h2{
							height: 52px;
							background: url("../../../assets/images/equipmentManagement/shishichuli.png") 0% center no-repeat;
							span{
								color: rgba(255, 255, 255, 0.60);
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 500;
								line-height: normal;
								float: right;
							}
						}
                    }
                }
                .Alarm-prompt{
                    width: 100%;
                    height: 557px;
                    margin-top: 30px;
					h2{
						height: 52px;
						background: url("../../../assets/images/equipmentManagement/shishichuli.png") 0% center no-repeat;
					}
					.earlyWarning{
						width: 100%;
						height: 485px;
						margin-top: 20px;
					}
                }
                .statistical-analysis {
                    margin-top: 30px;
                    display: flex;
                    width: 100%;
                    height: 557px;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 30px;
                    flex-shrink: 0;
                    .statistical{
                        width: 334px;
                        height: 557px;
						h2{
							height: 52px;
							background: url("../../../assets/images/equipmentManagement/yujingtongji.png") 0% center no-repeat;
						}
						div{
							width: 294px;
							height: 444px;
							padding: 20px;
							background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
							background-size: 100% 100%;
							display: flex;
							flex-direction: column;
							gap: 20px;
							P{
								width: 100%;
								height: 42px;
								line-height: 42px;
								color: #AFAFAF;
								cursor: pointer;
								text-align: center;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 400;
								background: url("../../../assets/images/CompanyOverview/Frame 1705.png") 0% center no-repeat;
							}
							.statistical-span1:hover{
								color: #38BDFF;
							}
						}
                    }
                    .analysis{
                        width: 1015px;
                        height: 557px;
						h2{
							height: 52px;
							background: url("../../../assets/images/equipmentManagement/yujingfenxi.png") 0% center no-repeat;
						}
						.EarlywarningAnalysis{
							width: 1015px;
							height: 457px;
						}
                    }
                }
			}
		}
		.StationStatistics{
			width: 2778px;
			height: 601px;
			margin-top: 30px;
            display: flex;
            gap: 30px;
            .StationStatistics-left{
                h2{
                    width: 1374px;
                    height: 100px;
                    background: url("../../../assets/images/CompanyOverview/fengdianpaiming.png") center center no-repeat;
                }
                h3{
                    width: 1374px;
                    height: 48px;
                    margin-top: 20px;
                    background: url("../../../assets/images/CompanyOverview/fd-danwei.png") center center no-repeat;
                }
                .StationStatistics-span2{
                    color: #27FFFF;
                    font-size: 32px;
                    font-weight: 700;
                    display: block;
                    text-align: center;
                    margin-top: 250px;
                    background: url("../../../assets/images/CompanyOverview/fengsu.png") 20% center no-repeat;
                }
            }
            .StationStatistics-right{
                h2{
                    width: 1374px;
                    height: 100px;
                    background: url("../../../assets/images/CompanyOverview/guangfupaiming.png") center center no-repeat;
                }
                h3{
                    width: 1374px;
                    height: 48px;
                    margin-top: 20px;
                    background: url("../../../assets/images/CompanyOverview/gf-danwei.png") center center no-repeat;
                }
                .StationStatistics-span2{
                    color: #FF9E27;
                    font-size: 32px;
                    font-weight: 700;
                    display: block;
                    text-align: center;
                    margin-top: 250px;
                    background: url("../../../assets/images/CompanyOverview/guangzhao.png") 20% center no-repeat;
                }
            }
            .StationStatistics-left-div{
                width: 100%;
                display: flex;
                gap: 30px;
                margin-top: 30px;
                p{
                    width: 250px;
                    height: 402px;
                    background: #f90;
                    span{
                        font-style: normal;
                        line-height: normal;
                        font-family: "Alibaba PuHuiTi";
                        text-shadow: 0 0 15.778px rgba(18, 218, 255, 0.42);
                    }
                    .StationStatistics-span1{
                        color: #27FFFF;
                        font-size: 24px;
                        font-weight: 700;
                        display: block;
                        text-align: center;
                    }
                    
                    .StationStatistics-span3{
                        color: #A3C5FF;
                        font-family: "Alibaba PuHuiTi 2.0";
                        font-size: 26px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 42px; /* 161.538% */
                        display: block;
                        text-align: center;
                    }
                }
            }
		}
		.ResourcesSituation{
			width: 2778px;
			height: 600px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.Equipment-utilization-rate{
				width: 1374px;
				h2{
					background: url("../../../assets/images/CompanyOverview/fengdianyuce.png") center center no-repeat;
					height: 100px;
					width: 100%;
				}
			}
			.situation{
				width: 1374px;
				width: 1374px;
				h2{
					background: url("../../../assets/images/CompanyOverview/guangfuyuce.png") center center no-repeat;
					height: 100px;
					width: 100%;
				}
			}
		}
	}
	.conmiddle{
		width: 2781px;
		height: 1862px;
		position: absolute;
		top: 238px;
		left:2879px;
		background-size: 100% 100%;
		.conmiddle-right{
			position:absolute;
			right:10px;
			width:308px;
			height:749px;
			h2{
				width:308px;
				height:102px;
				background: url("../../../assets/images/homepage/chanye.png") center center no-repeat;
			}
			div{
				width:200px;
				height:586px;
				display:flex;
				flex-flow: column;
				position:relative;
				left:54px;
				top:60px;
				gap:60px;
				button{
					width:200px;
					height:42px;
					color: #A3C5FF;
					text-align: center;
					font-size: 42px;
					font-style: normal;
					font-weight: 500;
					line-height: 42px; /* 100% */
					cursor: pointer;
					background:none;
				}
				button:hover{
					background: url("../../../assets/images/homepage/quanbu.png") center center no-repeat;
					cursor: pointer;
					color: #FFCEA3;
					
				}
			}
			
		}
		.conmiddle-div{
			display:flex;
			display: inline-flex;
			align-items: flex-start;
			margin-left:540px;
			gap: 120px;
			position:absolute;
			bottom:5px;
			button{
				width:360px;
				height:141px;
				background: url("../../../assets/images/homepage/butBackboard.png") center center no-repeat;
				color: #F6F9FE;
				text-shadow: 0 0 17.364px rgba(81, 196, 255, 0.10), 3.256px 3.256px 0 rgba(22, 22, 19, 0.27);
				font-family: JiangChengXieHei;
				font-size: 46px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
				cursor: pointer;
			}
			button:hover{
				background: url("../../../assets/images/homepage/butBackboardhover.png") center center no-repeat;
			}
		}
	}
	.conRight{
		width: 2778px;
		height: 1862px;
		position: absolute;
		top: 238px;
		right:120px;
		background-size: 100% 100%;
		display: flex;
		gap: 30px;
		.Intelligent-patrol{
			width: 1374px;
			height: 1862px;
			h2{
				width: 100%;
				height: 100px;
				background: url("../../../assets/images/equipmentManagement/zhinengxunshi.png") center center no-repeat;
			}
			.Inspection-statistics{
				width: 100%;
				height: 287px;
				background: #f90;
				margin-top: 20px;
				h2{
					width: 100%;
					height: 52px;
					background: url("../../../assets/images/equipmentManagement/xunshitongji.png") 0% center no-repeat;
				}
			}
			.reliability-index{
				width: 100%;
				height: 187px;
				margin-top: 20px;
				
				h2{
					width: 100%;
					height: 52px;
					background: url("../../../assets/images/equipmentManagement/kekaoxingzhibiao.png") 0% center no-repeat;
				}
				.reliability-index-div{
					width: 100%;
					height: 115px;
					display: flex;
					gap: 30PX;
					margin-top: 20PX;
					div{
						width: 206px;
						height: 86px;
						padding: 15px 57px 14px 58px;
						border-radius: 12%;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						P:first-child{
							width: 100%;
							height: 44PX;
							line-height: 44PX;
							color: #27FFFF;
							font-size: 32PX;
							text-align: center;
						}
						P:nth-child(2){
							width: 100%;
							height: 44PX;
							line-height: 44PX;
							color: #A3C5FF;
							font-size: 24PX;
							text-align: center;
						}
					}
				}
			}
			.Alarm-Statistics{
				width: 100%;
				height: 390px;
				margin-top: 20px;
				h2{
					width: 100%;
					height: 52px;
					background: url("../../../assets/images/equipmentManagement/gaojingtongji.png") 0% center no-repeat;
				}
				.earlyWarning{
					width: 100%;
					height: 318px;
					margin-top: 20px;
				}
			}
			.UAV{
				width: 100%;
				height: 484px;
				margin-top: 20px;
				h2{
					width: 100%;
					height: 52px;
					background: url("../../../assets/images/equipmentManagement/wurenji.png") 0% center no-repeat;
				}
				.UAV-div{
					display: flex;
					gap: 30px;
					margin-top: 20px;
					.UAV-left{
						width: 352px;
						height: 412px;
						display: flex;
						flex-direction: column;
						padding-left: 10px;
						gap: 20px;
						p{
							width: 352px;
							height: 66px;
							position: relative;
							span:first-child{
								font-size: 26px;
								color: #a3c5ff;
								width: 176px;
								height: 66px;
								line-height: 66px;
								text-align: center;
								background: url("../../../assets/images/equipmentManagement/wurenjibeijing.png") center center no-repeat;
								background-size:100% 100% ;
								display: inline-block;
								i{
									position: absolute;
									width: 16px;
									height: 28px;
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") center center no-repeat;
									left: 142px;
									top: 19px;
								}
							}
							span:nth-child(2){
								font-size: 32px;
								color: #27FFFF;
								padding-left: 20px;
							}
							span:nth-child(3){
								font-size: 26px;
								color: #67717D;
								padding-left: 20px;
							}
							
						}
					}
					.UAV-right{
						width: 987px;
						height: 412px;
						.Intelligent-inspection-right{
							height: 100%;
							width: 987px;
							.Inspection-details{
								display: flex;
								flex-wrap: wrap;
								gap: 30px;
								p{
									width: 279px;
									height: 151px;
									padding: 20px 0px 20px 30px;
									background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
									border-radius: 8px;
									span{
										display: block;
										font-size: 26px;
										height: 44px;
										line-height: 44px;
										i{
											color: #67717D;
										}
									}
									span:first-child{
										font-size: 28px;
										color: #DDF0FF;
										padding-left: 50px;
									}
									span:nth-child(2){
										font-size: 32px;
										color: #A3C5FF;
										i{
											width: 16px;
											height: 28px;
											background: #f90;
											display: inline-block;
											background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
											margin-left: 10px;
										}
									}
									span:nth-child(3){
										font-size: 32px;
										color: #27FFFF;
										i{
											color: #67717D;
											font-size: 26px;
										}
									}
									.xj-guangfu{
										background: url("../../../assets/images/CompanyOverview/xj-guangfu.png") 0% center no-repeat;
									}
									.xj-fengdian{
										background: url("../../../assets/images/CompanyOverview/xj-fengdian.png") 0% center no-repeat;
									}
									.xj-jidian{
										background: url("../../../assets/images/CompanyOverview/xj-jidian.png") 0% center no-repeat;
									}
									.lj-guangfu{
										background: url("../../../assets/images/CompanyOverview/lj-guangfu.png") 0% center no-repeat;
									}
									.lj-fengdian{
										background: url("../../../assets/images/CompanyOverview/lj-fengdian.png") 0% center no-repeat;
									}
									.lj-jidian{
										background: url("../../../assets/images/CompanyOverview/lj-jidian.png") 0% center no-repeat;
									}
								}
								
							}
						}
					}
				}
				
			}
			.Station-warning{
				width: 100%;
				height: 318px;
				margin-top: 20px;
				.earlyWarning{
					width: 100%;
					height: 318px;
				}
			}
		}
		.IOM{
			width: 1374px;
			height: 1862px;
			h2{
				width: 100%;
				height: 100px;
				background: url("../../../assets/images/equipmentManagement/zhihuiyunwei.png") center center no-repeat;
			}
			.Personnel-and-vehicles{
				width: 100%;
				height: 338px;
				margin-top: 30px;
				.staff-vehicle{
					display: flex;
					width: 100%;
					height: 338px;
					margin-top: 20px;
					gap: 30px;
				}
				.staff{
					width: 906px;
					height: 100%;
					background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
					background-size: 100% 100%;
					.staff-p1{
						font-size: 36px;
						color: #a3c5ff;
						height: 60px;
						line-height: 60px;
						text-align: center;
						width: 100%;
					}
					.staff-p2{
						height: 2px;
						width: 100%;
						background: url("../../../assets/images/CompanyOverview/xj-Divider.png") center center no-repeat;
						background-size: 100% 100%;
					}
					.staff-div{
						display: flex;
						width: 100%;
						margin-top: 60px;
						p{
							width: 50%;
							font-size: 28px;
						}
						.staff-div-p1,.staff-div-p2{
							display: flex;
							gap: 30px;
							flex-direction: column;
							padding-left: 60px;
							.staff-span1{
                                height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span2{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span3{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span4{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
						}
						.staff-div-Divider{
							width: 2px;
							background: url("../../../assets/images/CompanyOverview/staff-div-Divider.png") center center no-repeat;
						}
					}
				}
				.vehicle{
					width: 438px;
					background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
					background-size: 100% 100%;
					.staff-p1{
						font-size: 36px;
						color: #a3c5ff;
						height: 60px;
						line-height: 60px;
						text-align: center;
						width: 100%;
                        
					}
					.staff-p2{
						height: 2px;
						width: 100%;
						background: url("../../../assets/images/CompanyOverview/xj-Divider.png") center center no-repeat;
						background-size: 100% 100%;
					}
					.staff-div{
						display: flex;
						width: 100%;
						margin-top: 60px;
						p{
							width: 100%;
							font-size: 28px;
						}
						.staff-div-p1{
							display: flex;
							gap: 30px;
							flex-direction: column;
							padding-left: 60px;
							.staff-span1{
                                height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span2{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span3{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
							.staff-span4{
								height: 44px;
								line-height: 44px;
								display: inline-block;
								i{
									background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
									width:16px ;
									height: 28px;
									display: inline-block;
									margin-left: 20px;
									margin-right: 20px;
								}
							}
						}
					}
				}
				.staff-span1,.staff-span2,.staff-span3,.staff-span4{
					font-size: 26px;
					color: #A3C5FF;
                    span:nth-child(2){	
						color: #27FFFF;
						text-shadow: 0 0 15.778px rgba(18, 218, 255, 0.42);
						font-family: "Alibaba PuHuiTi";
						font-size: 32px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
                    span:nth-child(3){	
						color: #fff;
						font-size: 26px;
						font-weight: 500;
					}
				}
			}
			.Maintenance-tasks{
				width: 100%;
				height: 516px;
				margin-top: 30px;
				h2{
					width: 100%;
					height: 52px;
					background: url("../../../assets/images/equipmentManagement/jianxiurenwu.png") 0% center no-repeat;
				}
				.MaintenanceTasks{
					width: 100%;
					height: 434px;
				}
				
			}
			.Work-OrderList{
				width: 100%;
				height: 402px;
				margin-top: 30px;
				.earlyWarning{
					width: 100%;
					height: 402px;
				}
			}
			.Work-order-content{
				width: 100%;
				height: 386px;
				margin-top: 30px;
				display: flex;
				gap: 30px;
				.Work-order-content-left{
					width: 672px;
					h2{
						width: 100%;
						height: 52px;
						background: url("../../../assets/images/equipmentManagement/gongzuopiao.png") 0% center no-repeat;
					}
					div{
						display: flex;
						width: 632px;
						flex-direction: column;
						align-items: flex-start;
						gap: 20px;
						height: 314px;
						margin-top: 20px;
						background: url("../../../assets/images/CompanyOverview/di.png") no-repeat;
						background-size: 100% 100% ;
						padding-left: 40px;
						button{
							position: relative;
							left: 540px;
							top: 20px;
							padding: 2px 10px;
							justify-content: center;
							align-items: center;
							gap: 10px;
							width: 96px;
							height: 38px;
							background: url("../../../assets/images/CompanyOverview/di.png") no-repeat;
							color: #FFF;
							text-align: center;
							text-shadow: 0 0 22.128px rgba(48, 165, 255, 0.60);
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 26px;
							font-style: normal;
							font-weight: 600;
							line-height: normal;
						}
						button:hover{
							color: #00F2FF;
						}
						p{
							width: 100%;	
							font-size: 24px;
							height: 42px;
							line-height: 42px;
							i{
								width: 16px;
								height: 28px;
								background: #f90;
								display: inline-block;
								background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
								margin-left: 10px;
								margin-right: 10px;
							}
							span:nth-child(3){
								font-size: 26px;
								color: #A3C5FF;
								
							}

						}
						.stationname{
							display: flex;
							.stationname-p1{
								flex: 1;
								display: inline-block;
								span:nth-child(3){
									color: #A3C5FF;
									white-space: nowrap; /* 防止文本换行 */
									overflow: hidden; /* 隐藏溢出的内容 */
									text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */
									width: 140px;
									display: inline-block;
									height: 42px;
									line-height: 42px;
								}
							}
							.stationname-p2{
								flex: 1;
								display: inline-block;
							}
						}
					}
				}
				.Work-order-content-right{
					width: 672px;
					h2{
						width: 100%;
						height: 52px;
						background: url("../../../assets/images/equipmentManagement/caozuopiao.png") 0% center no-repeat;
					}
					div{
						display: flex;
						width: 632px;
						flex-direction: column;
						align-items: flex-start;
						gap: 20px;
						height: 314px;
						margin-top: 20px;
						background: url("../../../assets/images/CompanyOverview/di.png") no-repeat;
						background-size: 100% 100% ;
						padding-left: 40px;
						button{
							position: relative;
							left: 540px;
							top: 20px;
							padding: 2px 10px;
							justify-content: center;
							align-items: center;
							gap: 10px;
							width: 96px;
							height: 38px;
							background: url("../../../assets/images/CompanyOverview/di.png") no-repeat;
							color: #FFF;
							text-align: center;
							text-shadow: 0 0 22.128px rgba(48, 165, 255, 0.60);
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 26px;
							font-style: normal;
							font-weight: 600;
							line-height: normal;
						}
						button:hover{
							color: #00F2FF;
						}
						p{
							width: 100%;	
							font-size: 24px;
							height: 42px;
							line-height: 42px;
							i{
								width: 16px;
								height: 28px;
								background: #f90;
								display: inline-block;
								background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") 0% center no-repeat;
								margin-left: 10px;
								margin-right: 10px;
							}
							span:nth-child(3){
								font-size: 26px;
								color: #A3C5FF;
								
							}

						}
						.stationname{
							display: flex;
							.stationname-p1{
								flex: 1;
								display: inline-block;
								span:nth-child(3){
									color: #A3C5FF;
									white-space: nowrap; /* 防止文本换行 */
									overflow: hidden; /* 隐藏溢出的内容 */
									text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */
									width: 140px;
									display: inline-block;
									height: 42px;
									line-height: 42px;
								}
							}
							.stationname-p2{
								flex: 1;
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}

}
.con {
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/homepage/Backgroundimage1.png") center center no-repeat;
  background-size: 100% 100%;
}


</style>
