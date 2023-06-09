const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Electrocar',
  path: '/electrocar',
  component: Layout,
  redirect: '/electrocar/price',
  meta: {
    title: '卖电动车',
    icon: 'ep:sell',
    order: 8,
  },
  children: [
    {
      name: 'electrocar-price',
      path: 'price',
      component: () => import('@/views/electrocar/index.vue'),
      meta: {
        title: '价格设置',
        icon: 'material-symbols:price-change-outline-rounded',
      },
    },
    {
      name: 'electrocar-record',
      path: 'record',
      component: () => import('@/views/electrocar/index.vue'),
      meta: {
        title: '交易记录',
        icon: 'material-symbols:sticky-note-2-outline-sharp',
      },
    },
  ],
}
