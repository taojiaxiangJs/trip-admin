export const options = {
  status: [
    { label: '签约中', value: '1' },
    { label: '待收货', value: '2' },
    { label: '已逾期', value: '3' },
    { label: '已退租', value: '5' },
    { label: '待支付', value: '11' },
    { label: '审核中', value: '12' },
    { label: '待签约', value: '13' },
    { label: '支付中', value: '14' },
    { label: '出租中', value: '21' },
    { label: '待绑定', value: '22' },
    { label: '已结清', value: '52' }
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
    { label: '先用后付', value: '1' },
  ]
}