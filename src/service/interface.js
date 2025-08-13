import base from './base'
import apiList from "./loadApis";
export default {
  // 基础接口
  ...base,
  // 业务工程接口
  ...apiList
}
