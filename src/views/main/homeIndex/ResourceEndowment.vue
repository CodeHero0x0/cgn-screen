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
						<div class="staff-vehicle" v-if="getResourceDistributionData.length > 0">
                            <div class="vehicle">
								<p class="staff-p1">光伏</p>
								<p class="staff-p2"></p>
								<div class="staff-div">
									<p class="staff-div-p1">
                                        <span class="staff-span1">本月最大风速
                                            <i></i>
                                            <span>{{ getResourceDistributionData[0].four_category }}</span>
                                            <span>{{ getResourceDistributionData[0].description }}</span>
                                        </span>
										<span class="staff-span2">本月平均风速
                                            <i></i>
                                            <span>{{ getResourceDistributionData[0].metric_name }}</span>
                                            <span> {{ getResourceDistributionData[0].description }}</span>
                                        </span>
										<span class="staff-span3">昨日最大风速
                                            <i></i>
                                            <span>{{ getResourceDistributionData[0].metric_value }}</span>
                                            <span> {{ getResourceDistributionData[0].description }}</span>
                                        </span>
										<span class="staff-span4">昨日平均风速
                                            <i></i>
                                            <span>{{ getResourceDistributionData[0].unit }}</span>
                                            <span> {{ getResourceDistributionData[0].description }}</span>
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
											<span>{{ getResourceDistributionData[1].four_category }}</span>
                                            <span>{{ getResourceDistributionData[1].description }}</span>
                                        </span>
										<span class="staff-span2">本月平均辐照度
                                             <i></i>
                                             <span>{{ getResourceDistributionData[1].metric_name }}</span>
                                            <span>{{ getResourceDistributionData[1].description }}</span>
                                        </span>
										<span class="staff-span3">昨日最大辐照度
                                             <i></i>
											 <span>{{ getResourceDistributionData[1].metric_value }}</span>
											 <span>{{ getResourceDistributionData[1].description }}</span>
                                        </span>
										<span class="staff-span4">昨日平均辐照度
                                             <i></i>
											 <span>{{ getResourceDistributionData[1].unit }}</span>
											 <span>{{ getResourceDistributionData[1].description }}</span>
                                        </span>
									</p>
									<p  class="staff-div-Divider"></p>
									<p class="staff-div-p2">
										<span class="staff-span1">本月最高温度
                                             <i></i>
											 <span>{{ getResourceDistributionData[2].four_category }}</span>
											 <span>{{ getResourceDistributionData[2].description }}</span>
                                        </span>
										<span class="staff-span2">本月平均温度
                                             <i></i>
											 <span>{{ getResourceDistributionData[2].metric_name }}</span>
											 <span>{{ getResourceDistributionData[2].description }}</span>
                                        </span>
										<span class="staff-span3">昨日最高温度
                                             <i></i>
                                             <span>{{ getResourceDistributionData[2].metric_value }}</span>
                                            <span>{{ getResourceDistributionData[2].description }}</span>
                                        </span>
										<span class="staff-span4">昨日平均温度
                                             <i></i>
											 <span>{{ getResourceDistributionData[2].unit }}</span>
											 <span>{{ getResourceDistributionData[2].description }}</span>
                                        </span>
									</p>
								</div>
							</div>
							
						</div>
					</div>
                    <div class="PowerGeneration-right">
                        <h2></h2>
						<earlyWarning class="earlyWarning" :events="getWeatherWarningData" :columns="eventColumns"></earlyWarning>
					</div>
					
				</div>
				<div class="StationStatistics">
                    <div class="StationStatistics-left">
						<h2></h2>
						<h3></h3>
                        <div class="StationStatistics-left-div">
							<p v-for="(item, index) in getAverageWindSpeedTopData" :key="index" :class="getBackgroundClass(item.metric_value)">
									<span class="StationStatistics-span1">{{ item.metric_value }}%</span>
									<span class="StationStatistics-span2">{{ item.metric_name }}<i> {{ item.unit }}</i></span>
									<span class="StationStatistics-span3">{{ item.four_category }}</span>
								</p>
                        </div>
					</div>
                    <div class="StationStatistics-right">
                        <h2></h2>
                        <h3></h3>
                        <div class="StationStatistics-left-div">
                            <p  v-for="(item, index) in getAverageIrradianceTopData" :key="index" :class="getBackgroundClass(item.metric_value)">
                                <span class="StationStatistics-span1">{{ item.metric_value }}%</span>
                                <span class="StationStatistics-span2">{{ item.metric_name }}<i> {{ item.unit }}</i></span>
                                <span class="StationStatistics-span3">{{ item.four_category }}</span>
                            </p>
                        </div>
					</div>
				</div>
				<div class="ResourcesSituation">
					<div class="Equipment-utilization-rate">
						<h2></h2>
						<prediction :echartsData="getWindPredictsituationData"></prediction>
					</div>
					<div class="situation">
						<h2></h2>
						<prediction :echartsData="getPhotovoltaicPredictionData"></prediction>
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
					<button @click="conmiddle(1)">公司总览</button>
					<button @click="conmiddle(2)">业务运营</button>
					<button @click="conmiddle(3)">资源禀赋</button>
					<button @click="conmiddle(4)">设备管控</button>
				</div>
			</div>
			<div class="conRight">
				<div class="IndustryBenchmarking">
					<h2></h2>
					<div class="contrast">
						<div class="contrast-left" v-if="getComparisonOfWindPhotovoltaicsData.length > 0">
							<p class="contrast-fd">
								<span class="contrast-fd-span1">风电年累计对比</span>
								<span class="contrast-fd-span2">(h)</span>
							</p>
							<p class="contrast-Divider"></p>
							<div class="contrast-div">
								<p class="contrast-div-p1">
									<span class="p1-span1">{{ getComparisonOfWindPhotovoltaicsData[0].four_category }}</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">中电联25年 ( 1~6月 ) 累计</span>
								</p>
								<p class="contrast-div-p2"></p>
								<p class="contrast-div-p3">
									<span class="p1-span1">新疆公司25年 ( 1~6月 ) 累计</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">{{ getComparisonOfWindPhotovoltaicsData[1].four_category }}</span>
								</p>
							</div>
							<div style="display: flex;">
								<div class="contrast-div1">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[0].metric_name }}</span>
										<span>同比</span>
										<span>-{{ getComparisonOfWindPhotovoltaicsData[0].reserve_field }} <i class="contrast-decline"></i></span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[0].metric_value }}	</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[0].unit }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业平均</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[0].description }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
								<div class="contrast-div2">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>{{getComparisonOfWindPhotovoltaicsData[1].metric_name }}</span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[1].metric_name }}	</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[1].unit }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业平均</span>
										<span>{{ getComparisonOfWindPhotovoltaicsData[1].description }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
							</div>
						</div>
						<div class="contrast-right"  v-if="getComparisonOfWindPowerData.length > 0">
							<p class="contrast-fd">
								<span class="contrast-fd-span1">光伏年累计对比</span>
								<span class="contrast-fd-span2">(h)</span>
							</p>
							<p class="contrast-Divider"></p>
							<div class="contrast-div">
								<p class="contrast-div-p1">
									<span class="p1-span1">{{ getComparisonOfWindPowerData[0].four_category }}</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">中电联25年 ( 1~6月 ) 累计</span>
								</p>
								<p class="contrast-div-p2"></p>
								<p class="contrast-div-p3">
									<span class="p1-span1">新疆公司25年 ( 1~6月 ) 累计</span>
									<span class="p1-span2"></span>
									<span class="p1-span3">{{ getComparisonOfWindPowerData[1].four_category }}</span>
								</p>
							</div>
							<div style="display: flex;">
								<div class="contrast-div1">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPowerData[0].metric_name }}</span>
										<span>同比</span>
										<span>-{{ getComparisonOfWindPowerData[0].reserve_field }} <i class="contrast-decline"></i></span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPowerData[0].metric_value }}	</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>{{ getComparisonOfWindPowerData[0].unit }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业平均</span>
										<span>{{ getComparisonOfWindPowerData[0].description }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
								</div>
								<div class="contrast-div2">
									<p>
										<span>新疆公司25年 ( 1~6月 ) 累计</span>
										<span>{{getComparisonOfWindPowerData[1].metric_name }}</span>
									</p>
									<p>
										<span>中电联25年 ( 1~6月 ) 累计</span>
										<span>{{ getComparisonOfWindPowerData[1].metric_name }}	</span>
									</p>
									<p>
										<span>2025年 - 高于行业</span>
										<span>{{ getComparisonOfWindPowerData[1].unit }}</span>
										<span></span>
										<span><i class="contrast-rise"></i></span>
									</p>
									<p>
										<span>2025年 - 高于行业平均</span>
										<span>{{ getComparisonOfWindPowerData[1].description }}</span>
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
							<HourBenchmarking :yearbefore="getWindPowerHoursBenchmarkingData"></HourBenchmarking>
						</div>
						<!-- getPhotovoltaicHourBenchmarkingData
						getWindPowerHoursBenchmarkingData -->
						<div class="benchmarking-right">
							<h3><p></p></h3>
							<HourBenchmarking :yearbefore="getPhotovoltaicHourBenchmarkingData"></HourBenchmarking>
						</div>
					</div>
				</div>
				<div class="ranking">
					<div class="ranking-left">
						<h2></h2>
						<HourlyRanking :echartsData="getWindPowerHourRankingData"></HourlyRanking>
						<div class="bottom"></div>
					</div>
					<div class="ranking-right">
						<h2></h2>
						<HourlyRanking :echartsData="getRankingOfPhotovoltaicHoursData"></HourlyRanking>
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
			echartsData:{'name': '发电量和资源','all':'全部','wind':'风电','solar':'光伏','IconCurve':'平均风速','unitOfMeasurement':'(m/s)'},
			echartsData1:{'name': '计划发电情况','all':'全部','wind':'风电','solar':'光伏','IconCurve':'平均辐照度','unitOfMeasurement':'(W/s2)'},
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
			//资源禀赋/资源分布/风电/光伏
			getResourceDistributionData:[],
			//资源禀赋/天气预警
			getWeatherWarningData: [],
			//资源禀赋/风电月度最大平均风速TOP5
			getAverageWindSpeedTopData :[],
			//getAverageIrradianceTop
			getAverageIrradianceTopData:[],
			//资源禀赋/风电未来7日预测发电情况
			getWindPredictsituationData:[],
			//资源禀赋/光伏未来7日预测发电情况
			getPhotovoltaicPredictionData:[],
			//资源禀赋/行业对标/光伏小时数对标
			getPhotovoltaicHourBenchmarkingData:[],
			//资源禀赋/行业对标/风电小时数对标
			getWindPowerHoursBenchmarkingData:[],
			//资源禀赋/行业对标/光伏年累计对比
			getComparisonOfWindPhotovoltaicsData:[],
			//资源禀赋/行业对标/风电年累计对比
			getComparisonOfWindPowerData: [],
			//资源禀赋/风电小时数排名
			getWindPowerHourRankingData:[],
			//资源禀赋/光伏小时数排名
			getRankingOfPhotovoltaicHoursData:[],
		}
	},
	created() {
	},
  	mounted() {
		this.getResourceDistribution();
		this.getWeatherWarning();
		this.getAverageWindSpeedTop();
		this.getAverageIrradianceTop();
		this.getWindPredictsituation();
		this.getPhotovoltaicPrediction();
		this.getPhotovoltaicHourBenchmarking();
		this.getWindPowerHoursBenchmarking();
		this.getComparisonOfWindPhotovoltaics();
		this.getComparisonOfWindPower();
		this.getWindPowerHourRanking();
		this.getRankingOfPhotovoltaicHours();
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
		getResourceDistribution() {
			this.$http.sx.getResourceDistribution({
			}).then(res => {
				if (res.code === 0) {
					this.getResourceDistributionData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWeatherWarning() {
			this.$http.sx.getWeatherWarning({
			}).then(res => {
				if (res.code === 0) {
					res.data.rowData.map((i,index)=>{
						this.getWeatherWarningData.push({id:index,priority:i.sub_category,content:i.four_category,time:i.metric_name,mid_category:i.mid_category})
						
					})
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAverageWindSpeedTop() {
			this.$http.sx.getAverageWindSpeedTop({
			}).then(res => {
				if (res.code === 0) {
					this.getAverageWindSpeedTopData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAverageIrradianceTop() {
			this.$http.sx.getAverageIrradianceTop({
			}).then(res => {
				if (res.code === 0) {
					this.getAverageIrradianceTopData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindPredictsituation() {
			this.$http.sx.getWindPredictsituation({
			}).then(res => {
				if (res.code === 0) {
					this.getWindPredictsituationData = res.data.rowData;
					this.getWindPredictsituationData.IconCurve = '平均风速';
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getPhotovoltaicPrediction() {
			this.$http.sx.getPhotovoltaicPrediction({
			}).then(res => {
				if (res.code === 0) {
					this.getPhotovoltaicPredictionData = res.data.rowData;
					this.getPhotovoltaicPredictionData.IconCurve = '平均辐照度';
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getPhotovoltaicHourBenchmarking() {
			this.$http.sx.getPhotovoltaicHourBenchmarking({
			}).then(res => {
				if (res.code === 0) {
					this.getPhotovoltaicHourBenchmarkingData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindPowerHoursBenchmarking() {
			this.$http.sx.getWindPowerHoursBenchmarking({
			}).then(res => {
				if (res.code === 0) {
					this.getWindPowerHoursBenchmarkingData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getComparisonOfWindPhotovoltaics() {
			this.$http.sx.getComparisonOfWindPhotovoltaics({
			}).then(res => {
				if (res.code === 0) {
					this.getComparisonOfWindPhotovoltaicsData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getComparisonOfWindPower() {
			this.$http.sx.getComparisonOfWindPower({
			}).then(res => {
				if (res.code === 0) {
					this.getComparisonOfWindPowerData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindPowerHourRanking() {
			this.$http.sx.getWindPowerHourRanking({
			}).then(res => {
				if (res.code === 0) {
					this.getWindPowerHourRankingData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getRankingOfPhotovoltaicHours() {
			this.$http.sx.getRankingOfPhotovoltaicHours({
			}).then(res => {
				if (res.code === 0) {
					this.getRankingOfPhotovoltaicHoursData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getBackgroundClass(metricValue) {
			// 提取百分比数值
			const percentage = parseFloat(metricValue.replace('%', ''));
			// 根据百分比返回对应的CSS类名
			if (percentage >= 100) {
				return 'bg-100';
			}else if (percentage >= 90) {
				return 'bg-90-100';
			} else if (percentage >= 80) {
				return 'bg-80-90';
			} else if (percentage >= 70) {
				return 'bg-70-80';
			} else if (percentage >= 60) {
				return 'bg-60-70';
			} else if (percentage >= 50) {
				return 'bg-50-60';
			} else if (percentage >= 40) {
				return 'bg-40-50';
			} else if (percentage >= 30) {
				return 'bg-30-40';
			} else if (percentage >= 20) {
				return 'bg-20-30';
			} else if (percentage >= 10) {
				return 'bg-10-20';
			} else {
				return 'bg-0-10';
			}
		},
		conmiddle(val){
			if(val == 1){
				this.$router.push({
					name: "homeIndex",
					params: {}
				})
			}else if(val == 2){
				this.$router.push({
					name: "index",
					params: {}
				})
			}
			else if(val == 3){
				this.$router.push({
					name: "ResourceEndowment",
					params: {}
				})
			}
			else if(val == 4){
				this.$router.push({
					name: "equipmentManagement",
					params: {}
				})
			}
		}
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
					padding-left: 30px;
					i{
						color: #FFF;
						font-family: "Alibaba PuHuiTi 2.0";
						font-size: 26px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
					}
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
					padding-left: 30px;
					i{
						color: #FFF;
						font-family: "Alibaba PuHuiTi 2.0";
						font-size: 26px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
					}
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
.bg-100 {
    background: url("../../../assets/images/CompanyOverview/bg-90-100.png") center center no-repeat;
    background-size: cover; // 或者您需要的其他尺寸设置
}
.bg-90-100 {
    background: url("../../../assets/images/CompanyOverview/bg-90-100.png") center center no-repeat;
    background-size: cover; // 或者您需要的其他尺寸设置
}

.bg-80-90 {
    background: url("../../../assets/images/CompanyOverview/bg-80-90.png") center center no-repeat;
    background-size: cover;
}

.bg-70-80 {
    background: url("../../../assets/images/CompanyOverview/bg-70-80.png") center center no-repeat;
    background-size: cover;
}

.bg-60-70 {
    background: url("../../../assets/images/CompanyOverview/bg-60-70.png") center center no-repeat;
    background-size: cover;
}

.bg-50-60 {
    background: url("../../../assets/images/CompanyOverview/bg-50-60.png") center center no-repeat;
    background-size: cover;
}

.bg-40-50 {
    background: url("../../../assets/images/CompanyOverview/bg-40-50.png") center center no-repeat;
    background-size: cover;
}

.bg-30-40 {
    background: url("../../../assets/images/CompanyOverview/bg-30-40.png") center center no-repeat;
    background-size: cover;
}

.bg-20-30 {
    background: url("../../../assets/images/CompanyOverview/bg-20-30.png") center center no-repeat;
    background-size: cover;
}

.bg-10-20 {
    background: url("../../../assets/images/CompanyOverview/bg-10-20.png") center center no-repeat;
    background-size: cover;
}

.bg-0-10 {
    background: url("../../../assets/images/CompanyOverview/bg-0-10.png") center center no-repeat;
    background-size: cover;
}

</style>
