import { request } from '@/utils'

export default {
  // 权限
  getPlatFormAllMenu: () => request.get('admin/menu/platform/list'), // 查询菜单(平台管理员用)
  getLesseeMenuRole: (id) => request.get(`admin/tenant/menus/${id}`), // 查询租户权限
  putLesseeMenuRole: (data = {}) => request.put('admin/tenant/menus', { ...data }), // 更新租户权限

  // 租户
  getAllLessee: (params = {}) => request.get('admin/tenant', { params }), // 获取租户列表
  postAddLessee: (data = {}) => request.post('admin/tenant', { ...data }), // 新增租户
  getLesseeDetail: (id) => request.get(`admin/tenant/account/${id}`), // 获取租户详情（不包含权限）
  putLesseeDetail: (data = {}) => request.put('admin/tenant/account', { ...data }), // 更新租户默认管理员账号
  putLesseeResetPassword: (id) => request.put(`admin/tenant/account/init/${id}`), // 重置租户管理员密码
  putLesseeDisable: (id) => request.put(`admin/tenant/disable/${id}`), // 禁用租户
  putLesseeEnable: (id) => request.put(`admin/tenant/enable/${id}`) // 启用租户
}
