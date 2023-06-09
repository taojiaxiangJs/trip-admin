const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Discount',
  path: '/',
  component: Layout,
  redirect: '/discount',
  meta: { order: 4 },
  children: [
    {
      name: 'discount',
      path: 'discount',
      component: () => import('@/views/discount/index.vue'),
      meta: {
        title: '减押申请',
        icon: 'tabler:shopping-cart-discount',
      },
    },
  ],
}
