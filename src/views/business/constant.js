export const options = {
  scope: [
    {
      value: '1',
      label: '租车换电'
    },
    {
      value: '2',
      label: '卖电动车'
    },
    {
      value: '3',
      label: '车辆修理'
    },
    {
      value: '4',
      label: '骑手公寓'
    },
    {
      value: '5',
      label: '餐卡'
    }
  ],
  approveType: [
    {
      label: '通过',
      value: 1
    },
    {
      label: '未通过',
      value: 0
    },
    {
      label: '未审核',
      value: -1
    }
  ],
  orderType: [
    { label: '租车', value: '0' },
    { label: '换电', value: '1' },
    { label: '租车换电', value: '2' },
    { label: '租公寓', value: '3' },
    { label: '车电一体', value: '4' },
    { label: '其他设备', value: '5' }
  ],
  payType: [
    { label: '先付后用', value: '0' },
    { label: '先用后付', value: '1' }
  ],
  // 是否垫资
  padFunded: [
    { label: '是', value: '1' },
    { label: '否', value: '0' }
  ],
  // 是否兜底
  ensure: [
    { label: '是', value: '1' },
    { label: '否', value: '0' }
  ]
}
