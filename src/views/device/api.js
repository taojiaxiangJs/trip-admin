import { request } from '@/utils'

export default {
  getAll: (params = {}) => request.get('device/all', { params }), // 获取设备列表
  getDeviceModel: (params = {}) => request.get('device/model', { params }) // 获取设备型号列表
}
