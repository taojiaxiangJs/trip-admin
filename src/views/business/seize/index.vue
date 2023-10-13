<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getBeReviewedDeduct"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.key" type="text" placeholder="输入要搜索的内容" />
        </QueryBarItem>
        <QueryBarItem :content-width="290">
          <n-select v-model:value="queryItems.approved" :options="options.approveType" placeholder="审核状态" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
// import { formatFee } from '@/utils'
import { options } from '../constant'
import api from '../api'
import globalApi from '@/api'

defineOptions({ name: 'Crud' })
const dialog = useDialog()
const message = useMessage()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.map((e) => ({ label: e.name, value: e.id }))
  })
}
getStoreList()

const columns = [
  { title: '租金套餐名称', key: 'name' },
  { title: '展示名称', key: 'showName' },
  {
    title: '产品类型',
    key: 'productType',
    render(row) {
      return h('span', options.orderType.filter((e) => e.value == row.productType)[0]?.label)
    }
  },
  {
    title: '支付类型',
    key: 'payType',
    render(row) {
      return h('span', options.payType.filter((e) => e.value == row.payType + '')[0]?.label)
    }
  },
  {
    title: '价格',
    key: 'price',
    render(row) {
      // return h('span', formatFee(row.price, 'front'))
      return h('span', row.price)
    }
  },
  {
    title: '租期',
    key: 'terms',
    render(row) {
      return h('span', row.terms + '个月')
    }
  },
  {
    title: '起租期',
    key: 'minTerms',
    render(row) {
      return h('span', row.minTerms + '个月')
    }
  },
  {
    title: '押金（元）',
    key: 'deposit',
    render(row) {
      // return h('span', formatFee(row.deposit, 'front'))
      return h('span', row.deposit)
    }
  },
  {
    title: '滞纳金（元）',
    key: 'overdueFine',
    render(row) {
      // return h('span', formatFee(row.overdueFine, 'front'))
      return h('span', row.overdueFine)
    }
  },
  {
    title: '应用中订单数',
    key: 'num'
  },
  {
    title: '店铺',
    key: 'storeId',
    render(row) {
      return h('span', storeList.value.filter((e) => e.value == row.storeId)[0]?.label)
    }
  },
  {
    title: '上下线状态',
    key: 'status',
    render(row) {
      return h('span', row.status == 1 ? '已上线' : '下线中')
    }
  },
  {
    title: '审核状态',
    key: 'approved',
    render(row) {
      let classType = row.approved === 0 ? 'text-rose-500' : row.approved == 1 ? 'text-green-500' : 'text-yellow-500'
      return h('span', { class: classType }, row.approved == 1 ? '通过' : row.approved == -1 ? '未审核' : '未通过')
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      let arr = []
      if (row.approved === -1) {
        arr = [
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              style: 'margin-left: 15px;',
              onClick: () => handleTable(row, 1)
            },
            { default: () => '通过' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              style: 'margin-left: 15px;',
              onClick: () => handleTable(row, 0)
            },
            { default: () => '拒绝' }
          )
        ]
      }
      return arr
    }
  }
]

const handleTable = (row, type) => {
  dialog.warning({
    title: '警告',
    content: `确定${type ? '同意' : '拒绝'}吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      let reqApi = type ? api.putPassRent : api.putRejectRent
      reqApi(row.id).then(() => {
        message.success('操作成功')
        $table.value?.handleSearch()
      })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}
useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
