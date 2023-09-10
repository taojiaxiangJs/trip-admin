export const options = {
  status: [
    { label: '待支付', value: '0' },
    { label: '支付中', value: '1' },
    { label: '出租中', value: '2' },
    { label: '已逾期', value: '3' },
    { label: '退租中', value: '4' },
    { label: '空闲/已结束', value: '5' }
  ],
  centralControlType: [
    { label: '其他', value: -1 },
    { label: '万位', value: 0 },
    { label: '泰比特', value: 1 },
    { label: '华潍', value: 2 },
    { label: 'gps51', value: 3 }
  ]
}
