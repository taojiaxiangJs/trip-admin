<template>
  <CommonPage>
    <n-h6 prefix="bar" align-text><n-text type="primary">基础信息</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>租借人：</div>
        <div ml-8 flex-1>{{ orderDetail.rentUserInfoVo?.name || '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>支付宝账号：</div>
        <div ml-8 flex-1>{{ orderDetail.rentUserInfoVo?.phone || '--' }}</div>
      </div>
      <div class="w-1/2" mb-8 flex>
        <div w-120 text-right>身份证号码：</div>
        <div ml-8 flex flex-1 items-center>
          <span mr-20>{{ orderDetail.rentUserInfoVo?.idCard || '--' }}</span>
          <n-image-group>
            <n-space text-0>
              <n-image width="40" height="20" :src="orderDetail?.rentUserInfoVo?.idCardImgBackUrl" />
              <n-image width="40" height="20" :src="orderDetail?.rentUserInfoVo?.idCardImgFrontUrl" />
            </n-space>
          </n-image-group>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">紧急联系人</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>姓名：</div>
        <div ml-8 flex-1>
          {{ orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.name || '--' }}
        </div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>关系：</div>
        <div ml-8 flex-1>
          {{ orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.relation || '--' }}
        </div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>联系方式：</div>
        <div ml-8 flex-1>
          <span>{{ orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.phone || '--' }}</span>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">租借设备</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>车架号：</div>
        <div ml-8 flex-1>{{ orderDetail.equipmentInfoVo?.chassisNumber || '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>车牌号：</div>
        <div ml-8 flex-1>{{ orderDetail.equipmentInfoVo?.licensePlateNumber || '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>中控号：</div>
        <div ml-8 flex-1>{{ orderDetail.equipmentInfoVo?.equipmentCode || '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>车辆来源：</div>
        <div ml-8 flex-1>{{ '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>型号：</div>
        <div ml-8 flex-1>{{ orderDetail.productInfoVo?.productName || '--' }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>电压：</div>
        <div ml-8 flex-1>{{ orderDetail.productInfoVo?.voltage || '--' }} V</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>速度：</div>
        <div ml-8 flex-1>{{ orderDetail.productInfoVo?.speed || '--' }} km/h</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>价值：</div>
        <div ml-8 flex-1>
          {{ orderDetail.productInfoVo?.price ? formatFee(orderDetail.productInfoVo?.price, 'front') : '--' }}
          元
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">换车记录</n-text></n-h6>

    <n-h6 prefix="bar" align-text><n-text type="primary">租借方式</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>支付方式：</div>
        <div ml-8 flex-1>{{ orderDetail.payTypeInfoVo?.payType }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>租借合同：</div>
        <div ml-8 flex-1><n-button type="primary" size="small">下载</n-button></div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>租借时间：</div>
        <div ml-8 flex-1>{{ formatDate(orderDetail.payTypeInfoVo?.createTime) }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>到期时间：</div>
        <div ml-8 flex-1>{{ formatDate(orderDetail.payTypeInfoVo?.expireTime) }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>租借期限：</div>
        <div ml-8 flex-1>{{ orderDetail.payTypeInfoVo?.rentDays }} 天</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>退租时间：</div>
        <div ml-8 flex-1>{{ formatDate(orderDetail.payTypeInfoVo?.returnTime) }}</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>免押押金：</div>
        <div ml-8 flex-1>
          <span>{{ formatFee(orderDetail.sesameDepositDetail?.unfreeze, 'front') }} 元</span>
          <n-button v-if="orderDetail.sesameDepositDetail?.unfreeze > 0" type="primary" size="small" ml-16 @click="freeze()">冻结</n-button>
          <n-button type="primary" size="small" ml-8 @click="handleModal('freeze')">申扣押金</n-button>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">其他信息</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>办单人：</div>
        <div ml-8 flex-1>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16 @click="handleModal('operator')">添加办单人</n-button>
        </div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>推荐人：</div>
        <div ml-8 flex-1>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16 @click="handleModal('referrer')">添加推荐人</n-button>
        </div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>备注：</div>
        <div ml-8 flex-1>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16 @click="handleModal('remark')">添加备注</n-button>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">租金支付情况</n-text></n-h6>
    <div flex flex-wrap p-4 text-16>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>租车单价：</div>
        <div ml-8 flex-1>{{ formatFee(orderDetail.productRentVo?.rentUnitFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>换电单价：</div>
        <div ml-8 flex-1>{{ formatFee(orderDetail.productRentVo?.depositFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>合计月租金：</div>
        <div ml-8 flex-1>{{ formatFee(orderDetail.productRentVo?.sumUnitFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" mb-8 flex>
        <div w-120 text-right>总租金：</div>
        <div ml-8 flex-1>{{ formatFee(orderDetail.productRentVo?.sumFee, 'front') }} 元</div>
      </div>
    </div>
    <CrudTable ref="$table" :scroll-x="1200" :columns="columns" :init-table-data="tableData"> </CrudTable>
    <n-space>
      <n-button type="primary" @click="handleModal('overLease')">确认退租</n-button>
      <n-button type="primary" @click="handleModal('changeDevice')">更换车辆</n-button>
      <n-button type="primary" @click="handleDeviceCard('deviceCard')">车辆存证</n-button>
      <n-button type="primary" @click="handleMultipCancel('multipCancel')">批量取消代扣</n-button>
      <n-button type="primary" @click="handleOverOrder('overOrder')">结束订单</n-button>
    </n-space>
  </CommonPage>
  <n-modal v-model:show="modalVisible" :title="modalTitleMap[modalType]" preset="card" :style="{ width: '600px' }" :bordered="false">
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="80" :rules="rules" :model="modalForm">
      <n-form-item v-if="modalType === 'operator'" path="operator" label="办单人">
        <n-select v-model:value="modalForm.operator" :options="agentUser" />
      </n-form-item>
      <n-form-item v-if="modalType === 'referrer'" path="referrer" label="推荐人">
        <n-select v-model:value="modalForm.referrer" :options="agentUser" />
      </n-form-item>
      <n-form-item v-if="modalType === 'freeze'" path="freeze" label="金额">
        <n-input v-model:value="modalForm.freeze" placeholder="请输入金额"><template #suffix>元</template></n-input>
      </n-form-item>
      <n-form-item v-if="modalType === 'remark'" path="remark" label="备注">
        <n-input v-model:value="modalForm.remark" placeholder="请输入备注" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" />
      </n-form-item>
      <n-form-item v-if="modalType === 'editRent'" label="原租金">
        <n-input :value="formatFee(editOrgRent, 'front')" readonly><template #suffix>元/月</template></n-input>
      </n-form-item>
      <n-form-item v-if="modalType === 'editRent'" path="editRent" label="改租金">
        <n-input v-model:value="modalForm.editRent" placeholder="小于原租金"><template #suffix>元/月</template></n-input>
      </n-form-item>
      <n-form-item v-if="modalType === 'overLease'" path="overLease" label="退到店铺">
        <n-select v-model:value="modalForm.overLease" filterable placeholder="选择店铺" :options="storeList" />
      </n-form-item>
      <n-form-item v-if="modalType === 'changeDevice'" path="changeDevice" label="更换车辆">
        <n-input v-model:value="modalForm.changeDevice" placeholder="请输入关键字" />
      </n-form-item>
    </n-form>

    <div v-if="modalType === 'payOther'" text-center>
      <img :src="aliPayQrcodeUrl" />
      <p>请扫码支付或者找人代付！</p>
    </div>
    <template v-if="modalType !== 'payOther'" #footer>
      <div flex justify-end>
        <n-button @click="handleCancel()">取消</n-button>
        <n-button :loading="modalLoading" ml-20 type="primary" @click="handleSave()">确定</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import QRCode from 'qrcode'
import { formatDateTime, formatFee } from '@/utils'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import api from '../api'
import globalApi from '@/api'

defineOptions({ name: 'Crud' })
const message = useMessage()
const dialog = useDialog()
const { query } = useRoute()
const rentOrderId = query.rentOrderId

const $table = ref(null)
const $modalForm = ref(null)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('')
const modalTitleMap = reactive({
  freeze: '申扣押金',
  operator: '编辑办单人',
  remark: '编辑备注',
  referrer: '添加推荐人',
  payOther: '代付',
  editRent: '修改租金',
  overLease: '确认退租',
  changeDevice: '更换车辆'
})
const modalForm = ref({
  freeze: '',
  operator: null,
  remark: '',
  referrer: null,
  editRent: '',
  overLease: null,
  changeDevice: ''
})
const rules = ref({
  operator: { required: true, message: '请选择办单人', trigger: ['change'] },
  referrer: { required: false, message: '请选择推荐人', trigger: ['change'] },
  freeze: { required: true, message: '请输入金额', trigger: ['input', 'blur'] },
  remark: { required: true, message: '请输入备注', trigger: ['input', 'blur'] },
  editRent: { required: true, message: '请输入金额', trigger: ['input', 'blur'] },
  overLease: { required: true, message: '请择办店铺', trigger: ['blur', 'change'] },
  changeDevice: { required: true, message: '请择输入关键字', trigger: ['input', 'blur'] }
})

/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
const orderDetail = ref({})
const getDetail = () => {
  api.getOrderDetail({ rentOrderI: rentOrderId }).then((res) => {
    tableData.value = res.data?.payInfoVos || []
    orderDetail.value = res.data
  })
}
getDetail()

const agentUser = ref([])
const getAgentUser = () => {
  api.getAgentUser({ rentOrderI: rentOrderId }).then((res) => {
    agentUser.value =
      res.data.map((e) => {
        return {
          value: e.userId + '',
          label: e.userName
        }
      }) || []
  })
}
getAgentUser()

const columns = [
  {
    title: '预扣日期',
    key: 'payTime',
    render(row) {
      return h('span', formatDate(row.payTime))
    }
  },
  {
    title: '支付日期',
    key: 'realPayTime',
    render(row) {
      return h('span', formatDate(row.realPayTime))
    }
  },
  {
    title: '支付金额',
    key: 'payFee',
    render(row) {
      return h('span', formatFee(row.payFee, 'front'))
    }
  },
  {
    title: '支付方式',
    key: 'payType',
    render(row) {
      return h('span', valueToName(row.payType, options.payType))
    }
  },
  {
    title: '支付结果',
    key: 'refundStatus',
    render(row) {
      return h('span', valueToName(row.refundStatus, options.status))
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 500,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'payOther')
          },
          { default: () => '立即代付' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'tertiary',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'singleCancel')
          },
          { default: () => '取消代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'recover')
          },
          { default: () => '恢复代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'success',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'sponsor')
          },
          { default: () => '发起代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'editRent')
          },
          { default: () => '修改租金' }
        )
      ]
    }
  }
]

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.list.map((e) => ({ label: e.storeName, value: e.storeId + '' }))
  })
}
getStoreList()

const valueToName = (value, options) => {
  return options.filter((e) => e.value === value + '')[0]?.label || ''
}

const formatDate = (time) => {
  return time ? formatDateTime(time) : '--'
}

// 获取代扣支付的二维码url
const getPayUrl = async (payRuleId) => {
  let url = ''
  try {
    const { data } = await api.getPayUrl({ payRuleId })
    url = await QRCode.toDataURL(data.qrCode)
  } catch {
    message.error('获取支付二维码失败！')
  }
  return url
}
const aliPayQrcodeUrl = ref('')
const editOrgRent = ref('')
const handleTable = async (row, type) => {
  if (['singleCancel', 'recover'].includes(type)) {
    let content = (type === 'singleCancel' && '取消后无法恢复，确定要取消吗？') || (type === 'recover' && '确认恢复代扣吗')
    dialog.warning({
      title: '警告',
      content,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('确定')
      },
      onNegativeClick: () => {
        message.error('取消')
      }
    })
  }
  if (type === 'sponsor') {
    message.error('暂无权限')
  }
  if (type === 'payOther') {
    if (row.payRuleId) {
      aliPayQrcodeUrl.value = await getPayUrl(row.payRuleId)
      handleModal('payOther')
      // TODO
      // 获取支付结果
    } else {
      message.error('列表数据存在异常，请联系管理员')
    }
  }
  if (type === 'editRent') {
    editOrgRent.value = row.payFee || 0
    handleModal('editRent')
  }
}

// 冻结押金
const freeze = () => {
  dialog.warning({
    title: '警告',
    content: '确定冻结该笔押金？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('确定')
    },
    onNegativeClick: () => {
      message.error('不确定')
    }
  })
}

// 申扣押金\添加办单人\添加推荐人\添加备注
const handleModal = (type) => {
  modalType.value = type
  modalVisible.value = true
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.freeze = ''
  modalForm.value.operator = null
  modalForm.value.remark = ''
  modalForm.value.referrer = null
  modalForm.value.editRent = ''
  modalForm.value.overLease = null
  modalForm.value.changeDevice = ''
}
// modal保存
const handleSave = () => {
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
    } else {
      console.log(errors)
    }
  })
}

const handleOverOrder = () => {
  message.error('暂无权限')
}

const handleDeviceCard = () => {
  message.info('暂无车辆存证')
}

const handleMultipCancel = () => {
  dialog.warning({
    title: '批量取消代扣',
    content: '执行后，将取消所有未欠费的代扣，且无法恢复，确定要取消吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('确定')
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
