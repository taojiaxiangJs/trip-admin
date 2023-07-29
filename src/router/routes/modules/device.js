const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Device',
  path: '/device',
  component: Layout,
  redirect: '/device/all',
  meta: {
    title: '设备管理',
    icon: 'mingcute:ebike-fill',
    roleKey: 'tenant:device',
    order: 2
  },
  children: [
    {
      name: 'device-all',
      path: 'all',
      component: () => import('@/views/device/all/index.vue'),
      meta: {
        title: '设备管理',
        roleKey: 'tenant:device:device'
        // icon: 'carbon:gui-management'
      }
    },
    {
      name: 'device-model',
      path: 'model',
      component: () => import('@/views/device/model/index.vue'),
      meta: {
        title: '设备型号',
        roleKey: 'tenant:device:device-type'
        // icon: 'tabler:box-model-2'
      }
    }
    // {
    //   name: 'device-distribute',
    //   path: 'distribute',
    //   component: () => import('@/views/device/distribute/index.vue'),
    //   meta: {
    //     title: '设备分布'
    //     // icon: 'material-symbols:pin-drop-outline-rounded'
    //   }
    // }
  ]
}
