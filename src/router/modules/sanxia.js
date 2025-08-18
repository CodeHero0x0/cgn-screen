// 主场景
import Layout from "@/views/layout/MainPage.vue"
const haininghaitang = [
  {
    //主页面
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        // 模块1
        path: "/homeIndex",
        name: "homeIndex",
        meta: {
          keepAlive: false,
        },
        component: () => import("../../views/main/homeIndex/CompanyOverview"),
      },
      {
        // 模块2
        path: "/index",
        name: "index",
        meta: {
          keepAlive: false,
        },
        component: () => import("../../views/main/homeIndex/index"),
      },
      {
        // 模块3
        path: "/ResourceEndowment",
        name: "ResourceEndowment",
        meta: {
          keepAlive: false,
        },
        component: () => import("../../views/main/homeIndex/ResourceEndowment"),
      },
      {
        // 模块4
        path: "/equipmentManagement",
        name: "equipmentManagement",
        meta: {
          keepAlive: false,
        },
        component: () => import("../../views/main/homeIndex/equipmentManagement"),
      },
    ],
  },
  // {
  //   path: "/Main",
  //   name: "Main",
  //   meta: {
  //     title: "Main",
  //     keepAlive: false,
  //   },
  //   component: () =>
  //     import(
  //       "../../views/main/homeIndex/Main"
  //     ),
  // },
]

export default haininghaitang
