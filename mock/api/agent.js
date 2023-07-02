import { shop, rent, rule } from '../api.module/agent'
export default [
  {
    url: '/api/agent/shop',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...shop.response.data
        }
      }
    }
  },
  {
    url: '/api/agent/rent',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...rent.response.data
        }
      }
    }
  },
  {
    url: '/api/agent/rule',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...rule.response.data
        }
      }
    }
  }
]
