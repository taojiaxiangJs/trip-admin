import { router } from '@/router'
import { lStorage } from '@/utils'

const MENUS_PERMISSION = 'menus_permission'
const DURATION = 6 * 60 * 60

export function getMenusPermission() {
  return lStorage.get(MENUS_PERMISSION)
}

export function setMenusPermission(menus) {
  lStorage.set(MENUS_PERMISSION, menus, DURATION)
}

export function removeMenusPermission() {
  lStorage.remove(MENUS_PERMISSION)
}

export function toLogin() {
  const currentRoute = unref(router.currentRoute)
  const needRedirect = !currentRoute.meta.requireAuth && !['/404', '/login'].includes(router.currentRoute.value.path)
  router.replace({
    path: '/login',
    query: needRedirect ? { ...currentRoute.query, redirect: currentRoute.path } : {}
  })
}

export function toFourZeroFour() {
  router.replace({
    path: '/404'
  })
}
