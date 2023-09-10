import { request } from '@/utils'

export default {
  getAllStore: (params = {}) => request.get('admin/store/page', { params }), // 获取店铺列表
  postAddStore: (data) => request.post('admin/store', { ...data }), // 新增店铺
  putEditStore: (data) => request.put('admin/store', { ...data }), // 更新店铺
  deleteStore: (id) => request.delete(`admin/store/${id}`), // 删除店铺
  putOfflineStore: (id) => request.post(`admin/store/offline/${id}`), // 店铺上线
  putOnlineStore: (id) => request.post(`admin/store/online/${id}`), // 店铺下线

  getAllRent: (params = {}) => request.get('admin/rent/type/page', { params }) // 租金设置列表
}
