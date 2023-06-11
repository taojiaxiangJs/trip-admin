import { store } from '../1.api.module/store'
export default [
  {
    url: '/api/store',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...store.response.data,
        },
      }
    },
  },
]