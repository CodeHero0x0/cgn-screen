// 基础平台的一些接口实现
import { http } from '../request'
export default {

  // 装机规模、发电量、电站数量
  powerGeneration: (params) => http.postAxios('/sxxm_pro/business/api/powerGeneration', params),

  // 发电量-实时
  realTimePower: (params) => http.postAxios('/sxxm_pro/business/api/realTimePower', params),

  // 风机数据(总数量，故障数量，年利用小时数)
  getSWTURData: (params) => http.postAxios('/sxxm_pro/business/api/getSWTURData', params),

  // 逆变器数据(总数量，故障数量，年利用小时数)
  getSPVInverterData: (params) => http.postAxios('/sxxm_pro/business/api/getSPVInverterData', params),

  // 根据场站ID 获取场站风机数据列表
  getSWTURDataByStanid: (params) => http.postAxios('/sxxm_pro/business/api/getSWTURDataByStanid', params),

  // 获取场站列表数据
  getStationList: (params) => http.getAxios('/sxxm_pro/business/api/getStationList', params),

  // 获取实时出力（实时功率，辐照度，平均风速）
  getRealtimeOutput: (params) => http.getAxios('/sxxm_pro/business/api/getRealtimeOutput', params),

  // 发电量情况（计划发电，实时发电，发电率）
  getPowerGenerationSituation: (params) => http.getAxios('/sxxm_pro/business/api/getPowerGenerationSituation', params),

  // 平均利用小时数-各月
  getSbUseHoursEvMonth: (params) => http.getAxios('/sxxm_pro/business/api/getSbUseHoursEvMonth', params),

  // 根据场站ID 获取场站装机容量信息
  getSiteInfoBySiteid: (params) => http.getAxios('/sxxm_pro/business/api/getSiteInfoBySiteid', params),
  // 根据场站ID 获取场站逆变器数据列表
  getInverterDataByStanid: (params) => http.getAxios('/sxxm_pro/business/api/getInverterDataByStanid', params),

  // 获取风机的实时出力数据（有功功率，风速）
  getSwturRealtimeOutput: (params) => http.getAxios('/sxxm_pro/business/api/getSwturRealtimeOutput', params),

  // 获取风机的数据
  getSwturInfo: (params) => http.getAxios('/sxxm_pro/business/api/getSwturInfo', params),


  // 获取升压站主变负荷（有功功率）
  getSyzZb: (params) => http.getAxios('/sxxm_pro/business/api/getSyzZb', params),
  // 获取升压站出线电流
  getSyzCxdl: (params) => http.getAxios('/sxxm_pro/business/api/getSyzCxdl', params),
  // 获取升压监测数据
  getSyzInfo: (params) => http.getAxios('/sxxm_pro/business/api/getSyzInfo', params),


  // 监控-获取组织设备树
  iccTree: (params) => http.postAxios('/sxxm_pro/business/iccApi/iccTree', params),
  // 监控-获取视频rtsp流
  iccVideoInfo: (params) => http.postAxios('/sxxm_pro/business/iccApi/videoInfo', params),


  // 通用查询接口
  commonQuery: (params) => http.postAxios('/sxxm_pro/business/api/query', params),

  // 根据时间 获取场站限电量、故障损失电量、计划停运损失电量
  getElectric: (params) => http.getAxios('/sxxm_pro/business/api/getSiteInfoBySiteid', params),

  getDlIndicatorInfo: (params) => http.getAxios('/sxxm_pro/business/api/getDlIndicatorInfo', params),

  /**
   * 
   *12-17新增接口
   * params 
   * 1 'date=2023-12-05
   * 1  factoryCode=AHCHJY
   * 1  dateType=1（1是月 2是年）
   * 1  bsId=0399'
   */
  //场站系统token type=2
  getJkAccessToken: (params) => http.getAxios('/sxxm_pro/business/api/getToken', params),
  //场站卡片信息接口 params：11(十进制 1101)
  getFactoryInfo: (params) => http.getAxios('/serverPC/productionOperation/getFactoryInfo', params),
  //预测发电量和实际发电量和资源 params：16(十进制 1101)
  getFdlAndZy: (params) => http.getAxios('/serverPC/productionOperation/getFdlAndZy', params),
  //利用小时数 params：16 
  getUtilizationHours: (params) => http.getAxios('/serverPC/productionOperation/getUtilizationHours', params),
  //损失电量 params：16
  getPowerLoss: (params) => http.getAxios('/serverPC/productionOperation/getPowerLoss', params,),
  //设备可利用率 params：16
  getFacilityUseRatioTb: (params) => http.getAxios('/serverPC/productionOperation/getFacilityUseRatioTb', params),
  //综合指标分析接口 params：11
  getFdlInfo: (params) => http.getAxios('/serverPC/productionOperation/getFdlInfo', params),
}



