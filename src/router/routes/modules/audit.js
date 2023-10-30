const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Audit',
  path: '/audit',
  component: Layout,
  redirect: '/audit/rent',
  meta: {
    order: 6,
    title: '审核管理',
    roleKey: 'tenant:approve:manager',
    requireAuth: true,
    icon: 'heroicons-outline:clipboard-document-check'
  },
  children: [
    {
      name: 'audit-deposit',
      path: 'deposit',
      component: () => import('@/views/audit/deposit.vue'),
      meta: {
        title: '减押申请',
        requireAuth: true,
        roleKey: 'tenant:approve:deposit-reduce',
        order: 1
      }
    },
    {
      name: 'audit-deduct',
      path: 'deduct',
      component: () => import('@/views/audit/deduct.vue'),
      meta: {
        title: '扣押申请',
        requireAuth: true,
        roleKey: 'tenant:approve:deduct-deposit',
        order: 2
      }
    },
    {
      name: 'audit-withdraw',
      path: 'withdraw',
      component: () => import('@/views/audit/withdraw.vue'),
      meta: {
        title: '退租申请',
        requireAuth: true,
        roleKey: 'tenant:approve:withdraw-rent',
        order: 3
      }
    }
  ]
}
