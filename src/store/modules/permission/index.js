import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'

function hasPermission(route, role) {
  // * 不需要权限直接返回true
  if (!route.meta?.requireAuth) return true

  const routeRole = route.meta?.roleKey

  // * 登录用户没有角色或者路由没有设置角色判定为没有权限
  if (!role.length || !routeRole) return false

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return role.some((item) => routeRole === item)
}

function filterAsyncRoutes(routes = [], role) {
  const ret = []
  routes.forEach((route) => {
    if (hasPermission(route, role)) {
      const curRoute = {
        ...route,
        children: []
      }
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      } else {
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      menusPermission: [],
      btnsPermission: [],
      accessRoutes: []
    }
  },
  getters: {
    routes() {
      return basicRoutes.concat(this.accessRoutes)
    },
    menus() {
      return this.routes.filter((route) => route.name && !route.isHidden)
    }
  },
  actions: {
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, this.menusPermission)
      console.log(accessRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
    setAllPermission(allPermission) {
      const menus = [],
        btns = []
      allPermission.forEach((e) => {
        e.type === 'directory' && menus.push(e.tag)
        e.type === 'button' && btns.push(e.tag)
      })
      this.menusPermission = [...menus]
      this.btnsPermission = [...btns]
    },
    resetPermission() {
      this.$reset()
    }
  }
})
