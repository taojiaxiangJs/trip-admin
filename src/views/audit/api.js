import { request } from '@/utils'

export default {
  getAllList: (params = {}) => request.get('discount/list', { params }),
  getBeReviewedRent: (params = {}) => request.get('admin/rent/type/platform/page', { params }), // 套餐待审核列表
  putPassRent: (id) => request.post(`admin/rent/type/approve/pass/${id}`), // 套餐审核通过
  putRejectRent: (id) => request.post(`admin/rent/type/approve/reject/${id}`) // 套餐审核不通过
}
