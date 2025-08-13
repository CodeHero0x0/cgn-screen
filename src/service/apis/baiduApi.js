// 基础平台的一些接口实现
import { http } from '../request'
export default {

  // 百度天气接口
  baiduWeather: (params) => http.getAxios('/baiduApi/weather/v1/', params),

}
