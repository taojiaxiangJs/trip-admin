const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Agent',
  path: '/agent',
  component: Layout,
  redirect: '/agent/shop',
  meta: {
    title: '代理商',
    icon: 'carbon:partnership',
    order: 3
  },
  children: [
    {
      name: 'agent-shop',
      path: 'shop',
      component: () => import('@/views/agent/shop/index.vue'),
      meta: {
        title: '店铺管理'
        // icon: 'solar:shop-2-linear',
      }
    },
    {
      name: 'agent-rent',
      path: 'rent',
      component: () => import('@/views/agent/rent/index.vue'),
      meta: {
        title: '租金设置'
        // icon: 'icon-park-outline:parenting-book',
      }
    },
    {
      name: 'agent-rule',
      path: 'rule',
      component: () => import('@/views/agent/rule/index.vue'),
      meta: {
        title: '分润规则'
        // icon: 'bi:file-earmark-ruled',
      }
    }
  ]
}
