import { request } from '@/utils'

export default {
  // login: (data) => request.post('/admin/login', data, { noNeedToken: true })
  login: (data) => request.post('/admin/union/login', data, { noNeedToken: true })
}
