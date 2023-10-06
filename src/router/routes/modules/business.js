const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Business',
  path: '/business',
  component: Layout,
  redirect: '/business/remit',
  meta: {
    title: '业务管理',
    requireAuth: true,
    icon: 'material-symbols:business-messages-outline',
    roleKey: 'platform:business',
    order: 9
  },
  children: [
    {
      name: 'business-remit',
      path: 'remit',
      component: () => import('@/views/business/remit/index.vue'),
      meta: {
        title: '分润打款',
        requireAuth: true,
        roleKey: 'platform:business:deduct-deposit-apply',
        order: 1
      }
    },
    {
      name: 'business-seize',
      path: 'seize',
      component: () => import('@/views/business/seize/index.vue'),
      meta: {
        title: '扣押申请',
        requireAuth: true,
        roleKey: 'platform:business:profit-distribution',
        order: 2
      }
    }
  ]
}
