
import base from './base';
import apiList from './loadApis';


// 处理请求和响应拦截器（可选）
// ...（如前面的代码示例）

// 将 http 实例与基础接口和业务接口合并导出
export default {
  ...base,
  ...apiList,
};
