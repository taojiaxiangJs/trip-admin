const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Platform',
  path: '/platform',
  component: Layout,
  redirect: '/platform/lessee',
  meta: {
    title: '平台管理',
    icon: 'game-icons:platform',
    roleKey: 'platform:tenant',
    order: 8
  },
  children: [
    {
      name: 'platform-lessee',
      path: 'lessee',
      component: () => import('@/views/platform/lessee/index.vue'),
      meta: {
        title: '租户管理',
        roleKey: 'platform:tenant:tenant',
        order: 1
      }
    },
    {
      name: 'platform-menus',
      path: 'menus',
      component: () => import('@/views/platform/menus/index.vue'),
      meta: {
        title: '菜单管理',
        roleKey: 'platform:tenant:menu',
        order: 2
      }
    }
  ]
}
