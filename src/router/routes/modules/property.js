const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Property',
  path: '/',
  component: Layout,
  redirect: '/property',
  meta: {
    order: 4,
    requireAuth: true,
    roleKey: 'tenant:statistics'
  },
  children: [
    {
      name: 'property',
      path: 'property',
      component: () => import('@/views/property/index.vue'),
      meta: {
        title: '资产统计',
        requireAuth: true,
        icon: 'iconoir:dashboard-dots',
        order: 1,
        roleKey: 'tenant:statistics'
      }
    }
  ]
}
