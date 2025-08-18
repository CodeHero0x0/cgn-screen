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
                    <div class="PowerGeneration-left">
						<h2></h2>
						<div class="staff-vehicle">
                            <div class="vehicle">
								<p class="staff-p1">光伏</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
                                        <span class="staff-span1">本月最大风速
                                            <i></i>
                                            <span>42.34</span>
                                            <span> m/s</span>
                                        </span>
										<span class="staff-span2">本月平均风速
                                            <i></i>
                                            <span>6.89</span>
                                            <span> m/s</span>
                                        </span>
										<span class="staff-span3">昨日最大风速
                                            <i></i>
                                            <span>42.34</span>
                                            <span> m/s</span>
                                        </span>
										<span class="staff-span4">昨日平均风速
                                            <i></i>
                                            <span>8.62</span>
                                            <span> m/s</span>
                                        </span>
									</p>
								</div>
							</div>
							<div class="staff">
								<p class="staff-p1">风电</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
										<span class="staff-span1">本月最大辐照度
                                            <i></i>
                                            <span>8.28</span>
                                            <span> W/s2</span>
                                        </span>
										<span class="staff-span2">本月平均辐照度
                                             <i></i>
                                            <span>5.51</span>
                                            <span> W/s2</span>
                                        </span>
										<span class="staff-span3">昨日最大辐照度
                                             <i></i>
                                            <span>6.3</span>
                                            <span> W/s2</span>
                                        </span>
										<span class="staff-span4">昨日平均辐照度
                                             <i></i>
                                            <span>5.02</span>
                                            <span> W/s2</span>
                                        </span>
									</p>
									<p  class="staff-div-Divider"></p>
									<p class="staff-div-p2">
										<span class="staff-span1">本月最高温度
                                             <i></i>
                                            <span>42</span>
                                            <span> °C</span>
                                        </span>
										<span class="staff-span2">本月平均温度
                                             <i></i>
                                            <span>29.13</span>
                                            <span>°C</span>
                                        </span>
										<span class="staff-span3">昨日最高温度
                                             <i></i>
                                            <span>42</span>
                                            <span> °C</span>
                                        </span>
										<span class="staff-span4">昨日平均温度
                                             <i></i>
                                            <span>36</span>
                                            <span> °C</span>
                                        </span>
									</p>
								</div>
							</div>
							
						</div>
					</div>
                    <div class="PowerGeneration-right">
                        <h2></h2>
						<earlyWarning class="earlyWarning" :events="events" :columns="eventColumns" :priority-config="customPriorityConfig"></earlyWarning>
					</div>
					
				</div>
				<div class="StationStatistics">
                    <div class="StationStatistics-left">
						<h2></h2>
						<h3></h3>
                        <div class="StationStatistics-left-div">
                            <p v-for="item in Windpowerranking">
                                <span class="StationStatistics-span1">{{ item.percentage }}</span>
                                <span class="StationStatistics-span2">{{ item.speed }}<i></i></span>
                                <span class="StationStatistics-span3">{{ item.name }}</span>
                            </p>
                        </div>
					</div>
                    <div class="StationStatistics-right">
                        <h2></h2>
                        <h3></h3>
                        <div class="StationStatistics-left-div">
                            <p v-for="item in radiance">
                                <span class="StationStatistics-span1">{{ item.percentage }}</span>
                                <span class="StationStatistics-span2">{{ item.speed }}<i></i></span>
                                <span class="StationStatistics-span3">{{ item.name }}</span>
                            </p>
                        </div>
					</div>
				</div>
				<div class="ResourcesSituation">
					<div class="Equipment-utilization-rate">
						<h2></h2>
						<prediction :echartsData="echartsData" :predictionData="chartData"></prediction>
					</div>
					<div class="situation">
						<h2></h2>
						<prediction :echartsData="echartsData1" :predictionData="chartData1"></prediction>
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
				<div class="IndustryBenchmarking">
					<h2></h2>
					<div class="contrast">
						<div class="contrast-left">
							<p class="contrast-fd">
								<span class="contrast-fd-span1">风电年累计对比</span>
								<span class="contrast-fd-span2">(h)</span>
							</p>
							<p class="contrast-Divider"></p>
							<div class="contrast-div">
								<p class="contrast-div-p1">
									<span class="p1-span1">784</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">中电联25年 ( 1~6月 ) 累计</span>
								</p>
								<p class="contrast-div-p2"></p>
								<p class="contrast-div-p3">
									<span class="p1-span1">新疆公司25年 ( 1~6月 ) 累计</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">835</span>
								</p>
							</div>
							<div style="display: flex;">
								<div class="contrast-div1">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>784</span>
										<span>同比</span>
										<span>-4.65% <i class="contrast-decline"></i></span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>835</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+45</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+1.10%</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
								<div class="contrast-div2">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>784</span>
										
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>835</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+45</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+1.10%</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
							</div>
						</div>
						<div class="contrast-right">
							<p class="contrast-fd">
								<span class="contrast-fd-span1">风电年累计对比</span>
								<span class="contrast-fd-span2">(h)</span>
							</p>
							<p class="contrast-Divider"></p>
							<div class="contrast-div">
								<p class="contrast-div-p1">
									<span class="p1-span1">784</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">中电联25年 ( 1~6月 ) 累计</span>
								</p>
								<p class="contrast-div-p2"></p>
								<p class="contrast-div-p3">
									<span class="p1-span1">新疆公司25年 ( 1~6月 ) 累计</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">835</span>
								</p>
							</div>
							<div style="display: flex;">
								<div class="contrast-div1">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>784</span>
										<span>同比</span>
										<span>-4.65% <i class="contrast-decline"></i></span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>835</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+45</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+1.10%</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
								<div class="contrast-div2">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>784</span>
										
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>835</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+45</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>+1.10%</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					
					<div class="benchmarking">
						<div class="benchmarking-left">	
							<h3></h3>
							<HourBenchmarking  
								:yearbefore="yearbefore"
								:lastyear="[30, 40, 50, 65, 70, 15, 20, 35, 40, 50, 60, 70]"
								:thisyear="[11, 22, 33, 45, 95, 28, 30, 84, 81, 93, 20, 36]">
							</HourBenchmarking>
						</div>
						<div class="benchmarking-right">
							<h3><p></p></h3>
							<HourBenchmarking  
								:yearbefore="yearbefore"
								:lastyear="[30, 40, 50, 65, 70, 15, 20, 35, 40, 50, 60, 70]"
								:thisyear="[11, 22, 33, 45, 95, 28, 30, 84, 81, 93, 20, 36]">
							</HourBenchmarking>
						</div>
					</div>
				</div>
				<div class="ranking">
					<div class="ranking-left">
						<h2></h2>
						<HourlyRanking  :echartsData="[65, 70, 80, 75, 90, 85, 60, 55, 40, 30, 50, 80]"
						:hourData="[70, 75, 80, 85, 90, 78, 80, 88, 82, 95, 88, 76]"></HourlyRanking>
						<div class="bottom"></div>
					</div>
					<div class="ranking-right">
						<h2></h2>
						<HourlyRanking  :echartsData="[1, 2, 3, 4, 5, 5, 0, 5, 4, 3, 5, 8]"
						:hourData="[7, 7, 8, 8, 9, 7, 8, 8, 8, 9, 8, 7]"></HourlyRanking>
						<div class="bottom"></div>
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
import earlyWarning from "@COM/StyleComponent/earlyWarning.vue";
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
		earlyWarning,
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
			echartsData:{'name': '发电量和资源','all':'全部','wind':'风电','solar':'光伏','IconCurve':'平均风速','unitOfMeasurement':'(m/s)'},
			echartsData1:{'name': '计划发电情况','all':'全部','wind':'风电','solar':'光伏','IconCurve':'平均辐照度','unitOfMeasurement':'(W/s2)'},
			yearbefore : [65, 70, 80, 75, 90, 85, 60, 55, 40, 30, 50, 80],
			lastyear : [30, 40, 50, 65, 70, 15, 20, 35, 40, 50, 60, 70],
			thisyear : [11, 22, 33, 45, 95, 28, 30, 84, 81, 93, 20, 36],
            chartData: [644.557, 879.606, 874.198, 956.398, 770.51, 949.894, 1107.971],
            chartData1: [174.27, 171.39, 181.66, 232.54, 232.26, 208.54, 242.44],
			statsContentDate:[
				{'name':'合计','year':'490717','month':'666528','daily':'46.12%',"YoY":'20.43%','MoM':'21.79%'},
				{'name':'风电','year':'430666','month':'523308','daily':'30.71%',"YoY":'6.27%','MoM':'14.12%'},
				{'name':'光伏','year':'60050','month':'71610','daily':'39.62%',"YoY":'-11.24%','MoM':'14%'},
				{'name':'储能','year':'22108','month':'36008','daily':'61.40%',"YoY":'','MoM':''},
				{'name':'源网荷储','year':'63639','month':'67690','daily':'94.02%',"YoY":'','MoM':''},
			],
			Windpowerranking: [
				{ id: 1, name: '十三间房', speed: 11.08 ,percentage:'99.86%'},
				{ id: 2, name: '托克逊', speed: 8.75 ,percentage:'99.83%'},
				{ id: 3, name: '哈密分散式翠岭', speed: 7.78 ,percentage:'100%'},
				{ id: 4, name: '哈密分散式一期', speed: 6.64 ,percentage:'99.92%'},
				{ id: 5, name: '哈密烟墩', speed: 6.12 ,percentage:'99.64%'}
			],
			radiance: [
            { id: 1, name: '吉木乃源网荷储光伏', speed: 6.75 ,percentage:'100%'},
				{ id: 2, name: '尉犁', speed: 6.63 ,percentage:'100%'},
				{ id: 3, name: '石城子', speed: 5.56 ,percentage:'100%'},
				{ id: 4, name: '青河', speed: 5.52 ,percentage:'100%'},
				{ id: 5, name: '英吉沙', speed: 5.45 ,percentage:'100%'}
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
			height: 601px;
            display: flex;
            gap: 30px;
			.PowerGeneration-right{
				width: 1374px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/tianqiyujing.png") 0% center no-repeat;
				}
                .earlyWarning{
                    width: 100%;
                    height: 500px;
                    margin-top: 20px;
                }
				
			}
			.PowerGeneration-left{
				width: 1374px;
				height: 600px;
				h2{
					width:100%;
					height:100px;
					background: url("../../../assets/images/CompanyOverview/ziyuanfenbu.png") 0% center no-repeat;
				}
				.staff-vehicle{
					display: flex;
					width: 100%;
					height: 470px;
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
                        background: url("../../../assets/images/CompanyOverview/iconLightning.png") 90% center no-repeat;
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
                        background: url("../../../assets/images/CompanyOverview/iconLightning.png") 90% center no-repeat;
                        
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
						font-size: 32px;
						font-weight: 700;
					}
                    span:nth-child(3){	
						color: #fff;
						font-size: 26px;
						font-weight: 500;
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
		.IndustryBenchmarking{
			width: 2778px;
			height: 1231px;
			h2{
				width: 100%;
				height: 100px;
				background: url("../../../assets/images/CompanyOverview/hangyeduibiao.png") center center no-repeat;
			}
			.contrast{
				width: 100%;
				height:576px ;
				display: flex;
				gap: 30px;
				margin-top: 30px;
				.contrast-left{
					width: 1374px;
					height: 100%;
					background: url("../../../assets/images/CompanyOverview/leinianduibi.png") center center no-repeat;
					padding: 0px 20px;
					.contrast-div-p2{
							background: url("../../../assets/images/CompanyOverview/fengdian-wz.png") center 100% no-repeat;	
							width: 128px;
							height: 140px;
						}
				}
				.contrast-right{
					width: 1374px;
					height: 100%;
					background: url("../../../assets/images/CompanyOverview/leinianduibi.png") center center no-repeat;
					padding: 0px 20px;
					.contrast-div-p2{
							background: url("../../../assets/images/CompanyOverview/guangfu-wz.png") center 100% no-repeat;	
							width: 128px;
							height: 140px;
						}
				}
				.contrast-fd{
						width: 100%;
						height: 92px;
						line-height: 92px;
						.contrast-fd-span1{
							color: #DDF0FF;
							text-shadow: 0 0 22.128px rgba(48, 165, 255, 0.60);
							font-family: "Alibaba PuHuiTi";
							font-size: 36px;
							font-style: normal;
							font-weight: 700;
							line-height: 44.256px; /* 122.932% */
						}
						.contrast-fd-span2{
							color: #FFF;
							font-family: "Alibaba PuHuiTi 2.0";
							font-size: 32px;
							font-style: normal;
							font-weight: 500;
							opacity: 0.8;
							line-height: normal;
							float: right;
						}
					}
					.contrast-Divider{
						width: 100%;
						height: 2px;
						background: url("../../../assets/images/CompanyOverview/contrast-Divider.png") center center no-repeat;
					}
					.contrast-div{
						width: 100%;
						height: 150px;
						display: flex;
						gap: 30px;
						.contrast-div-p1{
							width: 559px;
							height: 100px;
							background: url("../../../assets/images/CompanyOverview/fengdiannianduibi.png") center 100% no-repeat;	
							padding-left:20px ;
							padding-top: 30px;
							span{
								display: inline-block;
							}
							.p1-span1{
								color: #27FFFF;
								text-shadow: 0 0 15.778px rgba(18, 218, 255, 0.42);
								font-family: "Alibaba PuHuiTi";
								font-size: 42px;
								font-style: normal;
								font-weight: 700;
								line-height: normal;
								padding-left: 50px;
							}
							.p1-span2{
								background: url("../../../assets/images/CompanyOverview/Frame427320549left.png") center 100% no-repeat;	
								width: 16px;
								height: 28px;
								margin-left: 16px;
								margin-right: 16px;
							}
							.p1-span3{
								color: #A3C5FF;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 32px;
								font-style: normal;
								font-weight: 500;
								line-height: 42px; /* 131.25% */
							}
						}
						.contrast-div-p3{
							width: 559px;
							height: 100px;
							background: url("../../../assets/images/CompanyOverview/fengdiannianduibiright.png") center 100% no-repeat;	
							padding-top: 30px;
							span{
								display: inline-block;
							}
							.p1-span1{
								color: #A3C5FF;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 32px;
								font-style: normal;
								font-weight: 500;
								line-height: 42px; /* 131.25% */
							}
							.p1-span2{
								background: url("../../../assets/images/CompanyOverview/Frame 427320549.png") center 100% no-repeat;	
								width: 16px;
								height: 28px;
								margin-left: 16px;
								margin-right: 16px;
							}
							.p1-span3{
								color: #27FFFF;
								text-shadow: 0 0 15.778px rgba(18, 218, 255, 0.42);
								font-family: "Alibaba PuHuiTi";
								font-size: 42px;
								font-style: normal;
								font-weight: 700;
								line-height: normal;
							}
						}
					}
					.contrast-div1{
						padding: 30px 0px 30px 40px;
						display: flex;
						flex-direction: column;
						width: 669px;
						height: 216px;
						margin-top: 40px;
						gap: 20px;
						p{ 
							background: url("../../../assets/images/CompanyOverview/Frame 1705.png") 0% center no-repeat;
							height: 42px;
							line-height: 42px;
							padding-left: 48px;
							width: 669px;
							span:nth-child(1){
								color: #AFAFAF;
								text-align: center;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 400;
								line-height: 42px; /* 161.538% */
								cursor: pointer;
							}
							span:nth-child(1):hover{
								color: #38BDFF;
							}
							span:nth-child(2){
								color: #FFF;
								text-align: center;
								text-shadow: 0 0 22.128px rgba(48, 165, 255, 0.60);
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 600;
								line-height: normal;
								padding-left: 20px;
							}
							span:nth-child(3){
								color: rgba(255, 255, 255, 0.60);
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 24px;
								font-style: normal;
								font-weight: 500;
								opacity: 0.8;
								line-height: normal;
								padding-left: 20px;
							}
							span:nth-child(4){
								color: #FF4949;
								text-align: center;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 24px;
								font-style: normal;
								font-weight: 600;
								line-height: normal;
								padding-left: 20px;
								i{
									display: inline-block;
									width: 26px;
									height: 26px;
									
								}
								.contrast-decline{
									background: url("../../../assets/images/CompanyOverview/xiajiang.png") center 85% no-repeat;
								}
								.contrast-rise{
									background: url("../../../assets/images/CompanyOverview/shangsheng.png") center 85% no-repeat;
								}
							}
						}
					}
					.contrast-div2{
						padding: 30px 0px 30px 40px;
						display: flex;
						flex-direction: column;
						width: 669px;
						height: 216px;
						margin-top: 40px;
						gap: 20px;
						p{ 
							background: url("../../../assets/images/CompanyOverview/Frame 1705.png") 0% center no-repeat;
							height: 42px;
							line-height: 42px;
							padding-left: 48px;
							width: 669px;
							span:nth-child(1){
								color: #AFAFAF;
								text-align: center;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 400;
								line-height: 42px; /* 161.538% */
							}
							span:nth-child(1):hover{
								color: #38BDFF;
							}
							span:nth-child(2){
								color: #FFF;
								text-align: center;
								text-shadow: 0 0 22.128px rgba(48, 165, 255, 0.60);
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 26px;
								font-style: normal;
								font-weight: 600;
								line-height: normal;
								padding-left: 20px;
							}
							span:nth-child(3){
								color: rgba(255, 255, 255, 0.60);
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 24px;
								font-style: normal;
								font-weight: 500;
								opacity: 0.8;
								line-height: normal;
								padding-left: 20px;
							}
							span:nth-child(4){
								color: #FF4949;
								text-align: center;
								font-family: "Alibaba PuHuiTi 2.0";
								font-size: 24px;
								font-style: normal;
								font-weight: 600;
								line-height: normal;
								padding-left: 20px;
								i{
									display: inline-block;
									width: 26px;
									height: 26px;
									
								}
								.contrast-decline{
									background: url("../../../assets/images/CompanyOverview/xiajiang.png") center 85% no-repeat;
								}
								.contrast-rise{
									background: url("../../../assets/images/CompanyOverview/shangsheng.png") center 85% no-repeat;
								}
							}
						}
					}
			}
			.benchmarking{
				width: 100%;
				height:505px ;
				display: flex;
				gap: 30px;
				margin-top: 20px;
				.benchmarking-left{
					width: 1374px;
					height: 100%;
					h3{
						width: 100%;
						height: 52px;
						background: url("../../../assets/images/CompanyOverview/fengdianxiaoshiduibiao.png") 0% center no-repeat;
					}
				}
				.benchmarking-right{
					width: 1374px;
					height: 100%;
					h3{
						width: 100%;
						height: 52px;
						background: url("../../../assets/images/CompanyOverview/Group 1321314706.png") 0% center no-repeat;
						p{
							width: 100%;
							height: 52px;
							background: url("../../../assets/images/CompanyOverview/guangfuxiaoshiduibiao.png") 0% center no-repeat;
						}
					}
				}
			}
		}
		.ranking{
			width: 100%;
			height:601px ;
			display: flex;
			gap: 30px;
			margin-top: 30px;
			.ranking-left{
				width: 1374px;
				height: 100%;
				h2{
					width: 100%;
					height: 100px;
					background: url("../../../assets/images/CompanyOverview/fengdianxiaoshipaiming.png") center center no-repeat;
				}
			}
			.ranking-right{
				width: 1374px;
				height: 100%;
				h2{
					width: 100%;
					height: 100px;
					background: url("../../../assets/images/CompanyOverview/guangfuxiaoshipaiming.png") center center no-repeat;
				}
			}
			.bottom{
				width: 1374px;
				height: 10px;
				background: url("../../../assets/images/homepage/Rectangle 330.png") center center no-repeat;
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
