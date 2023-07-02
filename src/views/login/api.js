import { request } from '@/utils'

export default {
  login: (data) => request.post('/admin/phone/login', data, { noNeedToken: true })
}
