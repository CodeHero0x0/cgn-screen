import Vue from "vue"
import Vuex from "vuex"
import App from "./AppScale.vue"
// import App from "./App.vue"
// 增加离线缓存
import "./registerServiceWorker.ts"
// 配置路由 支持自动注册
import router from "./router"
// 配置store 支持自动注册
import store from "./store"
// 配置国际化 支持自动注册
import i18n from './locales/i18n'
// 引入缩放支持自适应 ，可以根据自身需求注释
// import "amfe-flexible/index.js"
import "./assets/font/Font_SiYuan.scss";
import "./utils/drag"
// 引入 composition api 支持新语法
import VueCompositionApi from '@vue/composition-api'
import axios from "axios";

import Bus from './utils/bus' //这是我的路径，正确引用你们的路径
Vue.prototype.$axios = axios;  //此处根据项目情况来配置

// 引入element UI
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// 引入 ECharts
import * as echarts from 'echarts'
// 挂载到 Vue 原型上，方便全局使用
Vue.prototype.$echarts = echarts

// 全局样式
import "./assets/css/theme.less";
import "./assets/css/reset.css";
import "/static/css/light.css";

import http from './service/interface'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueCompositionApi)

Vue.config.devtools = false;
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.prototype.$bus = Bus

new Vue({
  i18n,
  router,
  store,
  render: (h: (arg0: any) => any) => h(App),
}).$mount("#app")
