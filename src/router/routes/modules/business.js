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
      name: 'business-rent',
      path: 'rent',
      component: () => import('@/views/business/rent/index.vue'),
      meta: {
        title: '租金审核',
        requireAuth: true,
        roleKey: 'platform:business:rent-price',
        order: 1
      }
    },
    {
      name: 'business-remit',
      path: 'remit',
      component: () => import('@/views/business/remit/index.vue'),
      meta: {
        title: '分润打款',
        requireAuth: true,
        roleKey: 'platform:business:profit-devide',
        order: 2
      }
    },
    {
      name: 'business-seize',
      path: 'seize',
      component: () => import('@/views/business/seize/index.vue'),
      meta: {
        title: '扣押申请',
        requireAuth: true,
        roleKey: 'platform:business:deduct-deposit-apply',
        order: 3
      }
    }
  ]
}
