import { list } from '../api.module/discount'
export default [
  {
    url: '/api/discount/list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...list.response.data
        }
      }
    }
  }
]
