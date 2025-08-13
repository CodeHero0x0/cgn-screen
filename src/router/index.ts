import Vue from "vue";
import Router from "vue-router";

/**
 * 路由分模块管理
 */
import _homeRouter from "./_homeRouter";
import _routeModuleList from "./loadModules";
Vue.use(Router);
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  // 主要是解决输出bug error
  // @ts-ignore
  return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  // mode:'history',
  mode:'hash',
  routes: [
    ..._homeRouter, // 主页模块
    // 自动注入 路由
    ..._routeModuleList,
    // 404 页面
    {
      path: "*",
      meta: {
        title: "未找到相关页面",
      },
      component: () => import("@VIE/404.vue")
    }
  ]
});
