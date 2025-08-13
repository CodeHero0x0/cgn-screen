// 基础平台的一些接口实现
import { http } from './request'
export default {
  // 获取用户所有信息
  userGetById: (params) => http.getAxios('/system/user/getById', params),
  // 用户访问统计 ，插入记录
  insertVisitLog: (params) => http.postAxios('/system/log/insertVisitLog', params),
  // 获取导航
  getMenu: (params) => http.getAxios('/system/permission/getMenu', params),
  // 用户注册
  registerUser: (params) => http.postAxios('/system/user/registerUser', params),
  // 获取系统配置参数
  sysInfolist: (params) => http.getAxios('/system/sysInfo/listSysInfos', params),
  // 添加系统配置
  sysSaveSysInfo: (params) => http.postAxios('/system/sysInfo/saveSysInfo', params),
  // 通过key系统配置
  sysGetSysInfoByKey: (params) => http.getAxios('/system/sysInfo/getSysInfoByKey', params),
  // 修改用户个人信息
  userUpdatePersonalInformation: (params) => http.postAxios('/system/user/updatePersonalInformation', params),
  // 获取正则表达式
  getRegularRules: (params) => http.getAxios('/system/sysInfo/getRegularRules', params),
  // 按照角色获取数据权限
  userInitEnums: (params) => http.getAxios('/system/user/initEnums', params),
  // 获取权限分页列表
  permissionPage: (params) => http.getAxios('/system/permission/page', params),
  // 获取全部子系统
  getMenuToCS: (params) => http.getAxios('/system/permission/getMenuToCS', params),
  // 获取部门分页列表
  departmentTable: (params) => http.getAxios('/system/group/page', params),
  // login
  loginByUsername: (params) => http.postAxios('/system/login/loginForm', params),
  // logout
  logout: (params) => http.getAxios('/system/login/logout', params),
  // 获取用户信息
  getUserInfo: (params) => http.getAxios('/system/user/userInfo', params),
  // 获取省list
  getByProvinceList: (params) => http.getAxios('/mj/spatial/getByProvinceList', params),
  // 获取城市list
  getByCityList: (params) => http.getAxios('/mj/spatial/getByCityList', params),
  // 心跳
  getFrequency: (params) => http.getAxios('/system/login/onlineMonitor', params),
  // 获取角色分页列表
  rolePage: (params) => http.getAxios('/system/role/page', params),
  // 获取角色的全部权限
  listPermission: (params) => http.getAxios('/system/role/listPermission', params),
  // 修改角色权限
  updateRolePermission: (params) => http.postAxios('/system/role/updateRolePermission', params),
  // 修改角色信息
  updateRole: (params) => http.postAxios('/system/role/updateById', params),
  // 获取权限树结构
  permissionTree: (params) => http.getAxios('/system/permission/permissionTree', params),
  // 删除角色
  removeRole: (params) => http.getAxios('/system/role/removeById', params),
  // 添加角色
  saveRole: (params) => http.postAxios('/system/role/save', params),
  // 修改密码
  changePassword: (params) => http.postAxios('/system/user/updatePassword', params),
  // 获取用户管理树
  groupTree: (params) => http.getAxios('/system/group/groupTree', params),
  // 初始化用户管理表格和groupId
  userTable: (params) => http.getAxios('/system/user/page', params),
  // 用户审批
  getApproval: (params) => http.postAxios('/system/user/updateTypeById', params),
  // 用户重置密码
  resetPassword: (params) => http.getAxios('/system/user/resetPassword', params),
  // 更新用户
  userUpdate: (params) => http.postAxios('/system/user/updateById', params),
  // 新增用户
  userSave: (params) => http.postAxios('/system/user/save', params),
  // 获取用户权限
  userListRights: (params) => http.getAxios('/system/user/listRights', params),
  // 修改用户权限
  updateUserRights: (params) => http.postAxios('/system/user/updateUserRights', params),
  // 逻辑删除用户
  userRemove: (params) => http.getAxios('/system/user/removeById', params),
  // 物理删除用户
  userPhysicsRemove: (params) => http.getAxios('/system/user/remove', params),
  // 获取用户权限
  userPermission: (params) => http.getAxios('/system/role/list', params),
  // 初始化用户管理表格和groupId
  // 更新权限功能信息
  permissionUpdate: (params) => http.postAxios('/system/permission/updateById', params),
  // 创建权限功能信息
  permissionSave: (params) => http.postAxios('/system/permission/save', params),
  // 删除权限功能信息
  permissionRemove: (params) => http.getAxios('/system/permission/removeById', params),
  // 获取权限信息
  permissionGetById: (params) => http.getAxios('/system/permission/getById', params),
  // 更新部门信息
  departmentUpdate: (params) => http.postAxios('/system/group/updateById', params),
  // 创建部门信息
  departmentSave: (params) => http.postAxios('/system/group/save', params),
  // 删除部门
  departmentRemove: (params) => http.getAxios('/system/group/removeById', params),
  // 获取部门信息
  groupGetById: (params) => http.getAxios('/system/group/getById', params),
  // 获取部门权限
  listRights: (params) => http.getAxios('/system/group/listRights', params),
  // 修改部门权限
  updateGroupRights: (params) => http.postAxios('/system/group/updateGroupRights', params),

  // 获取电场基本信息
  getBasicInfo: (params) => http.postAxios('/business/api/query', params)
}
