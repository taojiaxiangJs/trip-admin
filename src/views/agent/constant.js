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
  orderType: [
    { label: '租车', value: '1' },
    { label: '换电', value: '2' },
    { label: '租车换电', value: '3' },
    { label: '租公寓', value: '4' },
    { label: '车电一体', value: '9' },
    { label: '其他设备', value: '16' }
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
