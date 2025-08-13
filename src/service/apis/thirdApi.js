// 基础平台的一些接口实现
import { http } from '../request'
export default {

  // 视频一张网-获取监控点信息
  ywzCarmras: (params) => http.postAxios('thirdApi/api/dataser/fixed/ywz_carmras', params),

}
