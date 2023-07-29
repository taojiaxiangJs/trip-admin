import { store, brand, allUser } from '../api.module/public'
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
  },
  {
    url: '/api/admin/system/user/all',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [...allUser.response.data]
      }
    }
  }
]
