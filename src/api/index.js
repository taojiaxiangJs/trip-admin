import { request } from '@/utils'

export default {
  getAllStoreAvailabel: () => request.get(`/admin/store/available-all`), // 店铺列表(业务字典用)
  getDeviceType: () => request.get('admin/device/type/all'), // 获取设备型号列表
  getDeviceAllList: () => request.get('admin/device/all'), // 获取设备列表（字典）
  getDeviceByStoreList: (params = {}) => request.get('admin/device/all-with-store', { params }), // 查询可用设备列表(字典,检查数据权限)
  getBrand: (params = {}) => request.get(`/brand`, { params }), // 获取品牌列表
  getPayType: () => request.get('admin/order/pay-type'), // 获取支付类型（字典）
  getOrderType: () => request.get('admin/order/type'), // 获取订单类型（字典）
  getOrderStatus: () => request.get('admin/order/status'), // 获取支付状态（字典）
  getUser: () => request.get('/user'),
  getAllUser: () => request.get('/admin/system/user/all'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
  uploadFile: (data) => request.post('admin/attachment', data, { headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' } })
}
