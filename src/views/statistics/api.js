import { request } from '@/utils'

export default {
  getAll: (params = {}) => request.get('admin/order/platform/page', { params }), // 获取订单列表
  getOrderDetail: (params = {}) => request.get('order/detail', { params }), // 获取订单详情
  getAgentUser: () => request.get('order/agent-user'), //
  getPayUrl: (params = {}) => request.get('order/pay-url', { params }), // 获取支付二维码
  getOverdueList: (params = {}) => request.get('order/overdue-list', { params }), // 获取逾期列表
  getWithholdList: (params = {}) => request.get('order/withhold-list', { params }), // 获取代扣明细列表
  getAdvanceList: (params = {}) => request.get('order/advance-list', { params }), // 获取垫资订单列表
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`)
}
