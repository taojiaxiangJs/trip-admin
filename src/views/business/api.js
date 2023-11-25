import { request } from '@/utils'

export default {
  getAllList: (params = {}) => request.get('discount/list', { params }),
  getBeReviewedRent: (params = {}) => request.get('admin/rent/type/platform/page', { params }), // 套餐待审核列表
  putPassRent: (id) => request.put(`admin/rent/type/approve/pass/${id}`), // 套餐审核通过
  putRejectRent: (id) => request.put(`admin/rent/type/approve/reject/${id}`), // 套餐审核不通过
  getBeReviewedWithdraw: (params = {}) => request.get('admin/order-withdraw-apply/page', { params }), // 退租申请列表
  putPassWithdraw: (id) => request.put(`admin/order-withdraw-apply/${id}/pass`), // 退租审核通过
  putRejectWithdraw: (id, data) => request.put(`admin/order-withdraw-apply/${id}/reject`, { ...data }), // 退租审核不通过
  getBeReviewedDeduct: (params = {}) => request.get('admin/deposit/deduct/apply/page/platform', { params }), // 扣押申请分页列表（平台用）
  getDepositList: (params = {}) => request.get('admin/deposit/apply/page', { params }), // 申请申请分页列表
  putPassDeposit: (data = {}) => request.put(`admin/deposit/apply/pass`, { ...data }), // 申请申请审核通过
  putRejectDeposit: (data = {}) => request.put(`admin/deposit/apply/reject`, { ...data }), // 申请申请审核不通过

  getDeductList: (params = {}) => request.get('admin/deposit/deduct/apply/page/platform', { params }), // 扣押申请分页列表（平台户用）
  putDeductApprove: (id) => request.put(`admin/deposit/deduct/apply/approve/${id}`), //  扣押申请通过
  putDeductReject: (data = {}) => request.put(`admin/deposit/deduct/apply/reject`, { ...data }) //  扣押申请拒绝
}
