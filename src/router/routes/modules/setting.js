const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Setting',
  path: '/setting',
  component: Layout,
  redirect: '/setting/user',
  meta: {
    title: '系统管理',
    requireAuth: true,
    icon: 'streamline:interface-setting-pie-chart-cog-setting-graph-cog',
    roleKey: 'tenant:system',
    order: 10
  },
  children: [
    {
      name: 'setting-user',
      path: 'user',
      component: () => import('@/views/setting/user/index.vue'),
      meta: {
        title: '账号管理',
        requireAuth: true,
        roleKey: 'tenant:system:account'
      }
    },
    {
      name: 'setting-role',
      path: 'role',
      component: () => import('@/views/setting/role/index.vue'),
      meta: {
        title: '角色管理',
        requireAuth: true,
        roleKey: 'tenant:system:role'
      }
    }
  ]
}
