<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllList"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.searchString" type="text" placeholder="输入要搜索的内容" @keydown.enter="$table?.handleSearch" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
import { formatFee } from '@/utils'
import api from './api'

defineOptions({ name: 'Crud' })
const dialog = useDialog()
const message = useMessage()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '订单编号', key: 'rentOrderId' },
  { title: '租借人', key: 'userName' },
  { title: '手机号', key: 'userPhone' },
  {
    title: '租金',
    key: 'rentUnitFee',
    render(row) {
      return h('span', formatFee(row.rentUnitFee, 'front'))
    }
  },
  {
    title: '原押金',
    key: 'depositFee',
    render(row) {
      return h('span', formatFee(row.depositFee, 'front'))
    }
  },
  {
    title: '实际押金',
    key: 'realDepositFee',
    render(row) {
      return h('span', formatFee(row.realDepositFee, 'front'))
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
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row.id || row.rentOrderId, 'sure')
          },
          { default: () => '同意' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row.id || row.rentOrderId, 'refuse')
          },
          { default: () => '拒绝' }
        )
      ]
    }
  }
]

const handleTable = (id, type) => {
  dialog.warning({
    title: '警告',
    content: `确定${type === 'sure' ? '同意' : '拒绝'}吗？`,
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
