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
            v-model:value="queryItems.searchString"
            type="text"
            placeholder="订单号/租借人/联系方式/店铺/推荐人"
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
        <QueryBarItem label="状态" :label-width="40">
          <n-select v-model:value="queryItems.newStatus" :options="options.status" />
        </QueryBarItem>
        <QueryBarItem label="订单类型" :label-width="70">
          <n-select v-model:value="queryItems.productType" :options="options.orderType" />
        </QueryBarItem>
        <QueryBarItem label="支付方式" :label-width="70">
          <n-select v-model:value="queryItems.payType" :options="options.payType" />
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
import { formatDateTime, formatFee } from '@/utils'
import { useCRUD } from '@/composables'
import { options } from '../constant'
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

onActivated(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getStore().then((res) => {
    storeList.value = res.data?.list.map((e) => ({ label: e.storeName, value: e.storeId }))
  })
}
getStoreList()

// 预扣日切换
const nextDateChange = (arg1, arg2) => {
  extraParams.value.nextPayStartDateString = arg2[0] || ''
  extraParams.value.nextPayEndDateString = arg2[1] || ''
}
// 租借日切换
const dateChange = (arg1, arg2) => {
  extraParams.value.startDateString = arg2[0] || ''
  extraParams.value.endDateString = arg2[1] || ''
}

const columns = [
  { title: '订单编号', key: 'rentOrderId', width: 190 },
  {
    title: '订单类型',
    key: 'productType',
    width: 90,
    render(row) {
      return h('span', valueToName(row.productType, options.orderType))
    }
  },
  { title: '租借人', key: 'rentUserName', width: 80 },
  { title: '联系方式', key: 'rentUserPhone', width: 120 },
  { title: '租用设备', key: 'qrCode', width: 150 },
  { title: '代理商', key: 'agentName', width: 80 },
  { title: '店铺', key: 'storeName', width: 100 },
  {
    title: '支付方式',
    key: 'payType',
    width: 80,
    render(row) {
      return h('span', valueToName(row.payType, options.payType))
    }
  },
  {
    title: '租金',
    key: 'rentUnitFee',
    width: 100,
    render(row) {
      return h('span', formatFee(row.rentUnitFee, 'front'))
    }
  },
  {
    title: '租借日期',
    key: 'createTime',
    width: 180,
    render(row) {
      return h('span', formatDate(row.createTime))
    }
  },
  {
    title: '预扣日',
    key: 'nextPayTime',
    width: 180,
    render(row) {
      return h('span', formatDate(row.nextPayTime))
    }
  },
  {
    title: '退租时间',
    key: 'returnTime',
    width: 180,
    render(row) {
      return h('span', formatDate(row.returnTime))
    }
  },
  {
    title: '租借状态',
    key: 'status',
    width: 90,
    render(row) {
      return h('span', valueToName(row.status, options.status))
    }
  },
  {
    title: '已付租金',
    key: 'paidFee',
    width: 100,
    render(row) {
      return h('span', formatFee(row.paidFee, 'front'))
    }
  },
  {
    title: '欠费金额',
    key: 'unpaidFee',
    width: 100,
    render(row) {
      return h('span', formatFee(row.unpaidFee, 'front'))
    }
  },
  { title: '推荐人', key: 'referrerName', width: 80 },
  { title: '办单人', key: '', width: 80 },
  { title: '备注', key: '', width: 180, ellipsis: { tooltip: true } },
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
  return options.filter((e) => e.value === value + '')[0]?.label || ''
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
  router.push({ path: 'detail', query: { rentOrderId: row.rentOrderId } })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
