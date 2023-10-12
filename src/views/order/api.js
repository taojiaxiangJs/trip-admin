import { request } from '@/utils'

export default {
  getAll: (params = {}) => request.get('admin/order/page', { params }), // 获取订单列表（租户）
  getOrderDetail: (orderNo) => request.get(`admin/order/detail/${orderNo}`), // 获取订单详情 admin/order/detail/{orderNo}

  getOrderUserInfo: (orderNo) => request.get(`admin/order/${orderNo}/user`), // 查询订单用户信息
  getDeviceChangeHistory: (orderNo) => request.get(`admin/order/${orderNo}/device/history`), // 车辆更换记录
  putDeviceBind: (data) => request.put(`admin/order/device-bind`, { ...data }), // 绑定设备
  getBillList: (orderNo) => request.get(`admin/bill/list?orderNo=${orderNo}`), // 获取账单
  getAgentUser: () => request.get('order/agent-user'), //
  getPayUrl: (params = {}) => request.get('order/pay-url', { params }), // 获取支付二维码
  getOverdueList: (params = {}) => request.get('order/overdue-list', { params }), // 获取逾期列表
  getWithholdList: (params = {}) => request.get('order/withhold-list', { params }), // 获取代扣明细列表
  getAdvanceList: (params = {}) => request.get('order/advance-list', { params }), // 获取垫资订单列表
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`)
}
