import { request } from '@/utils'

export default {
  getAllStoreAvailabel: () => request.get(`/admin/store/available-all`), // 店铺列表(业务字典用)
  getDeviceType: () => request.get('admin/device/type/all'), // 获取设备型号列表
  getBrand: (params = {}) => request.get(`/brand`, { params }), // 获取品牌列表
  getUser: () => request.get('/user'),
  getAllUser: () => request.get('/admin/system/user/all'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
  uploadFile: (data) => request.post('admin/attachment', data, { headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' } })
}
