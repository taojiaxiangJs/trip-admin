import { all, detail, agentUserList, payUrl, overduelist, withholdList, advanceList } from '../api.module/order'
export default [
  {
    url: '/api/order/all',
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
    url: '/api/order/detail',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...detail.response.data
        }
      }
    }
  },
  {
    url: '/api/order/agent-user',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [...agentUserList.response.data]
      }
    }
  },
  {
    url: '/api/order/pay-url',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: { ...payUrl.response.data }
      }
    }
  },
  {
    url: '/api/order/overdue-list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: { ...overduelist.response.data }
      }
    }
  },
  {
    url: '/api/order/withhold-list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: { ...withholdList.response.data }
      }
    }
  },
  {
    url: '/api/order/advance-list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: { ...advanceList.response.data }
      }
    }
  }
]
