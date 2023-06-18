<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getOverdueList"
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
          <n-select v-model:value="queryItems.status" :options="options.dueStatus" />
        </QueryBarItem>
        <QueryBarItem label="是否垫资" :label-width="70">
          <n-select v-model:value="queryItems.padFunded" :options="options.padFunded" />
        </QueryBarItem>
        <QueryBarItem label="是否兜底" :label-width="70">
          <n-select v-model:value="queryItems.ensure" :options="options.ensure" />
        </QueryBarItem>
        <QueryBarItem label="店铺" :label-width="40">
          <n-select v-model:value="queryItems.storeId" filterable placeholder="选择店铺" :options="storeList" />
        </QueryBarItem>
        <QueryBarItem label="租借日期" :label-width="70" :content-width="300">
          <n-date-picker v-model:value="queryDate.create" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange" />
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="primary" @click="exportData">导出数据</n-button>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { formatDateTime, formatFee } from '@/utils'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import globalApi from '@/api'
import api from '../api'

defineOptions({ name: 'Crud' })
const message = useMessage()
const dialog = useDialog()

const router = useRouter()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

const queryDate = ref({
  create: null
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

// 租借日切换
const dateChange = (arg1, arg2) => {
  extraParams.value.startDateString = arg2[0] || ''
  extraParams.value.endDateString = arg2[1] || ''
}

const columns = [
  { title: '订单编号', key: 'rentOrderId', width: 190 },
  { title: '逾期次数', key: 'totalOverdueFine', width: 80 },
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
      return h('span', formatFee(row.totalRealFee, 'front'))
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
    title: '是否垫资',
    key: 'padFunded',
    width: 80,
    render(row) {
      return h('span', valueToName(row.padFunded, options.padFunded))
    }
  },
  {
    title: '是否兜底',
    key: 'ensure',
    width: 80,
    render(row) {
      return h('span', valueToName(row.ensure, options.ensure))
    }
  },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render(row) {
      return h('span', valueToName(row.status, options.dueStatus))
    }
  },
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
            onClick: () => handleView(row, 'edit')
          },
          { default: () => '处理' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row, 'detail')
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
  extraParams.value = {}
}

const handleView = (row, type) => {
  console.log(row)
  if (type === 'detail') {
    router.push({ path: 'detail', query: { rentOrderId: row.rentOrderId } })
  } else {
    dialog.warning({
      title: '确认',
      content: '请确认欠款是否已还清?',
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
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
