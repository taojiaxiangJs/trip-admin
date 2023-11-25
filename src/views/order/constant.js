export const options = {
  status: [
    { label: '关闭', value: -99 },
    { label: '已取消', value: -1 },
    { label: '未签约', value: 0 },
    { label: '签约中', value: 1 },
    { label: '待收货', value: 2 },
    { label: '出租中', value: 3 },
    { label: '已逾期', value: 4 },
    { label: '已退租', value: 5 },
    { label: '已结清', value: 6 }
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
  dueStatus: [
    { label: '出租中', value: '2' },
    { label: '已退租', value: '5' }
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
  ],
  // 代扣结果
  withholdResult: [
    { label: '未扣款', value: 'PAY_TOBE_TRIGGER' },
    { label: '成功', value: 'TRADE_SUCCESS' },
    { label: '失败', value: 'PAY_FAIL' },
    { label: '代扣取消', value: 'TRADE_CANCEL' }
  ],
  applyStatus: [
    { label: '是', value: '1' },
    { label: '否', value: '0' }
  ],
  relationsMap: [
    { label: '父亲', value: '0' },
    { label: '母亲', value: '1' },
    { label: '子女', value: '2' },
    { label: '配偶', value: '3' },
    { label: '兄弟姐妹', value: '4' },
    { label: '亲戚/朋友/同事', value: '5' },
    { label: '其他', value: '6' }
  ],
  billPayStatus: [
    { label: '未支付', value: '0' },
    { label: '已支付', value: '1' },
    { label: '支付中', value: '2' },
    { label: '支付失败', value: '3' }
  ],
  payStatus: [
    { label: '未支付', value: '-1' },
    { label: '支付失败', value: '0' },
    { label: '已支付', value: '1' },
    { label: '已退款', value: '2' },
    { label: '部分退款', value: '3' }
  ],
  billStatus: [
    { label: '未支付', value: '0' },
    { label: '已取消', value: '-1' },
    { label: '已支付', value: '1' },
    { label: '已逾期', value: '2' }
  ]
}
