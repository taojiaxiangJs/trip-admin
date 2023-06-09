const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Property',
  path: '/',
  component: Layout,
  redirect: '/property',
  meta: {
    order: 6,
  },
  children: [
    {
      name: 'property',
      path: 'property',
      component: () => import('@/views/property/index.vue'),
      meta: {
        title: '资产统计',
        icon: 'iconoir:dashboard-dots',
        order: 6,
      },
    },
  ],
}
