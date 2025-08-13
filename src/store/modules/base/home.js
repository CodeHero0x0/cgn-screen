export default {
  namespaced: true,
  state: {
    //头部组件的三个按钮控制
    headerBtns:[false,false,false],

    // 省份编码,
    provinceid: sessionStorage.getItem("SESSION_SET_PROVINCEID") || '000000',
    //省份名称
    provinceName: sessionStorage.getItem("SESSION_SET_PROVINCENAME") || '全国',

    // 省份编码tem
    provinceid_tem: sessionStorage.getItem("SESSION_SET_PROVINCEID_TEM") || '',
    //省份名称tem
    provinceName_tem: sessionStorage.getItem("SESSION_SET_PROVINCENAME_TEM") || '',

    // 电站类型：CNDZ（储能电站），FDZ（风电站），GFDZ（光伏电站），SDZ（水电站）
    sitetype: sessionStorage.getItem("SESSION_SET_SITETYPE") || '',
    // 风电场类型：LF（陆风），HF（海风）
    fj_type: sessionStorage.getItem("SESSION_SET_FJ_TYPE") || '',

    // 场站信息
    siteInfo: JSON.parse(sessionStorage.getItem("SESSION_SET_SITEINFO")) || {},

    // 背景标志：1 全国省区背景  2 三维场景(重点场站)  3 二维场景(非重点场站)背景  4 全球背景
    regionBgFlag: JSON.parse(sessionStorage.getItem("SESSION_SET_REGIONBGFLAG")) || 1,

    // 风机/光伏id
    attr_oid: sessionStorage.getItem("SESSION_SET_ATTR_OID") || '',

    // 风机/光伏信息
    attr_info:  {},

    // 场区分组标志，如 H6，H10
    groupSite: sessionStorage.getItem("SESSION_SET_GROUPSITE") || '',

    // 升压站 或者 换流站 ： SYZ / HLZ
    syzOrHlz: sessionStorage.getItem("SESSION_SET_SYZORHLZ") || '',

    // 监控ID
    channelId: sessionStorage.getItem("SESSION_SET_CHANNELID") || '',

    popVideoPos: [],
  },
  getters: {
    //get方法
    getHeaderBtns: state => state.headerBtns
  },
  mutations: {
    SET_HEADERBTNS(state,data){
      state.headerBtns = data
    },

    SET_PROVINCEID(state, data) {
      state.provinceid = data;
      sessionStorage.setItem("SESSION_SET_PROVINCEID", data)
    },
    SET_PROVINCENAME(state, data) {
      state.provinceName = data;
      sessionStorage.setItem("SESSION_SET_PROVINCENAME", data)
    },

    SET_PROVINCEID_TEM(state, data) {
      state.provinceid_tem = data;
      sessionStorage.setItem("SESSION_SET_PROVINCEID_TEM", data)
    },
    SET_PROVINCENAME_TEM(state, data) {
      state.provinceName_tem = data;
      sessionStorage.setItem("SESSION_SET_PROVINCENAME_TEM", data)
    },

    SET_SITETYPE(state, data) {
      state.sitetype = data;
      sessionStorage.setItem("SESSION_SET_SITETYPE", data)
    },
    SET_FJ_TYPE(state, data) {
      state.fj_type = data;
      sessionStorage.setItem("SESSION_SET_FJ_TYPE", data)
    },

    SET_SITEINFO(state, data) {
      state.siteInfo = data;
      sessionStorage.setItem("SESSION_SET_SITEINFO", JSON.stringify(data))
    },

    SET_REGIONBGFLAG(state, data) {
      state.regionBgFlag = data;
      sessionStorage.setItem("SESSION_SET_REGIONBGFLAG", data)
    },

    SET_ATTR_OID(state, data) {
      state.attr_oid = data;
      sessionStorage.setItem("SESSION_SET_ATTR_OID", data)
    },

    SET_ATTR_INFO(state, data) {
      state.attr_info = data;
      sessionStorage.setItem("SESSION_SET_ATTR_INFO", data)
    },

    SET_GROUPSITE(state, data) {
      state.groupSite = data;
      sessionStorage.setItem("SESSION_SET_GROUPSITE", data)
    },

    SET_SYZORHLZ(state, data) {
      state.syzOrHlz = data;
      sessionStorage.setItem("SESSION_SET_SYZORHLZ", data)
    },

    SET_CHANNELID(state, data) {
      state.channelId = data;
      sessionStorage.setItem("SESSION_SET_CHANNELID", data)
    },

    SET_POPVIDEOPOS(state, data) {
        state.popVideoPos = data;
    },
  },
  actions: {}
}
