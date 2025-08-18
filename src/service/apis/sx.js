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

  //业务运营/发电量和资源/风电-年度
  getWindMonthlyActual: (params) => http.getAxios('/api/business/getWindMonthlyActual', params),
  //业务运营/发电量和资源/风电-月度
  getWindMonthlyForecasted: (params) => http.getAxios('/api/business/getWindMonthlyForecasted', params),

  getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),
  // getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),
  // getMonthlyCompletion: (params) => http.getAxios('/api/business/getMonthlyCompletion', params),

  //业务运营/损失电量/年累计限电概览
  getAffectedOnSite: (params) => http.getAxios('/api/business/getAffectedOnSite', params),

  //业务运营/限电分析/年累计限电概览
  getAnnualRationing: (params) => http.getAxios('/api/business/getAnnualRationing', params),
  //业务运营/限电分析/月累计限电概览
  getMonthlyRationing: (params) => http.getAxios('/api/business/getMonthlyRationing', params),

}



