import { request } from '@/utils'

export default {
  // 角色
  getAllRole: (params = {}) => request.get('/admin/role/list', { params }), // 获取权限列表
  postAddRole: (data = {}) => request.post('admin/role', { ...data }), // 新增权限
  putEditRole: (data = {}) => request.put('admin/role', { ...data }), // 编辑权限
  deleteRole: (id) => request.delete(`admin/role/${id}`), // 删除角色
  getRoleUser: (roleId) => request.get(`admin/role/${roleId}/users`), //
  getRoleMenus: (roleId) => request.get(`admin/role/${roleId}/menus`), // 查询角色权限
  putRoleUser: (data) => request.put('admin/role/users', { ...data }), // 更新授权用户
  getPlatFormAllMenu: () => request.get('admin/menu/platform/list'), // 查询菜单(平台管理员用)
  getLesseeAllMenu: () => request.get('admin/menu/list'), // 查询菜单列表(普通租户用)
  putRoleMenus: (data) => request.put('admin/role/menus', { ...data }), // 更新角色权限

  // 数据角色
  getAllDataRole: (params = {}) => request.get('admin/data/role/list', { params }), // 获取权限列表
  postAddDataRole: (data = {}) => request.post('admin/data/role', { ...data }), // 新增权限
  putEditDataRole: (data = {}) => request.put('admin/data/role', { ...data }), // 编辑权限
  deleteDataRole: (id) => request.delete(`admin/data/role/${id}`), // 删除角色
  getRoleDataUser: (roleId) => request.get(`admin/data/role/${roleId}/users`), //
  getRoleDataStores: (roleId) => request.get(`/admin/data/role/${roleId}/stores`), // 查询角色店铺
  putRoleDataUser: (data) => request.put('admin/data/role/users', { ...data }), // 更新角色授权用户
  getRoleDataAllStore: () => request.get('admin/store/all'), // 租户所有店铺(权限列表用)
  putRoleStores: (data) => request.put('admin/data/role/stores', { ...data }), // 更新数据权限

  // 用户账号
  getAllUser: (params = {}) => request.get('admin/system/user', { params }), // 查询用户/admin/data/role/users
  postAddUser: (data = {}) => request.post('admin/system/user', { ...data }), // 新增用户
  putEditUser: (data = {}) => request.put('admin/system/user', { ...data }), // 编辑用户
  deleteUser: (id) => request.delete(`admin/system/user/${id}`), // 删除用户
  putUserDisable: (id) => request.put(`admin/system/user/disable/${id}`), // 禁用用户
  putUserEnable: (id) => request.put(`admin/system/user/enable/${id}`), // 启用用户
  putUserResetPassword: (id) => request.put(`admin/system/user/password/init/${id}`), // 重置密码
  getUserMenusRole: (id) => request.get(`admin/system/user/role/${id}`), // 查询用户角色
  getUserDataRole: (id) => request.get(`admin/system/user/data-role/${id}`), // 查询用户数据角色
  putUserDataRole: (data = {}) => request.put('admin/system/user/data-role', { ...data }), // 更新用户数据角色
  putUserMenusRole: (data = {}) => request.put('admin/system/user/role', { ...data }) // 更新用户角色信息
}
