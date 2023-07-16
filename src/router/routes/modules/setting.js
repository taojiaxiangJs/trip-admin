const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Setting',
  path: '/setting',
  component: Layout,
  redirect: '/setting/puser',
  meta: {
    title: '系统管理',
    icon: 'streamline:interface-setting-pie-chart-cog-setting-graph-cog',
    order: 9
  },
  children: [
    {
      name: 'setting-lessee',
      path: 'lessee',
      component: () => import('@/views/setting/lessee/index.vue'),
      meta: {
        title: '租户管理'
      }
    },
    {
      name: 'setting-user',
      path: 'user',
      component: () => import('@/views/setting/user/index.vue'),
      meta: {
        title: '账号管理'
      }
    },
    {
      name: 'setting-role',
      path: 'role',
      component: () => import('@/views/setting/role/index.vue'),
      meta: {
        title: '角色管理'
      }
    }
  ]
}
