const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Order',
  path: '/order',
  component: Layout,
  redirect: '/order/all',
  meta: {
    title: '订单管理',
    icon: 'material-symbols:inactive-order-outline',
    order: 1,
  },
  children: [
    {
      name: 'order-all',
      path: 'all',
      component: () => import('@/views/order/index.vue'),
      meta: {
        title: '全部订单',
        icon: 'ion:reorder-four',
      },
    },
    {
      name: 'order-overdue',
      path: 'overdue',
      component: () => import('@/views/order/index.vue'),
      meta: {
        title: '逾期订单',
        icon: 'fluent:calendar-overdue-24-regular',
      },
    },
    {
      name: 'order-withhold',
      path: 'withhold',
      component: () => import('@/views/order/index.vue'),
      meta: {
        title: '代扣明细',
        icon: 'tabler:list-details',
      },
    },
    {
      name: 'order-advance',
      path: 'advance',
      component: () => import('@/views/order/index.vue'),
      meta: {
        title: '垫资订单',
        icon: 'game-icons:level-four-advanced',
      },
    },
  ],
}
