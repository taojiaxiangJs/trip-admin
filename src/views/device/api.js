import { request } from '@/utils'

export default {
  getAllDevice: (params = {}) => request.get('admin/device/page', { params }), // 获取设备列表
  postAddDevice: (data) => request.post('admin/device', data), // 新增设备
  putEditDevice: (data) => request.put('admin/device', data), // 更新设备
  deleteDevice: (id) => request.delete(`admin/device/${id}`), // 删除设备

  getAllDeviceType: (params = {}) => request.get('admin/device/type/page', { params }), // 获取设备类型列表
  postAddDeviceType: (data) => request.post('admin/device/type', data), // 新增设备类型
  putEditDeviceType: (data) => request.put('admin/device/type', data), // 更新设备类型
  deleteDeviceType: (id) => request.delete(`admin/device/type/${id}`) // 删除设备类型
}
