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
				<div class="PowerGeneration">
					<div class="generatingCapacity"></div>
					<div class="container">
						<div class="grid">
						<div class="grid-item ">
							<h2 class="grid-item-h21"><span>(万KW)</span></h2>
							<div class="zjgm">
								<p>
									<span>装机规模</span>
									<span>{{ deviceInfo.installedScale }}</span>
								</p>
								<p>
									<span>批复量</span>
									<span>{{ deviceInfo.approvedAmount }}</span>
								</p>
								<p>
									<span>并网量</span>
									<span>{{ deviceInfo.gridAmount }}</span>
								</p>
								<p>
									<span>并购量</span>
									<span>{{ deviceInfo.purchaseAmount }}</span>
								</p>
								<p>
									<span>储备量</span>
									<span>{{ deviceInfo.reserveAmount }}</span>
								</p>
								<p>
									<span>在建量</span>
									<span>{{ deviceInfo.underConstructionAmount }}</span>
								</p>
							</div>
						</div>
						<p class="Divider"></p>
						<div class="grid-item">
							<h2 class="grid-item-h21"><span>(万KW)</span></h2>
							<div class="zjgm">
								<p class="first">
									<span>风电</span>
									<span>{{ businessDistribution.wind }}</span>
								</p>
								<p class="first">
									<span>光伏</span>
									<span>{{ businessDistribution.solar }}</span>
								</p>
								<p class="first">
									<span>储能</span>
									<span>{{ businessDistribution.distributed }}</span>
								</p>
								<p class="first">
									<span>源网荷储</span>
									<span>{{ businessDistribution.energy }}</span>
								</p>
							</div>
						</div>
						<p class="Divider"></p>
						<div class="grid-item">
							<h2 class="grid-item-h21"><span>(座)</span></h2>
							<div class="zjgm">
								<p  class="second">
									<span>并网总数</span>
									<span>{{ stationCount.total }}</span>
								</p>
								<p  class="second">
									<span>风电</span>
									<span>{{ stationCount.wind }}</span>
								</p>
								<p  class="second">
									<span>光伏</span>
									<span>{{ stationCount.solar }}</span>
								</p>
								<p  class="first">
									<span>储能</span>
									<span>{{ stationCount.storage }}</span>
								</p>
								<p class="first">
									<span>源网荷储</span>
									<span>{{ stationCount.energy }}</span>
								</p>
							</div>
						</div>
						<p class="Divider"></p>
						<div class="grid-item">
							<h2 class="grid-item-h21"><span>(台)</span></h2>
							<div class="zjgm">
								<p class="first">
									<span>设备总数</span>
									<span>{{ equipmentStats.total }}</span>
								</p>
								<p class="first">
									<span>风机台数</span>
									<span>{{ equipmentStats.wind }}</span>
								</p>
								<p class="first">
									<span>光伏逆变器</span>
									<span>{{ equipmentStats.solar }}</span>
								</p>
								<p class="first">
									<span>储能逆变器</span>
									<span>{{ equipmentStats.storage }}</span>
								</p>
								
							</div>
						</div>
						</div>
					</div>
				</div>
				<div class="StationStatistics">
					<div class="StationStatisticsImg"></div>
					<div class="StationStatisticsBody">
						<div class="container">
							<div class="grid">
								<div class="grid-item">
									<h2 class="grid-item-h21"></h2>
									<div class="grid-item-div1">
										<p class="overhaul">大修:<span> 26</span><i> 台</i></p>
										<p class="stopped">长停:<span> 3</span><i> 台</i></p>
									</div>
									<div class="grid-item-div2">
										<div class="grid-item-div2-div1">
											<p>
												<span class="fengji"></span>
												<span>风机</span>
												
											</p>
											<p>
												<span>正常: <i style="color: #00F2FF;"> 1325</i></span>
												<span>异常: <i style="color: #FF230B;"> 7</i></span>
												<span>维护: <i style="color: #FF990B;"> 0	</i></span>
											</p>
										</div>
										<div class="grid-item-div2-div2">
											<p>
												<span class="jidianxianlu"></span>
												<span>集电线路</span>
											</p>
											<p>
												<span>正常: <i style="color: #00F2FF;"> 354</i></span>
												<span>异常: <i style="color: #FF230B;"> 0</i></span>
												<span>维护: <i style="color: #FF990B;"> 0</i></span>
											</p>
										</div>
										<div class="grid-item-div2-div3">
											<p>
												<span class="nibianqi"></span>
												<span>逆变器</span>
											</p>
											<p>
												<span>正常: <i style="color: #00F2FF;"> 4026</i></span>
												<span>异常: <i style="color: #FF230B;"> 0</i></span>
												<span>维护: <i style="color: #FF990B;"> 0</i></span>
											</p>
										</div>
										<div class="grid-item-div2-div4">
											<p>
												<span class="chunengPCS"></span>
												<span>储能PCS</span>
											</p>
											<p>
												<span>正常: <i style="color: #00F2FF;"> 0</i></span>
												<span>异常: <i style="color: #FF230B;"> 4026</i></span>
												<span>维护: <i style="color: #FF990B;"> 0</i></span>
											</p>
										</div>
									</div>
									
								</div>
								<div class="grid-item jkzt">
									<div>
										<h2 class="grid-item-h22"></h2>
										<EquipmentHealthStatus :StackedBarChartData="StackedBarChartData2"></EquipmentHealthStatus>
										<div class="bottom" style="width: 1128px;"></div>
									</div>
									
									<div class="Equipment-warning">
										<p>
											<span style="color:#AFAFAF;">预警总数</span>
											<span style="color:#fff;">36<i style="color:#67717D;"> 条</i></span>
										</p>
										<p>
											<span style="color:#AFAFAF;">已审核条款</span>
											<span style="color:#fff;">36<i style="color:#67717D;"> 条</i></span>
										</p>
										<p>
											<span style="color:#AFAFAF;">亚健康设备</span>
											<span style="color:#fff;">0<i style="color:#67717D;"> 台</i></span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="ResourcesSituation">
					<div class="Equipment-utilization-rate">
						<h2></h2>
						<div class="average">
							<p>
								<span>风电等效利用小时数</span>
								<span>1015<i> &nbsp;h</i></span>
							</p>
							<p>
								<span>风电高于行业平均</span>
								<span>90<i> &nbsp;h</i></span>
							</p>
							<p>
								<span>光伏等效利用小时数</span>
								<span>440<i> &nbsp;h</i></span>
							</p>
							<p>
								<span>光伏等效利用小时数</span>
								<span>-71<i> &nbsp;h</i></span>
							</p>
						</div>
						<div class="ranking">
							<div class="ranking-fd">
								<h2></h2>
								<SiteStatus :sites="siteData"></SiteStatus>
							</div>
							<div class="ranking-gf">
								<h2></h2>
								<SiteStatus :sites="siteData"></SiteStatus>
							</div>
						</div>
					</div>
					<div class="situation">
						<h2></h2>
						<div class="average">
							<p>
								<span>无人机</span>
								<span>4<i> / 4<i style="font-size: 26px;"> 架</i></i></span>
							</p>
							<p>
								<span>飞手</span>
								<span>18<i> / 18<i style="font-size: 26px;"> 名</i></i></span>
							</p>
							<p>
								<span>摄像头</span>
								<span>1094<i> / 1094<i style="font-size: 26px;"> 架</i></i></span>
							</p>
							<p>
								<span>机器人</span>
								<span>0<i> / 0<i style="font-size: 26px;"> 个</i></i></span>
							</p>
							<p>
								<span>机巢</span>
								<span>0<i> / 0<i style="font-size: 26px;"> 个</i></i></span>
							</p>
						</div>
						<h2></h2>
						<div class="Intelligent-inspection">
							<div class="Intelligent-inspection-left">
								<div class="xunjian">
									<p>累计巡检数量</p>
									<p>39449<i> 次</i></p>
								</div>
								<div class="xj-Divider"></div>
								<div class="gaojing">
									<p>累计告警数量</p>
									<p>1332<i> 条</i></p>
								</div>
							</div>
							<div class="Intelligent-inspection-right">
								<div class="Inspection-details">
									<p>
										<span class="xj-guangfu">光伏累计巡检</span>
										<span>10753<i> GW</i></span>
									</p>
									<p>
										<span class="xj-fengdian">风电累计巡检</span>
										<span>28696<i> MW</i></span>
									</p>
									<p>
										<span class="xj-jidian">集电线路累计巡检</span>
										<span>458<i> KW</i></span>
									</p>
									<p>
										<span class="lj-guangfu">累计巡检组件</span>
										<span>10753<i> 万块</i></span>
									</p>
									<p>
										<span class="lj-fengdian">累计巡检台数</span>
										<span>10753<i> 台</i></span>
									</p>
									<p>
										<span class="lj-jidian">累计巡检杆塔</span>
										<span>28696<i> 座</i></span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="conmiddle">
				<div class="conmiddle-div">
					<button>公司总览</button>
					<button>业务运营</button>
					<button>资源禀赋</button>
					<button>设备管控</button>
				</div>
			</div>
			<div class="conRight">
				<div class="PowerGeneration">
					<div class="generatingCapacity"></div>
					<div class="PowerGenerationBody">
						<div class="generatingCapacityData">
							<div class="total"  v-for="item in statsContentDate">
								<div class="totalData">
									<h2>{{item.name}}</h2>
									<p class="underline"></p>
									<div class="stats-content">
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">年发电量</span>
											<span class="arrow"></span>
											<span class="value">{{ item.year }}</span>
											</div>
											<div class="growth-rate positive" >
												<span v-if="item.YoY != ''"><i>同比</i> {{ item.YoY }} <span class="growth-arrow"></span></span>
												<span v-if="item.MoM != ''"><i>环比</i> {{ item.MoM }} <span class="growth-arrow"></span></span>
											</div>
										</div>
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">计划电量</span>
											<span class="arrow"></span>
											<span class="value">{{ item.month }}</span>
											</div>
											<div class="growth-rate positive">
											
											</div>
										</div>
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">计划完成率</span>
											<span class="arrow"></span>
											<span class="value">{{ item.daily }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ElectricityStatistics">
							<div class="ElectricityStatistics_div">
								<div>
									<p>年损失电量:<i>196.42</i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>单位容量损失电量:<i>0.30</i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>年限电量:<i>286086</i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>年限电率:<i>0.04%</i></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="weather-staff">
					<div class="weather-staff-left">
						<h2></h2>
						<div class="weatherwarning">
							<div class="weatherwarning-div">
								<WeatherWarning></WeatherWarning>
							</div>
							<earlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></earlyWarning>
						</div>
					</div>
					<div class="weather-staff-right">
						<h2></h2>
						<div class="staff-vehicle">
							<div class="staff">
								<p class="staff-p1">人员</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
										<span class="staff-span1"><span>内部人员</span></span>
										<span class="staff-span2">专工<i></i><span>25</span></span>
										<span class="staff-span3">技术<i></i><span>5</span></span>
										<span class="staff-span4">运维<i></i><span>276</span></span>
									</p>
									<p  class="staff-div-Divider"></p>
									<p class="staff-div-p2">
										<span class="staff-span1"><span>内部人员</span></span>
										<span class="staff-span2">总数<i></i><span>2081</span></span>
										<span class="staff-span3">入场数<i></i><span>2081</span></span>
										<span class="staff-span4">在场数<i></i><span>719</span></span>
									</p>
								</div>
							</div>
							<div class="vehicle">
								<p class="staff-p1">车辆</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
										<span class="staff-span1"><span>在运车辆</span></span>
										<span class="staff-span2">运营车辆总数<i></i><span>0</span></span>
										<span class="staff-span3">工作车辆<i></i><span>87</span></span>
										<span class="staff-span4">外来车辆<i></i><span>0</span></span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="secure-yunwei">
					<div class="secure-yunwei-left">
						<h2></h2>
						<div class="weatherwarning">
							<RiskChart ></RiskChart>
						</div>
					</div>
					<div class="secure-yunwei-right">
						<h2></h2>
						<div class="average">
							<p>
								<span>场站总数</span>
								<span>40<i style="font-size: 26px;"> 座</i></span>
							</p>
							<p>
								<span>项目总数</span>
								<span>52<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>投运项目数</span>
								<span>52<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>主设备</span>
								<span>48<i style="font-size: 26px;"> 台</i></span>
							</p>
							<p>
								<span>任务</span>
								<span>2628<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>工单</span>
								<span>34649<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>工作票</span>
								<span>14725<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>操作票</span>
								<span>94<i style="font-size: 26px;"> 个</i></span>
							</p>
							<p>
								<span>工时</span>
								<span>0<i style="font-size: 26px;"> 小时</i></span>
							</p>
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
import StackedBarChart from "@COM/echarts/StackedBarChart.vue";
import StackedBarChart1 from "@COM/echarts/StackedBarChart1.vue";
import LossPowerChart from "@COM/echarts/LossPowerChart.vue";
import powerStatsContainer from "@COM/StyleComponent/powerStatsContainer.vue";
import Time from "@COM/StyleComponent/time.vue";
import WeatherWidget from "@COM/StyleComponent/WeatherWidget.vue";
import WaveChart from "@COM/echarts/WaveChart.vue";
import EquipmentHealthStatus from "@COM/echarts/WaveChart.vue";
import SiteStatus from "@COM/StyleComponent/SiteStatus.vue";
import earlyWarning from "@COM/StyleComponent/earlyWarning.vue";
import WeatherWarning from "@COM/StyleComponent/WeatherWarning.vue";
import RiskChart from "@COM/echarts/RiskChart.vue";


export default {
  	name: "homeIndex",
  	components: {
		powerStatsContainer,
		LossPowerChart,
		StackedBarChart,
		StackedBarChart1,
		WaveChart,
		Time,
		WeatherWidget,
		EquipmentHealthStatus,
		SiteStatus,
		earlyWarning,
		WeatherWarning,
		RiskChart,
  	},
	data() {
		return {
			leaderInfo: conf.leaderInfo,
			currentDate: '2023-06-21',
			currentTime: '16:26:20',
			currentWeek: '星期三',
			currentSource: 'wind',
			timeInterval: 'monthly',
			echartsData:{'name': '发电量和资源','all':'全部','wind':'风电','solar':'光伏','IconCurve':'资源情况','unitOfMeasurement':'(m/s)'},
			echartsData1:{'name': '计划发电情况','all':'全部','wind':'风电','solar':'光伏','IconCurve':'完成率','unitOfMeasurement':'%'},
			StackedBarChartData:{'name': '场内受累','all':'月度','wind':'年累计','solar':'发电机组','IconCurve':'输变电(升压站、集电线路)','unitOfMeasurement':'性能损失'},
			StackedBarChartData1:{'name': '场外受累','all':'月度','wind':'年累计','solar':'电网','IconCurve':'天气原因','unitOfMeasurement':'其他'},
			StackedBarChartData2:{'name': '计划停运','all':'月度','wind':'年累计','solar':'健康90~100°H','IconCurve':'亚健康≤90°H','unitOfMeasurement':'其他','quantity':'(台)'},
			StackedBarChartData3:{'name': '限电损失','all':'月度','wind':'年累计','solar':'发电机组','IconCurve':'输变电','unitOfMeasurement':'其他'},
			statsContentDate:[
				{'name':'合计','year':'490717','month':'666528','daily':'46.12%',"YoY":'20.43%','MoM':'21.79%'},
				{'name':'风电','year':'430666','month':'523308','daily':'30.71%',"YoY":'6.27%','MoM':'14.12%'},
				{'name':'光伏','year':'60050','month':'71610','daily':'39.62%',"YoY":'-11.24%','MoM':'14%'},
				{'name':'储能','year':'22108','month':'36008','daily':'61.40%',"YoY":'','MoM':''},
				{'name':'源网荷储','year':'63639','month':'67690','daily':'94.02%',"YoY":'','MoM':''},
			],
			deviceInfo: {
				installedScale: 653.85,
				approvedAmount: 536,
				gridAmount: 653.85,
				purchaseAmount: 110,
				reserveAmount: 536,
				underConstructionAmount: 175,
			},
			businessDistribution: {
				wind: 430666,
				solar: 60051,
				distributed: 20275,
				energy: 63639,
			},
			stationCount: {
				total: 36,
				wind: 27,
				solar: 9,
				storage: 12,
				distributed: 5,
				energy:1,
			},
			equipmentStats: {
				total: 5261,
				wind: 1235,
				solar: 4026,
				storage: 738,
			},
			siteData: [
				{ id: 1, name: '哈密分散式', percentage: 99.99 },
				{ id: 2, name: '玛依塔斯', percentage: 90.01 },
				{ id: 3, name: '博景上湖', percentage: 86.78 },
				{ id: 4, name: '吉木乃分散式二期', percentage: 85.08 },
				{ id: 5, name: '三塘湖二期', percentage: 82.32 }
			],
			siteData1: [
				{ id: 1, name: '石城子', percentage: 99.99 },
				{ id: 2, name: '雅满苏', percentage: 90.01 },
				{ id: 3, name: '青河', percentage: 86.78 },
				{ id: 4, name: '图木舒克', percentage: 85.08 },
				{ id: 5, name: '尉犁', percentage: 82.32 }
			],
			events: [
				{
				id: 1,
				priority: 1,
				content: '问题某一明天风速急剧增',
				location: '问题某一明',
				time: '2018-03-14 10:27:00',
				operator: '张三'
				},
				{
				id: 2,
				priority: 3,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				{
				id: 2,
				priority: 2,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				{
				id: 2,
				priority: 1,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				{
				id: 2,
				priority: 3,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				{
				id: 2,
				priority: 3,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				{
				id: 2,
				priority: 3,
				content: '问题某一明天风速急剧增',
				location: '',
				time: '2018-03-14 10:27:00'
				},
				// ... 更多数据
			],
			// 列配置
			eventColumns: [
				{ 
				key: 'priority', 
				title: '事件', 
				flex: '0 0 35%', 
				type: 'priority' 
				},
				{ 
				key: 'content', 
				title: '场站', 
				flex: '35%' 
				},
				{ 
				key: 'time', 
				title: '时间', 
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
		.bottom{
			width: 1374px;
			height: 10px;
			background: url("../../../assets/images/homepage/Rectangle 330.png") center center no-repeat;
		}
		.PowerGeneration{
			width: 2778px;
			height: 529px;
			.generatingCapacity{
				width: 2778px;
				height: 100px;
				background: url("../../../assets/images/CompanyOverview/Component 237.png") center center no-repeat;
			}
			.container {
				color: #ffffff;
				border-radius: 10px;
				box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
				height: 399px;
				margin-top: 30px;
			}

			.title {
				text-align: center;
				margin-bottom: 20px;
				color: #66ffcc;
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				gap: 20px;
				.Divider{
					width:2px ;
					background: url("../../../assets/images/CompanyOverview/Vector 4303.png") center center no-repeat;
				}
			}

			.grid-item {
				border-radius: 10px;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
				.grid-item-h21{
					background: url("../../../assets/images/CompanyOverview/zhuangjirongliang.png") 0% center no-repeat;
				}
			}
			
			.grid-item h2 {
				font-size: 18px;
				margin-bottom: 10px;
				color: #66ffcc;
				width:665px;
				height:52px;
				span{
					color: rgba(255, 255, 255, 0.60);
					text-align: right;
					font-family: "Alibaba PuHuiTi 2.0";
					font-size: 26px;
					font-style: normal;
					font-weight: 500;
					line-height: normal;
					float:right;
					line-height:52px;
				}
			}

			.grid-item h3 {
				font-size: 14px;
				margin-bottom: 10px;
				color: #66ffcc;
			}
			.zjgm{
				display: flex;
				font-size: 28px;
				flex-wrap: wrap;
				width: 665px;
				height: 327px;
				margin-top: 20px;
				gap: 20px;
			}
			.zjgm p{
				flex: 0 0 calc(33.33% - 13.33px);    /* 每个子级元素占据三分之一的宽度 */
				box-sizing: border-box; /* 确保 padding 和 border 不会影响元素宽度 */
				/* 其他样式 */
				/* 更加美观的样式（可选） */
				padding: 28px 20px;
				text-align: center;
				background: url("../../../assets/images/CompanyOverview/di-duan.png") center center no-repeat;
				height: 158px;
				span{
					width: 100%;
					height: 44px;
					display: block;
					line-height: 44px;
					font-family: "Alibaba PuHuiTi";
				}
			}
			.zjgm .first{
				flex: 0 0 calc(50% - 10px);
				background: url("../../../assets/images/CompanyOverview/di-chang.png") center center no-repeat;
			}
			.zjgm .second {
				flex: 0 0 calc(33.33% - 13.33px);
			}
			.zjgm p span:first-child{
				color: #DDF0FF;
			}
			.zjgm p span:nth-of-type(2){
				color: #27FFFF;
			}
		}
		.StationStatistics{
			width: 2778px;
			height: 535px;
			margin-top: 30px;
			.StationStatisticsImg{
				width: 2778px;
				height: 100px;
				background: url("../../../assets/images/CompanyOverview/shebeizhuangtai.png") center center no-repeat;
			}
			.StationStatisticsBody{
				width: 2778px;
				height: 434px;
				position: relative;
				top: 30px;
				display: flex;
				gap: 30px;
				.container {
					color: #ffffff;
					border-radius: 10px;
					box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
					width: 2778px;
					padding-top: 30px;
				}
				.grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 20px;
					height: 434px;
				}
				.grid-item {
					border-radius: 10px;
					box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
					height: 434px;
					.grid-item-h21{
						background: url("../../../assets/images/CompanyOverview/yunxingzhuangtai.png") 0% center no-repeat;
						margin-bottom: 10px;
						height:52px;
					}
					.grid-item-h22{
						background: url("../../../assets/images/CompanyOverview/jiangkangzhuangtai.png") 0% center no-repeat;
						margin-bottom: 10px;
						height:52px;
						width: 1128px;
					}
					.grid-item-div1{
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						width: 1374px;
						align-items: center;
						gap: 20px;
						p{
							height: 80px;
							line-height: 80px;
							color: #A3C5FF;
							text-align: center;
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 34px;
							font-style: normal;
							font-weight: 500;
							background: url("../../../assets/images/CompanyOverview/yunxing1.png") 0% center no-repeat;
							i{
								font-size: 26px;
								color: #AFAFAF;
							}
						}
						.overhaul{
							span{
								color: #FF230B;
							}
						}
						.stopped{
							span{
								color: #DDF0FF;
							}
						}
					}
					.grid-item-div2{
						display: grid;
						grid-template-columns: repeat(4, 1fr);
						width: 1374px;
						align-items: center;
						gap: 20px;
						margin-top: 20px;
						div{
							height: 233px;
							color: #A3C5FF;
							text-align: center;
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 34px;
							font-style: normal;
							font-weight: 500;
						}
						div{
							display: flex;
							height: 193px;
							width: 289px;
							padding: 20px;
							p:first-child{
								display: block;
								width: 125px;
								height: 150px;
								display: grid;            /* 使用 grid 布局 */
								align-items: end;
							}
							p:nth-child(2){
								display: flex;
								gap:10px;
								flex-direction: column;
								span{
									display: block;
									height: 42px;
									width: 169px;
									line-height: 42px;
									padding-left: 40px;
									text-align: left;
									font-size: 24px;
									background: url("../../../assets/images/CompanyOverview/Frame 1705.png") no-repeat;
									color: #AFAFAF;
								}
								
							}
						}
						.grid-item-div2-div1 p:first-child{
							span:first-child{
								background: url("../../../assets/images/CompanyOverview/fengji.png") no-repeat;
								width: 125px;
								height: 138px;
								background-size: 100% 138px;
							}
							span:nth-child(2){
								font-size: 26px;
								margin-top: 10px;
								color: #DDF0FF;
							}
							
						}
						.grid-item-div2-div2 p:first-child{
							span:first-child{
								background: url("../../../assets/images/CompanyOverview/jidianxianlu.png") no-repeat;
								width: 125px;
								height: 138px;
								background-size: 100% 138px;
							}
							span:nth-child(2){
								font-size: 26px;
								margin-top: 10px;
								color: #DDF0FF;
							}
						}
						.grid-item-div2-div3 p:first-child{
							span:first-child{
								background: url("../../../assets/images/CompanyOverview/nibianqi.png") no-repeat;
								width: 125px;
								height: 138px;
								background-size: 100% 138px;
							}
							span:nth-child(2){
								font-size: 26px;
								margin-top: 10px;
								color: #DDF0FF;
							}
						}
						.grid-item-div2-div4 p:first-child{
							span:first-child{
								background: url("../../../assets/images/CompanyOverview/chunengPCS.png") no-repeat;
								width: 125px;
								height: 138px;
								background-size: 100% 138px;
							}
							span:nth-child(2){
								font-size: 26px;
								margin-top: 10px;
								color: #DDF0FF;
							}
						}
					}
				}
				.jkzt{
					display: flex;
					
					.Equipment-warning{
						width: 200px;
						display: inline-flex;
						height: 330px;
						padding: 30px 0px;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-start;
						flex-shrink: 0;
						display: flex;
						margin-left: auto;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						border-radius: 8px;
						p{
							width: 100%;
							height: 87px;
							font-size: 26px;
							background: url("../../../assets/images/CompanyOverview/Frame 1705.png") no-repeat;
							padding-left: 40px;
							color: #AFAFAF;
							span{
								width: 100%;
								display: block;
								height: 43px;
								line-height: 43px;
							}
						}
					}
				}
			}
		}
		.ResourcesSituation{
			width: 2778px;
			height: 738px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.Equipment-utilization-rate{
				width: 1374px;
				h2{
					background: url("../../../assets/images/CompanyOverview/shebeiliyonglv.png") center center no-repeat;
					height: 100px;
					width: 100%;
				}
				.average{
					width: 100%;
					display: flex;                       /* 使用 Flex 布局 */
					justify-content: space-between;      /* 第一个和最后一个子元素之间的空间均分 */
					align-items: center;
					gap:20px;
					margin-top: 20px;
					p{
						height: 82px;
						width: 255px;
						padding: 37px 28px;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						border-radius: 8px;
						span{
							height: 44px;
							line-height: 44px;
							text-align: center;
							i{
								font-size:26px ;
								color: #67717D;
							}
						}
						span:first-child{
							font-size: 28px;
							color: #DDF0FF;
							display: block;
						}
						span:nth-child(2){
							font-size: 32px;
							color: #27ffff;
							display: block;
						}
					}
				}
				.ranking{
					width: 100%;
					height: 425px;
					display: flex;                       /* 使用 Flex 布局 */
					justify-content: space-between;      /* 第一个和最后一个子元素之间的空间均分 */
					align-items: center;
					gap:20px;
					margin-top: 20px;
					.ranking-fd{
						height: 425px;
						width: 677px;
						h2{
							height:52px ;
							background: url("../../../assets/images/CompanyOverview/fengdian.png") 0px center no-repeat;
						}
					}
					.ranking-gf{
						width: 677px;
						height: 425px;
						h2{
							height:52px ;
							background: url("../../../assets/images/CompanyOverview/guangfu.png") 0px center no-repeat;
						}
					}
				}
			}
			.situation{
				width: 1374px;
				width: 1374px;
				h2{
					background: url("../../../assets/images/CompanyOverview/xunjianshebei.png") center center no-repeat;
					height: 100px;
					width: 100%;
				}
				.average{
					width: 100%;
					display: flex;                       /* 使用 Flex 布局 */
					justify-content: space-between;      /* 第一个和最后一个子元素之间的空间均分 */
					align-items: center;
					gap:20px;
					margin-top: 20px;
					p{
						height: 82px;
						width: 255px;
						padding: 37px 28px;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						border-radius: 8px;
						span{
							height: 44px;
							line-height: 44px;
							text-align: center;
							i{
								font-size:32px ;
								color: #67717D;
							}
						}
						span:first-child{
							font-size: 28px;
							color: #DDF0FF;
							display: block;
						}
						span:nth-child(2){
							font-size: 32px;
							color: #27ffff;
							display: block;
						}
					}
				}
				.Intelligent-inspection{
					height: 330px;
					display: flex;
					gap: 30px;
					margin-top: 20px;
					
					.Intelligent-inspection-left{
						width: 218px;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						display: flex;
						flex-direction: column;
						gap: 20px;
						padding: 34px 20px;
						p:first-child{
							font-size: 28px;
							height: 44px;
							line-height: 44px;
							text-align: center;
							color: #DDF0FF;
						}
						p:nth-child(2){
							font-size: 32px;
							height: 44px;
							line-height: 44px;
							text-align: center;
							color: #fff;
							i{
								color: #67717D;
								font-size: 26px;
							}
						}
						.xj-Divider{
							background: url("../../../assets/images/CompanyOverview/xj-Divider.png") center center no-repeat;
						}
						.xunjian{
							height: 50%;
							width: 206px;
							padding-left: 20px;
							padding-right: 20px;
						}
						.gaojing{
							height: 50%;
							width: 206px;
							padding-left: 20px;
							padding-right: 20px;
						}
					}
					.Intelligent-inspection-right{
						height: 100%;
						.Inspection-details{
							display: flex;
							flex-wrap: wrap;
							gap: 20px;
							p{
								width: 288px;
								height: 94px;
								padding: 30px;
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
									padding-left: 40px;
								}
								span:nth-child(2){
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
	}
	.conmiddle{
		width: 2600px;
		height: 1862px;
		position: absolute;
		top: 238px;
		left:2878px;
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
			margin-left:340px;
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
		.bottom{
			width: 1374px;
			height: 10px;
			background: url("../../../assets/images/homepage/Rectangle 330.png") center center no-repeat;
		}
		.PowerGeneration{
			width: 2778px;
			height: 632px;
			.generatingCapacity{
				width: 2778px;
				height: 100px;
				background: url("../../../assets/images/homepage/PowerGeneration.png") center center no-repeat;
			}
			.PowerGenerationBody{
				width: 2778px;
				height: 568px;
				position: absolute;
				top: 130px;
			}
			.generatingCapacityData{
				position: relative;
				width: 2778px;
				height: 428px;
				display: flex;
				gap: 30px;
				justify-content: space-between;
				.total,.windPower,.PhotovoltaicPower,.distributed,.storedEnergy,.SourceNetworkLoadStorage{
					flex:1;
					height: 428px;
					background: url("../../../assets/images/homepage/di.png") center center no-repeat;
					background-size: 100% 100%;
					overflow: hidden;
				}
				.totalData{
					height: 100%;
					h2{
						height: 82px;
						font-size: 42px;
						color:#A3C5FF;
						text-align:center;
						line-height: 82px;
						background: url("../../../assets/images/homepage/iconLightning.png") 100% 100% no-repeat;
					}
					.underline{
						height: 2px;
						background: url("../../../assets/images/homepage/underline.png") 100% 100% no-repeat;
						background-size: 100% 100%;
					}
					.stats-content {
						height: 256px;
						display: flex;
						flex-direction: column;
						gap: 32px;
						font-size: 26px;
						padding-left: 30px;
						padding-top: 20px;
					}
					
					.stats-item {
						display: flex;
						flex-direction: column;
						gap: 8px;
						transition: all 0.3s ease;
					
						&:hover {
						transform: translateX(8px);
						}
					}
					
					.stats-row {
						display: flex;
						align-items: center;
						.label {
						font-size: 24px;
						color: #A3C5FF;
						font-weight: 500;
						min-width: 140px;
						font-size: 26px;
						}
					
						.arrow {
							width:16px;
							height:28px;
							background: url("../../../assets/images/homepage/Frame 427320549.png") center center no-repeat;
							padding:7px 16px;
						}
					
						.value {
						font-size: 48px;
						font-weight: bold;
						color: #22d3ee;
						text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
						font-family: 'Arial', monospace;
						}
					}
					
					.growth-rate {
						font-size: 24px;
						font-weight: bold;
						display: flex;
						align-items: center;
						gap: 8px;
						i{
							color:#AFAFAF ;
						}
					
						&.positive {
						color: #22c55e;
						text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
						}
					
						&.negative {
						color: #ef4444;
						text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
						}
					
						.growth-arrow {
							width:20px;
							height:20px;
							background: url("../../../assets/images/homepage/Frame 427320595.png") center center no-repeat;
							display: inline-block;
						}
					}
				}
				.totalData:hover{
					background: url("../../../assets/images/homepage/di1.png") 100% 100% no-repeat;
					background-size: 100% 100%;
				}
			}
			.ElectricityStatistics{
				width: 1179px;
				height: 86px;
				display: flex;
				gap: 1px;
				justify-content: space-between;
				margin-top:30px;
				.ElectricityStatistics_div{
					height: 86px;
					display: flex;
					div:first-child{
					}
					p{
						height: 42px;
						line-height: 42px;
						font-size: 24px;
						color: #A3C5FF;
						span{
							color:#ff4949;
						}
						i{
							width: 21px;
							height: 19px;
							margin-left:14px;
							display: inline-block;
							color:#fff
						}
					}
				}
			}
		}
		.weather-staff{
			width: 2778px;
			height: 600px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.weather-staff-left{
				width: 1728px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/tianqiyujing.png") center center no-repeat;
				}
				.weatherwarning{
					display: flex;
					gap: 30px;
					.weatherwarning-div{
						width: 617px;
						height: 480px;
						margin-top: 20px;
					}
					.earlyWarning{
						width: 1081px;
						height: 480px;
						margin-top: 20px;
					}
				}
				
			}
			.weather-staff-right{
				width: 1021px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/renyuancheliang.png") center center no-repeat;
				}
				.staff-vehicle{
					display: flex;
					width: 100%;
					height: 470px;
					margin-top: 20px;
					gap: 30px;
				}
				.staff{
					width: 610px;
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
								background: url("../../../assets/images/CompanyOverview/Frame 1705.png") 0% center no-repeat;
								padding-left: 50px;
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
					width: 380px;
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
								background: url("../../../assets/images/CompanyOverview/Frame 1705.png") 0% center no-repeat;
								padding-left: 50px;
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
				.staff-span1{
					font-size: 28px;
					color: #DDF0FF;
				}
				.staff-span2,.staff-span3,.staff-span4{
					font-size: 26px;
					color: #A3C5FF;
					span{	
						color: #27FFFF;
						font-size: 32px;
						font-weight: 700;
					}
				}
			}
		}
		.secure-yunwei{
			width: 2778px;
			height: 600px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.secure-yunwei-left{
				width: 1728px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/anquangailan.png") 0% center no-repeat;
				}
				.weatherwarning{
					display: flex;
					gap: 30px;
					.weatherwarning-div{
						width: 617px;
						height: 480px;
						margin-top: 20px;
					}
					.earlyWarning{
						width: 1081px;
						height: 480px;
						margin-top: 20px;
					}
				}
				
			}
			.secure-yunwei-right{
				width: 1021px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/zhihuiyunwei.png") center center no-repeat;
				}
				.average{
					width: 100%;
					display: flex;                       /* 使用 Flex 布局 */
					justify-content: space-between;      /* 第一个和最后一个子元素之间的空间均分 */
					align-items: center;
					flex-wrap: wrap;
					gap:20px;
					margin-top: 20px;
					p{
						height: 70px;
						width: 270px;
						padding: 37px 28px;
						background: url("../../../assets/images/CompanyOverview/di.png") center center no-repeat;
						border-radius: 8px;
						span{
							height: 44px;
							line-height: 44px;
							text-align: center;
							i{
								font-size:32px ;
								color: #67717D;
							}
						}
						span:first-child{
							font-size: 28px;
							color: #DDF0FF;
							display: block;
						}
						span:nth-child(2){
							font-size: 32px;
							color: #27ffff;
							display: block;
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
  background: url("../../../assets/images/homepage/Backgroundimage.png") center center no-repeat;
  background-size: 100% 100%;
}


</style>
