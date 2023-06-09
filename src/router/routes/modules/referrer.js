const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Referrer',
  path: '/referrer',
  component: Layout,
  redirect: '/referrer/award',
  meta: {
    title: '推荐管理',
    icon: 'streamline:interface-calendar-favorite-calendar-date-day-favorite-like-month-star',
    order: 7,
  },
  children: [
    {
      name: 'referrer-award',
      path: 'award',
      component: () => import('@/views/referrer/index.vue'),
      meta: {
        title: '预发奖励',
        icon: 'tabler:award',
      },
    },
    {
      name: 'referrer-record',
      path: 'record',
      component: () => import('@/views/referrer/index.vue'),
      meta: {
        title: '发放记录',
        icon: 'fluent:slide-record-48-regular',
      },
    },
    {
      name: 'referrer-user',
      path: 'user',
      component: () => import('@/views/referrer/index.vue'),
      meta: {
        title: '推荐人',
        icon: 'ri:parent-line',
      },
    },
  ],
}
