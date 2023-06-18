import { all, model } from '../api.module/device'
export default [
  {
    url: '/api/device/all',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...all.response.data
        }
      }
    }
  },
  {
    url: '/api/device/model',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...model.response.data
        }
      }
    }
  }
]
