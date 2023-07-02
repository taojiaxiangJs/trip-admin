const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Financial',
  path: '/financial',
  component: Layout,
  redirect: '/financial/profit',
  meta: {
    title: '财务管理',
    icon: 'streamline:money-cash-bag-dollar-bag-payment-cash-money-finance',
    order: 5
  },
  children: [
    {
      name: 'financial-profit',
      path: 'profit',
      component: () => import('@/views/financial/index.vue'),
      meta: {
        title: '分润明细'
        // icon: 'simple-icons:microsoftsharepoint',
      }
    },
    {
      name: 'financial-advance',
      path: 'advance',
      component: () => import('@/views/financial/index.vue'),
      meta: {
        title: '垫资记录'
        // icon: 'material-symbols:export-notes-outline',
      }
    }
  ]
}
