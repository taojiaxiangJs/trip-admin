import { request } from '@/utils'

export default {
  getStore: (params = {}) => request.get(`/store`, { params }),   // 获取店铺列表
  getUser: () => request.get('/user'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
}
