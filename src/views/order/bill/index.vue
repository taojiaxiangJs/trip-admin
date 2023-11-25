<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getBillAllList"
      @on-data-change="(data) => (tableData = data)"
      @reset-extra-params="resetExtraParams"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.key" type="text" placeholder="订单号/租借人/联系方式/店铺" @keydown.enter="$table?.handleSearch" />
        </QueryBarItem>
        <QueryBarItem label="支付状态" :label-width="70">
          <n-select v-model:value="queryItems.status" :options="options.payStatus" />
        </QueryBarItem>
        <QueryBarItem label="店铺" :label-width="40">
          <n-select v-model:value="queryItems.storeId" filterable placeholder="选择店铺" :options="storeList" />
        </QueryBarItem>
        <QueryBarItem label="日期" :label-width="70" :content-width="300">
          <n-date-picker v-model:value="queryDate.payDate" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
  <n-modal
    v-model:show="showQRcodeModal"
    preset="dialog"
    title="代扣二维码"
    negative-text="关闭"
    :style="{ width: '400px' }"
    @negative-click="showQRcodeModal = false"
  >
    <div mt-24>
      <n-image width="100" :src="QRcodeUrl" />
    </div>
  </n-modal>
  <n-modal v-model:show="showEditOverdueModal" preset="dialog" title="修改违约金" :style="{ width: '400px' }">
    <div mt-24>
      <QueryBarItem label="违约金" :label-width="70">
        <n-input v-model:value="editOverdue.amount" type="text" placeholder="请输入租金" />
      </QueryBarItem>
    </div>
    <div mt-16 flex justify-end>
      <n-button @click="handleEditOverdueCancel()">取消</n-button>
      <n-button ml-20 type="primary" @click="handleEditOverdueSave()">确定</n-button>
    </div>
  </n-modal>
</template>

<script setup>
import { NButton, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import globalApi from '@/api'
import api from '../api'
import QRCode from 'qrcode'

defineOptions({ name: 'Crud' })

const message = useMessage()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

const queryDate = ref({
  payDate: null
})

onMounted(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.list?.map((e) => ({ label: e.storeName, value: e.storeId }))
  })
}
getStoreList()

// 租借日切换
const dateChange = (arg1, arg2) => {
  extraParams.value.startDate = arg2[0] || ''
  extraParams.value.endDate = arg2[1] || ''
}

const columns = [
  { title: '账单号', key: 'billNo', width: 110 },
  { title: '订单号', key: 'orderNo', width: 110 },
  { title: '租借人', key: 'username', width: 70 },
  { title: '联系方式', key: 'phone', width: 80 },
  { title: '支付宝订单号', key: 'aliOrderNo', width: 80 },
  { title: '店铺', key: 'storeName', width: 80 },
  { title: '总金额', key: 'amount', width: 60 },
  {
    title: '期数',
    width: 60,
    render(row) {
      return h('span', `${row.term}/${row.terms}`)
    }
  },
  { title: '实付金额', key: 'actualPay', width: 60 },
  { title: '逾期费', key: 'overdueFee', width: 60 },
  { title: '支付时间', key: 'payTime', width: 100 },
  {
    title: '支付状态',
    width: 60,
    render(row) {
      return h('span', valueToName(row.payStatus, options.payStatus))
    }
  },
  { title: '预扣时间', key: 'planPayTime', width: 100 },
  {
    title: '账单状态',
    width: 60,
    render(row) {
      return h('span', valueToName(row.status, options.billStatus))
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 240,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(NButton, { size: 'small', type: 'warning', onClick: () => handleEditOverdue(row) }, { default: () => '修改租金' }),
        // h( NButton, { size: 'small', type: 'primary', style: 'margin-left: 10px;', onClick: () => handleView(row) }, { default: () => '发起代扣' } ),
        // h( NButton, { size: 'small', type: 'primary', style: 'margin-left: 10px;', onClick: () => handleView(row) }, { default: () => '取消代扣' } ),
        h(NButton, { size: 'small', type: 'success', style: 'margin-left: 10px;', onClick: () => handleQRcode(row) }, { default: () => '代付二维码' })
      ]
    }
  }
]

const valueToName = (value, options) => {
  return options.filter((e) => e.value === value + '')[0]?.label || ''
}

// 重置
const resetExtraParams = () => {
  queryDate.value.payDate = null
  extraParams.value = {}
}

const showEditOverdueModal = ref(false)
const editOverdue = ref({ amount: '', id: '' })
// 修改违约金
const handleEditOverdue = (row) => {
  showEditOverdueModal.value = true
  editOverdue.value.amount = row.overdueFee
  editOverdue.value.billNo = row.billNo
}
const handleEditOverdueCancel = () => {
  showEditOverdueModal.value = false
  editOverdue.value.amount = ''
  editOverdue.value.billNo = ''
}
const handleEditOverdueSave = () => {
  if (!editOverdue.value.amount) {
    message.error('请输入租金')
    return
  }
  api.putBillOverdue({ ...editOverdue.value }).then(() => {
    message.success('修改成功')
    $table.value?.handleSearch()
    handleEditOverdueCancel()
  })
}

const showQRcodeModal = ref(false)
const QRcodeUrl = ref('')
// 获取代扣二维码
const handleQRcode = (row) => {
  api.putWithholdQRUrl(row.billNo).then((res) => {
    if (res.data) {
      QRcodeUrl.value = QRCode.toDataURL(res.data)
      showQRcodeModal.value = true
    }
  })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
