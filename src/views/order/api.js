import { request } from '@/utils'

export default {
  getAll: (params = {}) => request.get('order/all', { params }), // 获取订单列表
  getOrderDetail: (params = {}) => request.get('order/detail', { params }), // 获取订单详情
  getAgentUser: () => request.get('order/agent-user'), //
  getPayUrl: (params = {}) => request.get('order/pay-url', { params }), // 获取支付二维码
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`)
}
