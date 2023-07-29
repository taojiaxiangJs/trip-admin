const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Statistics',
  path: '/statistics',
  component: Layout,
  redirect: '/statistics/index',
  meta: {
    title: '数据统计',
    icon: 'material-symbols:database-outline',
    roleKey: 'platform:statistics',
    order: 8
  },
  children: [
    {
      name: 'statistics-index',
      path: 'index',
      component: () => import('@/views/statistics/statistics/index.vue'),
      meta: {
        title: '资产统计',
        roleKey: 'platform:statistics:assets',
        order: 1
      }
    },
    {
      name: 'statistics-billing',
      path: 'billing',
      component: () => import('@/views/statistics/billing/index.vue'),
      meta: {
        title: '分润明细',
        roleKey: 'platform:statistics:profit-distribution-detail',
        order: 2
      }
    },
    {
      name: 'statistics-allorder',
      path: 'allorder',
      component: () => import('@/views/statistics/allorder/index.vue'),
      meta: {
        title: '全部订单',
        roleKey: 'platform:statistics:all-order',
        order: 3
      }
    },
    {
      name: 'statistics-overorder',
      path: 'overorder',
      component: () => import('@/views/statistics/overorder/index.vue'),
      meta: {
        title: '逾期订单',
        roleKey: 'platform:statistics:overtime-order',
        order: 4
      }
    },
    {
      name: 'statistics-withhold',
      path: 'withhold',
      component: () => import('@/views/statistics/withhold/index.vue'),
      meta: {
        title: '代扣管理',
        roleKey: 'platform:statistics:bill',
        order: 5
      }
    }
  ]
}
