const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Audit',
  path: '/audit',
  component: Layout,
  redirect: '/audit/rent',
  meta: {
    order: 6,
    title: '审核管理',
    roleKey: 'tenant:approve',
    icon: 'heroicons-outline:clipboard-document-check'
  },
  children: [
    {
      name: 'audit-rent',
      path: 'rent',
      component: () => import('@/views/audit/rent.vue'),
      meta: {
        title: '租金审核',
        roleKey: 'tenant:approve:rent-price',
        order: 1
      }
    },
    {
      name: 'audit-discount',
      path: 'discount',
      component: () => import('@/views/audit/index.vue'),
      meta: {
        title: '减押申请',
        roleKey: 'tenant:approve:deposit-reduce',
        order: 2
      }
    },
    {
      name: 'audit-detain',
      path: 'detain',
      component: () => import('@/views/audit/index.vue'),
      meta: {
        title: '扣押申请',
        roleKey: 'tenant:approve:deduct-deposit',
        order: 3
      }
    },
    {
      name: 'audit-lease',
      path: 'lease',
      component: () => import('@/views/audit/index.vue'),
      meta: {
        title: '退租申请',
        roleKey: 'tenant:approve:withdraw-rent',
        order: 4
      }
    }
  ]
}
