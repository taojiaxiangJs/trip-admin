const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Order',
  path: '/order',
  component: Layout,
  redirect: '/order/all',
  meta: {
    title: '订单管理',
    icon: 'material-symbols:inactive-order-outline',
    order: 1
  },
  children: [
    {
      name: 'order-all',
      path: 'all',
      component: () => import('@/views/order/all/index.vue'),
      meta: {
        title: '全部订单'
        // icon: 'ion:reorder-four',
      }
    },
    // {
    //   name: 'order-overdue',
    //   path: 'overdue',
    //   component: () => import('@/views/order/overdue/index.vue'),
    //   meta: {
    //     title: '逾期订单'
    //     // icon: 'fluent:calendar-overdue-24-regular',
    //   }
    // },
    {
      name: 'order-withhold',
      path: 'withhold',
      component: () => import('@/views/order/withhold/index.vue'),
      meta: {
        title: '代扣管理'
        // icon: 'tabler:list-details',
      }
    },
    // {
    //   name: 'order-advance',
    //   path: 'advance',
    //   component: () => import('@/views/order/advance/index.vue'),
    //   meta: {
    //     title: '垫资订单'
    //     // icon: 'game-icons:level-four-advanced',
    //   }
    // },
    {
      name: 'order-detail',
      path: 'detail',
      isHidden: true,
      component: () => import('@/views/order/common-page/detail.vue'),
      meta: {
        title: '订单详情'
      }
    }
  ]
}
