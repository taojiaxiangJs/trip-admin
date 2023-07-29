import { request } from '@/utils'

export default {
  getAllList: (params = {}) => request.get('discount/list', { params })
}
