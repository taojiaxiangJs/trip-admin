export const all = {
  params: {
    pageNum: 1,
    pageSize: 10,
    startDateString: '2023-05-04',
    endDateString: '2023-06-29',
    nextPayStartDateString: '2023-06-06',
    nextPayEndDateString: '2023-08-16',
    searchString: 'R2023061014070400080',
    newStatus: 21,
    storeId: 309,
    payType: 1,
    productType: 3
  },
  response: {
    status: 'S000',
    msg: '操作成功',
    data: {
      total: 1,
      list: [
        {
          rentOrderId: 'R2023061014070400080',
          rentUserName: '李坤',
          rentUserPhone: '15272262301',
          qrCode: '868035047654045',
          createTime: 1686377257457,
          expireTime: 1717481257457,
          returnTime: null,
          rentUnitFee: 59900,
          rentUnitNum: 12,
          status: 2,
          newStatus: 21,
          rentDays: 360,
          remainingDays: 360,
          paidFee: 0,
          unpaidFee: 0,
          payType: 1,
          overdueFine: 2000,
          storeName: '飞豹湖州',
          storeId: 309,
          agentName: '奕豹租车',
          totalRealFee: 0,
          totalDepositFee: 0,
          totalServiceFee: 0,
          totalChargingFee: 0,
          totalOverdueFine: 0,
          reason: null,
          payInfoVos: [
            {
              payRuleId: null,
              payTime: 1688969258254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1691647658254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1694326058254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1696918058254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1699596458254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1702188458254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1704866858254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1707545258254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1710050858254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1712729258254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1715321258254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            },
            {
              payRuleId: null,
              payTime: 1717999658254,
              realPayTime: null,
              payFee: 59900,
              payType: 1,
              status: 0,
              refundStatus: null
            }
          ],
          productType: 3,
          nextPayTime: 1688969258254,
          referrerName: null,
          referrerPhone: null,
          operateUid: null,
          operator: null,
          adminRemark: null,
          padFunded: 0
        }
      ]
    }
  }
}

export const detail = {
  params: {
    rentOrderId: 'R2023061318342500198'
  },
  response: {
    status: 'S000',
    msg: '操作成功',
    data: {
      rentOrderId: 'R2023061318342500198',
      status: 2,
      newStatus: 21,
      createTime: 1686652478144,
      expireTime: 1717756478144,
      returnTime: null,
      rentUserInfoVo: {
        phone: '13304415865',
        name: '尹智强',
        idCard: '220281199706198612',
        nickName: '未设置',
        idCardImgFrontUrl: 'http://qncx-picture.oss-cn-beijing.aliyuncs.com/image/product/5b02ac33fd84cf16476521a9857a7568.jpg',
        idCardImgBackUrl: 'http://qncx-picture.oss-cn-beijing.aliyuncs.com/image/product/a4448150b9637d64510223aa5c752635.jpg',
        emergencyContactVos: [
          {
            name: '刘涛',
            phone: '17854215659',
            relation: '同事/亲戚/朋友'
          }
        ]
      },
      referrerUserInfoVo: null,
      equipmentInfoVo: {
        chassisNumber: '297422303950560',
        licensePlateNumber: '杭5443042',
        serialNumber: null,
        qrCode: '13808713615',
        imei: null,
        equipmentCode: '13808713615',
        controlType: 0,
        createTime: 1686477724087,
        status: 2,
        sourceType: null,
        id: 13845,
        gainsharingRuleId: null,
        deleted: 0,
        modifyTime: 1686664225147
      },
      productInfoVo: {
        productId: 45,
        productName: '老百姓',
        productType: null,
        brand: null,
        voltage: 48,
        speed: 25,
        price: 300000,
        overdueFine: null,
        allowPointDeductionFee: null,
        imageUrl: 'http://qncx-picture.oss-cn-beijing.aliyuncs.com/image/product/d8aaa4621811d503dcd07c7dfd0118b7.jpg'
      },
      payTypeInfoVo: {
        rentOrderId: 'R2023061318342500198',
        payType: 1,
        createTime: 1686652478144,
        returnTime: null,
        expireTime: 1717756478144,
        totalDepositFee: 0,
        rentUnitNum: 12,
        rentUnitType: 1,
        rentDays: 360
      },
      productRentVo: {
        id: null,
        storeId: null,
        productId: null,
        rentUnitType: 1,
        rentUnitNum: 12,
        minUnitNum: 1,
        rentUnitFee: 59900,
        rentUnitInsurance: null,
        deleted: null,
        createTime: null,
        modifyTime: null,
        depositFee: 0,
        chargingFee: 0,
        serviceFee: null,
        payType: null,
        agentId: null,
        overdueFine: null,
        name: null,
        status: null,
        productType: null,
        productImageUrl: null,
        rentName: null,
        agentName: null,
        storeName: null,
        sumUnitFee: 59900,
        sumFee: 718800
      },
      payInfoVos: [
        {
          payRuleId: 394017,
          payTime: 1689244478920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394018,
          payTime: 1691922878920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394019,
          payTime: 1694601278920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394020,
          payTime: 1697193278920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394021,
          payTime: 1699871678920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394022,
          payTime: 1702463678920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394023,
          payTime: 1705142078920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394024,
          payTime: 1707820478920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394025,
          payTime: 1710326078920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394026,
          payTime: 1713004478920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394027,
          payTime: 1715596478920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        },
        {
          payRuleId: 394028,
          payTime: 1718274878920,
          realPayTime: null,
          payFee: 59900,
          payType: 1,
          status: 0,
          refundStatus: 0
        }
      ],
      changeRecordVos: [],
      lessorInfo: {
        storeName: '奕豹未来',
        address: '余杭区文福路永福社区2号农居点45号'
      },
      orderLogs: [
        {
          id: 68288,
          rentOrderId: 'R2023061318342500198',
          type: 1,
          showRider: 1,
          remark: '下单',
          creatorUserId: 28749,
          createTime: 1686652465768,
          modifyTime: 1686652465768,
          deleted: null,
          userName: '尹智强',
          imageUrls: []
        },
        {
          id: 68295,
          rentOrderId: 'R2023061318342500198',
          type: 3,
          showRider: 1,
          remark: '支付',
          creatorUserId: 28749,
          createTime: 1686652622901,
          modifyTime: 1686652622901,
          deleted: null,
          userName: '尹智强',
          imageUrls: []
        },
        {
          id: 68294,
          rentOrderId: 'R2023061318342500198',
          type: 2,
          showRider: 1,
          remark: '签约',
          creatorUserId: 28749,
          createTime: 1686652599305,
          modifyTime: 1686652599305,
          deleted: null,
          userName: '尹智强',
          imageUrls: []
        },
        {
          id: 68311,
          rentOrderId: 'R2023061318342500198',
          type: 4,
          showRider: 1,
          remark: '确认收货',
          creatorUserId: 28749,
          createTime: 1686653518814,
          modifyTime: 1686653518814,
          deleted: null,
          userName: '尹智强',
          imageUrls: []
        }
      ],
      owe: false,
      agentId: 28,
      storeId: 191,
      fileUrl:
        'https://oss.esign.cn/1111563786/3253fc6f-4fca-405b-910c-423db75baebc/%E5%B0%B9%E6%99%BA%E5%BC%BA_R2023061318342500198.pdf?Expires=1686673096&OSSAccessKeyId=LTAI4G5MrNNRU1tH6qtY4Moi&Signature=dCDOWzbrpZPvOS%2B2Qmi3of0c6AA%3D',
      depositType: 2,
      depositFee: 59900,
      maxDeductionFee: 59900,
      padFunded: 0,
      depositDetail: null,
      sesameDepositDetail: {
        id: 6891,
        amount: 59900,
        rentOrderId: 'R2023061318342500198',
        totalAmount: null,
        receiptAmount: null,
        gmtPayment: null,
        remark: null,
        authNo: '2023061310002001930521881666',
        status: 'SUCCESS',
        orderStatus: 'AUTHORIZED',
        showStatus: 'SUCCESS',
        unfreeze: 59900
      },
      adminRemark: null,
      operator: '',
      orderLossDeductible: null
    }
  }
}

export const agentUserList = {
  params: {},
  response: {
    status: 'S000',
    msg: '操作成功',
    data: [
      {
        userId: 1177,
        userName: '吴洲明',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 20912,
        userName: '石安心',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 3424,
        userName: '奕豹财务',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 12256,
        userName: '客服',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 19249,
        userName: '杨世梅',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 19169,
        userName: '杨晓霞',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 4297,
        userName: '蔡',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 21773,
        userName: '15501673636',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 12253,
        userName: '萧滨调度',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 19897,
        userName: '苏明辉',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 4234,
        userName: '陈友鹤',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 25802,
        userName: '任秋丽',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 25278,
        userName: '祝韦林',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      },
      {
        userId: 28759,
        userName: '李云风',
        userLoginName: null,
        lastLoginTime: null,
        lastLoginIp: null,
        remark: null,
        subType: 2,
        agentName: null,
        agentId: 28,
        storeName: null,
        storeId: null,
        status: 1,
        roleName: null,
        roleId: null,
        isAgentOwner: null
      }
    ]
  }
}

export const payUrl = {
  params: {
    payRuleId: 397965
  },
  response: {
    status: 'S000',
    msg: '操作成功',
    data: {
      outTradeNo: 'P2023061719075700120_2_397965_D23061708',
      qrCode: 'https://qr.alipay.com/bax087601qmsplfhafuu0075',
      payOrderId: 'P2023061719075700120_2_397965_D23061708'
    }
  }
}
