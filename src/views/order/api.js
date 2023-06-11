import { request } from '@/utils'

export default {
  getAll: (params = {}) => request.get('order/all', { params }),  // 获取订单列表
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`),
}
