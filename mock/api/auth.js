import { resolveToken } from '../utils'

const token = {
  admin: 'admin',
  editor: 'editor'
}

export default [
  {
    url: '/api/admin/union/login',
    method: 'post',
    response: ({ body }) => {
      if (['admin', 'editor'].includes(body?.name)) {
        return {
          code: 0,
          data: {
            token: token[body.name]
          }
        }
      } else {
        return {
          code: -1,
          message: '没有此用户'
        }
      }
    }
  },
  {
    url: '/api/admin/refreshToken',
    method: 'post',
    response: ({ headers }) => {
      return {
        code: 0,
        data: {
          token: resolveToken(headers?.authorization)
        }
      }
    }
  }
]
