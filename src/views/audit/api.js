import { request } from '@/utils'

export default {
  getAllList: (params = {}) => request.get('discount/list', { params }),
  getBeReviewedRent: (params = {}) => request.get('admin/rent/type/platform/page', { params }), // 套餐待审核列表
  putPassRent: (id) => request.put(`admin/rent/type/approve/pass/${id}`), // 套餐审核通过
  putRejectRent: (id) => request.put(`admin/rent/type/approve/reject/${id}`), // 套餐审核不通过
  getBeReviewedWithdraw: (params = {}) => request.get('admin/order-withdraw-apply/page', { params }), // 退租申请列表
  getBeReviewedDeduct: (params = {}) => request.get('admin/deposit/deduct/apply/page/platform', { params }), // 扣押申请分页列表（平台用）

  getDepositList: (params = {}) => request.get('admin/deposit/apply/page', { params }), // 申请申请分页列表
  putPassDeposit: (data = {}) => request.put(`admin/deposit/apply/pass`, { ...data }), // 申请申请审核通过
  putRejectDeposit: (data = {}) => request.put(`admin/deposit/apply/reject`, { ...data }) // 申请申请审核不通过
}
