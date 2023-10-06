<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAll"
      @on-data-change="(data) => (tableData = data)"
      @reset-extra-params="resetExtraParams"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input
            v-model:value="queryItems.key"
            type="text"
            placeholder="订单号/租借人/联系方式/店铺/推荐人"
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
        <QueryBarItem label="状态" :label-width="40">
          <n-select v-model:value="queryItems.status" :options="orderStatusList" />
        </QueryBarItem>
        <QueryBarItem label="订单类型" :label-width="70">
          <n-select v-model:value="queryItems.type" :options="orderTypeList" />
        </QueryBarItem>
        <QueryBarItem label="支付方式" :label-width="70">
          <n-select v-model:value="queryItems.payType" :options="payTypeList" />
        </QueryBarItem>
        <QueryBarItem label="店铺" :label-width="40">
          <n-select v-model:value="queryItems.storeId" filterable placeholder="选择店铺" :options="storeList" />
        </QueryBarItem>
        <QueryBarItem label="租借日期" :label-width="70" :content-width="300">
          <n-date-picker v-model:value="queryDate.create" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange" />
        </QueryBarItem>
        <QueryBarItem label="预扣日" :label-width="50" :content-width="300">
          <n-date-picker v-model:value="queryDate.next" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="nextDateChange" />
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="primary" @click="exportData">导出数据</n-button>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
// import { formatDateTime, formatFee } from '@/utils'
import { formatDateTime } from '@/utils'
import { useCRUD } from '@/composables'
import globalApi from '@/api'
import api from '../api'

defineOptions({ name: 'Crud' })

const router = useRouter()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

const queryDate = ref({
  create: null,
  next: null
})

onMounted(() => {
  Promise.all([globalApi.getOrderStatus(), globalApi.getOrderType(), globalApi.getPayType(), globalApi.getAllStoreAvailabel()]).then((res) => {
    orderStatusList.value = res[0].data.map((e) => ({ label: e.name, value: e.code }))
    orderTypeList.value = res[1].data.map((e) => ({ label: e.name, value: e.code }))
    payTypeList.value = res[2].data.map((e) => ({ label: e.name, value: e.code }))
    storeList.value = res[3].data.map((e) => ({ label: e.name, value: e.id }))
    $table.value?.handleSearch()
  })
  // getOrderStatusList()
})

// 店铺
const storeList = ref([])

// 支付类型
const payTypeList = ref([])

// 订单类型
const orderTypeList = ref([])

// 订单状态
const orderStatusList = ref([])

// 预扣日切换
const nextDateChange = (arg1, arg2) => {
  extraParams.value.planPayStartDate = arg2[0] || ''
  extraParams.value.planPayEndDate = arg2[1] || ''
}
// 租借日切换
const dateChange = (arg1, arg2) => {
  extraParams.value.rentStartDate = arg2[0] || ''
  extraParams.value.rentEndDate = arg2[1] || ''
}

const columns = [
  { title: '订单编号', key: 'orderNo', width: 200 },
  {
    title: '订单类型',
    key: 'bizSuitProductType',
    width: 90,
    render(row) {
      return h('span', valueToName(row.bizSuitProductType, orderTypeList.value))
    }
  },
  { title: '租借人', key: 'username', width: 80 },
  { title: '联系方式', key: 'phone', width: 130 },
  { title: '设备(框架号)', key: 'deviceFrameNo', width: 120 },
  { title: '代理商', key: 'tenantName', width: 80 },
  { title: '店铺', key: 'storeName', width: 100 },
  {
    title: '支付方式',
    key: 'bizSuitPayType',
    width: 80,
    render(row) {
      return h('span', valueToName(row.bizSuitPayType, payTypeList.value))
    }
  },
  {
    title: '租金(元)',
    key: 'price',
    width: 100
    // render(row) {
    //   return h('span', formatFee(row.rentUnitFee, 'front'))
    // }
  },
  {
    title: '租借日期',
    key: 'rentTime',
    width: 170,
    render(row) {
      return h('span', formatDate(row.rentTime))
    }
  },
  {
    title: '预扣日',
    key: 'planPayTime',
    width: 170,
    render(row) {
      return h('span', formatDate(row.planPayTime))
    }
  },
  {
    title: '退租时间',
    key: 'withdrawTime',
    width: 170,
    render(row) {
      return h('span', formatDate(row.withdrawTime))
    }
  },
  {
    title: '租借状态',
    key: 'status',
    width: 90,
    render(row) {
      return h('span', valueToName(row.status, orderStatusList.value))
    }
  },
  {
    title: '已付租金(元)',
    key: 'paidFee',
    width: 100,
    render() {
      // return h('span', formatFee(row.paidFee, 'front'))
      return h('span', '--')
    }
  },
  {
    title: '欠费金额(元)',
    key: 'unpaidFee',
    width: 100,
    render() {
      // return h('span', formatFee(row.unpaidFee, 'front'))
      return h('span', '--')
    }
  },
  // { title: '推荐人', key: 'recommender', width: 80 },
  { title: '办单人', key: 'operator', width: 80 },
  { title: '备注', key: 'remarks', width: 180, ellipsis: { tooltip: true } },
  {
    title: '操作',
    key: 'actions',
    width: 140,
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
            onClick: () => handleView(row)
          },
          { default: () => '详情' }
        )
      ]
    }
  }
]

const valueToName = (value, options) => {
  return options.filter((e) => e.value + '' === value + '')[0]?.label || ''
}

const formatDate = (time) => {
  return time ? formatDateTime(time) : '--'
}

// 导出数据
const exportData = () => {
  console.log({ ...extraParams.value, ...queryItems.value })
}

// 重置
const resetExtraParams = () => {
  queryDate.value.create = null
  queryDate.value.next = null
  extraParams.value = {}
}

const handleView = (row) => {
  console.log(row)
  router.push({ path: 'detail', query: { orderNo: row.orderNo } })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
