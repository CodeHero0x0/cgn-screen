// 基础平台的一些接口实现
import { http } from '../request'
export default {
	// 公司总览/资产全景/设备统计
	powerGeneration: (params) => http.getAxios('/api/companyOverview/asset/equipmentStatistics', params),
	// 公司总览/资产全景/电站数量
	powerStationNum: (params) => http.getAxios('/api/companyOverview/asset/powerStationNum', params),
	// 公司总览/资产全景/业态分布
	commercialDistribution: (params) => http.getAxios('/api/companyOverview/asset/commercialDistribution', params),
	// 公司总览/资产全景/装机容量
	installedCapacity: (params) => http.getAxios('/api/companyOverview/asset/installedCapacity', params),
	// 公司总览/设备运行状态大修/长停/
	runningStatusNum: (params) => http.getAxios('/api/companyOverview/statusOfEquipment/runningStatusNum', params),
	// 公司总览/设备健康状态统计
	healthStatusNum: (params) => http.getAxios('/api/companyOverview/statusOfEquipment/healthStatusNum', params),
	// 公司总览/设备健康状态柱状图统计
	healthStatus: (params) => http.getAxios('/api/companyOverview/statusOfEquipment/healthStatus', params),
	// 公司总览/根据设备类型获取运行状态统计/
	runningStatusByType: (params) => http.getAxios('/api/companyOverview/statusOfEquipment/runningStatus', params),
	// 公司总览/设备可利用率/光伏TOP5
	lightTop5: (params) => http.getAxios('/api/companyOverview/rateOfEquipment/lightTop5', params),
	// 公司总览/设备可利用率/风伏TOP5
	windTop5: (params) => http.getAxios('/api/companyOverview/rateOfEquipment/windTop5', params),
	// 公司总览/设备可利用率/设备可利用率总览
	rateOfEquipment: (params) => http.getAxios('/api/companyOverview/rateOfEquipment', params),
	// 公司总览/设备巡检/智能巡检
	smartInspection: (params) => http.getAxios('/api/companyOverview/inspection/smartInspection', params),
	// 公司总览/设备巡检/巡检设备
	equipment: (params) => http.getAxios('/api/companyOverview/inspection/equipment', params),
	//公司总览/发电量/发电量年度统计
	statistics: (params) => http.getAxios('/api/companyOverview/generateElectricity/statistics', params),
	//公司总览/发电量/获取发电量统计
	getByType: (params) => http.getAxios('/api/companyOverview/generateElectricity/yearStatistics', params),
	//公司总览/人员车辆/车辆信息
	car: (params) => http.getAxios('/api/companyOverview/personAndCar/car', params),
	//公司总览/人员车辆/人员信息
	person: (params) => http.getAxios('/api/companyOverview/personAndCar/person', params),
	//公司总览/安全概览/安全概览统计
	safetyoverview: (params) => http.getAxios('/api/companyOverview/safetyoverview', params),
	//公司总览/智慧运维/智慧运维统计
	wisdomOps: (params) => http.getAxios('/api/companyOverview/wisdomOps', params),
	
	//业务运营/发电量
	getPowerGeneration: (params) => http.getAxios('/api/getPowerGeneration', params),
	//业务运营/发电量
	getPowerGeneration: (params) => http.getAxios('/api/getPowerGeneration', params),
	//业务运营/各场站上网电量完成情况/年度完成情况
	getAnnualCompletion: (params) => http.getAxios('/api/business/getAnnualCompletion', params),
	//业务运营/各场站上网电量完成情况/月度完成情况
	getPlannedPower: (params) => http.getAxios('/api/business/getPlannedPower', params),
	//业务运营/发电量和资源/全部-月度
	getWindMonthlyActual: (params) => http.getAxios('/api/business/getAllMonthlyForecastedActual', params),
	//业务运营/发电量和资源/风电-月度
	getWindMonthlyForecasted: (params) => http.getAxios('/api/business/getWindMonthlyForecasted', params),
	//业务运营/发电量和资源/光伏-月度
	getWindMonthlyAverageSpeed: (params) => http.getAxios('/api/business/getWindMonthlyAverageSpeed', params),
	//业务运营/发电计划执行/全部-月度
	getAllMonthlyPlanned: (params) => http.getAxios('/api/business/getAllMonthlyPlanned', params),
	//业务运营/发电计划执行/风电-月度
	getWindMonthlyPlaned: (params) => http.getAxios('/api/business/getWindMonthlyPlaned', params),
	//业务运营/发电计划执行/光伏-月度
	getWindMonthlyActualPower: (params) => http.getAxios('/api/business/getWindMonthlyActualPower', params),
	getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),
	// getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),
	// getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),
	//业务运营/损失电量/年累计限电概览
	getAffectedOnSite: (params) => http.getAxios('/api/business/getAffectedOnSite', params),
	//业务运营/限电分析/年累计限电概览
	getAnnualRationing: (params) => http.getAxios('/api/business/getAnnualRationing', params),
	//业务运营/限电分析/月累计限电概览
	getMonthlyRationing: (params) => http.getAxios('/api/business/getMonthlyRationing', params),
	//业务运营/场内受累/年度
	getMonthlyPowerTransmission: (params) => http.getAxios('/api/business/getMonthlyPowerTransmission', params),
	//业务运营/场内受累/月度
	getMonthlyGeneratorSet: (params) => http.getAxios('/api/business/getMonthlyGeneratorSet', params),
	//业务运营/限电损失/年度
	getAnnualAccumulation: (params) => http.getAxios('/api/business/getAnnualAccumulation', params),
	//业务运营/限电损失/月度
	getMonthlyRationingLoss: (params) => http.getAxios('/api/business/getMonthlyRationingLoss', params),
	//业务运营/计划停运/年度
	getAnnualGeneratorSet: (params) => http.getAxios('/api/business/getAnnualGeneratorSet', params),
	//业务运营/计划停运/月度
	getScheduledMonthlyGeneratorSet: (params) => http.getAxios('/api/business/getScheduledMonthlyGeneratorSet', params),
	//业务运营/场外受累/年度
	getAnnualPowerGrid: (params) => http.getAxios('/api/business/getAnnualPowerGrid', params),
	//业务运营/场外受累/月度
	getMonthlyPowerGrid: (params) => http.getAxios('/api/business/getMonthlyPowerGrid', params),

	//资源禀赋/资源分布/风电/光伏
	getResourceDistribution: (params) => http.getAxios('/api/getResourceDistribution', params),
	//资源禀赋/天气预警
	getWeatherWarning: (params) => http.getAxios('/api/getWeatherWarning', params),
	//资源禀赋/风电月度最大平均风速TOP5
	getAverageWindSpeedTop: (params) => http.getAxios('/api/getAverageWindSpeedTop', params),
	//getAverageIrradianceTop
	getAverageIrradianceTop: (params) => http.getAxios('/api/getAverageIrradianceTop', params),
	//资源禀赋/风电未来7日预测发电情况
	getWindPredictsituation: (params) => http.getAxios('/api/getWindPredictsituation', params),
	//资源禀赋/光伏未来7日预测发电情况
	getPhotovoltaicPrediction: (params) => http.getAxios('/api/getPhotovoltaicPrediction', params),
	//资源禀赋/行业对标/光伏小时数对标
	getPhotovoltaicHourBenchmarking: (params) => http.getAxios('/api/getPhotovoltaicHourBenchmarking', params),
	//资源禀赋/行业对标/风电小时数对标
	getWindPowerHoursBenchmarking: (params) => http.getAxios('/api/getWindPowerHoursBenchmarking', params),
	//资源禀赋/行业对标/光伏年累计对比
	getComparisonOfWindPhotovoltaics: (params) => http.getAxios('/api/getComparisonOfWindPhotovoltaics', params),
	//资源禀赋/行业对标/风电年累计对比
	getComparisonOfWindPower: (params) => http.getAxios('/api/getComparisonOfWindPower', params),
	//资源禀赋/风电小时数排名
	getWindPowerHourRanking: (params) => http.getAxios('/api/getWindPowerHourRanking', params),
	//资源禀赋/光伏小时数排名
	getRankingOfPhotovoltaicHours: (params) => http.getAxios('/api/getRankingOfPhotovoltaicHours', params),
	
	//设备管控/智慧监控/预警明细
	getWarningDetails: (params) => http.getAxios('/api/getWarningDetails', params),
	//设备管控/智慧监控/监控数据-实时出力右侧的数据
	getMonitoring: (params) => http.getAxios('/api/getMonitoringData', params),
	//设备管控/智慧监控/预警分析
	getEarlyWarningAnalysis: (params) => http.getAxios('/api/getEarlyWarningAnalysis', params),
	//设备管控/智慧监控/预警统计
	getWarningStatistics: (params) => http.getAxios('/api/getWarningStatistics', params),
	//设备管控/智慧监控/告警提示
	getAlarmPrompt: (params) => http.getAxios('/api/getAlarmPrompt', params),
	//设备管控/智慧监控/实时出力
	getRealTimeOutput: (params) => http.getAxios('/api/getRealTimeOutput', params),
	//设备管控/智慧监控/设备状态
	getEquipmentStatus: (params) => http.getAxios('/api/business/getEquipmentStatus', params),
	//设备管控/智能巡视/无人机场站
	getUavStation: (params) => http.getAxios('/api/getUavStation', params),
	//设备管控/智能巡视/巡检
	getDroneInspection: (params) => http.getAxios('/api/getDroneInspection', params),
	//设备管控/智能巡视/无人机
	getUnmannedAerialVehicle: (params) => http.getAxios('/api/getUnmannedAerialVehicle', params),
	//设备管控/智能巡视/告警统计
	getAlarmStatistics: (params) => http.getAxios('/api/getAlarmStatistics', params),
	//设备管控/智能巡视/可靠性指标
	getReliabilityIndex: (params) => http.getAxios('/api/getReliabilityIndex', params),
	//设备管控/智能巡视/巡视统计
	getInspectionStatistics: (params) => http.getAxios('/api/getInspectionStatistics', params),
	//设备管控/智能巡视/操作票
	getOperationTicket: (params) => http.getAxios('/api/getOperationTicket', params),
	//设备管控/智能巡视/工作票
	getWorkTicket: (params) => http.getAxios('/api/getWorkTicket', params),
	//设备管控/智能巡视/工单
	getWorkOrderList: (params) => http.getAxios('/api/getWorkOrderList', params),
	//设备管控/智能巡视/检修任务
	getMaintenanceTasks: (params) => http.getAxios('/api/getMaintenanceTasks', params),
	//设备管控/智能巡视/人员车辆
	getPersonnelAndVehicles: (params) => http.getAxios('/api/getPersonnelAndVehicles', params),

}



