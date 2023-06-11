import { all } from '../1.api.module/order'
export default [
  {
    url: '/api/order/all',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...all.response.data,
        },
      }
    },
  },
]