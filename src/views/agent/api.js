import { request } from '@/utils'

export default {
  getAllShop: (params = {}) => request.get('agent/shop', { params }), // 获取店铺列表
  getAllRent: (params = {}) => request.get('agent/rent', { params }), // 获取店铺列表
  getAllRule: (params = {}) => request.get('agent/rule', { params }) // 获取店铺列表
}
