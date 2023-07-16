import { role, user, lessee } from '../api.module/psetting'
export default [
  {
    url: '/api/admin/role',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...role.response.data
        }
      }
    }
  },
  {
    url: '/api/admin/role',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          message: '新增成功'
        }
      }
    }
  },
  {
    url: '/api/admin/role',
    method: 'put',
    response: () => {
      return {
        code: 0,
        data: {
          message: '更新成功'
        }
      }
    }
  },
  {
    url: '/api/admin/role',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  {
    url: '/api/admin/system/user',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...user.response.data
        }
      }
    }
  },
  {
    url: '/api/admin/system/user',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          message: '新增成功'
        }
      }
    }
  },
  {
    url: '/api/admin/system/user',
    method: 'put',
    response: () => {
      return {
        code: 0,
        data: {
          message: '更新成功'
        }
      }
    }
  },
  {
    url: '/api/admin/system/user',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  {
    url: '/api/admin/tenant',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          ...lessee.response.data
        }
      }
    }
  },
  {
    url: '/api/admin/tenant',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          message: '新增成功'
        }
      }
    }
  },
  {
    url: '/api/admin/tenant',
    method: 'put',
    response: () => {
      return {
        code: 0,
        data: {
          message: '更新成功'
        }
      }
    }
  }
]
