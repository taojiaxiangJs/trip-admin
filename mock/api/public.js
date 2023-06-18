import { store, brand } from '../api.module/public'
export default [
  {
    url: '/api/store',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...store.response.data
        }
      }
    }
  },
  {
    url: '/api/brand',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...brand.response.data
        }
      }
    }
  }
]
