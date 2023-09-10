<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAdvanceList"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.searchString" type="text" placeholder="订单编号/租借人/手机号码" @keydown.enter="$table?.handleSearch" />
        </QueryBarItem>
        <QueryBarItem label="申请状态" :label-width="70">
          <n-select v-model:value="queryItems.applyPadFunded" :options="options.applyStatus" />
        </QueryBarItem>
        <QueryBarItem label="店铺" :label-width="40">
          <n-select v-model:value="queryItems.storeId" filterable placeholder="选择店铺" :options="storeList" />
        </QueryBarItem>
      </template>
      <template #extrabox>
        <p mb-20 text-red-400>逾期5天或5天内不申请垫资的订单，系统将做不垫资处理，商户自行选择继续或关闭。</p>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { formatDateTime } from '@/utils'
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

onActivated(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.list.map((e) => ({ label: e.storeName, value: e.storeId }))
  })
}
getStoreList()

const columns = [
  { title: '订单编号', key: 'rentOrderId', width: 190 },
  { title: '租借人', key: 'rentUserName', width: 80 },
  { title: '手机号', key: 'rentUserPhone', width: 120 },
  { title: '商户', key: 'agentName', width: 80 },
  {
    title: '订单类型',
    key: 'productType',
    width: 90,
    render(row) {
      return h('span', valueToName(row.productType, options.orderType))
    }
  },
  { title: '垫资次数', key: '', width: 80 },
  {
    title: '新垫资日',
    key: 'createTime',
    width: 180,
    render(row) {
      return h('span', formatDate(row.createTime))
    }
  },
  {
    title: '关闭倒计时',
    key: 'payDate',
    width: 180,
    render(row) {
      return h('span', formatDate(row.payDate))
    }
  },
  { title: '上期扣款状态', key: '', width: 90 },
  { title: '状态', key: '', width: 90 },
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

const handleView = (row) => {
  console.log(row)
  router.push({ path: 'detail', query: { rentOrderId: row.rentOrderId } })
}

useCRUD({
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch()
})
</script>
