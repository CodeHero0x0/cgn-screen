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
					<div class="PowerGenerationBody">
						<div class="generatingCapacityData">
							<div class="total"  v-for="item in getPowerGenerationData">
								<div class="totalData">
									<h2>{{item.mid_category}}</h2>
									<p class="underline"></p>
									<div class="stats-content">
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">本年发电量</span>
											<span class="arrow"></span>
											<span class="value">{{ item.sub_category }}</span>
											</div>
											<div class="growth-rate positive">
												<span v-if="item.metric_value ">+{{ item.metric_value }}</span>
												<span class="growth-arrow" v-if="item.metric_value "></span>
											</div>
										</div>
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">本月发电量</span>
											<span class="arrow"></span>
											<span class="value">{{ item.metric_name }}</span>
											</div>
											<div class="growth-rate positive" >
												<span v-if="item.four_category">+{{ item.four_category }}</span>
												<span class="growth-arrow" v-if="item.four_category"></span>
											</div>
										</div>
										<div class="stats-item">
											<div class="stats-row">
											<span class="label">昨日发电量</span>
											<span class="arrow"></span>
											<span class="value">{{ item.unit }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ElectricityStatistics">
							<div class="ElectricityStatistics_div">
								<div>
									<p>年计划发电量:{{ getPlannedPowerData[0].four_category }}</p>
									<p>本月计划发电量:{{ getPlannedPowerData[0].metric_value }}</p>
								</div>						<div>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[0].metric_name }}</span><i></i></p>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[0].unit }}</span><i></i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>风电年计划发电量:{{ getPlannedPowerData[1].four_category }}</p>
									<p>风电本月发电量:{{ getPlannedPowerData[1].metric_value }}</p>
								</div>
								<div>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[1].metric_name }}</span><i></i></p>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[1].unit }}</span><i></i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>光伏年计划发电量:{{ getPlannedPowerData[2].four_category }}</p>
									<p>光伏本月发电量:{{ getPlannedPowerData[2].metric_value }}</p>
								</div>
								<div>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[2].metric_name }}</span><i></i></p>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[2].unit }}</span><i></i></p>
								</div>
							</div>
							<div class="ElectricityStatistics_div">
								<div>
									<p>日风发电量:{{ getPlannedPowerData[3].four_category }}</p>
									<p>日光发电量:{{ getPlannedPowerData[3].metric_value }}</p>
								</div>
								<div>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[3].metric_name }}</span><i></i></p>
									<p style="color:#999;">超发 <span>{{ getPlannedPowerData[3].unit }}</span><i></i></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="StationStatistics">
					<div class="StationStatisticsImg"></div>
					<div class="StationStatisticsBody">
						<div class="MonthlyStatistics">
							<div class="MonthlyStatisticstitle"></div>
							<CompleteStatistics :echartsData="getAnnualCompletionData"></CompleteStatistics>
							<div class="bottom"></div>
						</div>
						<div class="annualStatistics">
							<div class="MonthlyStatisticstitle"></div>
							<CompleteStatistics :echartsData="getMonthlyCompletionData"></CompleteStatistics>
							<div class="bottom"></div>
						</div>
					</div>
				</div>
				<div class="ResourcesSituation">
					<div class="resources">
						<Resources :echartsData="echartsData" :all="getWindMonthlyActualData" :windPower="getWindMonthlyForecastedData" :photovoltaic="getWindMonthlyAverageSpeedData"></Resources>
						<div class="bottom"></div>
					</div>
					<div class="situation">
						<Resources :echartsData="echartsData1" :all="getAllMonthlyPlannedData" :windPower="getWindMonthlyPlanedData" :photovoltaic="getWindMonthlyActualPowerData"></Resources>
						<div class="bottom"></div>
					</div>
				</div>
			</div>
			<div class="conmiddle">
				<!-- <div class="conmiddle-right">
					<h2></h2>
					<div>
						<button>全部</button>
						<button>风电</button>
						<button>光伏</button>
						<button>分布式</button>
						<button>储能</button>
						<button>源网荷储</button>
					</div>
					
				</div> -->
				<div class="conmiddle-div">
					<button>公司总览</button>
					<button>业务运营</button>
					<button>资源禀赋</button>
					<button>设备管控</button>
				</div>
			</div>
			<div class="conRight">
				<div class="ResourcesSituation">
					<div class="resources">
						<LossPowerChart :getAffectedOnSiteData="getAffectedOnSiteData"></LossPowerChart>
						<div class="bottom"></div>
					</div>
					<div class="situation">
						<powerStatsContainer :getAnnualRationingData="getAnnualRationingData" :getMonthlyRationingData="getMonthlyRationingData"></powerStatsContainer>
					</div>
				</div>
				<div class="StationStatistics">
					<div class="resources">
						<StackedBarChart :StackedBarChartData="StackedBarChartData" :getMonthlyPowerTransmissionData="getMonthlyPowerTransmissionData" :getMonthlyGeneratorSetData="getMonthlyGeneratorSetData"></StackedBarChart>
						<div class="bottom"></div>
					</div>
					<div class="situation">
						<WaveChart :StackedBarChartData="StackedBarChartData3" :getAnnualAccumulationData="getAnnualAccumulationData" :getMonthlyRationingLossData="getMonthlyRationingLossData"></WaveChart>
						<div class="bottom"></div>
					</div>
				</div>
				<div class="ResourcesSituation">
					<div class="resources">
						<StackedBarChart1 :StackedBarChartData="StackedBarChartData2" :getAnnualGeneratorSetData="getAnnualGeneratorSetData" :getScheduledMonthlyGeneratorSetData="getScheduledMonthlyGeneratorSetData"></StackedBarChart1>
						<div class="bottom"></div>
					</div>
					<div class="situation">
						<StackedBarChart :StackedBarChartData="StackedBarChartData" :getMonthlyPowerTransmissionData="getAnnualPowerGridData" :getMonthlyGeneratorSetData="getMonthlyPowerGridData"></StackedBarChart>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { mapState, mapMutations } from "vuex"
import Resources from "@COM/echarts/resources.vue";
import StackedBarChart from "@COM/echarts/StackedBarChart.vue";
import StackedBarChart1 from "@COM/echarts/StackedBarChart1.vue";
import CompleteStatistics from "@COM/echarts/CompleteStatistics.vue";
import CompleteStatistics1 from "@COM/echarts/CompleteStatistics1.vue";
import LossPowerChart from "@COM/echarts/LossPowerChart.vue";
import powerStatsContainer from "@COM/StyleComponent/powerStatsContainer.vue";
import Time from "@COM/StyleComponent/time.vue";
import WeatherWidget from "@COM/StyleComponent/WeatherWidget.vue";
import WaveChart from "@COM/echarts/WaveChart.vue";


export default {
  	name: "homeIndex",
  	components: {
		Resources,
		CompleteStatistics,
		CompleteStatistics1,
		powerStatsContainer,
		LossPowerChart,
		StackedBarChart,
		StackedBarChart1,
		WaveChart,
		Time,
		WeatherWidget,
		
  	},
	data() {
		return {
			ElectricityStatisticsData: [
			{}
			],
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
			StackedBarChartData2:{'name': '计划停运','all':'月度','wind':'年累计','solar':'发电机组','IconCurve':'输变电','unitOfMeasurement':'其他'},
			StackedBarChartData3:{'name': '限电损失','all':'月度','wind':'年累计','solar':'发电机组','IconCurve':'输变电','unitOfMeasurement':'其他'},
			getPowerGenerationData:[],
			getPlannedPowerData:[],
			//业务运营/各场站上网电量完成情况
			getAnnualCompletionData:[],
			getMonthlyCompletionData:[],
			//业务运营/发电量和资源
			getWindMonthlyActualData:[],
			getWindMonthlyForecastedData:[],
			getWindMonthlyAverageSpeedData:[],
			//业务运营/发电计划执行
			getAllMonthlyPlannedData:[],
			getWindMonthlyPlanedData:[],
			getWindMonthlyActualPowerData:[],
			//业务运营/损失电量
			getAffectedOnSiteData:[],
			//业务运营/限电分析
			getAnnualRationingData:[],
			getMonthlyRationingData:[],
			//业务运营/场内受累
			getMonthlyPowerTransmissionData:[],
			getMonthlyGeneratorSetData:[],
  			//业务运营/限电损失
			getAnnualAccumulationData:[],
			getMonthlyRationingLossData:[],
			//业务运营/计划停运
			getAnnualGeneratorSetData:[],
			getScheduledMonthlyGeneratorSetData:[],
			//业务运营/场外受累
			getAnnualPowerGridData:[],
			getMonthlyPowerGridData:[],
		}
	},
	created() {
		this.getPowerGeneration();
		this.getPlannedPower();
		this.getAnnualCompletion();
		this.getMonthlyCompletion();
		this.getWindMonthlyActual();
		this.getWindMonthlyForecasted();
		this.getAffectedOnSite();
		this.getAnnualRationing();
		this.getMonthlyRationing();
		this.getWindMonthlyAverageSpeed();
		this.getAllMonthlyPlanned();
		this.getWindMonthlyPlaned();
		this.getWindMonthlyActualPower();
		this.getMonthlyPowerTransmission();
		this.getMonthlyGeneratorSet();
		this.getAnnualAccumulation();
		this.getMonthlyRationingLoss();
		this.getAnnualPowerGrid();
		this.getMonthlyPowerGrid();
		this.getAnnualGeneratorSet();
		this.getScheduledMonthlyGeneratorSet();
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
		getPowerGeneration() {
			this.$http.sx.getPowerGeneration({
			}).then(res => {
				if (res.code === 0) {
					this.getPowerGenerationData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getPlannedPower() {
			this.$http.sx.getPlannedPower({
			}).then(res => {
				if (res.code === 0) {
					this.getPlannedPowerData = res.data.rowData;
				}
				
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAnnualCompletion() {
			this.$http.sx.getAnnualCompletion({
			}).then(res => {
				if (res.code === 0) {
					this.getAnnualCompletionData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyCompletion() {
			this.$http.sx.getMonthlyCompletion({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyCompletionData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindMonthlyActual() {
			this.$http.sx.getWindMonthlyActual({
			}).then(res => {
				if (res.code === 0) {
					this.getWindMonthlyActualData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindMonthlyForecasted() {
			this.$http.sx.getWindMonthlyForecasted({
			}).then(res => {
				if (res.code === 0) {
					this.getWindMonthlyForecastedData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAffectedOnSite() {
			this.$http.sx.getAffectedOnSite({
			}).then(res => {
				if (res.code === 0) {
					this.getAffectedOnSiteData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindMonthlyAverageSpeed() {
			this.$http.sx.getWindMonthlyAverageSpeed({
			}).then(res => {
				if (res.code === 0) {
					this.getWindMonthlyAverageSpeedData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAnnualRationing() {
			this.$http.sx.getAnnualRationing({
			}).then(res => {
				if (res.code === 0) {
					this.getAnnualRationingData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyRationing() {
			this.$http.sx.getMonthlyRationing({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyRationingData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAllMonthlyPlanned() {
			this.$http.sx.getAllMonthlyPlanned({
			}).then(res => {
				if (res.code === 0) {
					this.getAllMonthlyPlannedData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindMonthlyPlaned() {
			this.$http.sx.getWindMonthlyPlaned({
			}).then(res => {
				if (res.code === 0) {
					this.getWindMonthlyPlanedData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getWindMonthlyActualPower() {
			this.$http.sx.getWindMonthlyActualPower({
			}).then(res => {
				if (res.code === 0) {
					this.getWindMonthlyActualPowerData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyPowerTransmission() {
			this.$http.sx.getMonthlyPowerTransmission({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyPowerTransmissionData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyGeneratorSet() {
			this.$http.sx.getMonthlyGeneratorSet({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyGeneratorSetData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAnnualAccumulation() {
			this.$http.sx.getAnnualAccumulation({
			}).then(res => {
				if (res.code === 0) {
					this.getAnnualAccumulationData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyRationingLoss() {
			this.$http.sx.getMonthlyRationingLoss({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyRationingLossData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAnnualPowerGrid() {
			this.$http.sx.getAnnualPowerGrid({
			}).then(res => {
				if (res.code === 0) {
					this.getAnnualPowerGridData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getMonthlyPowerGrid() {
			this.$http.sx.getMonthlyPowerGrid({
			}).then(res => {
				if (res.code === 0) {
					this.getMonthlyPowerGridData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getAnnualGeneratorSet() {
			this.$http.sx.getAnnualGeneratorSet({
			}).then(res => {
				if (res.code === 0) {
					this.getAnnualGeneratorSetData = res.data.rowData;
					console.log(123,this.getAnnualGeneratorSetData)
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		getScheduledMonthlyGeneratorSet() {
			this.$http.sx.getScheduledMonthlyGeneratorSet({
			}).then(res => {
				if (res.code === 0) {
					this.getScheduledMonthlyGeneratorSetData = res.data.rowData;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.homeIndex{
  width: 100%;
  height: 100%;
	.homeIndexHead{
		width:100%;
		height:238px;
		background: url("../../../assets/images/homepage/Headbackground.png") center center no-repeat;
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
			height: 674px;
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
					width: 532px;
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
						margin-left: 20px;
						margin-right: 20px;
						background: url("../../../assets/images/homepage/iconLightning.png") 100% 100% no-repeat;
					}
					.underline{
						height: 2px;
						background: url("../../../assets/images/homepage/underline.png") 100% 100% no-repeat;
					}
					.stats-content {
						width: 300px;
						height: 256px;
						display: flex;
						flex-direction: column;
						gap: 32px;
						margin-top:40px;
						margin-left:40px;
						font-size: 26px;
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
						color: rgba(255, 255, 255, 0.9);
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
						font-size: 20px;
						font-weight: bold;
						margin-left: 176px;
						display: flex;
						align-items: center;
						gap: 8px;
					
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
						}
					}
				}
				.totalData:hover{
					background: url("../../../assets/images/homepage/di1.png") 100% 100% no-repeat;
					background-size: 100% 100%;
				}
			}
			.ElectricityStatistics{
				width: 2533px;
				height: 86px;
				display: flex;
				gap: 30px;
				justify-content: space-between;
				margin-top:30px;
				.ElectricityStatistics_div{
					width: 500px;
					height: 86px;
					display: flex;
					gap: 17px;
					div:first-child{
						width:282px;
					}
					p{
						height: 42px;
						line-height: 42px;
						font-size: 24px;
						span{
							color:#ff4949;
						}
						i{
							width: 21px;
							height: 19px;
							margin-left:14px;
							display: inline-block;
							background: url("../../../assets/images/homepage/Vector.png") center center no-repeat;
						}
					}
				}
			}
		}
		.StationStatistics{
			width: 2778px;
			height: 564px;
			.StationStatisticsImg{
				width: 2778px;
				height: 100px;
				background: url("../../../assets/images/homepage/StationStatistics.png") center center no-repeat;
			}
			.StationStatisticsBody{
				width: 2778px;
				height: 434px;
				position: relative;
				top: 30px;
				display: flex;
				gap: 30px;
				.MonthlyStatistics{
					width: 1374px;
					height: 434px;
					.MonthlyStatisticstitle{
						width:268px;
						height:52px;
						margin-bottom:20px;
						background: url("../../../assets/images/homepage/Rectangle 6163.png") center center no-repeat;
					}
				}
				.annualStatistics{
					width: 1374px;
					height: 434px;
					.MonthlyStatisticstitle{
						width:268px;
						height:52px;
						margin-bottom:20px;
						background: url("../../../assets/images/homepage/Frame 427320604.png") center center no-repeat;
					}
				}
			}
		}
		.ResourcesSituation{
			width: 2778px;
			height: 564px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			// .ResourcesSituationImg{
			// 	width: 1374px;
			// 	height: 100px;
			// 	background: url("../../../assets/images/homepage/ResourcesSituationImg.png") center center no-repeat;
			// }
			.resources{
				width: 1374px;
				height: 564px;
			}
			.situation{
				width: 1374px;
				height: 564px;
			}
		}
	}
	.conmiddle{
		width: 2600px;
		height: 1862px;
		position: absolute;
		top: 238px;
		left:3079px;
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
			height: 674px;
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
				background:#ccc;
				div{
					width: 438px;
					height: 428px;
				}
			}
			.ElectricityStatistics{
				width: 2533px;
				height: 86px;
				display: flex;
				gap: 30px;
				justify-content: space-between;
				margin-top:30px;
				.ElectricityStatistics_div{
					width: 470px;
					height: 86px;
					display: flex;
					gap: 17px;
					p{
						height: 42px;
						line-height: 42px;
						font-size: 24px;
						span{
							color:#ff4949;
						}
						i{
							width: 21px;
							height: 19px;
							margin-left:14px;
							display: inline-block;
							background: url("../../../assets/images/homepage/Vector.png") center center no-repeat;
						}
					}
				}
			}
		}
		.StationStatistics{
			width: 2778px;
			height: 564px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.resources{
				width: 1374px;
				height: 564px;
			}
			.situation{
				width: 1374px;
				height: 564px;
			}
		}
		.ResourcesSituation{
			width: 2778px;
			height: 674px;
			margin-top: 30px;
			display: flex;
			gap: 30px;
			.resources{
				width: 1374px;
				height: 564px;
			}
			.situation{
				width: 1374px;
				height: 564px;
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
