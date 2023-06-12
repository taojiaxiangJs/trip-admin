<template>
  <CommonPage>
    <n-h6 prefix="bar" align-text><n-text type="primary">基础信息</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">紧急联系人</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">租借设备</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">换车记录</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">租借方式</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">其他信息</n-text></n-h6>
    <n-h6 prefix="bar" align-text><n-text type="primary">租金支付情况</n-text></n-h6>
    <CrudTable
      ref="$table"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAll"
      @on-data-change="(data) => (tableData = data)"
    >
      <!-- <template #queryBar>
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
          <n-date-picker v-model:value="queryDate.create" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange"/>
        </QueryBarItem>
        <QueryBarItem label="预扣日" :label-width="50" :content-width="300">
          <n-date-picker v-model:value="queryDate.next" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="nextDateChange"/>
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="primary" @click="exportData">导出数据</n-button>
      </template> -->
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { formatDateTime, formatFee, renderIcon} from '@/utils'
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
  globalApi.getStore().then(res=> {
    storeList.value = res.data?.list.map(e => ({ label: e.storeName, value: e.storeId}))
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
  { title: '预扣日期', key: 'nextPayTime', render(row) { return h('span', formatDate( row.nextPayTime))} },
  { title: '支付日期', key: 'nextPayTime', render(row) { return h('span', formatDate( row.nextPayTime))} },
  { title: '支付金额', key: 'rentUnitFee', render(row) { return h('span', formatFee( row.rentUnitFee, 'front'))} },
  { title: '支付方式', key: 'payType', render(row) { return h('span', valueToName(row.payType, options.payType) )}  },
  { title: '支付结果', key: 'status', render(row) { return h('span', valueToName(row.status, options.status) )} },
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
            onClick: () => handleView(row),
          },
          { default: () => '立即代付' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'tertiary',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '取消代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '恢复代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'success',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '发起代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '修改租金' }
        )
      ]
    },
  },
]

const valueToName = (value, options)=> {
  return options.filter( e=> e.value === value+'')[0]?.label || ''
}

const formatDate = (time) => {
  if(time) {
    return formatDateTime( time )
  }else{
    return '--'
  }
}

// 导出数据
const exportData = () => {
  console.log( {...extraParams.value, ...queryItems.value})
}

// 重置
const resetExtraParams = () => {
  queryDate.value.create = null
  queryDate.value.next = null
  extraParams.value = {}
}

const handleView = (row) => {
  console.log(row)
  router.push({ name: 'order-detail', params: { ...row }})
  
}

useCRUD({
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch(),
})
</script>

