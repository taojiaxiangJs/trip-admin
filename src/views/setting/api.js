import { request } from '@/utils'

export default {
  // 角色
  getAllRole: (params = {}) => request.get('admin/role', { params }), // 获取权限列表
  postAddRole: (data = {}) => request.post('admin/role', { ...data }), // 新增权限
  putEditRole: (data = {}) => request.put('admin/role', { ...data }), // 编辑权限
  deleteRole: (id) => request.delete(`admin/role/${id}`), // 删除角色

  // 用户账号
  getAllUser: (params = {}) => request.get('admin/system/user', { params }), // 查询用户
  postAddUser: (data = {}) => request.post('admin/system/user', { ...data }), // 新增用户
  putEditUser: (data = {}) => request.put('admin/system/user', { ...data }), // 编辑用户
  deleteUser: (id) => request.delete(`admin/system/user/${id}`), // 删除用户
  putUserDisable: (id) => request.put(`admin/system/user/disable/${id}`), // 禁用用户
  putUserEnable: (id) => request.put(`admin/system/user/enable/${id}`), // 启用用户
  putUserResetPassword: (id) => request.put(`admin/system/user/password/init/${id}`), // 重置密码

  // 租户
  getAllLessee: (params = {}) => request.get('admin/tenant', { params }), // 获取租户列表
  postAddLessee: (data = {}) => request.post('admin/stenant', { ...data }), // 新增租户
  putEditLessee: (data = {}) => request.put('admin/tenant', { ...data }), // 编辑租户
  putLesseeResetPassword: (id) => request.put(`admin/tenant/password/init/${id}`) // 重置密码
}
