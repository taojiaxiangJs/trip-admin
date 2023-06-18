import { request } from '@/utils'

export default {
  getStore: (params = {}) => request.get(`/store`, { params }), // 获取店铺列表
  getBrand: (params = {}) => request.get(`/brand`, { params }), // 获取品牌列表
  getUser: () => request.get('/user'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true })
}
